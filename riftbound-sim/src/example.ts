// ============================================================================
// Riftbound TCG — Example: Abilities & Chain System Demo
// ============================================================================
// Demonstrates the Phase 2 ability system with three scenarios:
//   Demo 1: Spell on chain (Get Excited! → damage → destroy)
//   Demo 2: Activated ability (Iron Ballista → +1 Might buff)
//   Demo 3: Counter-spell chain (Get Excited! + Defy → LIFO resolution)
// ============================================================================

import { CardDatabase } from "./cards/database.js";
import { CardScriptRegistry } from "./cards/abilities.js";
import { RiftboundEngine } from "./engine/engine.js";
import { originsCards } from "./cards/origins/sample-cards.js";
import { registerOriginsScripts } from "./cards/origins/sample-scripts.js";
import { GameMode, type GameConfig } from "./models/game-state.js";
import { Domain } from "./models/card.js";
import type { DeckList, PlayerId, CardInstanceId } from "./models/card.js";

// ---------------------------------------------------------------------------
// Common setup
// ---------------------------------------------------------------------------

const db = new CardDatabase();
db.loadCards(originsCards);

const scripts = new CardScriptRegistry();
registerOriginsScripts(scripts);

console.log(`Loaded ${db.size} cards with ${scripts.registeredIds().length} scripted cards`);

const copies = (id: string, n: number): string[] => Array(n).fill(id);

