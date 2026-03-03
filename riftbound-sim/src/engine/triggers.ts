// ============================================================================
// Riftbound TCG — Trigger Detection System
// ============================================================================
// When a GameEvent fires, this module scans all in-play cards for abilities
// whose TriggerType matches the event. Matching triggered abilities produce
// ChainEntry objects (go on the chain for LIFO resolution). Static abilities
// execute immediately without going on the chain.
//
// The engine calls this after every relevant event emission.
// ============================================================================

import type {
  GameState,
  GameEvent,
  ChainEntry,
  CardInstance,
} from "../models/game-state.js";
import type {
  CardDefinition,
  CardInstanceId,
  PlayerId,
  AbilityDefinition,
} from "../models/card.js";
import { TriggerType } from "../models/card.js";
import type {
  CardScriptRegistry,
  AbilityImplementation,
} from "../cards/abilities.js";
import { executeEffects, type EffectContext } from "./effects.js";
import type { SeededRNG } from "./rng.js";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface TriggerContext {
  state: GameState;
  cardDb: Map<string, CardDefinition>;
  scripts: CardScriptRegistry;
  rng: SeededRNG;
  /** Generate a unique chain entry ID. */
  nextChainId: () => string;
}

// ---------------------------------------------------------------------------
// Triggered Abilities (go on chain)
// ---------------------------------------------------------------------------

/**
 * Given a GameEvent that just occurred, find all triggered abilities
 * that should fire. Returns ChainEntry objects to push onto the chain.
 *
 * Does NOT modify state — the caller (engine) pushes entries to the chain.
 *
 * Ordering: active player's triggers first, then opponents in turn order.
 * Within a player: legend → champion → base → battlefield units.
 */
