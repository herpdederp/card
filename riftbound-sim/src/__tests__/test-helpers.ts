// ============================================================================
// Riftbound TCG — Test Helpers
// ============================================================================
// Shared utilities for building minimal game states, card instances,
// and engine setups for unit and integration tests.
// ============================================================================

import type {
  GameState,
  CardInstance,
  PlayerState,
  BattlefieldState,
  GameConfig,
  GameEvent,
} from "../models/game-state.js";
import { TurnPhase, GameMode, Zone } from "../models/game-state.js";
import type { CardInstanceId, PlayerId, CardDefinition, DeckList } from "../models/card.js";
import { CardType, CardSet, Rarity, Domain } from "../models/card.js";
import { CardDatabase } from "../cards/database.js";
import { CardScriptRegistry } from "../cards/abilities.js";
import { RiftboundEngine } from "../engine/engine.js";
import { originsCards } from "../cards/origins/sample-cards.js";
import { registerOriginsScripts } from "../cards/origins/sample-scripts.js";
import { SeededRNG } from "../engine/rng.js";
import type { EffectContext } from "../engine/effects.js";

// ---------------------------------------------------------------------------
// Card Instance Factory
// ---------------------------------------------------------------------------

let instanceCounter = 0;

export function makeCard(
  defId: string,
  owner: PlayerId = "player1",
  overrides: Partial<CardInstance> = {},
): CardInstance {
  const id = `${defId}#test${instanceCounter++}` as CardInstanceId;
  return {
    instanceId: id,
    definitionId: defId,
    owner,
    controller: owner,
    exhausted: false,
    damage: 0,
    modifiers: [],
    faceDown: false,
    grantedKeywords: [],
    attachments: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Card Definition Factory
// ---------------------------------------------------------------------------

export function makeUnitDef(
  id: string,
  overrides: Partial<CardDefinition> = {},
): CardDefinition {
  return {
    id,
    name: id,
    fullName: id,
    set: CardSet.Origins,
    type: CardType.Unit,
    domains: [Domain.Fury],
    cost: { energyCost: 1, powerCosts: [] },
    might: 2,
    health: 3,
    keywords: [],
    abilities: [],
    rarity: Rarity.Common,
    rulesText: "",
    artAsset: "",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Minimal Game State Factory
// ---------------------------------------------------------------------------

export function makeMinimalState(overrides: Partial<GameState> = {}): GameState {
  const cards = new Map<CardInstanceId, CardInstance>();
  const p1State: PlayerState = {
    id: "player1",
    legendInstanceId: "legend-p1#0" as CardInstanceId,
    chosenChampionInstanceId: "champ-p1#0" as CardInstanceId,
    chosenChampionPlayed: false,
    mainDeck: [],
    runeDeck: [],
    hand: [],
    base: [],
    runePool: [],
    trash: [],
    banishment: [],
    currentEnergy: 0,
    currentPower: [],
    score: 0,
    ownedBattlefieldIds: [],
  };
  const p2State: PlayerState = {
    ...p1State,
    id: "player2",
    legendInstanceId: "legend-p2#0" as CardInstanceId,
    chosenChampionInstanceId: "champ-p2#0" as CardInstanceId,
  };

  const players = new Map<PlayerId, PlayerState>([
    ["player1", p1State],
    ["player2", p2State],
  ]);

  return {
    gameId: "test-game",
    config: {
      mode: GameMode.Standard1v1,
      playerCount: 2,
      winTarget: 8,
      turnTimerSeconds: 0,
    },
    cards,
    players,
    battlefields: [],
    chain: [],
    turn: {
      activePlayer: "player1",
      phase: TurnPhase.Action,
      turnNumber: 1,
      priorityPlayer: "player1",
      passed: false,
      actionsThisTurn: [],
      mulliganSubmitted: [],
    },
    turnOrder: ["player1", "player2"],
    gameOver: false,
    winner: null,
    actionHistory: [],
    eventHistory: [],
    rngState: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Effect Context Factory
// ---------------------------------------------------------------------------

export function makeEffectContext(
  state: GameState,
  source: CardInstance,
  overrides: Partial<EffectContext> = {},
): EffectContext {
  return {
    state,
    source,
    controller: source.controller,
    targets: [],
    cardDb: new Map(),
    rng: new SeededRNG(42),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Full Engine Setup (for integration tests)
// ---------------------------------------------------------------------------

const copies = (id: string, n: number): string[] => Array(n).fill(id);

export function createTestEngine(): {
  engine: RiftboundEngine;
  db: CardDatabase;
  scripts: CardScriptRegistry;
  events: GameEvent[];
} {
  const db = new CardDatabase();
  db.loadCards(originsCards);
  const scripts = new CardScriptRegistry();
  registerOriginsScripts(scripts);

  const engine = new RiftboundEngine(db, scripts);
  const events: GameEvent[] = [];
  engine.on(e => events.push(e));

  return { engine, db, scripts, events };
}

export function setupTestGame(
  engine: RiftboundEngine,
  p1DeckIds?: string[],
  p2DeckIds?: string[],
  p1RuneIds?: string[],
  p2RuneIds?: string[],
): { p1: PlayerId; p2: PlayerId } {
  const defaultDeck = (() => {
    const ids: string[] = [];
    for (let i = 0; i < 20; i++) {
      ids.push("origins-unit-chemtech-enforcer");
      ids.push("origins-spell-get-excited");
    }
    return ids;
  })();

  const defaultRunes = [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)];

  const p1Deck: DeckList = {
    name: "P1 Test",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: p1DeckIds ?? defaultDeck,
    runeDeckIds: p1RuneIds ?? defaultRunes,
    battlefieldIds: ["origins-bf-zaun-warrens", "origins-bf-grand-plaza", "origins-bf-zaun-warrens"],
    sideboardIds: [],
  };

  const p2Deck: DeckList = {
    name: "P2 Test",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: p2DeckIds ?? defaultDeck,
    runeDeckIds: p2RuneIds ?? defaultRunes,
    battlefieldIds: ["origins-bf-zaun-warrens", "origins-bf-grand-plaza", "origins-bf-zaun-warrens"],
    sideboardIds: [],
  };

  const config: GameConfig = {
    mode: GameMode.Standard1v1,
    playerCount: 2,
    winTarget: 8,
    turnTimerSeconds: 0,
  };

  const decks = new Map<PlayerId, DeckList>([["player1", p1Deck], ["player2", p2Deck]]);
  engine.setupGame(config, decks,
    new Map<PlayerId, number>([["player1", 42], ["player2", 99]]),
    new Map<PlayerId, number>([["player1", 0], ["player2", 1]]),
  );

  engine.processAction({ type: "mulligan", player: "player1", returnCardIds: [] });
  engine.processAction({ type: "mulligan", player: "player2", returnCardIds: [] });

  const state = engine.getState();
  const p1 = state.turn.activePlayer;
  const p2 = state.turnOrder.find(p => p !== p1)!;
  return { p1, p2 };
}

export function findInHand(engine: RiftboundEngine, player: PlayerId, defId: string): CardInstanceId | undefined {
  const state = engine.getState();
  return state.players.get(player)!.hand.find(id => state.cards.get(id)?.definitionId === defId);
}

export function findReadyRune(engine: RiftboundEngine, player: PlayerId): CardInstanceId | undefined {
  const state = engine.getState();
  return state.players.get(player)!.runePool.find(id => !state.cards.get(id)?.exhausted);
}