const config: GameConfig = {
  mode: GameMode.Standard1v1,
  playerCount: 2,
  winTarget: 8,
  turnTimerSeconds: 0,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createEngine(verbose = true): RiftboundEngine {
  const engine = new RiftboundEngine(db, scripts);
  if (verbose) {
    engine.on((event) => {
      switch (event.type) {
        case "game_started": console.log("\n=== GAME STARTED ==="); break;
        case "turn_started": console.log(`\n--- Turn ${event.turnNumber}: ${event.player}'s turn ---`); break;
        case "phase_changed": console.log(`  Phase: ${event.phase}`); break;
        case "card_drawn": console.log(`  ${event.player} drew a card`); break;
        case "rune_channeled": console.log(`  ${event.player} channeled a rune`); break;
        case "card_played": console.log(`  ${event.player} played a card → ${event.zone}`); break;
        case "rune_exhausted": console.log(`  ${event.player} exhausted a rune (+${event.energyGenerated} Energy)`); break;
        case "rune_recycled": console.log(`  ${event.player} recycled a rune (+${event.powerGenerated} Power)`); break;
        case "chain_entry_added": console.log(`  [CHAIN] Entry added: ${event.entry.abilityId} (by ${event.entry.controller})`); break;
        case "chain_entry_resolved": console.log(`  [CHAIN] Entry resolved: ${event.entryId}`); break;
        case "ability_triggered": console.log(`  [ABILITY] Triggered: ${event.abilityId}`); break;
        case "effect_damage": console.log(`  [EFFECT] Dealt ${event.amount} damage to ${event.targetId}`); break;
        case "card_countered": console.log(`  [COUNTER] Entry ${event.entryId} countered!`); break;
        case "card_destroyed": console.log(`  Card destroyed: ${event.cardInstanceId}`); break;
        case "score_changed": console.log(`  ${event.player} scored! ${event.oldScore} → ${event.newScore} (${event.reason})`); break;
        case "game_over": console.log(`\n=== GAME OVER — ${event.winner} wins! (${event.reason}) ===`); break;
      }
    });
  }
  return engine;
}

function findInHand(engine: RiftboundEngine, player: PlayerId, defId: string): CardInstanceId | undefined {
  const state = engine.getState();
  const ps = state.players.get(player)!;
  return ps.hand.find(id => state.cards.get(id)?.definitionId === defId);
}

function findReadyRune(engine: RiftboundEngine, player: PlayerId): CardInstanceId | undefined {
  const state = engine.getState();
  const ps = state.players.get(player)!;
  return ps.runePool.find(id => !state.cards.get(id)?.exhausted);
}

function setupGame(engine: RiftboundEngine, p1Deck: DeckList, p2Deck: DeckList): { p1: PlayerId; p2: PlayerId } {
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

// ===========================================================================
// DEMO 1: Get Excited! — Spell on Chain → Resolve → Damage
// ===========================================================================

console.log("\n" + "=".repeat(70));
console.log("DEMO 1: Get Excited! — Spell on Chain");
console.log("=".repeat(70));

{
  // Deck: interleaved Chemtech Enforcers + Get Excited! spells
  const deck: string[] = [];
  for (let i = 0; i < 20; i++) {
    deck.push("origins-unit-chemtech-enforcer");
    deck.push("origins-spell-get-excited");
  }
  const jinxDeck: DeckList = {
    name: "Jinx Aggro",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: deck,
    runeDeckIds: [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)],
    battlefieldIds: ["origins-bf-zaun-warrens", "origins-bf-grand-plaza", "origins-bf-zaun-warrens"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1, p2 } = setupGame(engine, jinxDeck, jinxDeck);
  const state = engine.getState();

  // Turn 1: P1 plays a Chemtech Enforcer
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[1] });
  const enforcer1 = findInHand(engine, p1, "origins-unit-chemtech-enforcer");
  if (enforcer1) engine.processAction({ type: "play_card", player: p1, cardInstanceId: enforcer1 });
  engine.processAction({ type: "declare_done", player: p1 });

  // Turn 2: P2 plays a Chemtech Enforcer
  engine.processAction({ type: "exhaust_rune", player: p2, runeId: state.players.get(p2)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: p2, runeId: state.players.get(p2)!.runePool[1] });
  const enforcer2 = findInHand(engine, p2, "origins-unit-chemtech-enforcer");
  if (enforcer2) engine.processAction({ type: "play_card", player: p2, cardInstanceId: enforcer2 });
  engine.processAction({ type: "declare_done", player: p2 });

  // Turn 3: P1 casts Get Excited! (2E + 1 Fury) targeting P2's Enforcer
  console.log(`\n>>> Casting Get Excited! at opponent's Chemtech Enforcer...`);
  const rune1 = findReadyRune(engine, p1);
  if (rune1) engine.processAction({ type: "exhaust_rune", player: p1, runeId: rune1 });
  const rune2 = findReadyRune(engine, p1);
  if (rune2) engine.processAction({ type: "exhaust_rune", player: p1, runeId: rune2 });
  const rune3 = findReadyRune(engine, p1);
  if (rune3) engine.processAction({ type: "recycle_rune", player: p1, runeId: rune3 });

  const getExcited = findInHand(engine, p1, "origins-spell-get-excited");
  const target = state.players.get(p2)!.base[0];

  if (getExcited && target) {
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: getExcited, targets: [target] });
    console.log(`    Chain: ${state.chain.length} entry`);

    // Both pass → spell resolves
    engine.processAction({ type: "pass_priority", player: p2 });
    engine.processAction({ type: "pass_priority", player: p1 });

    const inTrash = state.players.get(p2)!.trash.includes(target);
    console.log(`\n>>> RESULT: target destroyed = ${inTrash} ✓`);
  }
}

// ===========================================================================
// DEMO 2: Iron Ballista — Activated Ability (Exhaust → +1 Might)
// ===========================================================================

console.log("\n\n" + "=".repeat(70));
console.log("DEMO 2: Iron Ballista — Activated Ability");
console.log("=".repeat(70));

