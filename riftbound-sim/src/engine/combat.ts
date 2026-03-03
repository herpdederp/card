// ============================================================================
// Riftbound TCG — Combat System (Showdowns)
// ============================================================================
// When units move to a Battlefield controlled by an opponent, a Showdown
// begins. Units deal damage equal to their Might simultaneously.
// The survivor(s) claim the battlefield.
// ============================================================================

import type {
  GameState,
  BattlefieldState,
  CardInstance,
  GameEvent,
  StatModifier,
} from "../models/game-state.js";
import type { PlayerId, CardInstanceId, CardDefinition } from "../models/card.js";
import { Keyword } from "../models/card.js";
import { TurnPhase } from "../models/game-state.js";
import { scoreConquerPoint } from "./scoring.js";

// ---------------------------------------------------------------------------
// Showdown Initiation
// ---------------------------------------------------------------------------

/**
 * Begin a Showdown at a battlefield.
 * Called when a player moves units to a battlefield that has opposing units.
 *
 * This enters the Showdown phase, during which:
 * - Only Action and Reaction spells/abilities can be played
 * - Priority passes between players for responses
 * - Once both players pass on an empty chain, combat resolves
 */
export function initiateShowdown(
  state: GameState,
  battlefieldId: CardInstanceId,
  attacker: PlayerId,
): GameEvent[] {
  const events: GameEvent[] = [];

  state.turn.phase = TurnPhase.Showdown;
  state.turn.showdownBattlefield = battlefieldId;

  events.push({
    type: "showdown_started",
    battlefieldId,
    attacker,
  });
  events.push({ type: "phase_changed", phase: TurnPhase.Showdown });

  return events;
}

// ---------------------------------------------------------------------------
// Combat Resolution
// ---------------------------------------------------------------------------

/**
 * Resolve combat at a battlefield after both players have passed priority.
 *
 * Combat is simultaneous:
 * 1. Each unit deals damage equal to its effective Might
 * 2. Damage is distributed across opposing units (attacker chooses order)
 * 3. Units with damage >= health are destroyed (sent to Trash)
 * 4. If only one player has surviving units, they Conquer the battlefield
 *
 * For simplicity in this initial implementation, damage is dealt
 * proportionally / spread across all opposing units evenly, then
 * each unit with damage >= health is destroyed.
 */
export function resolveCombat(
  state: GameState,
  battlefieldId: CardInstanceId,
  attacker: PlayerId,
  cardDb: Map<string, CardDefinition>,
): GameEvent[] {
  const events: GameEvent[] = [];
  const bf = state.battlefields.find(b => b.cardInstanceId === battlefieldId);
  if (!bf) return events;

  // Gather combatants per player
  const combatants = new Map<PlayerId, CombatUnit[]>();

  for (const [playerId, unitIds] of bf.units) {
    const units: CombatUnit[] = [];
    for (const unitId of unitIds) {
      const card = state.cards.get(unitId);
      if (!card) continue;
      const def = cardDb.get(card.definitionId);
      if (!def) continue;

      units.push({
        instanceId: unitId,
        card,
        might: getEffectiveMight(card, def),
        health: getEffectiveHealth(card, def),
        currentDamage: card.damage,
      });
    }
    if (units.length > 0) {
      combatants.set(playerId, units);
    }
  }

  // If only one side has units, no combat needed — they already control it
  if (combatants.size <= 1) {
    return finishShowdown(state, bf, attacker, events);
  }

  // Simultaneous damage: calculate all damage first, then apply at once.
  // Each side's total Might is distributed evenly across opposing units.
  // Damage is calculated from the pre-combat state (no kills mid-resolution).
  const damageAssignments: Array<{ target: CombatUnit; amount: number; sourceId: CardInstanceId }> = [];

  for (const [playerId, units] of combatants) {
    const totalMight = units.reduce((sum, u) => sum + u.might, 0);
    const sourceId = units[0].instanceId;

    for (const [opponentId, opponentUnits] of combatants) {
      if (opponentId === playerId) continue;

      // Distribute damage evenly across all opposing units
      const perUnit = Math.floor(totalMight / opponentUnits.length);
      let remainder = totalMight % opponentUnits.length;

      for (const target of opponentUnits) {
        const amount = perUnit + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
        if (amount > 0) {
          damageAssignments.push({ target, amount, sourceId });
        }
      }
    }
  }

  // Apply all damage simultaneously
  for (const { target, amount, sourceId } of damageAssignments) {
    target.currentDamage += amount;
    target.card.damage += amount;
    events.push({
      type: "combat_damage",
      sourceId,
      targetId: target.instanceId,
      amount,
    });
  }

  // Destroy units with damage >= health
  for (const [playerId, units] of combatants) {
    for (const unit of units) {
      if (unit.currentDamage >= unit.health) {
        destroyUnit(state, bf, playerId, unit.instanceId);
        events.push({ type: "card_destroyed", cardInstanceId: unit.instanceId });
      }
    }
  }

  return finishShowdown(state, bf, attacker, events);
}

