// ============================================================================
// Riftbound TCG — Resource System
// ============================================================================
// Manages Runes, Energy, and Domain Power. Runes are the resource cards
// that fuel everything in Riftbound.
//
// Two ways to use a Rune:
//   1. EXHAUST — tap it sideways to generate 1 generic Energy
//   2. RECYCLE — return it to the bottom of the Rune Deck to generate
//               1 Domain Power of that Rune's domain color
//
// Rune Pool empties (Energy + Power reset) at end of Channel Phase
// and at end of Turn.
// ============================================================================

import type { GameState, GameEvent, CardInstance, PlayerState } from "../models/game-state.js";
import type { PlayerId, CardInstanceId, CardDefinition, DomainPowerCost } from "../models/card.js";
import { CardType, Domain } from "../models/card.js";

// ---------------------------------------------------------------------------
// Channel Phase — draw runes from Rune Deck
// ---------------------------------------------------------------------------

/**
 * Channel runes during the Channel (C) phase.
 * - Normally: channel 2 runes
 * - Second player's first turn: channel 3 (catch-up mechanic)
 * - FFA: only the last player in turn order channels 3 on turn 1
 */
export function channelRunes(
  state: GameState,
  player: PlayerId,
  cardDb: Map<string, CardDefinition>,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  // Determine how many runes to channel
  let runeCount = 2;

  // Catch-up mechanic: second player gets 3 on their very first turn
  const isFirstTurn = state.turn.turnNumber <= state.turnOrder.length;
  const isLastInOrder = state.turnOrder[state.turnOrder.length - 1] === player;

  if (isFirstTurn && isLastInOrder) {
    runeCount = 3;
  }

  // Channel runes from top of Rune Deck
  for (let i = 0; i < runeCount; i++) {
    if (playerState.runeDeck.length === 0) break;

    const runeId = playerState.runeDeck.shift()!;
    playerState.runePool.push(runeId);

    // Set the rune to Ready state
    const runeCard = state.cards.get(runeId);
    if (runeCard) {
      runeCard.exhausted = false;
    }

    events.push({
      type: "rune_channeled",
      player,
      runeId,
    });
  }

  return events;
}

// ---------------------------------------------------------------------------
// Exhaust a Rune — generate generic Energy
// ---------------------------------------------------------------------------

/**
 * Exhaust (tap) a Ready rune to generate 1 Energy.
 * The rune stays in the Rune Pool but is turned sideways.
 */
export function exhaustRune(
  state: GameState,
  player: PlayerId,
  runeId: CardInstanceId,
): { success: boolean; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  // Validate: rune must be in player's rune pool and Ready
  if (!playerState.runePool.includes(runeId)) {
    return { success: false, events };
  }

  const runeCard = state.cards.get(runeId);
  if (!runeCard || runeCard.exhausted) {
    return { success: false, events };
  }

  // Exhaust the rune
  runeCard.exhausted = true;
  playerState.currentEnergy += 1;

  events.push({
    type: "rune_exhausted",
    player,
    runeId,
    energyGenerated: 1,
  });

  return { success: true, events };
}

// ---------------------------------------------------------------------------
// Recycle a Rune — generate Domain Power
// ---------------------------------------------------------------------------

/**
 * Recycle a rune by returning it to the bottom of the Rune Deck.
 * Generates 1 Domain Power of the rune's domain color.
 * The rune can be exhausted OR ready — recycling works either way.
 */
export function recycleRune(
  state: GameState,
  player: PlayerId,
  runeId: CardInstanceId,
  cardDb: Map<string, CardDefinition>,
): { success: boolean; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  // Validate: rune must be in player's rune pool
  const runeIndex = playerState.runePool.indexOf(runeId);
  if (runeIndex === -1) {
    return { success: false, events };
  }

  const runeCard = state.cards.get(runeId);
  if (!runeCard) return { success: false, events };

  const runeDef = cardDb.get(runeCard.definitionId);
  if (!runeDef || runeDef.type !== CardType.Rune || runeDef.domains.length === 0) {
    return { success: false, events };
  }

  // Remove from rune pool
  playerState.runePool.splice(runeIndex, 1);

  // Return to bottom of rune deck
  playerState.runeDeck.push(runeId);

  // Reset rune state
  runeCard.exhausted = false;

  // Generate Domain Power
  const domain = runeDef.domains[0]; // Runes have exactly 1 domain
  addPower(playerState, domain, 1);

  events.push({
    type: "rune_recycled",
    player,
    runeId,
    powerGenerated: domain,
  });

  return { success: true, events };
}