export function findTriggeredAbilities(
  event: GameEvent,
  ctx: TriggerContext,
): ChainEntry[] {
  const results: ChainEntry[] = [];
  const triggerType = eventToTriggerType(event);
  if (!triggerType) return results;

  // Get candidate cards based on the event type
  const candidates = getCandidateCards(event, triggerType, ctx);

  // Process in turn order (active player first)
  const orderedPlayers = getOrderedPlayers(ctx.state);

  for (const playerId of orderedPlayers) {
    for (const { cardId, card, ability } of candidates) {
      if (card.controller !== playerId) continue;

      // Check if ability trigger matches
      if (ability.trigger !== triggerType) continue;

      // Check script's canActivate if present
      const def = ctx.cardDb.get(card.definitionId);
      if (!def) continue;

      const script = ctx.scripts.get(def.id);
      if (script) {
        const impl = script.abilities.get(ability.id);
        if (impl?.mode === "script" && impl.script.canActivate) {
          if (!impl.script.canActivate(ctx.state, card, card.controller)) {
            continue;
          }
        }
      }

      // Build chain entry with event context in params
      const entry: ChainEntry = {
        id: ctx.nextChainId(),
        sourceInstanceId: cardId,
        controller: card.controller,
        abilityId: ability.id,
        targets: [],
        params: buildEventParams(event),
        cancelled: false,
      };

      results.push(entry);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Static Abilities (execute immediately, no chain)
// ---------------------------------------------------------------------------

/**
 * Check all in-play static abilities and execute any that react to this event.
 * Static abilities do NOT go on the chain — they resolve immediately.
 *
 * Returns events produced by static ability resolution.
 */
export function checkStaticAbilities(
  event: GameEvent,
  ctx: TriggerContext,
): GameEvent[] {
  const allEvents: GameEvent[] = [];
  const staticCards = getStaticAbilityCards(ctx);

  for (const { cardId, card, ability } of staticCards) {
    const def = ctx.cardDb.get(card.definitionId);
    if (!def) continue;

    const script = ctx.scripts.get(def.id);
    if (!script) continue;

    const impl = script.abilities.get(ability.id);
    if (!impl) continue;

    if (impl.mode === "script") {
      if (impl.script.canActivate && !impl.script.canActivate(ctx.state, card, card.controller)) {
        continue;
      }
      const events = impl.script.resolve(
        ctx.state,
        card,
        card.controller,
        [],
        { triggerEvent: event, cardDb: ctx.cardDb },
      );
      allEvents.push(...events);
    } else if (impl.mode === "dsl") {
      const effectCtx: EffectContext = {
        state: ctx.state,
        source: card,
        controller: card.controller,
        targets: [],
        cardDb: ctx.cardDb,
        rng: ctx.rng,
      };
      const events = executeEffects(impl.effects, effectCtx);
      allEvents.push(...events);
    }
  }

  return allEvents;
}

// ---------------------------------------------------------------------------
// Event → TriggerType Mapping
// ---------------------------------------------------------------------------

/**
 * Map a GameEvent type to the TriggerType it might activate.
 * Returns null if this event doesn't trigger any abilities.
 */
function eventToTriggerType(event: GameEvent): TriggerType | null {
  switch (event.type) {
    case "card_played": return TriggerType.OnPlay;
    case "card_destroyed": return TriggerType.OnDestroy;
    case "battlefield_conquered": return TriggerType.OnConquer;
    case "units_moved": return TriggerType.OnMove;
    case "turn_started": return TriggerType.OnTurnStart;
    case "showdown_started": return TriggerType.OnShowdownStart;
    case "combat_damage": return TriggerType.OnDealDamage;
    case "card_drawn": return TriggerType.OnDraw;
    case "rune_channeled": return TriggerType.OnChannel;
    default: return null;
  }
}

// ---------------------------------------------------------------------------
// Candidate Card Collection
// ---------------------------------------------------------------------------

interface CandidateCard {
  cardId: CardInstanceId;
  card: CardInstance;
  ability: AbilityDefinition;
}

/**
 * Get candidate cards that might trigger based on the event type.
 * Different events scan different sets of cards.
 */
function getCandidateCards(
  event: GameEvent,
  triggerType: TriggerType,
  ctx: TriggerContext,
): CandidateCard[] {
  const results: CandidateCard[] = [];

  switch (event.type) {
    case "card_played": {
      // OnPlay: scan the played card itself.
      // Skip spells — their OnPlay ability is already on the chain via handlePlayCard.
      // Also skip units/gear with OnPlay — those are handled by the engine directly.
      // This branch exists for OTHER cards that trigger on a card_played event
      // (e.g., "whenever a card is played, do X"). Those are scanned below
      // as part of the general trigger scan, not here.
      break;
    }

    case "card_destroyed": {
      // OnDestroy: scan the destroyed card
      const card = ctx.state.cards.get(event.cardInstanceId);
      if (card) {
        const def = ctx.cardDb.get(card.definitionId);
        if (def) {
          for (const ability of def.abilities) {
            if (ability.trigger === triggerType) {
              results.push({ cardId: event.cardInstanceId, card, ability });
            }
          }
        }
      }
      break;
    }

    case "battlefield_conquered": {
      // OnConquer: scan all cards controlled by the conquering player
      // OnBattlefieldConquered: scan the battlefield card itself
      const conqueror = event.conqueror;

      // Scan conquering player's cards for OnConquer
      const playerCards = getAllInPlayCards(ctx.state, conqueror);
      for (const { cardId, card } of playerCards) {
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === TriggerType.OnConquer) {
            results.push({ cardId, card, ability });
          }
        }
      }

      // Scan the battlefield card for OnBattlefieldConquered
      const bfCard = ctx.state.cards.get(event.battlefieldId);
      if (bfCard) {
        const bfDef = ctx.cardDb.get(bfCard.definitionId);
        if (bfDef) {
          for (const ability of bfDef.abilities) {
            if (ability.trigger === TriggerType.OnBattlefieldConquered) {
              // Controller for battlefield triggers is the conquering player
              results.push({
                cardId: event.battlefieldId,
                card: { ...bfCard, controller: conqueror },
                ability,
              });
            }
          }
        }
      }
      break;
    }

    case "units_moved": {
      // OnMove: scan each moved unit
      for (const unitId of event.unitIds) {
        const card = ctx.state.cards.get(unitId);
        if (!card) continue;
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === triggerType) {
            results.push({ cardId: unitId, card, ability });
          }
        }
      }
      break;
    }

    case "turn_started": {
      // OnTurnStart: scan all cards controlled by the active player
      const playerCards = getAllInPlayCards(ctx.state, event.player);
      for (const { cardId, card } of playerCards) {
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === triggerType) {
            results.push({ cardId, card, ability });
          }
        }
      }
      break;
    }

    case "showdown_started": {
      // OnShowdownStart: scan all units at that battlefield
      const bf = ctx.state.battlefields.find(b => b.cardInstanceId === event.battlefieldId);
      if (bf) {
        for (const [, unitIds] of bf.units) {
          for (const unitId of unitIds) {
            const card = ctx.state.cards.get(unitId);
            if (!card) continue;
            const def = ctx.cardDb.get(card.definitionId);
            if (!def) continue;
            for (const ability of def.abilities) {
              if (ability.trigger === triggerType) {
                results.push({ cardId: unitId, card, ability });
              }
            }
          }
        }
      }
      break;
    }

    case "combat_damage": {
      // OnDealDamage: scan the source card
      const source = ctx.state.cards.get(event.sourceId);
      if (source) {
        const def = ctx.cardDb.get(source.definitionId);
        if (def) {
          for (const ability of def.abilities) {
            if (ability.trigger === TriggerType.OnDealDamage) {
              results.push({ cardId: event.sourceId, card: source, ability });
            }
          }
        }
      }
      // OnTakeDamage: scan the target card
      const target = ctx.state.cards.get(event.targetId);
      if (target) {
        const def = ctx.cardDb.get(target.definitionId);
        if (def) {
          for (const ability of def.abilities) {
            if (ability.trigger === TriggerType.OnTakeDamage) {
              results.push({ cardId: event.targetId, card: target, ability });
            }
          }
        }
      }
      break;
    }

    case "card_drawn": {
      // OnDraw: scan all cards with OnDraw controlled by that player
      const playerCards = getAllInPlayCards(ctx.state, event.player);
      for (const { cardId, card } of playerCards) {
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === triggerType) {
            results.push({ cardId, card, ability });
          }
        }
      }
      break;
    }

    case "rune_channeled": {
      // OnChannel: scan all cards with OnChannel controlled by that player
      const playerCards = getAllInPlayCards(ctx.state, event.player);
      for (const { cardId, card } of playerCards) {
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === triggerType) {
            results.push({ cardId, card, ability });
          }
        }
      }
      break;
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Static Ability Card Collection
// ---------------------------------------------------------------------------