{
  // Deck: interleaved Chemtech Enforcers + Iron Ballistas
  const deck: string[] = [];
  for (let i = 0; i < 20; i++) {
    deck.push("origins-unit-chemtech-enforcer");
    deck.push("origins-gear-iron-ballista");
  }
  const gearDeck: DeckList = {
    name: "Gear Demo",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: deck,
    runeDeckIds: [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)],
    battlefieldIds: ["origins-bf-zaun-warrens", "origins-bf-grand-plaza", "origins-bf-zaun-warrens"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1, p2 } = setupGame(engine, gearDeck, gearDeck);
  const state = engine.getState();

  // Turn 1: P1 plays Chemtech Enforcer (2E) + Iron Ballista (1E)
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[1] });

  const enforcer = findInHand(engine, p1, "origins-unit-chemtech-enforcer");
  const ballista = findInHand(engine, p1, "origins-gear-iron-ballista");

  if (enforcer && ballista) {
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: enforcer });
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: ballista });

    console.log(`\n>>> P1 base: ${state.players.get(p1)!.base.length} cards (Enforcer + Iron Ballista)`);

    // Check Enforcer's Might before buff
    const enforcerDef = engine.getCardDef(enforcer);
    const enforcerCard = state.cards.get(enforcer)!;
    const baseMight = enforcerDef?.might ?? 0;
    const mightBefore = baseMight + enforcerCard.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
    console.log(`    Enforcer Might before: ${mightBefore}`);

    // Activate Iron Ballista: Exhaust → target friendly unit gets +1 Might
    console.log(`\n>>> Activating Iron Ballista on Enforcer...`);
    const activated = engine.processAction({
      type: "activate_ability",
      player: p1,
      sourceId: ballista,
      abilityId: "iron-ballista-effect",
      targets: [enforcer],
    });
    console.log(`    Activated: ${activated}`);
    console.log(`    Chain: ${state.chain.length} entry`);

    // Both pass → ability resolves
    engine.processAction({ type: "pass_priority", player: p2 });
    engine.processAction({ type: "pass_priority", player: p1 });

    const mightAfter = baseMight + enforcerCard.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
    console.log(`\n>>> RESULT: Enforcer Might after: ${mightAfter} (+1 buff) ✓`);
    console.log(`    Iron Ballista exhausted: ${state.cards.get(ballista)!.exhausted}`);
    console.log(`    Buff duration: ${enforcerCard.modifiers[0]?.duration}`);
  } else {
    console.log("    Missing Enforcer or Iron Ballista in hand — skipping");
  }
}

// ===========================================================================
// DEMO 3: Get Excited! + Defy — Counter-Spell Chain (LIFO)
// ===========================================================================

console.log("\n\n" + "=".repeat(70));
console.log("DEMO 3: Get Excited! + Defy — Counter-Spell Chain");
console.log("=".repeat(70));

