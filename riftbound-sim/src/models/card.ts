// ============================================================================
// Riftbound TCG — Card Data Model
// ============================================================================
// Defines every card type, domain, keyword, and property in the game.
// This is the canonical data schema — the card database, game engine, and UI
// all reference these types.
// ============================================================================

// ---------------------------------------------------------------------------
// Domains (colors/factions)
// ---------------------------------------------------------------------------

/** The six domains that define deck identity and card color. */
export enum Domain {
  Fury = "fury",       // Red — aggro, discard, reckless offense
  Calm = "calm",       // Green — defense, hold, movement tricks, reactions
  Mind = "mind",       // Blue — hidden, bluffing, removal, long game
  Body = "body",       // Orange — ramp, big units, raw combat power
  Chaos = "chaos",     // Purple — rule-breaking, trash interaction, unpredictable
  Order = "order",     // Yellow — structure, buffs, board control
}

// ---------------------------------------------------------------------------
// Card Types
// ---------------------------------------------------------------------------

export enum CardType {
  Legend = "legend",           // Champion Legend — defines deck, sits in Legend Zone
  Champion = "champion",       // Chosen Champion unit — starts in Champion Zone
  Unit = "unit",               // Permanent — fights at battlefields
  Spell = "spell",             // Consumable — one-time effect
  Gear = "gear",               // Permanent — sits in base, ongoing effect
  Rune = "rune",               // Resource card — generates Energy/Power
  Battlefield = "battlefield", // Location — fought over for points
}

/** Spells have timing restrictions. */
export enum SpellTiming {
  /** Can only be played on your turn when nothing is on the chain. */
  Normal = "normal",
  /** Can be played during Showdowns (combat). */
  Action = "action",
  /** Can respond to any spell or ability on the chain. */
  Reaction = "reaction",
}

// ---------------------------------------------------------------------------
// Card Rarities
// ---------------------------------------------------------------------------

export enum Rarity {
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  Epic = "epic",
  Legendary = "legendary",
}

// ---------------------------------------------------------------------------
// Keywords
// ---------------------------------------------------------------------------

/** Named keyword abilities that cards can have. */
export enum Keyword {
  /** Pay additional domain cost to have unit enter ready (not exhausted). */
  Accelerate = "accelerate",
  /** +X Might while this unit is an attacker. */
  Assault = "assault",
  /** Opponents must pay a rune to choose this unit with a spell or ability. */
  Deflect = "deflect",
  /** Unit can move between Battlefields (not just Base ↔ Battlefield). */
  Ganking = "ganking",
  /** Card can be played face-down to a Battlefield's Facedown Zone. */
  Hidden = "hidden",
  /** Effect only triggers if you've played another card this turn. */
  Legion = "legion",
  /** Survives the first time it would be killed (loses Shield instead). */
  Shield = "shield",
  /** Tied to a specific Legend. Max 3 Signature cards per deck. */
  Signature = "signature",
  /** Killed at start of controller's Beginning Phase, before scoring. */
  Temporary = "temporary",
}

// ---------------------------------------------------------------------------
// Costs
// ---------------------------------------------------------------------------

/** A cost that requires recycling a Rune of a specific Domain. */
export interface DomainPowerCost {
  domain: Domain;
  amount: number;
}

/**
 * Full cost to play a card.
 * - energyCost: generic cost paid by exhausting any Runes
 * - powerCosts: colored costs paid by recycling domain-matching Runes
 */
export interface CardCost {
  energyCost: number;
  powerCosts: DomainPowerCost[];
}

// ---------------------------------------------------------------------------
// Abilities
// ---------------------------------------------------------------------------

/** When an ability triggers. */
export enum TriggerType {
  /** Fires when this card enters the board. */
  OnPlay = "on_play",
  /** Fires when this card is destroyed / sent to trash. */
  OnDestroy = "on_destroy",
  /** Fires when the controller conquers a battlefield. */
  OnConquer = "on_conquer",
  /** Fires when this card moves to a battlefield. */
  OnMove = "on_move",
  /** Fires at the start of the controller's turn (Beginning Phase). */
  OnTurnStart = "on_turn_start",
  /** Fires at the end of the controller's turn. */
  OnTurnEnd = "on_turn_end",
  /** Fires when a Showdown begins at this card's location. */
  OnShowdownStart = "on_showdown_start",
  /** Fires when this unit deals combat damage. */
  OnDealDamage = "on_deal_damage",
  /** Fires when this unit takes damage. */
  OnTakeDamage = "on_take_damage",
  /** Fires when a card is drawn by the controller. */
  OnDraw = "on_draw",
  /** Fires when a rune is channeled. */
  OnChannel = "on_channel",
  /** Activated ability — player chooses to use it (may have a cost). */
  Activated = "activated",
  /** Static ability — always in effect while the card is on the board. */
  Static = "static",
  /** Battlefield-specific: fires when this battlefield is conquered. */
  OnBattlefieldConquered = "on_battlefield_conquered",
}