/**
 * Get all in-play cards that have at least one Static ability.
 */
function getStaticAbilityCards(ctx: TriggerContext): CandidateCard[] {
  const results: CandidateCard[] = [];

  // Legends (always in play)
  for (const player of ctx.state.players.values()) {
    const legendCard = ctx.state.cards.get(player.legendInstanceId);
    if (legendCard) {
      const def = ctx.cardDb.get(legendCard.definitionId);
      if (def) {
        for (const ability of def.abilities) {
          if (ability.trigger === TriggerType.Static) {
            results.push({ cardId: player.legendInstanceId, card: legendCard, ability });
          }
        }
      }
    }
  }

  // Base cards (gear, champions already played)
  for (const player of ctx.state.players.values()) {
    for (const cardId of player.base) {
      const card = ctx.state.cards.get(cardId);
      if (!card) continue;
      const def = ctx.cardDb.get(card.definitionId);
      if (!def) continue;
      for (const ability of def.abilities) {
        if (ability.trigger === TriggerType.Static) {
          results.push({ cardId, card, ability });
        }
      }
    }
  }

  // Battlefield units
  for (const bf of ctx.state.battlefields) {
    for (const [, unitIds] of bf.units) {
      for (const unitId of unitIds) {
        const card = ctx.state.cards.get(unitId);
        if (!card) continue;
        const def = ctx.cardDb.get(card.definitionId);
        if (!def) continue;
        for (const ability of def.abilities) {
          if (ability.trigger === TriggerType.Static) {
            results.push({ cardId: unitId, card, ability });
          }
        }
      }
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get all in-play cards for a player (legend, base, battlefields). */
function getAllInPlayCards(
  state: GameState,
  player: PlayerId,
): { cardId: CardInstanceId; card: CardInstance }[] {
  const results: { cardId: CardInstanceId; card: CardInstance }[] = [];
  const playerState = state.players.get(player)!;

  // Legend
  const legend = state.cards.get(playerState.legendInstanceId);
  if (legend) results.push({ cardId: playerState.legendInstanceId, card: legend });

  // Champion (if played)
  if (playerState.chosenChampionPlayed) {
    const champ = state.cards.get(playerState.chosenChampionInstanceId);
    if (champ) results.push({ cardId: playerState.chosenChampionInstanceId, card: champ });
  }

  // Base
  for (const cardId of playerState.base) {
    const card = state.cards.get(cardId);
    if (card) results.push({ cardId, card });
  }

  // Battlefield units
  for (const bf of state.battlefields) {
    const units = bf.units.get(player) ?? [];
    for (const unitId of units) {
      const card = state.cards.get(unitId);
      if (card) results.push({ cardId: unitId, card });
    }
  }

  return results;
}

/** Get players ordered by active player first, then turn order. */
function getOrderedPlayers(state: GameState): PlayerId[] {
  const active = state.turn.activePlayer;
  const idx = state.turnOrder.indexOf(active);
  const ordered: PlayerId[] = [];
  for (let i = 0; i < state.turnOrder.length; i++) {
    ordered.push(state.turnOrder[(idx + i) % state.turnOrder.length]);
  }
  return ordered;
}

/** Build params from a GameEvent to pass along to chain entries. */
function buildEventParams(event: GameEvent): Record<string, unknown> {
  const params: Record<string, unknown> = { triggerEvent: event };

  switch (event.type) {
    case "battlefield_conquered":
      params.battlefieldId = event.battlefieldId;
      params.conqueror = event.conqueror;
      break;
    case "units_moved":
      params.destination = event.destination;
      break;
    case "combat_damage":
      params.sourceId = event.sourceId;
      params.targetId = event.targetId;
      params.amount = event.amount;
      break;
  }

  return params;
}
