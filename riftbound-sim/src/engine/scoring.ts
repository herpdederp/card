// ============================================================================
// Riftbound TCG — Scoring System
// ============================================================================
// Handles point scoring from Holding and Conquering battlefields,
// including the critical Final Point Rule.
// ============================================================================

import type {
  GameState,
  BattlefieldState,
  PlayerState,
  GameEvent,
} from "../models/game-state.js";
import type { PlayerId, CardInstanceId } from "../models/card.js";

// ---------------------------------------------------------------------------
// Hold Scoring (Beginning Phase)
// ---------------------------------------------------------------------------

/**
 * Score points for each battlefield the active player holds.
 * A player "holds" a battlefield if they have unit(s) there and no opponent does.
 * Called during the Beginning (B) phase.
 *
 * Returns events for each point scored.
 */
export function scoreHoldPoints(
  state: GameState,
  player: PlayerId,
): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  for (const bf of state.battlefields) {
    if (bf.controller === player) {
      const playerUnits = bf.units.get(player) ?? [];
      if (playerUnits.length > 0) {
        const oldScore = playerState.score;
        const newScore = oldScore + 1;

        // Check if this would be the winning point
        if (newScore >= state.config.winTarget) {
          // Hold scoring doesn't have the Final Point restriction —
          // you CAN win by holding. The Final Point Rule only restricts
          // winning via Conquer.
          playerState.score = newScore;
          events.push({
            type: "score_changed",
            player,
            oldScore,
            newScore,
            reason: "hold",
          });
        } else {
          playerState.score = newScore;
          events.push({
            type: "score_changed",
            player,
            oldScore,
            newScore,
            reason: "hold",
          });
        }
      }
    }
  }

  return events;
}

// ---------------------------------------------------------------------------
// Conquer Scoring (after winning a Showdown)
// ---------------------------------------------------------------------------

/**
 * Attempt to score a conquer point after winning combat at a battlefield.
 *
 * FINAL POINT RULE: You cannot score your winning point (e.g., 8th point)
 * from conquering UNLESS you also scored from every other battlefield that
 * same turn. In practice, this means:
 * - If you're at winTarget-1 and conquer a battlefield, you only get the
 *   point if you've also held/conquered every other battlefield this turn.
 * - Most winning points come from Holding, not Conquering.
 *
 * If the conquer doesn't win the game, the conquering player draws a card.
 *
 * Returns: whether the point was actually scored, plus events.
 */
export function scoreConquerPoint(
  state: GameState,
  player: PlayerId,
  conqueredBattlefieldId: CardInstanceId,
): { scored: boolean; events: GameEvent[] } {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  // Mark this battlefield as conquered this turn
  const bf = state.battlefields.find(b => b.cardInstanceId === conqueredBattlefieldId);
  if (!bf) return { scored: false, events };

  bf.conqueredThisTurn = true;
  bf.conqueredBy = player;
  bf.controller = player;

  events.push({
    type: "battlefield_conquered",
    battlefieldId: conqueredBattlefieldId,
    conqueror: player,
  });

  const oldScore = playerState.score;
  const newScore = oldScore + 1;

  // Would this be the winning point?
  if (newScore >= state.config.winTarget) {
    // FINAL POINT RULE CHECK
    if (canScoreFinalPointViaConquer(state, player, conqueredBattlefieldId)) {
      playerState.score = newScore;
      events.push({
        type: "score_changed",
        player,
        oldScore,
        newScore,
        reason: "conquer",
      });
      return { scored: true, events };
    } else {
      // Can't win via conquer right now — draw a card instead as conquer bonus
      events.push(...drawConquerBonus(state, player));
      return { scored: false, events };
    }
  }

  // Not the winning point — score it and draw a bonus card
  playerState.score = newScore;
  events.push({
    type: "score_changed",
    player,
    oldScore,
    newScore,
    reason: "conquer",
  });

  // Conquer bonus: draw a card (only when conquering doesn't win the game)
  events.push(...drawConquerBonus(state, player));

  return { scored: true, events };
}

/**
 * Check whether a player can score their final point via conquering.
 *
 * The rule: You can only score your winning point from conquering if you
 * ALSO scored from every other battlefield that same turn.
 *
 * "Every other battlefield" = all battlefields in the game except the one
 * being conquered. The player must have scored from each of those (either
 * by holding them at the start of this turn or conquering them this turn).
 */
function canScoreFinalPointViaConquer(
  state: GameState,
  player: PlayerId,
  conqueredBattlefieldId: CardInstanceId,
): boolean {
  for (const bf of state.battlefields) {
    if (bf.cardInstanceId === conqueredBattlefieldId) continue;

    // Did the player score from this battlefield this turn?
    // Either: they held it (controller at start of turn with units)
    // Or: they conquered it this turn
    const heldAtTurnStart = bf.controller === player && !bf.conqueredThisTurn;
    const conqueredThisTurn = bf.conqueredThisTurn && bf.conqueredBy === player;

    if (!heldAtTurnStart && !conqueredThisTurn) {
      // There's a battlefield the player didn't score from this turn
      return false;
    }
  }

  return true;
}

/**
 * Draw a card as the conquer bonus.
 * Each non-winning conquer draws 1 card.
 */
function drawConquerBonus(state: GameState, player: PlayerId): GameEvent[] {
  const events: GameEvent[] = [];
  const playerState = state.players.get(player)!;

  if (playerState.mainDeck.length > 0) {
    const drawnCardId = playerState.mainDeck.shift()!;
    playerState.hand.push(drawnCardId);
    events.push({ type: "card_drawn", player, cardInstanceId: drawnCardId });
  }

  return events;
}

// ---------------------------------------------------------------------------
// Win Check
// ---------------------------------------------------------------------------

/**
 * Check if any player has won the game.
 * Returns the winner's PlayerId or null.
 */
export function checkWinCondition(state: GameState): PlayerId | null {
  for (const [playerId, playerState] of state.players) {
    if (playerState.score >= state.config.winTarget) {
      return playerId;
    }
  }
  return null;
}

/**
 * Reset per-turn conquer tracking on all battlefields.
 * Called at the start of each player's turn.
 */
export function resetConquerTracking(state: GameState): void {
  for (const bf of state.battlefields) {
    bf.conqueredThisTurn = false;
    bf.conqueredBy = null;
  }
}
