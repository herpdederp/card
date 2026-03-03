// ============================================================================
// Riftbound TCG — Game State Model
// ============================================================================
// The single source of truth for a game in progress. The engine operates on
// this state, and the UI renders from it. For P2P multiplayer, both clients
// maintain identical copies of this state (deterministic simulation).
// ============================================================================

import {
  type CardDefinition,
  type CardInstanceId,
  type PlayerId,
  type DomainPowerCost,
  Domain,
  CardType,
} from "./card.js";

// ---------------------------------------------------------------------------
// Card Instance (a card within a game)
// ---------------------------------------------------------------------------

/**
 * A card as it exists during a game — wraps the immutable CardDefinition
 * with mutable game state (damage, buffs, zone, etc.).
 */
export interface CardInstance {
  /** Unique instance ID within this game. */
  instanceId: CardInstanceId;

  /** Reference to the immutable card template. */
  definitionId: string;

  /** The player who brought this card into the game. */
  owner: PlayerId;

  /** The player currently controlling this card (usually same as owner). */
  controller: PlayerId;

  /** Whether this card is Ready (upright) or Exhausted (sideways). */
  exhausted: boolean;

  /** Accumulated damage on this card (Units/Champions only). */
  damage: number;

  /** Temporary stat modifications (buffs/debuffs) active this turn or longer. */
  modifiers: StatModifier[];

  /** If true, this card is face-down (Hidden mechanic). */
  faceDown: boolean;

  /** Additional keywords granted by other effects. */
  grantedKeywords: string[];

  /** Attached Gear/buff card instance IDs. */
  attachments: CardInstanceId[];

  /** Turn number this card entered the board (for summoning sickness if needed). */
  turnPlayed?: number;
}

/** A temporary or permanent stat modification on a card. */
export interface StatModifier {
  id: string;
  source: CardInstanceId;        // What granted this modifier
  mightDelta: number;            // +/- to Might
  healthDelta: number;           // +/- to Health
  duration: "permanent" | "end_of_turn" | "end_of_combat";
  grantedKeywords?: string[];    // Keywords added by this modifier
}

// ---------------------------------------------------------------------------
// Zones — Where cards live during a game
// ---------------------------------------------------------------------------

/**
 * Named zones in the game. Each card exists in exactly one zone at a time.
 * The zone determines privacy rules and what actions can be taken on the card.
 */
export enum Zone {
  MainDeck = "main_deck",        // Secret — face-down draw pile
  RuneDeck = "rune_deck",        // Secret — face-down rune pile
  Hand = "hand",                 // Private — only owner can see
  Base = "base",                 // Public — units and gear deployed here
  RunePool = "rune_pool",        // Public — channeled runes
  Trash = "trash",               // Public — discard pile
  ChampionZone = "champion_zone",// Public — chosen champion sits here until played
  LegendZone = "legend_zone",    // Public — legend card always visible
  BattlefieldUnits = "battlefield_units", // Public — units stationed at a battlefield
  FacedownZone = "facedown_zone",// Private (controller) — hidden cards at a battlefield
  Banishment = "banishment",     // Public — removed from game
  Chain = "chain",               // Public — spells/abilities being resolved
}

// ---------------------------------------------------------------------------
// Battlefield
// ---------------------------------------------------------------------------

/** A Battlefield location on the board. */
export interface BattlefieldState {
  /** The battlefield card instance. */
  cardInstanceId: CardInstanceId;

  /** Which player currently controls this battlefield (has units here), or null. */
  controller: PlayerId | null;

  /** Units stationed at this battlefield, keyed by controlling player. */
  units: Map<PlayerId, CardInstanceId[]>;

  /** Face-down cards in this battlefield's Facedown Zone, keyed by controller. */
  facedownCards: Map<PlayerId, CardInstanceId[]>;

  /** Whether this battlefield was conquered this turn (for scoring logic). */
  conqueredThisTurn: boolean;

  /** Which player conquered it this turn (if any). */
  conqueredBy: PlayerId | null;
}

// ---------------------------------------------------------------------------
// Player State
// ---------------------------------------------------------------------------

export interface PlayerState {
  id: PlayerId;

  /** The player's Champion Legend (always in Legend Zone). */
  legendInstanceId: CardInstanceId;

  /** The Chosen Champion (starts in Champion Zone, can be played to board). */
  chosenChampionInstanceId: CardInstanceId;

  /** Whether the Chosen Champion has been played from Champion Zone. */
  chosenChampionPlayed: boolean;

  // -- Zone contents (ordered where order matters) --

  /** Main Deck — ordered, index 0 = top of deck. */
  mainDeck: CardInstanceId[];

