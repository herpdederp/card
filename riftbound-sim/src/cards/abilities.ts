// ============================================================================
// Riftbound TCG — Ability Scripting System
// ============================================================================
// Defines how card abilities are executed by the game engine.
// Uses a hybrid approach: a DSL for common effects + full script callbacks
// for complex/unique cards.
// ============================================================================

import type { GameState, CardInstance, GameEvent } from "../models/game-state.js";
import type { CardInstanceId, PlayerId, Domain, AbilityDefinition } from "../models/card.js";

// ---------------------------------------------------------------------------
// Effect Primitives — the DSL building blocks
// ---------------------------------------------------------------------------

/**
 * Simple effect descriptors that cover ~70% of card abilities.
 * The engine interprets these directly without needing custom scripts.
 */
export type EffectDescriptor =
  | { type: "draw_cards"; player: "controller" | "opponent" | "target_player"; amount: number }
  | { type: "deal_damage"; amount: number; target: "target" | "all_enemy_units" | "all_units" }
  | { type: "heal"; amount: number; target: "self" | "target" }
  | { type: "buff_might"; amount: number; target: "self" | "target" | "all_friendly_units"; duration: "permanent" | "end_of_turn" }
  | { type: "buff_health"; amount: number; target: "self" | "target" | "all_friendly_units"; duration: "permanent" | "end_of_turn" }
  | { type: "exhaust_target"; target: "target" }
  | { type: "ready_target"; target: "self" | "target" }
  | { type: "bounce_to_hand"; target: "target" | "self" }
  | { type: "destroy_target"; target: "target" }
  | { type: "move_unit"; target: "self" | "target"; destination: "base" | "any_battlefield" }
  | { type: "channel_extra_runes"; amount: number }
  | { type: "generate_energy"; amount: number }
  | { type: "generate_power"; domain: Domain; amount: number }
  | { type: "create_token"; tokenDefId: string; count: number; location: "base" | "battlefield" }
  | { type: "discard_cards"; player: "controller" | "opponent"; amount: number; random: boolean }
  | { type: "search_deck"; filter: string; count: number } // simplified — scripts handle complex filters
  | { type: "recycle_from_trash"; filter: string }
  | { type: "grant_keyword"; keyword: string; target: "self" | "target"; duration: "permanent" | "end_of_turn" }
  | { type: "prevent_damage"; amount: number; target: "self" | "target" }
  | { type: "conditional"; condition: ConditionDescriptor; then: EffectDescriptor; else?: EffectDescriptor };

/** Condition checks for conditional effects. */
export type ConditionDescriptor =
  | { type: "controller_has_units_at"; battlefieldId?: "any" | string; count: number; comparison: ">=" | "<=" | "==" }
  | { type: "opponent_controls_battlefield"; battlefieldId?: "any" }
  | { type: "card_in_zone"; zone: string; filter?: string }
  | { type: "score_comparison"; player: "controller" | "opponent"; comparison: ">=" | "<=" | "=="; value: number }
  | { type: "turn_number"; comparison: ">=" | "<="; value: number }
  | { type: "rune_count"; player: "controller"; comparison: ">=" | "<="; value: number };

// ---------------------------------------------------------------------------
// Full Script Callbacks — for complex/unique cards
// ---------------------------------------------------------------------------

/**
 * A script that provides custom logic for a card ability.
 * Used when the DSL isn't expressive enough.
 */
export interface AbilityScript {
  /** The ability definition this script implements. */
  abilityId: string;

  /**
   * Check whether this ability can currently be activated/triggered.
   * Return false to prevent it from going on the chain.
   */
  canActivate?: (state: GameState, source: CardInstance, controller: PlayerId) => boolean;

  /**
   * Resolve the ability effect. Mutates game state and returns events.
   * MUST be deterministic — same inputs always produce same outputs.
   */
  resolve: (
    state: GameState,
    source: CardInstance,
    controller: PlayerId,
    targets: CardInstanceId[],
    params: Record<string, unknown>,
  ) => GameEvent[];

  /**
   * For targeted abilities: generate the list of valid targets.
   */
  getValidTargets?: (state: GameState, source: CardInstance, controller: PlayerId) => CardInstanceId[];
}

// ---------------------------------------------------------------------------
// Card Script — the complete behavior definition for a card
// ---------------------------------------------------------------------------

/**
 * The full script bundle for a card. Contains either DSL descriptors,
 * full script callbacks, or both. Each ability on the card can independently
 * use either approach.
 */
export interface CardScript {
  /** The card definition ID this script is for. */
  cardDefId: string;

  /**
   * Map of abilityId → implementation.
   * Each ability can be either a simple DSL descriptor or a full script.
   */
  abilities: Map<string, AbilityImplementation>;

  /**
   * Optional: Custom logic that runs when this card enters any zone.
   * Useful for cards with continuous/static effects.
   */
  onZoneChange?: (
    state: GameState,
    card: CardInstance,
    fromZone: string,
    toZone: string,
  ) => GameEvent[];
}

/** An ability implementation — either a DSL descriptor list or a full script. */
export type AbilityImplementation =
  | { mode: "dsl"; effects: EffectDescriptor[] }
  | { mode: "script"; script: AbilityScript };

// ---------------------------------------------------------------------------
// Script Registry
// ---------------------------------------------------------------------------

/** Global registry of card scripts, keyed by cardDefId. */
export class CardScriptRegistry {
  private scripts = new Map<string, CardScript>();

  register(script: CardScript): void {
    this.scripts.set(script.cardDefId, script);
  }

  get(cardDefId: string): CardScript | undefined {
    return this.scripts.get(cardDefId);
  }

  has(cardDefId: string): boolean {
    return this.scripts.has(cardDefId);
  }

  /** Get all registered card IDs (for validation). */
  registeredIds(): string[] {
    return Array.from(this.scripts.keys());
  }
}