/**
 * Finish a showdown — determine battlefield control and score.
 */
function finishShowdown(
  state: GameState,
  bf: BattlefieldState,
  attacker: PlayerId,
  events: GameEvent[],
): GameEvent[] {
  // Determine who controls the battlefield after combat
  let survivingPlayers: PlayerId[] = [];
  for (const [playerId, unitIds] of bf.units) {
    if (unitIds.length > 0) {
      survivingPlayers.push(playerId);
    }
  }

  if (survivingPlayers.length === 1) {
    const newController = survivingPlayers[0];
    const previousController = bf.controller;

    if (previousController !== newController) {
      // Conquer!
      const { scored, events: conquerEvents } = scoreConquerPoint(
        state,
        newController,
        bf.cardInstanceId,
      );
      events.push(...conquerEvents);
    }

    bf.controller = newController;
  } else if (survivingPlayers.length === 0) {
    // All units destroyed — battlefield is uncontrolled
    bf.controller = null;
  }
  // If multiple players have survivors (FFA), battlefield remains contested

  // Return to Action phase
  state.turn.phase = TurnPhase.Action;
  state.turn.showdownBattlefield = undefined;
  events.push({ type: "phase_changed", phase: TurnPhase.Action });

  return events;
}

// ---------------------------------------------------------------------------
// Unit Movement (triggers Showdowns)
// ---------------------------------------------------------------------------

/**
 * Move units from their current location to a battlefield.
 * If the battlefield has opposing units, a Showdown begins.
 * If uncontested, the mover takes control immediately.
 *
 * Units can move from:
 * - Base → Battlefield (always)
 * - Battlefield → Battlefield (only with Ganking keyword)
 *
 * Moving units must be Ready and become Exhausted.
 */
