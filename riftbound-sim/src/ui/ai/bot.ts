// ============================================================================
// Riftbound TCG — AI Bot
// ============================================================================
// Rule-based AI that generates one GameAction at a time.
// Called repeatedly by the UI hook until it returns null (nothing to do).
// Uses full GameState (local bot, not multiplayer — no information hiding).
// ============================================================================

import type {
  GameState,
  GameAction,
  CardInstance,
  BattlefieldState,
} from "../../models/game-state.js";
import { TurnPhase } from "../../models/game-state.js";
import type {
  CardDefinition,
  CardInstanceId,
  PlayerId,
  DomainPowerCost,
} from "../../models/card.js";
import { CardType, TriggerType, Domain, SpellTiming } from "../../models/card.js";

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Generate the next action for the AI player, or null if the AI has nothing
 * to do right now (not its turn, or it's done acting).
 */
export function generateAIAction(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  aiPlayer: PlayerId,
): GameAction | null {
  if (state.gameOver) return null;

  const phase = state.turn.phase;
  const isActive = state.turn.activePlayer === aiPlayer;
  const hasPriority = state.turn.priorityPlayer === aiPlayer;

  // Mulligan
  if (phase === TurnPhase.Setup) {
    if (!state.turn.mulliganSubmitted.includes(aiPlayer)) {
      return decideMulligan(state, cardDb, aiPlayer);
    }
    return null;
  }

  // Priority responses (chain non-empty or showdown)
  if (hasPriority && state.chain.length > 0) {
    return { type: "pass_priority", player: aiPlayer };
  }
  if (hasPriority && phase === TurnPhase.Showdown) {
    return { type: "pass_priority", player: aiPlayer };
  }

  // Active player in Action phase
  if (isActive && phase === TurnPhase.Action) {
    return decideActionPhase(state, cardDb, aiPlayer);
  }

  return null;
}

// ---------------------------------------------------------------------------
// Mulligan
// ---------------------------------------------------------------------------

function decideMulligan(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  aiPlayer: PlayerId,
): GameAction {
  const playerState = state.players.get(aiPlayer)!;
  const returnIds: CardInstanceId[] = [];

  for (const cardId of playerState.hand) {
    if (returnIds.length >= 2) break;
    const instance = state.cards.get(cardId);
    if (!instance) continue;
    const def = cardDb.get(instance.definitionId);
    if (!def) continue;
    // Return expensive cards (6+ energy cost)
    if (def.cost.energyCost >= 6) {
      returnIds.push(cardId);
    }
  }

  return { type: "mulligan", player: aiPlayer, returnCardIds: returnIds };
}

// ---------------------------------------------------------------------------
// Action Phase Decision Tree
// ---------------------------------------------------------------------------

function decideActionPhase(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  aiPlayer: PlayerId,
): GameAction | null {
  const ps = state.players.get(aiPlayer)!;

  // 1. Exhaust ready runes for energy
  const exhaustAction = findRuneToExhaust(state, ps, aiPlayer);
  if (exhaustAction) return exhaustAction;

  // 2. Recycle runes if we need power for the best card
  const recycleAction = findRuneToRecycle(state, cardDb, ps, aiPlayer);
  if (recycleAction) return recycleAction;

  // 3. Play best affordable card from hand
  const playAction = findCardToPlay(state, cardDb, ps, aiPlayer);
  if (playAction) return playAction;

  // 4. Activate abilities on non-exhausted cards
  const activateAction = findAbilityToActivate(state, cardDb, ps, aiPlayer);
  if (activateAction) return activateAction;

  // 5. Move ready units from base to battlefields
  const moveAction = findUnitsToMove(state, cardDb, ps, aiPlayer);
  if (moveAction) return moveAction;

  // 6. Nothing left — end turn
  return { type: "declare_done", player: aiPlayer };
}

// ---------------------------------------------------------------------------
// Step 1: Exhaust runes for energy
// ---------------------------------------------------------------------------

function findRuneToExhaust(
  state: GameState,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  aiPlayer: PlayerId,
): GameAction | null {
  for (const runeId of ps.runePool) {
    const rune = state.cards.get(runeId);
    if (rune && !rune.exhausted) {
      return { type: "exhaust_rune", player: aiPlayer, runeId };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Step 2: Recycle runes for domain power
// ---------------------------------------------------------------------------

function findRuneToRecycle(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  aiPlayer: PlayerId,
): GameAction | null {
  // Find the most expensive playable card that only needs power
  const candidates = getBestPlayableCards(state, cardDb, ps);
  for (const { def } of candidates) {
    for (const pc of def.cost.powerCosts) {
      const currentPower = getPowerAmount(ps, pc.domain);
      if (currentPower < pc.amount) {
        // Need more power — find a rune of this domain to recycle
        const runeId = findRecyclableRune(state, cardDb, ps, pc.domain);
        if (runeId) {
          return { type: "recycle_rune", player: aiPlayer, runeId };
        }
      }
    }
  }
  return null;
}

function findRecyclableRune(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  domain: Domain,
): CardInstanceId | null {
  for (const runeId of ps.runePool) {
    const rune = state.cards.get(runeId);
    if (!rune) continue;
    const def = cardDb.get(rune.definitionId);
    if (!def || def.type !== CardType.Rune) continue;
    if (def.domains[0] === domain) {
      return runeId;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Step 3: Play a card
// ---------------------------------------------------------------------------

function findCardToPlay(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  aiPlayer: PlayerId,
): GameAction | null {
  const candidates = getBestPlayableCards(state, cardDb, ps);

  for (const { cardId, def } of candidates) {
    // Check affordability
    if (!canAffordSimple(ps, def, state.cards, cardDb)) continue;

    // Skip Reaction spells (only play during chain, which we handle elsewhere)
    if (def.type === CardType.Spell && def.spellTiming === SpellTiming.Reaction) continue;

    // For spells that need targets, find a target
    if (def.type === CardType.Spell) {
      const ability = def.abilities.find(a => a.trigger === TriggerType.OnPlay);
      if (ability && ability.targetType !== "none") {
        const target = findTarget(state, cardDb, aiPlayer, ability.targetType);
        if (target) {
          return { type: "play_card", player: aiPlayer, cardInstanceId: cardId, targets: [target] };
        }
        continue; // No valid target, skip this card
      }
    }

    return { type: "play_card", player: aiPlayer, cardInstanceId: cardId };
  }

  // Also check if champion can be played from champion zone
  if (!ps.chosenChampionPlayed) {
    const champId = ps.chosenChampionInstanceId;
    const champInstance = state.cards.get(champId);
    if (champInstance) {
      const champDef = cardDb.get(champInstance.definitionId);
      if (champDef && canAffordSimple(ps, champDef, state.cards, cardDb)) {
        return { type: "play_card", player: aiPlayer, cardInstanceId: champId };
      }
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Step 4: Activate abilities
// ---------------------------------------------------------------------------

function findAbilityToActivate(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  aiPlayer: PlayerId,
): GameAction | null {
  // Check base cards
  const allCards = [...ps.base, ps.legendInstanceId];
  for (const cardId of allCards) {
    const instance = state.cards.get(cardId);
    if (!instance || instance.exhausted) continue;
    const def = cardDb.get(instance.definitionId);
    if (!def) continue;

    for (const ability of def.abilities) {
      if (ability.trigger !== TriggerType.Activated) continue;

      // Check ability cost
      if (ability.cost) {
        if (!canAffordSimple(ps, { cost: ability.cost } as any, state.cards, cardDb)) continue;
      }

      // Find target if needed
      if (ability.targetType !== "none") {
        const target = findTarget(state, cardDb, aiPlayer, ability.targetType);
        if (!target) continue;
        return {
          type: "activate_ability",
          player: aiPlayer,
          sourceId: cardId,
          abilityId: ability.id,
          targets: [target],
        };
      }

      return {
        type: "activate_ability",
        player: aiPlayer,
        sourceId: cardId,
        abilityId: ability.id,
      };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Step 5: Move units
// ---------------------------------------------------------------------------

function findUnitsToMove(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  aiPlayer: PlayerId,
): GameAction | null {
  // Find ready units in base that are Units or Champions
  const readyUnits: CardInstanceId[] = [];
  for (const cardId of ps.base) {
    const instance = state.cards.get(cardId);
    if (!instance || instance.exhausted) continue;
    const def = cardDb.get(instance.definitionId);
    if (!def) continue;
    if (def.type === CardType.Unit || def.type === CardType.Champion) {
      readyUnits.push(cardId);
    }
  }

  if (readyUnits.length === 0) return null;

  // Pick a battlefield — prefer one we don't control, or with fewest of our units
  const bestBf = pickBattlefield(state, aiPlayer);
  if (!bestBf) return null;

  return {
    type: "move_units",
    player: aiPlayer,
    unitIds: readyUnits,
    destination: bestBf,
  };
}

function pickBattlefield(
  state: GameState,
  aiPlayer: PlayerId,
): CardInstanceId | null {
  if (state.battlefields.length === 0) return null;

  // Score each battlefield: prefer uncontrolled, then enemy-controlled, then ours with fewer units
  let best: BattlefieldState | null = null;
  let bestScore = -1;

  for (const bf of state.battlefields) {
    let score = 0;
    const ourUnits = bf.units.get(aiPlayer) ?? [];

    if (bf.controller === null) {
      score = 100; // Uncontrolled — high priority
    } else if (bf.controller !== aiPlayer) {
      score = 80; // Enemy-controlled — contest it
    } else {
      score = 10; // We control it — low priority
    }

    // Prefer battlefields where we have fewer units (spread them out)
    score -= ourUnits.length * 5;

    if (score > bestScore) {
      bestScore = score;
      best = bf;
    }
  }

  return best?.cardInstanceId ?? null;
}

// ---------------------------------------------------------------------------
// Target finding
// ---------------------------------------------------------------------------

function findTarget(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  aiPlayer: PlayerId,
  targetType: string,
): CardInstanceId | null {
  const opponent = state.turnOrder.find(p => p !== aiPlayer)!;

  switch (targetType) {
    case "enemy_unit":
      return findEnemyUnit(state, cardDb, opponent);
    case "friendly_unit":
      return findFriendlyUnit(state, cardDb, aiPlayer);
    case "any_unit":
      return findEnemyUnit(state, cardDb, opponent) ?? findFriendlyUnit(state, cardDb, aiPlayer);
    default:
      return null;
  }
}

function findEnemyUnit(
  state: GameState,
  _cardDb: Map<string, CardDefinition>,
  opponent: PlayerId,
): CardInstanceId | null {
  // Check battlefields for enemy units
  for (const bf of state.battlefields) {
    const enemyUnits = bf.units.get(opponent) ?? [];
    if (enemyUnits.length > 0) return enemyUnits[0];
  }
  // Check enemy base
  const opponentState = state.players.get(opponent);
  if (opponentState) {
    for (const cardId of opponentState.base) {
      const instance = state.cards.get(cardId);
      if (!instance) continue;
      const def = state.cards.get(cardId);
      if (def) return cardId;
    }
  }
  return null;
}

function findFriendlyUnit(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  aiPlayer: PlayerId,
): CardInstanceId | null {
  const ps = state.players.get(aiPlayer)!;
  // Check base
  for (const cardId of ps.base) {
    const instance = state.cards.get(cardId);
    if (!instance) continue;
    const def = cardDb.get(instance.definitionId);
    if (def && (def.type === CardType.Unit || def.type === CardType.Champion)) {
      return cardId;
    }
  }
  // Check battlefields
  for (const bf of state.battlefields) {
    const ourUnits = bf.units.get(aiPlayer) ?? [];
    if (ourUnits.length > 0) return ourUnits[0];
  }
  return null;
}

// ---------------------------------------------------------------------------
// Affordability check (simplified mirror of engine's canAfford)
// ---------------------------------------------------------------------------

function canAffordSimple(
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  def: { cost: { energyCost: number; powerCosts: DomainPowerCost[] } },
  allCards: Map<CardInstanceId, CardInstance>,
  cardDb: Map<string, CardDefinition>,
): boolean {
  // Count available energy
  let readyRuneCount = 0;
  for (const runeId of ps.runePool) {
    const rune = allCards.get(runeId);
    if (rune && !rune.exhausted) readyRuneCount++;
  }

  // Count recyclable runes per domain
  const recyclablePerDomain = new Map<Domain, number>();
  for (const runeId of ps.runePool) {
    const rune = allCards.get(runeId);
    if (!rune) continue;
    const runeDef = cardDb.get(rune.definitionId);
    if (!runeDef || runeDef.type !== CardType.Rune) continue;
    const domain = runeDef.domains[0];
    recyclablePerDomain.set(domain, (recyclablePerDomain.get(domain) ?? 0) + 1);
  }

  // Check power costs
  let runesNeededForPower = 0;
  for (const pc of def.cost.powerCosts) {
    const available = (recyclablePerDomain.get(pc.domain) ?? 0) + getPowerAmount(ps, pc.domain);
    if (available < pc.amount) return false;
    const alreadyHave = getPowerAmount(ps, pc.domain);
    runesNeededForPower += Math.max(0, pc.amount - alreadyHave);
  }

  // Check energy
  const effectiveEnergy = ps.currentEnergy + Math.max(0, readyRuneCount - runesNeededForPower);
  return effectiveEnergy >= def.cost.energyCost;
}

function getPowerAmount(
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
  domain: Domain,
): number {
  for (const pc of ps.currentPower) {
    if (pc.domain === domain) return pc.amount;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Card evaluation (sort hand by "best to play first")
// ---------------------------------------------------------------------------

interface PlayCandidate {
  cardId: CardInstanceId;
  def: CardDefinition;
  score: number;
}

function getBestPlayableCards(
  state: GameState,
  cardDb: Map<string, CardDefinition>,
  ps: Readonly<ReturnType<Map<PlayerId, any>["get"]>>,
): PlayCandidate[] {
  const candidates: PlayCandidate[] = [];

  for (const cardId of ps.hand) {
    const instance = state.cards.get(cardId);
    if (!instance) continue;
    const def = cardDb.get(instance.definitionId);
    if (!def) continue;

    // Score: units > gear > spells, weighted by cost (higher = stronger)
    let score = def.cost.energyCost;
    if (def.type === CardType.Unit) score += 10;
    else if (def.type === CardType.Champion) score += 15;
    else if (def.type === CardType.Gear) score += 5;
    else if (def.type === CardType.Spell) score += 3;

    candidates.push({ cardId, def, score });
  }

  // Sort by score descending (play best cards first)
  candidates.sort((a, b) => b.score - a.score);
  return candidates;
}
