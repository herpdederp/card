// ============================================================================
// Riftbound TCG — DSL Effect Interpreter
// ============================================================================
// Executes EffectDescriptor arrays against game state. This is the runtime
// interpreter for the card ability DSL — it maps each effect type to concrete
// state mutations and returns GameEvents for everything that happened.
//
// Used by the chain resolution system when resolving DSL-mode abilities.
// Must be fully DETERMINISTIC — same inputs always produce same outputs.
// ============================================================================

import type {
  GameState,
  GameEvent,
  CardInstance,
  StatModifier,
  PlayerState,
} from "../models/game-state.js";
import type {
  CardInstanceId,
  PlayerId,
  CardDefinition,
} from "../models/card.js";
import type {
  EffectDescriptor,
  ConditionDescriptor,
} from "../cards/abilities.js";
import { getEffectiveHealth, destroyCard } from "./combat.js";
import type { SeededRNG } from "./rng.js";

// ---------------------------------------------------------------------------
// Effect Context
// ---------------------------------------------------------------------------

/** Everything the interpreter needs to execute effects. */
export interface EffectContext {
  state: GameState;
  source: CardInstance;
  controller: PlayerId;
  targets: CardInstanceId[];
  cardDb: Map<string, CardDefinition>;
  rng: SeededRNG;
  /** The battlefield where the source is stationed (for location-scoped effects). */
  sourceBattlefieldId?: CardInstanceId;
}

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

/**
 * Execute an array of EffectDescriptors sequentially.
 * Returns all events produced. Mutates state in place.
 */
