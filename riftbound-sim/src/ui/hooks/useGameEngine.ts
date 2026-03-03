import { useState, useRef, useCallback, useEffect } from "react";
import type {
  GameState,
  VisibleGameState,
  GameEvent,
  GameAction,
} from "../../models/game-state.js";
import { GameMode } from "../../models/game-state.js";
import type {
  CardInstanceId,
  PlayerId,
  CardDefinition,
  DeckList,
} from "../../models/card.js";
import { CardDatabase } from "../../cards/database.js";
import { CardScriptRegistry } from "../../cards/abilities.js";
import { RiftboundEngine } from "../../engine/engine.js";
import { originsCards } from "../../cards/origins/sample-cards.js";
import { registerOriginsScripts } from "../../cards/origins/sample-scripts.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InteractionMode =
  | "idle"
  | "selecting_mulligan"
  | "selecting_targets"
  | "selecting_move_units"
  | "selecting_move_destination";

export interface TargetingContext {
  sourceCardId: CardInstanceId;
  abilityId?: string;
  requiredCount: number;
  selectedTargets: CardInstanceId[];
}

export interface MoveContext {
  selectedUnits: CardInstanceId[];
}

export interface GameUI {
  // State
  gameState: GameState | null;
  visibleState: VisibleGameState | null;
  events: GameEvent[];
  currentViewer: PlayerId;
  interactionMode: InteractionMode;
  targetingContext: TargetingContext | null;
  moveContext: MoveContext | null;
  mulliganSelection: CardInstanceId[];

  // Engine access
  getCardDef: (instanceId: CardInstanceId) => CardDefinition | undefined;
  getDefById: (defId: string) => CardDefinition | undefined;

  // Actions
  startGame: () => void;
  dispatch: (action: GameAction) => boolean;

  // UI interaction
  beginPlayCard: (cardId: CardInstanceId) => void;
  selectTarget: (targetId: CardInstanceId) => void;
  confirmTargets: () => void;
  cancelTargeting: () => void;
  beginMove: (unitId: CardInstanceId) => void;
  toggleMoveUnit: (unitId: CardInstanceId) => void;
  selectMoveDestination: (bfInstanceId: CardInstanceId) => void;
  cancelMove: () => void;
  toggleMulligan: (cardId: CardInstanceId) => void;
  submitMulligan: () => void;
  switchViewer: (player: PlayerId) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const copies = (id: string, n: number): string[] => Array(n).fill(id);

function createDefaultDeck(): DeckList {
  const deck: string[] = [];
  for (let i = 0; i < 20; i++) {
    deck.push("origins-unit-zaunite-scrapper");
    deck.push("origins-spell-mystic-shot");
  }
  return {
    name: "Jinx Aggro",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: deck,
    runeDeckIds: [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)],
    battlefieldIds: ["origins-bf-zaun-streets", "origins-bf-piltover-plaza", "origins-bf-zaun-streets"],
    sideboardIds: [],
  };
}

