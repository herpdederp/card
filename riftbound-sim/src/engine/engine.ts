// ============================================================================
// Riftbound TCG — Game Engine
// ============================================================================
// The central orchestrator. Manages turn flow, validates and executes actions,
// and emits events. This engine is DETERMINISTIC — given the same initial
// state and action sequence, it always produces identical results.
//
// Used by:
// - Local play (single instance)
// - P2P multiplayer (identical instance on each client)
// - Bot AI (feeds visible state to bot, applies bot actions here)
// - Replay viewer (replays action history)
// ============================================================================

import {
  type GameState,
  type PlayerState,
  type BattlefieldState,
  type CardInstance,
  type ChainEntry,
  type GameAction,
  type GameEvent,
  type GameConfig,
  type VisibleGameState,
  type OpponentVisibleState,
  TurnPhase,
  GameMode,
  Zone,
} from "../models/game-state.js";
import {
  type CardDefinition,
  type CardInstanceId,
  type PlayerId,
  type DeckList,
  CardType,
  Domain,
  TriggerType,
  SpellTiming,
} from "../models/card.js";
import { type CardDatabase } from "../cards/database.js";
import { type CardScriptRegistry } from "../cards/abilities.js";
import { SeededRNG, combineSeeds } from "./rng.js";
import { channelRunes, exhaustRune, recycleRune, emptyRunePool, canAfford, spendEnergy, spendPower } from "./resources.js";
import { scoreHoldPoints, checkWinCondition, resetConquerTracking } from "./scoring.js";
import { moveUnits, resolveCombat } from "./combat.js";
import { executeEffects } from "./effects.js";
import { findTriggeredAbilities, checkStaticAbilities, type TriggerContext } from "./triggers.js";

// ---------------------------------------------------------------------------
// Engine Class
// ---------------------------------------------------------------------------

export class RiftboundEngine {
  private state: GameState;
  private cardDb: CardDatabase;
  private scripts: CardScriptRegistry;
  private cardDefMap: Map<string, CardDefinition>;
  private rng: SeededRNG;
  private chainEntryCounter = 0;

  /** Event listeners — UI and logging hook into these. */
  private listeners: Array<(event: GameEvent) => void> = [];

  constructor(cardDb: CardDatabase, scripts: CardScriptRegistry) {
    this.cardDb = cardDb;
    this.scripts = scripts;
    this.cardDefMap = new Map();
    for (const card of cardDb.all()) {
      this.cardDefMap.set(card.id, card);
    }
    // State and RNG are initialized in setupGame()
    this.state = null as unknown as GameState;
    this.rng = null as unknown as SeededRNG;
  }

  // -------------------------------------------------------------------------
  // Event System
  // -------------------------------------------------------------------------