export function executeEffects(
  effects: EffectDescriptor[],
  ctx: EffectContext,
): GameEvent[] {
  const allEvents: GameEvent[] = [];
  for (const effect of effects) {
    allEvents.push(...executeSingleEffect(effect, ctx));
  }
  return allEvents;
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

function executeSingleEffect(
  effect: EffectDescriptor,
  ctx: EffectContext,
): GameEvent[] {
  switch (effect.type) {
    case "draw_cards": return handleDrawCards(effect, ctx);
    case "deal_damage": return handleDealDamage(effect, ctx);
    case "heal": return handleHeal(effect, ctx);
    case "buff_might": return handleBuffMight(effect, ctx);
    case "buff_health": return handleBuffHealth(effect, ctx);
    case "exhaust_target": return handleExhaustTarget(effect, ctx);
    case "ready_target": return handleReadyTarget(effect, ctx);
    case "bounce_to_hand": return handleBounceToHand(effect, ctx);
    case "destroy_target": return handleDestroyTarget(effect, ctx);
    case "move_unit": return handleMoveUnit(effect, ctx);
    case "channel_extra_runes": return handleChannelExtraRunes(effect, ctx);
    case "generate_energy": return handleGenerateEnergy(effect, ctx);
    case "generate_power": return handleGeneratePower(effect, ctx);
    case "create_token": return handleCreateToken(effect, ctx);
    case "discard_cards": return handleDiscardCards(effect, ctx);
    case "search_deck": return handleSearchDeck(effect, ctx);
    case "recycle_from_trash": return handleRecycleFromTrash(effect, ctx);
    case "grant_keyword": return handleGrantKeyword(effect, ctx);
    case "prevent_damage": return handlePreventDamage(effect, ctx);
    case "conditional": return handleConditional(effect, ctx);
    default: return [];
  }
}

// ---------------------------------------------------------------------------
// Target Resolution
// ---------------------------------------------------------------------------

/** Resolve a target descriptor to actual CardInstanceIds. */
function resolveCardTargets(
  target: string,
  ctx: EffectContext,
): CardInstanceId[] {
  switch (target) {
    case "target":
      return ctx.targets.length > 0 ? [ctx.targets[0]] : [];
    case "self":
      return [ctx.source.instanceId];
    case "all_enemy_units":
      return getAllUnitsNotControlledBy(ctx.state, ctx.controller);
    case "all_friendly_units":
      return getAllUnitsControlledBy(ctx.state, ctx.controller);
    case "all_units":
      return getAllUnits(ctx.state);
    default:
      return [];
  }
}

/** Resolve a player descriptor to a PlayerId. */
function resolvePlayer(
  player: string,
  ctx: EffectContext,
): PlayerId {
  switch (player) {
    case "controller":
      return ctx.controller;
    case "opponent":
      return getFirstOpponent(ctx.state, ctx.controller);
    case "target_player":
      // Target player would be specified in targets, but for now default to opponent
      return getFirstOpponent(ctx.state, ctx.controller);
    default:
      return ctx.controller;
  }
}

// ---------------------------------------------------------------------------
// Effect Handlers
// ---------------------------------------------------------------------------

function handleDrawCards(
  effect: Extract<EffectDescriptor, { type: "draw_cards" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerId = resolvePlayer(effect.player, ctx);
  const playerState = ctx.state.players.get(playerId)!;

  for (let i = 0; i < effect.amount; i++) {
    if (playerState.mainDeck.length === 0) break;
    const cardId = playerState.mainDeck.shift()!;
    playerState.hand.push(cardId);
    events.push({ type: "card_drawn", player: playerId, cardInstanceId: cardId });
  }
  return events;
}

function handleDealDamage(
  effect: Extract<EffectDescriptor, { type: "deal_damage" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const targetIds = resolveCardTargets(effect.target, ctx);

  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (!card) continue;

    const def = ctx.cardDb.get(card.definitionId);
    if (!def) continue;

    card.damage += effect.amount;
    events.push({
      type: "effect_damage",
      sourceId: ctx.source.instanceId,
      targetId,
      amount: effect.amount,
    });

    // Check for destruction
    const health = getEffectiveHealth(card, def);
    if (card.damage >= health) {
      events.push(...destroyCard(ctx.state, targetId));
    }
  }
  return events;
}

function handleHeal(
  effect: Extract<EffectDescriptor, { type: "heal" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (card) {
      card.damage = Math.max(0, card.damage - effect.amount);
    }
  }
  return [];
}

function handleBuffMight(
  effect: Extract<EffectDescriptor, { type: "buff_might" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (card) {
      card.modifiers.push({
        id: `mod_${ctx.source.instanceId}_might_${targetId}`,
        source: ctx.source.instanceId,
        mightDelta: effect.amount,
        healthDelta: 0,
        duration: effect.duration,
      });
    }
  }
  return [];
}

function handleBuffHealth(
  effect: Extract<EffectDescriptor, { type: "buff_health" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (card) {
      card.modifiers.push({
        id: `mod_${ctx.source.instanceId}_health_${targetId}`,
        source: ctx.source.instanceId,
        mightDelta: 0,
        healthDelta: effect.amount,
        duration: effect.duration,
      });
    }
  }
  return [];
}

function handleExhaustTarget(
  _effect: Extract<EffectDescriptor, { type: "exhaust_target" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets("target", ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (card) card.exhausted = true;
  }
  return [];
}

function handleReadyTarget(
  effect: Extract<EffectDescriptor, { type: "ready_target" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (card) card.exhausted = false;
  }
  return [];
}

function handleBounceToHand(
  effect: Extract<EffectDescriptor, { type: "bounce_to_hand" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const targetIds = resolveCardTargets(effect.target, ctx);

  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (!card) continue;

    const ownerState = ctx.state.players.get(card.owner)!;

    // Remove from base
    const baseIdx = ownerState.base.indexOf(targetId);
    if (baseIdx !== -1) ownerState.base.splice(baseIdx, 1);

    // Remove from battlefields
    for (const bf of ctx.state.battlefields) {
      for (const [, unitIds] of bf.units) {
        const idx = unitIds.indexOf(targetId);
        if (idx !== -1) unitIds.splice(idx, 1);
      }
    }

    // Add to hand and reset
    ownerState.hand.push(targetId);
    card.damage = 0;
    card.modifiers = [];
    card.exhausted = false;
    card.grantedKeywords = [];
  }
  return events;
}

function handleDestroyTarget(
  _effect: Extract<EffectDescriptor, { type: "destroy_target" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets("target", ctx);
  const events: GameEvent[] = [];
  for (const targetId of targetIds) {
    events.push(...destroyCard(ctx.state, targetId));
  }
  return events;
}

function handleMoveUnit(
  effect: Extract<EffectDescriptor, { type: "move_unit" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  const events: GameEvent[] = [];

  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (!card) continue;

    const ownerState = ctx.state.players.get(card.controller)!;

    if (effect.destination === "base") {
      // Remove from battlefields
      for (const bf of ctx.state.battlefields) {
        const units = bf.units.get(card.controller);
        if (units) {
          const idx = units.indexOf(targetId);
          if (idx !== -1) units.splice(idx, 1);
        }
      }
      ownerState.base.push(targetId);
    }
    // "any_battlefield" would need target selection — skip for now
  }
  return events;
}

function handleChannelExtraRunes(
  effect: Extract<EffectDescriptor, { type: "channel_extra_runes" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = ctx.state.players.get(ctx.controller)!;

  for (let i = 0; i < effect.amount; i++) {
    if (playerState.runeDeck.length === 0) break;
    const runeId = playerState.runeDeck.shift()!;
    playerState.runePool.push(runeId);
    const runeCard = ctx.state.cards.get(runeId);
    if (runeCard) runeCard.exhausted = false;
    events.push({ type: "rune_channeled", player: ctx.controller, runeId });
  }
  return events;
}

function handleGenerateEnergy(
  effect: Extract<EffectDescriptor, { type: "generate_energy" }>,
  ctx: EffectContext,
): GameEvent[] {
  const playerState = ctx.state.players.get(ctx.controller)!;
  playerState.currentEnergy += effect.amount;
  return [];
}

function handleGeneratePower(
  effect: Extract<EffectDescriptor, { type: "generate_power" }>,
  ctx: EffectContext,
): GameEvent[] {
  const playerState = ctx.state.players.get(ctx.controller)!;
  const existing = playerState.currentPower.find(p => p.domain === effect.domain);
  if (existing) {
    existing.amount += effect.amount;
  } else {
    playerState.currentPower.push({ domain: effect.domain, amount: effect.amount });
  }
  return [];
}

function handleCreateToken(
  effect: Extract<EffectDescriptor, { type: "create_token" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = ctx.state.players.get(ctx.controller)!;

  for (let i = 0; i < effect.count; i++) {
    const tokenId = `token_${effect.tokenDefId}_${Date.now()}_${i}` as CardInstanceId;
    const tokenInstance: CardInstance = {
      instanceId: tokenId,
      definitionId: effect.tokenDefId,
      owner: ctx.controller,
      controller: ctx.controller,
      exhausted: false,
      damage: 0,
      modifiers: [],
      faceDown: false,
      grantedKeywords: [],
      attachments: [],
    };
    ctx.state.cards.set(tokenId, tokenInstance);

    if (effect.location === "base") {
      playerState.base.push(tokenId);
    }
    // "battlefield" would need a target battlefield

    events.push({ type: "token_created", instanceId: tokenId, owner: ctx.controller });
  }
  return events;
}

function handleDiscardCards(
  effect: Extract<EffectDescriptor, { type: "discard_cards" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerId = resolvePlayer(effect.player, ctx);
  const playerState = ctx.state.players.get(playerId)!;

  let toDiscard = Math.min(effect.amount, playerState.hand.length);
  if (toDiscard === 0) return events;

  if (effect.random) {
    // Random discard using seeded RNG
    for (let i = 0; i < toDiscard; i++) {
      if (playerState.hand.length === 0) break;
      const idx = ctx.rng.nextInt(0, playerState.hand.length - 1);
      const cardId = playerState.hand.splice(idx, 1)[0];
      playerState.trash.push(cardId);
      events.push({ type: "card_destroyed", cardInstanceId: cardId });
    }
  } else {
    // Non-random: discard from end of hand (would need target selection in full impl)
    for (let i = 0; i < toDiscard; i++) {
      const cardId = playerState.hand.pop()!;
      playerState.trash.push(cardId);
      events.push({ type: "card_destroyed", cardInstanceId: cardId });
    }
  }
  return events;
}

function handleSearchDeck(
  effect: Extract<EffectDescriptor, { type: "search_deck" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = ctx.state.players.get(ctx.controller)!;

  // Simplified: find first matching card in deck
  let found = 0;
  for (let i = 0; i < playerState.mainDeck.length && found < effect.count; i++) {
    const cardId = playerState.mainDeck[i];
    const card = ctx.state.cards.get(cardId);
    if (!card) continue;
    const def = ctx.cardDb.get(card.definitionId);
    if (!def) continue;

    // Simple filter matching: check if the filter string appears in the card name or type
    if (effect.filter === "*" || def.name.toLowerCase().includes(effect.filter.toLowerCase())
        || def.type === effect.filter) {
      playerState.mainDeck.splice(i, 1);
      playerState.hand.push(cardId);
      events.push({ type: "card_drawn", player: ctx.controller, cardInstanceId: cardId });
      found++;
      i--; // Adjust index after splice
    }
  }
  return events;
}

function handleRecycleFromTrash(
  effect: Extract<EffectDescriptor, { type: "recycle_from_trash" }>,
  ctx: EffectContext,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = ctx.state.players.get(ctx.controller)!;

  for (let i = 0; i < playerState.trash.length; i++) {
    const cardId = playerState.trash[i];
    const card = ctx.state.cards.get(cardId);
    if (!card) continue;
    const def = ctx.cardDb.get(card.definitionId);
    if (!def) continue;

    if (effect.filter === "*" || def.name.toLowerCase().includes(effect.filter.toLowerCase())
        || def.type === effect.filter) {
      playerState.trash.splice(i, 1);
      playerState.hand.push(cardId);
      events.push({ type: "card_drawn", player: ctx.controller, cardInstanceId: cardId });
      break; // Only recycle one
    }
  }
  return events;
}

function handleGrantKeyword(
  effect: Extract<EffectDescriptor, { type: "grant_keyword" }>,
  ctx: EffectContext,
): GameEvent[] {
  const targetIds = resolveCardTargets(effect.target, ctx);
  for (const targetId of targetIds) {
    const card = ctx.state.cards.get(targetId);
    if (!card) continue;

    if (effect.duration === "permanent") {
      if (!card.grantedKeywords.includes(effect.keyword)) {
        card.grantedKeywords.push(effect.keyword);
      }
    } else {
      // Temporary keyword via modifier
      card.modifiers.push({
        id: `mod_${ctx.source.instanceId}_kw_${targetId}`,
        source: ctx.source.instanceId,
        mightDelta: 0,
        healthDelta: 0,
        duration: effect.duration,
        grantedKeywords: [effect.keyword],
      });
    }
  }
  return [];
}

function handlePreventDamage(
  _effect: Extract<EffectDescriptor, { type: "prevent_damage" }>,
  _ctx: EffectContext,
): GameEvent[] {
  // Damage prevention shields require a more complex system (intercepting damage
  // application). For Phase 2, this is a no-op stub — full implementation in Phase 3.
  return [];
}

function handleConditional(
  effect: Extract<EffectDescriptor, { type: "conditional" }>,
  ctx: EffectContext,
): GameEvent[] {
  if (evaluateCondition(effect.condition, ctx)) {
    return executeSingleEffect(effect.then, ctx);
  } else if (effect.else) {
    return executeSingleEffect(effect.else, ctx);
  }
  return [];
}

// ---------------------------------------------------------------------------
// Condition Evaluator
// ---------------------------------------------------------------------------

function evaluateCondition(
  condition: ConditionDescriptor,
  ctx: EffectContext,
): boolean {
  switch (condition.type) {
    case "controller_has_units_at": {
      let count = 0;
      for (const bf of ctx.state.battlefields) {
        if (condition.battlefieldId && condition.battlefieldId !== "any"
            && bf.cardInstanceId !== condition.battlefieldId) continue;
        const units = bf.units.get(ctx.controller) ?? [];
        count += units.length;
      }
      return compare(count, condition.comparison, condition.count);
    }

    case "opponent_controls_battlefield": {
      for (const bf of ctx.state.battlefields) {
        if (condition.battlefieldId && condition.battlefieldId !== "any"
            && bf.cardInstanceId !== condition.battlefieldId) continue;
        if (bf.controller !== null && bf.controller !== ctx.controller) return true;
      }
      return false;
    }

    case "card_in_zone": {
      const playerState = ctx.state.players.get(ctx.controller)!;
      const zoneCards = getCardsInZone(playerState, condition.zone);
      if (!condition.filter) return zoneCards.length > 0;
      return zoneCards.some(id => {
        const card = ctx.state.cards.get(id);
        if (!card) return false;
        const def = ctx.cardDb.get(card.definitionId);
        return def ? def.type === condition.filter || def.name.toLowerCase().includes(condition.filter!.toLowerCase()) : false;
      });
    }

    case "score_comparison": {
      const playerId = condition.player === "controller"
        ? ctx.controller
        : getFirstOpponent(ctx.state, ctx.controller);
      const playerState = ctx.state.players.get(playerId)!;
      return compare(playerState.score, condition.comparison, condition.value);
    }

    case "turn_number":
      return compare(ctx.state.turn.turnNumber, condition.comparison, condition.value);

    case "rune_count": {
      const playerState = ctx.state.players.get(ctx.controller)!;
      return compare(playerState.runePool.length, condition.comparison, condition.value);
    }

    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// Utility Helpers
// ---------------------------------------------------------------------------

function compare(a: number, op: ">=" | "<=" | "==", b: number): boolean {
  switch (op) {
    case ">=": return a >= b;
    case "<=": return a <= b;
    case "==": return a === b;
  }
}

function getCardsInZone(playerState: PlayerState, zone: string): CardInstanceId[] {
  switch (zone) {
    case "hand": return playerState.hand;
    case "base": return playerState.base;
    case "trash": return playerState.trash;
    case "rune_pool": return playerState.runePool;
    case "main_deck": return playerState.mainDeck;
    default: return [];
  }
}

function getAllUnitsControlledBy(state: GameState, player: PlayerId): CardInstanceId[] {
  const ids: CardInstanceId[] = [];
  const playerState = state.players.get(player)!;
  ids.push(...playerState.base);
  for (const bf of state.battlefields) {
    const units = bf.units.get(player) ?? [];
    ids.push(...units);
  }
  return ids;
}

function getAllUnitsNotControlledBy(state: GameState, player: PlayerId): CardInstanceId[] {
  const ids: CardInstanceId[] = [];
  for (const [pid, pState] of state.players) {
    if (pid === player) continue;
    ids.push(...pState.base);
  }
  for (const bf of state.battlefields) {
    for (const [pid, units] of bf.units) {
      if (pid === player) continue;
      ids.push(...units);
    }
  }
  return ids;
}

function getAllUnits(state: GameState): CardInstanceId[] {
  const ids: CardInstanceId[] = [];
  for (const pState of state.players.values()) {
    ids.push(...pState.base);
  }
  for (const bf of state.battlefields) {
    for (const units of bf.units.values()) {
      ids.push(...units);
    }
  }
  return ids;
}

function getFirstOpponent(state: GameState, player: PlayerId): PlayerId {
  for (const pid of state.turnOrder) {
    if (pid !== player) return pid;
  }
  return player; // Fallback (shouldn't happen)
}