export function moveUnits(
  state: GameState,
  player: PlayerId,
  unitIds: CardInstanceId[],
  battlefieldId: CardInstanceId,
  cardDb: Map<string, CardDefinition>,
): { showdownTriggered: boolean; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;
  const bf = state.battlefields.find(b => b.cardInstanceId === battlefieldId);
  if (!bf) return { showdownTriggered: false, events };

  const movedUnitIds: CardInstanceId[] = [];

  for (const unitId of unitIds) {
    const card = state.cards.get(unitId);
    if (!card || card.exhausted) continue;

    // Remove from current location
    let removed = false;

    // Try Base first
    const baseIdx = playerState.base.indexOf(unitId);
    if (baseIdx !== -1) {
      playerState.base.splice(baseIdx, 1);
      removed = true;
    }

    // Try other battlefields (requires Ganking)
    if (!removed) {
      const def = cardDb.get(card.definitionId);
      const hasGanking = def?.keywords.includes(Keyword.Ganking)
        || card.grantedKeywords.includes("ganking");

      if (!hasGanking) continue; // Can't move between battlefields without Ganking

      for (const otherBf of state.battlefields) {
        if (otherBf.cardInstanceId === battlefieldId) continue;
        const otherUnits = otherBf.units.get(player);
        if (otherUnits) {
          const idx = otherUnits.indexOf(unitId);
          if (idx !== -1) {
            otherUnits.splice(idx, 1);
            removed = true;
            break;
          }
        }
      }
    }

    if (!removed) continue;

    // Place at destination battlefield
    if (!bf.units.has(player)) {
      bf.units.set(player, []);
    }
    bf.units.get(player)!.push(unitId);

    // Exhaust the unit
    card.exhausted = true;

    movedUnitIds.push(unitId);
  }

  if (movedUnitIds.length === 0) {
    return { showdownTriggered: false, events };
  }

  events.push({
    type: "units_moved",
    player,
    unitIds: movedUnitIds,
    destination: battlefieldId,
  });

  // Check if this triggers a Showdown
  const hasOpposingUnits = Array.from(bf.units.entries()).some(
    ([pid, units]) => pid !== player && units.length > 0,
  );

  if (hasOpposingUnits) {
    events.push(...initiateShowdown(state, battlefieldId, player));
    return { showdownTriggered: true, events };
  }

  // No opposition — take control immediately (Conquer if previously enemy-held)
  const previousController = bf.controller;
  if (previousController !== player) {
    if (previousController !== null) {
      // Was controlled by opponent — this is a Conquer
      const { events: conquerEvents } = scoreConquerPoint(state, player, bf.cardInstanceId);
      events.push(...conquerEvents);
    }
    bf.controller = player;
  }

  return { showdownTriggered: false, events };
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

interface CombatUnit {
  instanceId: CardInstanceId;
  card: CardInstance;
  might: number;
  health: number;
  currentDamage: number;
}

/** Get a unit's effective Might (base + modifiers). */
export function getEffectiveMight(card: CardInstance, def: CardDefinition): number {
  const base = def.might ?? 0;
  const bonus = card.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
  return Math.max(0, base + bonus);
}

/** Get a unit's effective Health (base + modifiers). */
export function getEffectiveHealth(card: CardInstance, def: CardDefinition): number {
  const base = def.health ?? 0;
  const bonus = card.modifiers.reduce((sum, m) => sum + m.healthDelta, 0);
  return Math.max(1, base + bonus); // Minimum 1 health
}

/** Destroy a unit — remove from battlefield, send to trash. */
function destroyUnit(
  state: GameState,
  bf: BattlefieldState,
  owner: PlayerId,
  unitId: CardInstanceId,
): void {
  // Remove from battlefield
  const units = bf.units.get(owner);
  if (units) {
    const idx = units.indexOf(unitId);
    if (idx !== -1) units.splice(idx, 1);
  }

  // Send to trash
  const ownerState = state.players.get(owner)!;
  ownerState.trash.push(unitId);

  // Clear modifiers
  const card = state.cards.get(unitId);
  if (card) {
    card.modifiers = [];
    card.damage = 0;
    card.exhausted = false;
    card.grantedKeywords = [];
  }
}

/**
 * Destroy any card — find it wherever it is, remove, send to trash.
 * Used by the effects system for "destroy target" effects.
 * Returns a card_destroyed event if successful.
 */
export function destroyCard(
  state: GameState,
  cardId: CardInstanceId,
): GameEvent[] {
  const card = state.cards.get(cardId);
  if (!card) return [];

  const owner = card.owner;
  const ownerState = state.players.get(owner)!;

  // Remove from base
  const baseIdx = ownerState.base.indexOf(cardId);
  if (baseIdx !== -1) ownerState.base.splice(baseIdx, 1);

  // Remove from hand
  const handIdx = ownerState.hand.indexOf(cardId);
  if (handIdx !== -1) ownerState.hand.splice(handIdx, 1);

  // Remove from battlefields
  for (const bf of state.battlefields) {
    for (const [playerId, unitIds] of bf.units) {
      const idx = unitIds.indexOf(cardId);
      if (idx !== -1) unitIds.splice(idx, 1);
    }
  }

  // Send to trash (if not already there)
  if (!ownerState.trash.includes(cardId)) {
    ownerState.trash.push(cardId);
  }

  // Clear modifiers
  card.modifiers = [];
  card.damage = 0;
  card.exhausted = false;
  card.grantedKeywords = [];

  return [{ type: "card_destroyed", cardInstanceId: cardId }];
}