{
  // Both players get a mixed deck
  const mixedDeck: string[] = [];
  for (let i = 0; i < 10; i++) {
    mixedDeck.push("origins-unit-chemtech-enforcer");
    mixedDeck.push("origins-spell-get-excited");
    mixedDeck.push("origins-unit-chemtech-enforcer");
    mixedDeck.push("origins-spell-defy");
  }

  const sharedDeck: DeckList = {
    name: "Mixed",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: mixedDeck,
    runeDeckIds: [...copies("origins-rune-fury", 4), ...copies("origins-rune-calm", 4), ...copies("origins-rune-chaos", 4)],
    battlefieldIds: ["origins-bf-zaun-warrens", "origins-bf-grand-plaza", "origins-bf-zaun-warrens"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1: attacker, p2: denier } = setupGame(engine, sharedDeck, sharedDeck);
  const state = engine.getState();

  // Turn 1: Attacker plays a Chemtech Enforcer
  engine.processAction({ type: "exhaust_rune", player: attacker, runeId: state.players.get(attacker)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: attacker, runeId: state.players.get(attacker)!.runePool[1] });
  const aEnforcer = findInHand(engine, attacker, "origins-unit-chemtech-enforcer");
  if (aEnforcer) engine.processAction({ type: "play_card", player: attacker, cardInstanceId: aEnforcer });
  engine.processAction({ type: "declare_done", player: attacker });

  // Turn 2: Denier plays a Chemtech Enforcer
  engine.processAction({ type: "exhaust_rune", player: denier, runeId: state.players.get(denier)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: denier, runeId: state.players.get(denier)!.runePool[1] });
  const dEnforcer = findInHand(engine, denier, "origins-unit-chemtech-enforcer");
  if (dEnforcer) engine.processAction({ type: "play_card", player: denier, cardInstanceId: dEnforcer });
  engine.processAction({ type: "declare_done", player: denier });

  // Turn 3: Attacker casts Get Excited! → Denier responds with Defy
  console.log(`\n>>> ${attacker} casts Get Excited! at ${denier}'s Enforcer...`);

  // Pay for Get Excited! (2E + 1 Fury)
  const aRune1 = findReadyRune(engine, attacker);
  if (aRune1) engine.processAction({ type: "exhaust_rune", player: attacker, runeId: aRune1 });
  const aRune2 = findReadyRune(engine, attacker);
  if (aRune2) engine.processAction({ type: "exhaust_rune", player: attacker, runeId: aRune2 });
  const aRune3 = findReadyRune(engine, attacker);
  if (aRune3) engine.processAction({ type: "recycle_rune", player: attacker, runeId: aRune3 });

  const getExcited = findInHand(engine, attacker, "origins-spell-get-excited");
  const targetEnforcer = state.players.get(denier)!.base[0];

  if (getExcited && targetEnforcer) {
    engine.processAction({
      type: "play_card",
      player: attacker,
      cardInstanceId: getExcited,
      targets: [targetEnforcer],
    });
    console.log(`    Chain: [Get Excited!] — ${state.chain.length} entry`);
    console.log(`    Priority: ${state.turn.priorityPlayer} (denier = ${denier})`);

    // Pre-load denier's resources for Defy (1E + 1 Calm).
    const denierState = state.players.get(denier)!;
    denierState.currentEnergy = 1;
    denierState.currentPower.push({ domain: Domain.Calm, amount: 1 });

    const defy = findInHand(engine, denier, "origins-spell-defy");
    if (defy) {
      console.log(`\n>>> ${denier} responds with Defy!`);
      const defyPlayed = engine.processAction({ type: "play_card", player: denier, cardInstanceId: defy });
      console.log(`    Defy played: ${defyPlayed}`);
      console.log(`    Chain: [Get Excited!, Defy] — ${state.chain.length} entries`);

      // Both players pass → top of chain (Defy) resolves first (LIFO)
      console.log(`\n>>> Both players pass → Defy resolves first...`);
      engine.processAction({ type: "pass_priority", player: attacker });
      engine.processAction({ type: "pass_priority", player: denier });

      console.log(`    After Defy: chain has ${state.chain.length} entry`);
      if (state.chain.length > 0) {
        console.log(`    Get Excited! cancelled: ${state.chain[0].cancelled}`);
      }

      // Both pass again → cancelled Get Excited! pops off (skipped)
      console.log(`>>> Both pass again → cancelled Get Excited! resolves (skipped)...`);
      engine.processAction({ type: "pass_priority", player: state.turn.priorityPlayer });
      const nextP = state.turn.priorityPlayer;
      engine.processAction({ type: "pass_priority", player: nextP });

      console.log(`    Chain empty: ${state.chain.length === 0}`);

      const alive = denierState.base.includes(targetEnforcer);
      const inTrash = denierState.trash.includes(targetEnforcer);
      console.log(`\n>>> RESULT: Enforcer alive = ${alive}, in trash = ${inTrash}`);
      if (alive) console.log(`    Defy countered Get Excited! — Enforcer survived! ✓`);
    } else {
      console.log(`    No Defy in hand — skipping counter demo`);
      engine.processAction({ type: "pass_priority", player: denier });
      engine.processAction({ type: "pass_priority", player: attacker });
    }
  } else {
    console.log("    Missing Get Excited! or target — skipping demo");
  }
}

// ---------------------------------------------------------------------------
// Final Summary
// ---------------------------------------------------------------------------
console.log("\n" + "=".repeat(70));
console.log("All demos complete.");
console.log("=".repeat(70));