  /** Rune Deck — ordered, index 0 = top of deck. */
  runeDeck: CardInstanceId[];

  /** Hand — unordered for game purposes, but maintain insertion order. */
  hand: CardInstanceId[];

  /** Base — units and gear deployed here. */
  base: CardInstanceId[];

  /** Rune Pool — channeled runes available for use. */
  runePool: CardInstanceId[];

  /** Trash — discard pile, unordered (public info). */
  trash: CardInstanceId[];

  /** Banishment — removed from game. */
  banishment: CardInstanceId[];

  // -- Resources --

  /** Current Energy available (generated by exhausting Runes). Resets each phase. */
  currentEnergy: number;

  /** Current Domain Power available (generated by recycling Runes). */
  currentPower: DomainPowerCost[];

  // -- Scoring --

  /** Current score (race to 8, or 11 in 2v2). */
  score: number;

  /** Battlefields this player contributed to the game. */
  ownedBattlefieldIds: CardInstanceId[];
}

// ---------------------------------------------------------------------------
// Chain (Resolution Stack)
// ---------------------------------------------------------------------------

/** An entry on the resolution chain (like Magic's stack). */
export interface ChainEntry {
  /** Unique ID for this chain entry. */
  id: string;

  /** The card or ability that created this entry. */
  sourceInstanceId: CardInstanceId;

  /** The player who put this on the chain. */
  controller: PlayerId;

  /** Which ability on the source card to resolve. */
  abilityId: string;

  /** Chosen targets (if any). */
  targets: CardInstanceId[];

  /** Additional parameters for the effect. */
  params: Record<string, unknown>;

  /** Whether this entry was cancelled (e.g. by a counter spell). */
  cancelled: boolean;
}

// ---------------------------------------------------------------------------
// Turn State
// ---------------------------------------------------------------------------

export enum TurnPhase {
  /** Pre-game setup — choosing battlefields, mulligan. */
  Setup = "setup",
  /** A — Awaken: ready all exhausted cards. */
  Awaken = "awaken",
  /** B — Beginning: score points for held battlefields. */
  Beginning = "beginning",
  /** C — Channel: draw 2 runes (or 3 for second player's first turn). */
  Channel = "channel",
  /** D — Draw: draw 1 card from main deck. */
  Draw = "draw",
  /** Main phase — play cards, move units, activate abilities. */
  Action = "action",
  /** Showdown in progress — tight timing window for Actions/Reactions. */
  Showdown = "showdown",
  /** Turn ended, transitioning to next player. */
  Done = "done",
  /** Game is over. */
  GameOver = "game_over",
}

export interface TurnState {
  /** Which player's turn it currently is. */
  activePlayer: PlayerId;

  /** Current phase within the turn. */
  phase: TurnPhase;

  /** Global turn counter (increments each time the active player changes). */
  turnNumber: number;

  /** Which player has priority to act (for chain resolution). */
  priorityPlayer: PlayerId;

  /** Whether the active player has passed priority on an empty chain. */
  passed: boolean;

  /** If in Showdown phase, which battlefield the showdown is at. */
  showdownBattlefield?: CardInstanceId;

  /** Action log for this turn (for replay and desync detection). */
  actionsThisTurn: GameAction[];

  /** Players who have submitted their mulligan decision. */
  mulliganSubmitted: PlayerId[];
}

// ---------------------------------------------------------------------------
// Game Configuration
// ---------------------------------------------------------------------------

export enum GameMode {
  Standard1v1 = "standard_1v1",
  BestOf3 = "best_of_3",
  FFASkirmish = "ffa_skirmish",
  FFAWar = "ffa_war",
  TwoVTwo = "2v2",
  Practice = "practice",           // vs Bot
}

export interface GameConfig {
  mode: GameMode;
  /** Number of players (2, 3, or 4). */
  playerCount: 2 | 3 | 4;
  /** Points needed to win. */
  winTarget: number;                // 8 for most modes, 11 for 2v2
  /** Turn time limit in seconds (0 = unlimited). */
  turnTimerSeconds: number;
  /** For Practice mode: bot difficulty (1-4). */
  botDifficulty?: 1 | 2 | 3 | 4;
}

// ---------------------------------------------------------------------------
// Game Actions (the things players can do)
// ---------------------------------------------------------------------------