  /** Subscribe to game events. Returns unsubscribe function. */
  on(listener: (event: GameEvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private emit(event: GameEvent): void {
    this.state.eventHistory.push(event);
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  private emitAll(events: GameEvent[]): void {
    for (const event of events) {
      this.emit(event);
    }
  }

  /** Emit events AND process triggers for each. Used for combat/movement/scoring. */
  private emitAllAndProcess(events: GameEvent[]): void {
    for (const event of events) {
      this.emit(event);
      this.processTriggers(event);
    }
  }

  // -------------------------------------------------------------------------
  // Game Setup
  // -------------------------------------------------------------------------

  /**
   * Initialize a new game.
   *
   * @param config - Game configuration (mode, player count, etc.)
   * @param decks - Map of PlayerId → DeckList (already validated)
   * @param seeds - Map of PlayerId → random seed (from commit-reveal)
   * @param chosenBattlefields - Map of PlayerId → index of chosen battlefield (0-2)
   */
  setupGame(
    config: GameConfig,
    decks: Map<PlayerId, DeckList>,
    seeds: Map<PlayerId, number>,
    chosenBattlefields: Map<PlayerId, number>,
  ): void {
    // Combine all player seeds for deterministic RNG
    const seedValues = Array.from(seeds.values());
    let combinedSeed = seedValues[0];
    for (let i = 1; i < seedValues.length; i++) {
      combinedSeed = combineSeeds(combinedSeed, seedValues[i]);
    }
    this.rng = new SeededRNG(combinedSeed);

    // Determine turn order
    const playerIds = Array.from(decks.keys());
    // In a real game, turn order is determined by shuffling battlefields
    // For now, use the RNG to determine who goes first
    const turnOrder = [...playerIds];
    this.rng.shuffle(turnOrder);

    // Create all card instances
    const allCards = new Map<CardInstanceId, CardInstance>();
    const players = new Map<PlayerId, PlayerState>();
    const battlefields: BattlefieldState[] = [];

    let instanceCounter = 0;

    for (const [playerId, deck] of decks) {
      const createInstance = (defId: string, owner: PlayerId): CardInstanceId => {
        const id = `${defId}#${instanceCounter++}` as CardInstanceId;
        allCards.set(id, {
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
        });
        return id;
      };

      // Create Legend instance
      const legendId = createInstance(deck.legendId, playerId);

      // Create Chosen Champion instance
      const champId = createInstance(deck.chosenChampionId, playerId);

      // Create Main Deck instances
      const mainDeckIds: CardInstanceId[] = deck.mainDeckIds.map(
        defId => createInstance(defId, playerId),
      );

      // Create Rune Deck instances
      const runeDeckIds: CardInstanceId[] = deck.runeDeckIds.map(
        defId => createInstance(defId, playerId),
      );

      // Create Battlefield instances
      const bfIds: CardInstanceId[] = deck.battlefieldIds.map(
        defId => createInstance(defId, playerId),
      );

      // NOTE: Shuffling is handled by the commit-reveal system in P2P mode.
      // For local/bot games, the engine shuffles using the seeded RNG.
      // The P2P layer will override the deck order with the committed order.

      const playerState: PlayerState = {
        id: playerId,
        legendInstanceId: legendId,
        chosenChampionInstanceId: champId,
        chosenChampionPlayed: false,
        mainDeck: mainDeckIds,
        runeDeck: runeDeckIds,
        hand: [],
        base: [],
        runePool: [],
        trash: [],
        banishment: [],
        currentEnergy: 0,
        currentPower: [],
        score: 0,
        ownedBattlefieldIds: bfIds,
      };

      players.set(playerId, playerState);

      // Place chosen battlefield into the game
      const bfIndex = chosenBattlefields.get(playerId) ?? 0;
      const chosenBfId = bfIds[Math.min(bfIndex, bfIds.length - 1)];
      battlefields.push({
        cardInstanceId: chosenBfId,
        controller: null,
        units: new Map(),
        facedownCards: new Map(),
        conqueredThisTurn: false,
        conqueredBy: null,
      });
    }

    // FFA with 4 players: remove first player's battlefield (only 3 total)
    if (config.playerCount === 4 && battlefields.length > 3) {
      // Remove the first player in turn order's battlefield
      const firstPlayerId = turnOrder[0];
      const idx = battlefields.findIndex(bf => {
        const card = allCards.get(bf.cardInstanceId);
        return card?.owner === firstPlayerId;
      });
      if (idx !== -1) battlefields.splice(idx, 1);
    }

    // Build the game state
    this.state = {
      gameId: `game_${Date.now()}_${this.rng.nextU32()}`,
      config,
      cards: allCards,
      players,
      battlefields,
      chain: [],
      turn: {
        activePlayer: turnOrder[0],
        phase: TurnPhase.Setup,
        turnNumber: 1,
        priorityPlayer: turnOrder[0],
        passed: false,
        actionsThisTurn: [],
        mulliganSubmitted: [],
      },
      turnOrder,
      gameOver: false,
      winner: null,
      actionHistory: [],
      eventHistory: [],
      rngState: this.rng.getState(),
    };

    this.emit({ type: "game_started", config });

    // Draw opening hands (4 cards each)
    for (const playerId of turnOrder) {
      this.drawCards(playerId, 4);
    }

    // Move to waiting for mulligan decisions
    this.state.turn.phase = TurnPhase.Setup;
  }

  // -------------------------------------------------------------------------
  // Action Processing (the main interface)
  // -------------------------------------------------------------------------

  /**
   * Process a game action. This is the primary entry point.
   * Validates the action, mutates state, and emits events.
   *
   * Returns true if the action was valid and processed.
   */
  processAction(action: GameAction): boolean {
    if (this.state.gameOver) return false;

    // Record in history
    this.state.actionHistory.push(action);
    this.state.turn.actionsThisTurn.push(action);

    switch (action.type) {
      case "mulligan":
        return this.handleMulligan(action.player, action.returnCardIds);
      case "play_card":
        return this.handlePlayCard(action.player, action.cardInstanceId, action.targets);
      case "move_units":
        return this.handleMoveUnits(action.player, action.unitIds, action.destination);
      case "exhaust_rune":
        return this.handleExhaustRune(action.player, action.runeId);
      case "recycle_rune":
        return this.handleRecycleRune(action.player, action.runeId);
      case "activate_ability":
        return this.handleActivateAbility(action.player, action.sourceId, action.abilityId, action.targets);
      case "pass_priority":
        return this.handlePassPriority(action.player);
      case "declare_done":
        return this.handleDeclareDone(action.player);
      case "concede":
        return this.handleConcede(action.player);
      default:
        return false;
    }
  }

  // -------------------------------------------------------------------------
  // Turn Flow
  // -------------------------------------------------------------------------

  /**
   * Advance through the ABCD phases of a turn.
   * Called automatically after setup and after each "Done" declaration.
   */
  private startTurn(player: PlayerId): void {
    const turnNum = this.state.turn.turnNumber;
    this.state.turn.activePlayer = player;
    this.state.turn.actionsThisTurn = [];

    this.emit({ type: "turn_started", player, turnNumber: turnNum });

    // Reset per-turn tracking
    resetConquerTracking(this.state);

    // Clean up end-of-turn modifiers from previous turn
    this.cleanupExpiredModifiers("end_of_turn");

    // A — Awaken Phase
    this.awakenPhase(player);

    // B — Beginning Phase (Scoring)
    this.beginningPhase(player);

    // Check for win after scoring
    const winner = checkWinCondition(this.state);
    if (winner) {
      this.endGame(winner, "Reached score target");
      return;
    }

    // C — Channel Phase
    this.channelPhase(player);

    // D — Draw Phase
    this.drawPhase(player);

    // Enter Action Phase — player now has full control
    this.state.turn.phase = TurnPhase.Action;
    this.emit({ type: "phase_changed", phase: TurnPhase.Action });
  }

  /** A — Awaken: ready all exhausted cards. */
  private awakenPhase(player: PlayerId): void {
    this.state.turn.phase = TurnPhase.Awaken;
    this.emit({ type: "phase_changed", phase: TurnPhase.Awaken });

    const playerState = this.state.players.get(player)!;

    // Ready all cards this player controls
    for (const cardId of this.getPlayerControlledCards(player)) {
      const card = this.state.cards.get(cardId);
      if (card) card.exhausted = false;
    }

    // Ready all runes in pool
    for (const runeId of playerState.runePool) {
      const rune = this.state.cards.get(runeId);
      if (rune) rune.exhausted = false;
    }
  }

  /** B — Beginning: score hold points, resolve start-of-turn triggers. */
  private beginningPhase(player: PlayerId): void {
    this.state.turn.phase = TurnPhase.Beginning;
    this.emit({ type: "phase_changed", phase: TurnPhase.Beginning });

    const events = scoreHoldPoints(this.state, player);
    this.emitAllAndProcess(events);
  }

  /** C — Channel: draw runes from Rune Deck. */
  private channelPhase(player: PlayerId): void {
    this.state.turn.phase = TurnPhase.Channel;
    this.emit({ type: "phase_changed", phase: TurnPhase.Channel });

    // Empty rune pool first
    const playerState = this.state.players.get(player)!;
    emptyRunePool(playerState);

    const events = channelRunes(this.state, player, this.cardDefMap);
    this.emitAll(events);
  }

  /** D — Draw: draw 1 card from main deck. */
  private drawPhase(player: PlayerId): void {
    this.state.turn.phase = TurnPhase.Draw;
    this.emit({ type: "phase_changed", phase: TurnPhase.Draw });

    // FFA: first player doesn't draw on their first turn
    const isFirstTurn = this.state.turn.turnNumber <= this.state.turnOrder.length;
    const isFirstPlayer = this.state.turnOrder[0] === player;

    if (!(isFirstTurn && isFirstPlayer && this.state.config.playerCount > 2)) {
      this.drawCards(player, 1);
    }

    // Rune pool empties at end of draw phase
    const playerState = this.state.players.get(player)!;
    emptyRunePool(playerState);
  }

  // -------------------------------------------------------------------------
  // Action Handlers
  // -------------------------------------------------------------------------

  private handleMulligan(player: PlayerId, returnCardIds: CardInstanceId[]): boolean {
    if (this.state.turn.phase !== TurnPhase.Setup) return false;
    if (returnCardIds.length > 2) return false;

    // Prevent double-mulligan
    if (this.state.turn.mulliganSubmitted.includes(player)) return false;

    const playerState = this.state.players.get(player)!;

    // Return selected cards to bottom of deck
    for (const cardId of returnCardIds) {
      const idx = playerState.hand.indexOf(cardId);
      if (idx === -1) return false;
      playerState.hand.splice(idx, 1);
      playerState.mainDeck.push(cardId);
    }

    // Draw replacements
    this.drawCards(player, returnCardIds.length);

    // Track mulligan submission
    this.state.turn.mulliganSubmitted.push(player);

    // Auto-start when all players have submitted
    if (this.state.turn.mulliganSubmitted.length === this.state.turnOrder.length) {
      this.startTurn(this.state.turnOrder[0]);
    }

    return true;
  }

  private handlePlayCard(
    player: PlayerId,
    cardInstanceId: CardInstanceId,
    targets?: CardInstanceId[],
  ): boolean {
    const card = this.state.cards.get(cardInstanceId);
    if (!card) return false;

    const def = this.cardDefMap.get(card.definitionId);
    if (!def) return false;

    // Non-active player can only play spells when they have priority
    if (this.state.turn.activePlayer !== player) {
      if (def.type !== CardType.Spell) return false;
      if (this.state.turn.priorityPlayer !== player) return false;
    }

    const playerState = this.state.players.get(player)!;

    // Check if card is in hand (or Champion Zone)
    const isChampion = cardInstanceId === playerState.chosenChampionInstanceId
      && !playerState.chosenChampionPlayed;
    const inHand = playerState.hand.includes(cardInstanceId);

    if (!isChampion && !inHand) return false;

    // Check timing
    if (def.type === CardType.Spell) {
      if (def.spellTiming === "normal") {
        if (this.state.turn.phase !== TurnPhase.Action) return false;
        if (this.state.chain.length > 0) return false; // Normal: chain must be empty
      }
      if (def.spellTiming === "action" && this.state.turn.phase !== TurnPhase.Showdown && this.state.turn.phase !== TurnPhase.Action) return false;
      if (def.spellTiming === "reaction") {
        if (this.state.chain.length === 0) return false; // Reactions need something to react to
      }
    }

    // Cost validation — check if the player can afford this card
    if (def.cost.energyCost > 0 || def.cost.powerCosts.length > 0) {
      if (!canAfford(playerState, def.cost.energyCost, def.cost.powerCosts, this.state.cards, this.cardDefMap)) {
        return false;
      }
    }

    // Remove from hand or Champion Zone
    if (isChampion) {
      playerState.chosenChampionPlayed = true;
    } else {
      const idx = playerState.hand.indexOf(cardInstanceId);
      playerState.hand.splice(idx, 1);
    }

    // Place on board based on card type
    let targetZone: Zone;
    switch (def.type) {
      case CardType.Unit:
      case CardType.Champion:
        playerState.base.push(cardInstanceId);
        targetZone = Zone.Base;
        card.turnPlayed = this.state.turn.turnNumber;
        break;
      case CardType.Gear:
        playerState.base.push(cardInstanceId);
        targetZone = Zone.Base;
        break;
      case CardType.Spell: {
        // Spell goes on the chain — it resolves later (LIFO).
        const spellAbility = def.abilities.find(a => a.trigger === TriggerType.OnPlay);
        const abilityId = spellAbility?.id ?? def.id;

        const chainEntry: ChainEntry = {
          id: this.nextChainId(),
          sourceInstanceId: cardInstanceId,
          controller: player,
          abilityId,
          targets: targets ?? [],
          params: {},
          cancelled: false,
        };

        this.state.chain.push(chainEntry);
        this.emit({ type: "chain_entry_added", entry: chainEntry });

        // Card is removed from hand above but NOT in trash yet — it's "on the chain"
        targetZone = Zone.Chain;
        break;
      }
      default:
        return false;
    }

    // Pay costs
    if (def.cost.energyCost > 0) {
      spendEnergy(playerState, def.cost.energyCost);
    }
    for (const pc of def.cost.powerCosts) {
      spendPower(playerState, pc.domain, pc.amount);
    }

    const playEvent: GameEvent = {
      type: "card_played",
      player,
      cardInstanceId,
      zone: targetZone,
    };
    this.emit(playEvent);

    // Fire triggers for card_played (static abilities + triggered abilities)
    this.processTriggers(playEvent);

    // For non-spell cards with OnPlay triggered abilities, put them on chain
    if (def.type !== CardType.Spell) {
      for (const ability of def.abilities) {
        if (ability.trigger === TriggerType.OnPlay) {
          const entry: ChainEntry = {
            id: this.nextChainId(),
            sourceInstanceId: cardInstanceId,
            controller: player,
            abilityId: ability.id,
            targets: targets ?? [],
            params: {},
            cancelled: false,
          };
          this.state.chain.push(entry);
          this.emit({ type: "chain_entry_added", entry });
        }
      }
    }

    // If a spell was added to the chain, pass priority to opponent
    if (def.type === CardType.Spell) {
      this.state.turn.passed = false;
      this.state.turn.priorityPlayer = this.getNextPlayer(player);
    }

    return true;
  }

  private handleMoveUnits(
    player: PlayerId,
    unitIds: CardInstanceId[],
    destination: CardInstanceId,
  ): boolean {
    if (this.state.turn.activePlayer !== player) return false;
    if (this.state.turn.phase !== TurnPhase.Action) return false;

    const { showdownTriggered, events } = moveUnits(
      this.state,
      player,
      unitIds,
      destination,
      this.cardDefMap,
    );
    this.emitAllAndProcess(events);

    return true;
  }

  private handleExhaustRune(player: PlayerId, runeId: CardInstanceId): boolean {
    if (this.state.turn.activePlayer !== player && this.state.turn.priorityPlayer !== player) return false;

    const { success, events } = exhaustRune(this.state, player, runeId);
    this.emitAll(events);
    return success;
  }

  private handleRecycleRune(player: PlayerId, runeId: CardInstanceId): boolean {
    if (this.state.turn.activePlayer !== player && this.state.turn.priorityPlayer !== player) return false;

    const { success, events } = recycleRune(this.state, player, runeId, this.cardDefMap);
    this.emitAll(events);
    return success;
  }

  private handleActivateAbility(
    player: PlayerId,
    sourceId: CardInstanceId,
    abilityId: string,
    targets?: CardInstanceId[],
  ): boolean {
    const card = this.state.cards.get(sourceId);
    if (!card || card.controller !== player) return false;

    const def = this.cardDefMap.get(card.definitionId);
    if (!def) return false;

    // Find the ability definition
    const abilityDef = def.abilities.find(a => a.id === abilityId);
    if (!abilityDef || abilityDef.trigger !== TriggerType.Activated) return false;

    // Must be in play
    if (!this.isCardInPlay(sourceId)) return false;

    // Exhaust-cost: the source must not already be exhausted
    if (card.exhausted) return false;
    card.exhausted = true;

    // If ability has a resource cost, validate and pay it
    const playerState = this.state.players.get(player)!;
    if (abilityDef.cost) {
      if (!canAfford(playerState, abilityDef.cost.energyCost, abilityDef.cost.powerCosts, this.state.cards, this.cardDefMap)) {
        card.exhausted = false; // Undo exhaust
        return false;
      }
      if (abilityDef.cost.energyCost > 0) spendEnergy(playerState, abilityDef.cost.energyCost);
      for (const pc of abilityDef.cost.powerCosts) spendPower(playerState, pc.domain, pc.amount);
    }

    // Check script's canActivate
    const script = this.scripts.get(def.id);
    if (script) {
      const impl = script.abilities.get(abilityId);
      if (impl?.mode === "script" && impl.script.canActivate) {
        if (!impl.script.canActivate(this.state, card, player)) {
          card.exhausted = false;
          return false;
        }
      }
    }

    // Put on chain
    const entry: ChainEntry = {
      id: this.nextChainId(),
      sourceInstanceId: sourceId,
      controller: player,
      abilityId,
      targets: targets ?? [],
      params: {},
      cancelled: false,
    };

    this.state.chain.push(entry);
    this.emit({ type: "chain_entry_added", entry });
    this.emit({ type: "ability_triggered", sourceId, abilityId });

    // Pass priority to opponent
    this.state.turn.passed = false;
    this.state.turn.priorityPlayer = this.getNextPlayer(player);

    return true;
  }

  private handlePassPriority(player: PlayerId): boolean {
    if (this.state.turn.priorityPlayer !== player) return false;

    // If in Showdown and both players pass on empty chain, resolve combat
    if (this.state.turn.phase === TurnPhase.Showdown && this.state.chain.length === 0) {
      if (this.state.turn.passed) {
        // Both players passed — resolve combat
        const bfId = this.state.turn.showdownBattlefield!;
        const attacker = this.state.turn.activePlayer;
        const events = resolveCombat(this.state, bfId, attacker, this.cardDefMap);
        this.emitAllAndProcess(events);

        // Check win
        const winner = checkWinCondition(this.state);
        if (winner) {
          this.endGame(winner, "Reached score target");
        }

        this.state.turn.passed = false;
        return true;
      }

      // First pass — give priority to opponent
      this.state.turn.passed = true;
      this.state.turn.priorityPlayer = this.getNextPlayer(player);
      return true;
    }

    // Chain resolution: if both pass, resolve top of chain
    if (this.state.chain.length > 0 && this.state.turn.passed) {
      // Both passed — resolve top entry (LIFO)
      const entry = this.state.chain.pop()!;
      this.resolveChainEntry(entry);
      this.state.turn.passed = false;

      // After resolution, if chain still has entries, give priority to active player
      if (this.state.chain.length > 0) {
        this.state.turn.priorityPlayer = this.state.turn.activePlayer;
      }
      return true;
    }

    this.state.turn.passed = true;
    this.state.turn.priorityPlayer = this.getNextPlayer(player);
    return true;
  }

  private handleDeclareDone(player: PlayerId): boolean {
    if (this.state.turn.activePlayer !== player) return false;
    if (this.state.turn.phase !== TurnPhase.Action) return false;

    // End of turn cleanup
    const playerState = this.state.players.get(player)!;
    emptyRunePool(playerState);
    this.cleanupExpiredModifiers("end_of_turn");

    this.state.turn.phase = TurnPhase.Done;
    this.emit({ type: "phase_changed", phase: TurnPhase.Done });

    // Advance to next player
    const nextPlayer = this.getNextPlayer(player);
    this.state.turn.turnNumber++;
    this.startTurn(nextPlayer);

    return true;
  }

  private handleConcede(player: PlayerId): boolean {
    // In 1v1, the other player wins
    const opponents = this.state.turnOrder.filter(p => p !== player);
    if (opponents.length === 1) {
      this.endGame(opponents[0], `${player} conceded`);
    } else {
      // FFA: remove player from turn order, continue
      const idx = this.state.turnOrder.indexOf(player);
      if (idx !== -1) this.state.turnOrder.splice(idx, 1);

      if (this.state.turnOrder.length === 1) {
        this.endGame(this.state.turnOrder[0], "Last player standing");
      }
    }
    return true;
  }

  // -------------------------------------------------------------------------
  // Public Queries
  // -------------------------------------------------------------------------

  /** Start the game (call after all mulligans are resolved). No-op if already started. */
  startFirstTurn(): void {
    if (this.state.turn.phase !== TurnPhase.Setup) return;
    this.startTurn(this.state.turnOrder[0]);
  }

  /** Get the full game state (for debugging / local play). */
  getState(): Readonly<GameState> {
    return this.state;
  }

  /** Get the visible state for a specific player. */
  getVisibleState(viewer: PlayerId): VisibleGameState {
    const self = this.state.players.get(viewer)!;
    const opponents: OpponentVisibleState[] = [];

    for (const [pid, pState] of this.state.players) {
      if (pid === viewer) continue;
      opponents.push({
        id: pid,
        legendInstanceId: pState.legendInstanceId,
        chosenChampionPlayed: pState.chosenChampionPlayed,
        handSize: pState.hand.length,
        mainDeckSize: pState.mainDeck.length,
        runeDeckSize: pState.runeDeck.length,
        base: [...pState.base],
        runePool: [...pState.runePool],
        trash: [...pState.trash],
        score: pState.score,
      });
    }

    return {
      viewer,
      self,
      opponents,
      battlefields: this.state.battlefields,
      chain: this.state.chain,
      turn: this.state.turn,
      config: this.state.config,
      scores: new Map(
        Array.from(this.state.players.entries()).map(([id, p]) => [id, p.score]),
      ),
    };
  }

  /** Get a card definition by instance ID. */
  getCardDef(instanceId: CardInstanceId): CardDefinition | undefined {
    const card = this.state.cards.get(instanceId);
    if (!card) return undefined;
    return this.cardDefMap.get(card.definitionId);
  }

  /** Check if the game is over. */
  isGameOver(): boolean {
    return this.state.gameOver;
  }

  /** Get the action history (for replay / desync detection). */
  getActionHistory(): Readonly<GameAction[]> {
    return this.state.actionHistory;
  }

  // -------------------------------------------------------------------------
  // Internal Helpers
  // -------------------------------------------------------------------------

  /** Draw cards from a player's main deck into their hand. */
  private drawCards(player: PlayerId, count: number): void {
    const playerState = this.state.players.get(player)!;
    for (let i = 0; i < count; i++) {
      if (playerState.mainDeck.length === 0) break;
      const cardId = playerState.mainDeck.shift()!;
      playerState.hand.push(cardId);
      this.emit({ type: "card_drawn", player, cardInstanceId: cardId });
    }
  }

  /** Get the next player in turn order. */
  private getNextPlayer(current: PlayerId): PlayerId {
    const idx = this.state.turnOrder.indexOf(current);
    return this.state.turnOrder[(idx + 1) % this.state.turnOrder.length];
  }

  /** Get all card instance IDs that a player controls. */
  private getPlayerControlledCards(player: PlayerId): CardInstanceId[] {
    const ids: CardInstanceId[] = [];
    const playerState = this.state.players.get(player)!;

    ids.push(...playerState.base);

    for (const bf of this.state.battlefields) {
      const units = bf.units.get(player);
      if (units) ids.push(...units);
    }

    return ids;
  }

  /** Remove expired stat modifiers from all cards. */
  private cleanupExpiredModifiers(duration: "end_of_turn" | "end_of_combat"): void {
    for (const card of this.state.cards.values()) {
      card.modifiers = card.modifiers.filter(m => m.duration !== duration);
    }
  }

  /** End the game. */
  private endGame(winner: PlayerId, reason: string): void {
    this.state.gameOver = true;
    this.state.winner = winner;
    this.state.turn.phase = TurnPhase.GameOver;
    this.emit({ type: "game_over", winner, reason });
  }

  // -------------------------------------------------------------------------
  // Chain Resolution & Triggers
  // -------------------------------------------------------------------------

  /** Generate a unique chain entry ID. */
  private nextChainId(): string {
    return `chain_${++this.chainEntryCounter}`;
  }

  /** Resolve a single chain entry (called when both players pass on non-empty chain). */
  private resolveChainEntry(entry: ChainEntry): void {
    this.emit({ type: "chain_entry_resolved", entryId: entry.id });

    // If cancelled (e.g., by Deny), skip execution
    if (entry.cancelled) {
      this.moveSpellToTrash(entry.sourceInstanceId);
      return;
    }

    const source = this.state.cards.get(entry.sourceInstanceId);
    if (!source) return;

    const def = this.cardDefMap.get(source.definitionId);
    if (!def) return;

    // Look up the ability implementation
    const script = this.scripts.get(def.id);
    const impl = script?.abilities.get(entry.abilityId);

    let events: GameEvent[] = [];

    if (impl) {
      if (impl.mode === "dsl") {
        events = executeEffects(impl.effects, {
          state: this.state,
          source,
          controller: entry.controller,
          targets: entry.targets,
          cardDb: this.cardDefMap,
          rng: this.rng,
        });
      } else if (impl.mode === "script") {
        events = impl.script.resolve(
          this.state,
          source,
          entry.controller,
          entry.targets,
          entry.params,
        );
      }
    }

    // Emit events from resolution and process triggers
    this.emitAllAndProcess(events);

    // If source was a spell, move it to trash
    if (def.type === CardType.Spell) {
      this.moveSpellToTrash(entry.sourceInstanceId);
    }
  }

  /** Move a spell card to trash (after chain resolution). */
  private moveSpellToTrash(cardInstanceId: CardInstanceId): void {
    const card = this.state.cards.get(cardInstanceId);
    if (!card) return;
    const ownerState = this.state.players.get(card.owner)!;
    if (!ownerState.trash.includes(cardInstanceId)) {
      ownerState.trash.push(cardInstanceId);
    }
  }

  /**
   * Process triggers for an event — check static and triggered abilities.
   * Static abilities execute immediately. Triggered abilities go on the chain.
   */
  private processTriggers(event: GameEvent, staticDepth = 0): void {
    const triggerCtx: TriggerContext = {
      state: this.state,
      cardDb: this.cardDefMap,
      scripts: this.scripts,
      rng: this.rng,
      nextChainId: () => this.nextChainId(),
    };

    // 1. Static abilities (resolve immediately, depth-limited)
    if (staticDepth < 5) {
      const staticEvents = checkStaticAbilities(event, triggerCtx);
      for (const se of staticEvents) {
        this.emit(se);
        this.processTriggers(se, staticDepth + 1);
      }
    }

    // 2. Triggered abilities (go on chain)
    const chainEntries = findTriggeredAbilities(event, triggerCtx);
    for (const entry of chainEntries) {
      this.state.chain.push(entry);
      this.emit({ type: "chain_entry_added", entry });
      this.emit({ type: "ability_triggered", sourceId: entry.sourceInstanceId, abilityId: entry.abilityId });
    }

    // If new entries were added to chain, reset priority
    if (chainEntries.length > 0) {
      this.state.turn.passed = false;
      this.state.turn.priorityPlayer = this.state.turn.activePlayer;
    }
  }

  /** Check if a card is currently in play (base, legend zone, or battlefield). */
  private isCardInPlay(cardId: CardInstanceId): boolean {
    for (const player of this.state.players.values()) {
      if (player.base.includes(cardId)) return true;
      if (player.legendInstanceId === cardId) return true;
      if (player.chosenChampionInstanceId === cardId && player.chosenChampionPlayed) return true;
    }
    for (const bf of this.state.battlefields) {
      for (const units of bf.units.values()) {
        if (units.includes(cardId)) return true;
      }
    }
    return false;
  }
}