export function useGameEngine(): GameUI {
  const dbRef = useRef<CardDatabase | null>(null);
  const scriptsRef = useRef<CardScriptRegistry | null>(null);
  const engineRef = useRef<RiftboundEngine | null>(null);

  // Initialize database and scripts once
  if (!dbRef.current) {
    const db = new CardDatabase();
    db.loadCards(originsCards);
    dbRef.current = db;
  }
  if (!scriptsRef.current) {
    const scripts = new CardScriptRegistry();
    registerOriginsScripts(scripts);
    scriptsRef.current = scripts;
  }

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [visibleState, setVisibleState] = useState<VisibleGameState | null>(null);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [currentViewer, setCurrentViewer] = useState<PlayerId>("player1");
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("idle");
  const [targetingContext, setTargetingContext] = useState<TargetingContext | null>(null);
  const [moveContext, setMoveContext] = useState<MoveContext | null>(null);
  const [mulliganSelection, setMulliganSelection] = useState<CardInstanceId[]>([]);
  const [, setRenderTick] = useState(0);

  const refreshState = useCallback((viewer?: PlayerId) => {
    const engine = engineRef.current;
    if (!engine) return;
    const v = viewer ?? currentViewer;
    const state = engine.getState();
    setGameState({ ...state } as unknown as GameState);
    setVisibleState(engine.getVisibleState(v));
    setRenderTick(t => t + 1);
  }, [currentViewer]);

  const getCardDef = useCallback((instanceId: CardInstanceId): CardDefinition | undefined => {
    return engineRef.current?.getCardDef(instanceId);
  }, []);

  const getDefById = useCallback((defId: string): CardDefinition | undefined => {
    return dbRef.current?.getById(defId);
  }, []);

  const startGame = useCallback(() => {
    const db = dbRef.current!;
    const scripts = scriptsRef.current!;
    const engine = new RiftboundEngine(db, scripts);

    engine.on((event: GameEvent) => {
      setEvents(prev => [...prev, event]);
    });

    engineRef.current = engine;

    const p1Deck = createDefaultDeck();
    const p2Deck = createDefaultDeck();

    const decks = new Map<PlayerId, DeckList>([
      ["player1", p1Deck],
      ["player2", p2Deck],
    ]);

    engine.setupGame(
      {
        mode: GameMode.Standard1v1,
        playerCount: 2,
        winTarget: 8,
        turnTimerSeconds: 0,
      },
      decks,
      new Map<PlayerId, number>([["player1", Date.now()], ["player2", Date.now() + 1]]),
      new Map<PlayerId, number>([["player1", 0], ["player2", 1]]),
    );

    setEvents([]);
    setInteractionMode("selecting_mulligan");
    setMulliganSelection([]);
    const viewer: PlayerId = "player1";
    setCurrentViewer(viewer);
    refreshState(viewer);
  }, [refreshState]);

  const dispatch = useCallback((action: GameAction): boolean => {
    const engine = engineRef.current;
    if (!engine) return false;
    const result = engine.processAction(action);

    // Auto-switch viewer to active player when turn changes
    const state = engine.getState();
    const newActive = state.turn.activePlayer;
    setCurrentViewer(prev => {
      if (prev !== newActive && state.turn.phase !== "setup") {
        refreshState(newActive);
        return newActive;
      }
      refreshState(prev);
      return prev;
    });

    return result;
  }, [refreshState]);

  const beginPlayCard = useCallback((cardId: CardInstanceId) => {
    const engine = engineRef.current;
    if (!engine) return;
    const def = engine.getCardDef(cardId);
    if (!def) return;

    // Check if card needs targets
    const firstAbility = def.abilities.find(a => a.trigger === "on_play");
    if (firstAbility && firstAbility.targetType !== "none") {
      setTargetingContext({
        sourceCardId: cardId,
        requiredCount: firstAbility.targetCount ?? 1,
        selectedTargets: [],
      });
      setInteractionMode("selecting_targets");
    } else {
      // Play immediately without targets
      dispatch({ type: "play_card", player: currentViewer, cardInstanceId: cardId });
    }
  }, [currentViewer, dispatch]);

  const selectTarget = useCallback((targetId: CardInstanceId) => {
    setTargetingContext(prev => {
      if (!prev) return null;
      const already = prev.selectedTargets.includes(targetId);
      const selected = already
        ? prev.selectedTargets.filter(id => id !== targetId)
        : [...prev.selectedTargets, targetId];
      return { ...prev, selectedTargets: selected };
    });
  }, []);

  const confirmTargets = useCallback(() => {
    if (!targetingContext) return;
    const { sourceCardId, abilityId, selectedTargets } = targetingContext;

    if (abilityId) {
      dispatch({
        type: "activate_ability",
        player: currentViewer,
        sourceId: sourceCardId,
        abilityId,
        targets: selectedTargets,
      });
    } else {
      dispatch({
        type: "play_card",
        player: currentViewer,
        cardInstanceId: sourceCardId,
        targets: selectedTargets,
      });
    }

    setTargetingContext(null);
    setInteractionMode("idle");
  }, [targetingContext, currentViewer, dispatch]);

  const cancelTargeting = useCallback(() => {
    setTargetingContext(null);
    setInteractionMode("idle");
  }, []);

  const beginMove = useCallback((unitId: CardInstanceId) => {
    setMoveContext({ selectedUnits: [unitId] });
    setInteractionMode("selecting_move_destination");
  }, []);

  const toggleMoveUnit = useCallback((unitId: CardInstanceId) => {
    setMoveContext(prev => {
      if (!prev) return { selectedUnits: [unitId] };
      const already = prev.selectedUnits.includes(unitId);
      const selected = already
        ? prev.selectedUnits.filter(id => id !== unitId)
        : [...prev.selectedUnits, unitId];
      return { selectedUnits: selected };
    });
    setInteractionMode("selecting_move_destination");
  }, []);

  const selectMoveDestination = useCallback((bfInstanceId: CardInstanceId) => {
    if (!moveContext || moveContext.selectedUnits.length === 0) return;
    dispatch({
      type: "move_units",
      player: currentViewer,
      unitIds: moveContext.selectedUnits,
      destination: bfInstanceId,
    });
    setMoveContext(null);
    setInteractionMode("idle");
  }, [moveContext, currentViewer, dispatch]);

  const cancelMove = useCallback(() => {
    setMoveContext(null);
    setInteractionMode("idle");
  }, []);

  const toggleMulligan = useCallback((cardId: CardInstanceId) => {
    setMulliganSelection(prev => {
      if (prev.includes(cardId)) return prev.filter(id => id !== cardId);
      if (prev.length >= 2) return prev;
      return [...prev, cardId];
    });
  }, []);

  const submitMulligan = useCallback(() => {
    dispatch({
      type: "mulligan",
      player: currentViewer,
      returnCardIds: mulliganSelection,
    });
    setMulliganSelection([]);

    const engine = engineRef.current;
    if (!engine) return;
    const state = engine.getState();

    // Check if both players have submitted mulligan
    if (state.turn.mulliganSubmitted.length < 2) {
      // Switch to other player for their mulligan
      const other = state.turnOrder.find(p => p !== currentViewer)!;
      setCurrentViewer(other);
      refreshState(other);
    } else {
      // Both mulligans done — switch to active player
      setCurrentViewer(state.turn.activePlayer);
      setInteractionMode("idle");
      refreshState(state.turn.activePlayer);
    }
  }, [currentViewer, mulliganSelection, dispatch, refreshState]);

  const switchViewer = useCallback((player: PlayerId) => {
    setCurrentViewer(player);
    refreshState(player);
  }, [refreshState]);

  return {
    gameState,
    visibleState,
    events,
    currentViewer,
    interactionMode,
    targetingContext,
    moveContext,
    mulliganSelection,
    getCardDef,
    getDefById,
    startGame,
    dispatch,
    beginPlayCard,
    selectTarget,
    confirmTargets,
    cancelTargeting,
    beginMove,
    toggleMoveUnit,
    selectMoveDestination,
    cancelMove,
    toggleMulligan,
    submitMulligan,
    switchViewer,
  };
}