export type GameAction =
  | { type: "play_card"; player: PlayerId; cardInstanceId: CardInstanceId; targets?: CardInstanceId[] }
  | { type: "move_units"; player: PlayerId; unitIds: CardInstanceId[]; destination: CardInstanceId }
  | { type: "exhaust_rune"; player: PlayerId; runeId: CardInstanceId }
  | { type: "recycle_rune"; player: PlayerId; runeId: CardInstanceId }
  | { type: "activate_ability"; player: PlayerId; sourceId: CardInstanceId; abilityId: string; targets?: CardInstanceId[] }
  | { type: "pass_priority"; player: PlayerId }
  | { type: "declare_done"; player: PlayerId }
  | { type: "mulligan"; player: PlayerId; returnCardIds: CardInstanceId[] }
  | { type: "choose_battlefield"; player: PlayerId; battlefieldId: CardInstanceId }
  | { type: "concede"; player: PlayerId };

// ---------------------------------------------------------------------------
// Game Events (emitted by the engine for UI/logging)
// ---------------------------------------------------------------------------

export type GameEvent =
  | { type: "game_started"; config: GameConfig }
  | { type: "turn_started"; player: PlayerId; turnNumber: number }
  | { type: "phase_changed"; phase: TurnPhase }
  | { type: "card_drawn"; player: PlayerId; cardInstanceId: CardInstanceId }
  | { type: "rune_channeled"; player: PlayerId; runeId: CardInstanceId }
  | { type: "card_played"; player: PlayerId; cardInstanceId: CardInstanceId; zone: Zone }
  | { type: "units_moved"; player: PlayerId; unitIds: CardInstanceId[]; destination: CardInstanceId }
  | { type: "showdown_started"; battlefieldId: CardInstanceId; attacker: PlayerId }
  | { type: "combat_damage"; sourceId: CardInstanceId; targetId: CardInstanceId; amount: number }
  | { type: "card_destroyed"; cardInstanceId: CardInstanceId }
  | { type: "battlefield_conquered"; battlefieldId: CardInstanceId; conqueror: PlayerId }
  | { type: "score_changed"; player: PlayerId; oldScore: number; newScore: number; reason: "hold" | "conquer" }
  | { type: "rune_exhausted"; player: PlayerId; runeId: CardInstanceId; energyGenerated: number }
  | { type: "rune_recycled"; player: PlayerId; runeId: CardInstanceId; powerGenerated: Domain }
  | { type: "chain_entry_added"; entry: ChainEntry }
  | { type: "chain_entry_resolved"; entryId: string }
  | { type: "ability_triggered"; sourceId: CardInstanceId; abilityId: string }
  | { type: "effect_damage"; sourceId: CardInstanceId; targetId: CardInstanceId; amount: number }
  | { type: "card_countered"; entryId: string; counteredBy: CardInstanceId }
  | { type: "token_created"; instanceId: CardInstanceId; owner: PlayerId }
  | { type: "game_over"; winner: PlayerId | null; reason: string };

// ---------------------------------------------------------------------------
// The Complete Game State
// ---------------------------------------------------------------------------

/**
 * The full game state. This is the single source of truth.
 *
 * DETERMINISM REQUIREMENT: Given the same initial state and the same sequence
 * of GameActions, the engine MUST produce identical GameStates. This is
 * critical for P2P multiplayer — both clients run the same engine.
 */
export interface GameState {
  /** Unique game ID. */
  gameId: string;

  /** Game configuration. */
  config: GameConfig;

  /** All card instances in the game, keyed by CardInstanceId. */
  cards: Map<CardInstanceId, CardInstance>;

  /** Player states, keyed by PlayerId. */
  players: Map<PlayerId, PlayerState>;

  /** Active battlefields in the Battlefield Zone. */
  battlefields: BattlefieldState[];

  /** The resolution chain (spell/ability stack). */
  chain: ChainEntry[];

  /** Current turn state. */
  turn: TurnState;

  /** Ordered list of players (turn order). */
  turnOrder: PlayerId[];

  /** Whether the game has ended. */
  gameOver: boolean;

  /** Winner (null if draw or game not over). */
  winner: PlayerId | null;

  /** Full action history (for replay and deterministic resync). */
  actionHistory: GameAction[];

  /** Full event history (for replay playback and logging). */
  eventHistory: GameEvent[];

  /**
   * Deterministic RNG state. Seeded at game start from both players'
   * contributed entropy. Used for any random effects (card abilities
   * that say "random"). Never used for shuffling (that's commit-reveal).
   */
  rngState: number;
}

// ---------------------------------------------------------------------------
// Visible State (what a specific player can see)
// ---------------------------------------------------------------------------

/**
 * A filtered view of the game state for a specific player.
 * Hides secret/private information from the opponent.
 * Used for rendering the UI and for bot decision-making.
 */
export interface VisibleGameState {
  /** Which player this view is for. */
  viewer: PlayerId;