/** Target restriction for an ability. */
export enum TargetType {
  None = "none",
  Self = "self",
  AnyUnit = "any_unit",
  FriendlyUnit = "friendly_unit",
  EnemyUnit = "enemy_unit",
  AnyPlayer = "any_player",
  AnyBattlefield = "any_battlefield",
  CardInHand = "card_in_hand",
  CardInTrash = "card_in_trash",
  AnyRune = "any_rune",
}

/**
 * An ability definition on a card.
 * The `resolve` function is provided by the card's script (see AbilityScript).
 * For data-only serialization, use `effectDescriptor` instead.
 */
export interface AbilityDefinition {
  id: string;
  name: string;
  description: string;               // Rules text for this ability
  trigger: TriggerType;
  targetType: TargetType;
  targetCount?: number;               // How many targets (default 1)
  cost?: CardCost;                    // For activated abilities
  condition?: string;                 // Human-readable condition text
}

// ---------------------------------------------------------------------------
// Card Definition (Database Entry)
// ---------------------------------------------------------------------------

/**
 * A card as it exists in the database — immutable template data.
 * This is NOT a card instance in a game (see CardInstance in game-state.ts).
 */
export interface CardDefinition {
  /** Unique card ID, e.g. "origins-001" */
  id: string;

  /** Display name, e.g. "Jinx" */
  name: string;

  /** Optional subtitle, e.g. "The Loose Cannon" */
  subtitle?: string;

  /**
   * Full name for uniqueness rules (name + subtitle).
   * Deck construction limits 3 copies of any card by full name.
   */
  fullName: string;

  /** Which set this card belongs to. */
  set: CardSet;

  /** Card type determines zone placement and behavior. */
  type: CardType;

  /** Domain affiliation(s). Legends always have exactly 2. */
  domains: Domain[];

  /** Cost to play this card (not applicable to Legends, Battlefields, Runes). */
  cost: CardCost;

  /** Combat strength (Units and Champions only). */
  might?: number;

  /** Damage threshold before destruction (Units and Champions only). */
  health?: number;

  /** Named keyword abilities. */
  keywords: Keyword[];

  /** Abilities this card has (triggered, activated, static). */
  abilities: AbilityDefinition[];

  /** Spell timing (Spells only). */
  spellTiming?: SpellTiming;

  /** If Signature, which Legend ID this is tied to. */
  signatureLegend?: string;

  /** For Legends: which Champion card IDs are available as Chosen Champion. */
  championOptions?: string[];

  /** For Battlefields: ability text describing the conquer/hold effect. */
  battlefieldEffect?: string;

  /** Card rarity. */
  rarity: Rarity;

  /** Full rules text (oracle text). */
  rulesText: string;

  /** Flavor text. */
  flavorText?: string;

  /** URL or asset path to card art (empty string for proxy/placeholder). */
  artAsset: string;

  /** Official errata applied to this card. */
  errata?: string[];
}

// ---------------------------------------------------------------------------
// Card Sets
// ---------------------------------------------------------------------------

export enum CardSet {
  Origins = "origins",
  Spiritforged = "spiritforged",
  Unleashed = "unleashed",
  // Future sets added here
}

// ---------------------------------------------------------------------------
// Deck Construction Types
// ---------------------------------------------------------------------------

/** A complete deck ready for play. */
export interface DeckList {
  /** Display name for this deck. */
  name: string;

  /** The Champion Legend card ID. */
  legendId: string;

  /** The Chosen Champion card ID (must be one of the Legend's championOptions). */
  chosenChampionId: string;

  /** Main Deck card IDs (40+ cards, max 3 copies of any fullName). */
  mainDeckIds: string[];

  /** Rune Deck card IDs (exactly 12, must match Legend's domains). */
  runeDeckIds: string[];

  /** Battlefield card IDs (exactly 3). */
  battlefieldIds: string[];

  /** Sideboard card IDs (exactly 0 or 8). */
  sideboardIds: string[];
}

/** Result of validating a DeckList against construction rules. */
export interface DeckValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ---------------------------------------------------------------------------
// Helper Types
// ---------------------------------------------------------------------------

/**
 * A card instance ID — unique within a single game.
 * Format: `{cardDefinitionId}#{instanceIndex}` e.g. "origins-042#1"
 * This distinguishes between multiple copies of the same card.
 */
export type CardInstanceId = string;

/** Player identifier within a game. */
export type PlayerId = "player1" | "player2" | "player3" | "player4";