// ---------------------------------------------------------------------------
// Cost Checking & Payment
// ---------------------------------------------------------------------------

/**
 * Check whether a player can afford to play a card with the given cost.
 * Does NOT actually pay the cost — use payCost() for that.
 */
export function canAfford(
  playerState: Readonly<PlayerState>,
  energyCost: number,
  powerCosts: DomainPowerCost[],
  allCards: ReadonlyMap<CardInstanceId, CardInstance>,
  cardDb: Map<string, CardDefinition>,
): boolean {
  // Count available energy (ready runes that could be exhausted)
  const readyRunes: CardInstance[] = [];
  for (const runeId of playerState.runePool) {
    const rune = allCards.get(runeId);
    if (rune && !rune.exhausted) {
      readyRunes.push(rune);
    }
  }

  // Count recyclable runes per domain (both ready and exhausted can be recycled)
  const recyclablePerDomain = new Map<Domain, number>();
  for (const runeId of playerState.runePool) {
    const rune = allCards.get(runeId);
    if (!rune) continue;
    const def = cardDb.get(rune.definitionId);
    if (!def) continue;
    const domain = def.domains[0];
    recyclablePerDomain.set(domain, (recyclablePerDomain.get(domain) ?? 0) + 1);
  }

  // Check Power costs first (more constrained)
  let runesNeededForPower = 0;
  for (const pc of powerCosts) {
    const available = (recyclablePerDomain.get(pc.domain) ?? 0) + getPowerAmount(playerState, pc.domain);
    if (available < pc.amount) return false;
    // Count how many runes need to be recycled (minus any already-generated power)
    const alreadyHave = getPowerAmount(playerState, pc.domain);
    runesNeededForPower += Math.max(0, pc.amount - alreadyHave);
  }

  // Check Energy cost
  const totalAvailableEnergy = playerState.currentEnergy + readyRunes.length;
  // But we can't double-count runes used for recycling that were ready
  // This is a simplification — full payment planning is done in payCost()
  const effectiveEnergy = playerState.currentEnergy + Math.max(0, readyRunes.length - runesNeededForPower);

  return effectiveEnergy >= energyCost;
}

/**
 * Get the amount of power a player currently has for a domain.
 */
function getPowerAmount(playerState: Readonly<PlayerState>, domain: Domain): number {
  for (const pc of playerState.currentPower) {
    if (pc.domain === domain) return pc.amount;
  }
  return 0;
}

/** Add power to a player's current pool. */
function addPower(playerState: PlayerState, domain: Domain, amount: number): void {
  const existing = playerState.currentPower.find(p => p.domain === domain);
  if (existing) {
    existing.amount += amount;
  } else {
    playerState.currentPower.push({ domain, amount });
  }
}

/**
 * Spend energy from the player's current pool.
 * Returns false if insufficient energy.
 */
export function spendEnergy(playerState: PlayerState, amount: number): boolean {
  if (playerState.currentEnergy < amount) return false;
  playerState.currentEnergy -= amount;
  return true;
}

/**
 * Spend domain power from the player's current pool.
 * Returns false if insufficient power.
 */
export function spendPower(playerState: PlayerState, domain: Domain, amount: number): boolean {
  const existing = playerState.currentPower.find(p => p.domain === domain);
  if (!existing || existing.amount < amount) return false;
  existing.amount -= amount;
  return true;
}

// ---------------------------------------------------------------------------
// Pool Reset
// ---------------------------------------------------------------------------

/**
 * Empty the player's Rune Pool of unspent Energy and Power.
 * Called at end of Channel Phase and end of Turn.
 */
export function emptyRunePool(playerState: PlayerState): void {
  playerState.currentEnergy = 0;
  playerState.currentPower = [];
}