  /** The viewer's full player state (they can see their own hand). */
  self: PlayerState;

  /** Opponent info — hand is hidden (only count shown). */
  opponents: OpponentVisibleState[];

  /** Battlefields (public info). */
  battlefields: BattlefieldState[];

  /** The chain (public). */
  chain: ChainEntry[];

  /** Current turn state. */
  turn: TurnState;

  /** Config. */
  config: GameConfig;

  /** Scores. */
  scores: Map<PlayerId, number>;
}

/** What you can see about an opponent. */
export interface OpponentVisibleState {
  id: PlayerId;
  legendInstanceId: CardInstanceId;
  chosenChampionPlayed: boolean;
  handSize: number;               // Can see how many cards, but not which
  mainDeckSize: number;           // Cards remaining in deck
  runeDeckSize: number;
  base: CardInstanceId[];         // Public
  runePool: CardInstanceId[];     // Public (can see which runes are channeled)
  trash: CardInstanceId[];        // Public
  score: number;
}

// ---------------------------------------------------------------------------
// Serialization Helpers
// ---------------------------------------------------------------------------

/** Serializable version of GameState (Maps → plain objects). */
export interface SerializedGameState {
  gameId: string;
  config: GameConfig;
  cards: Record<string, CardInstance>;
  players: Record<string, PlayerState>;
  battlefields: SerializedBattlefield[];
  chain: ChainEntry[];
  turn: TurnState;
  turnOrder: PlayerId[];
  gameOver: boolean;
  winner: PlayerId | null;
  actionHistory: GameAction[];
  eventHistory: GameEvent[];
  rngState: number;
}

interface SerializedBattlefield {
  cardInstanceId: CardInstanceId;
  controller: PlayerId | null;
  units: Record<string, CardInstanceId[]>;
  facedownCards: Record<string, CardInstanceId[]>;
  conqueredThisTurn: boolean;
  conqueredBy: PlayerId | null;
}

/** Convert a GameState to a JSON-safe plain object. */
export function serializeGameState(state: GameState): SerializedGameState {
  const cards: Record<string, CardInstance> = {};
  for (const [id, card] of state.cards) {
    cards[id] = card;
  }

  const players: Record<string, PlayerState> = {};
  for (const [id, player] of state.players) {
    players[id] = player;
  }

  const battlefields: SerializedBattlefield[] = state.battlefields.map(bf => ({
    cardInstanceId: bf.cardInstanceId,
    controller: bf.controller,
    units: mapToRecord(bf.units),
    facedownCards: mapToRecord(bf.facedownCards),
    conqueredThisTurn: bf.conqueredThisTurn,
    conqueredBy: bf.conqueredBy,
  }));

  return {
    gameId: state.gameId,
    config: state.config,
    cards,
    players,
    battlefields,
    chain: state.chain,
    turn: state.turn,
    turnOrder: state.turnOrder,
    gameOver: state.gameOver,
    winner: state.winner,
    actionHistory: state.actionHistory,
    eventHistory: state.eventHistory,
    rngState: state.rngState,
  };
}

/** Restore a GameState from a serialized plain object. */
export function deserializeGameState(data: SerializedGameState): GameState {
  const cards = new Map<CardInstanceId, CardInstance>();
  for (const [id, card] of Object.entries(data.cards)) {
    cards.set(id as CardInstanceId, card);
  }

  const players = new Map<PlayerId, PlayerState>();
  for (const [id, player] of Object.entries(data.players)) {
    players.set(id as PlayerId, player);
  }

  const battlefields: BattlefieldState[] = data.battlefields.map(bf => ({
    cardInstanceId: bf.cardInstanceId,
    controller: bf.controller,
    units: recordToMap(bf.units) as Map<PlayerId, CardInstanceId[]>,
    facedownCards: recordToMap(bf.facedownCards) as Map<PlayerId, CardInstanceId[]>,
    conqueredThisTurn: bf.conqueredThisTurn,
    conqueredBy: bf.conqueredBy,
  }));

  return {
    gameId: data.gameId,
    config: data.config,
    cards,
    players,
    battlefields,
    chain: data.chain,
    turn: data.turn,
    turnOrder: data.turnOrder,
    gameOver: data.gameOver,
    winner: data.winner,
    actionHistory: data.actionHistory,
    eventHistory: data.eventHistory,
    rngState: data.rngState,
  };
}

function mapToRecord<V>(map: Map<string, V>): Record<string, V> {
  const record: Record<string, V> = {};
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

function recordToMap<V>(record: Record<string, V>): Map<string, V> {
  return new Map(Object.entries(record));
}
