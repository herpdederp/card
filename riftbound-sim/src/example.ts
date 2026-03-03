// ============================================================================
// Riftbound TCG — Example: Abilities & Chain System Demo
// ============================================================================
// Demonstrates the Phase 2 ability system with three scenarios:
//   Demo 1: Spell on chain (Mystic Shot → damage → destroy)
//   Demo 2: Activated ability (Long Sword → +1 Might buff)
//   Demo 3: Counter-spell chain (Mystic Shot + Deny → LIFO resolution)
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
// DEMO 1: Mystic Shot — Spell on Chain → Resolve → Damage
// ===========================================================================

console.log("\n" + "=".repeat(70));
console.log("DEMO 1: Mystic Shot — Spell on Chain");
console.log("=".repeat(70));

{
  // Deck: interleaved Scrappers + Mystic Shots
  const deck: string[] = [];
  for (let i = 0; i < 20; i++) {
    deck.push("origins-unit-zaunite-scrapper");
    deck.push("origins-spell-mystic-shot");
  }
  const jinxDeck: DeckList = {
    name: "Jinx Aggro",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: deck,
    runeDeckIds: [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)],
    battlefieldIds: ["origins-bf-zaun-streets", "origins-bf-piltover-plaza", "origins-bf-zaun-streets"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1, p2 } = setupGame(engine, jinxDeck, jinxDeck);
  const state = engine.getState();

  // Turn 1: P1 plays a Scrapper
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[0] });
  const scrapper1 = findInHand(engine, p1, "origins-unit-zaunite-scrapper");
  if (scrapper1) engine.processAction({ type: "play_card", player: p1, cardInstanceId: scrapper1 });
  engine.processAction({ type: "declare_done", player: p1 });

  // Turn 2: P2 plays a Scrapper
  engine.processAction({ type: "exhaust_rune", player: p2, runeId: state.players.get(p2)!.runePool[0] });
  const scrapper2 = findInHand(engine, p2, "origins-unit-zaunite-scrapper");
  if (scrapper2) engine.processAction({ type: "play_card", player: p2, cardInstanceId: scrapper2 });
  engine.processAction({ type: "declare_done", player: p2 });

  // Turn 3: P1 casts Mystic Shot (1E + 1 Fury) targeting P2's Scrapper
  console.log(`\n>>> Casting Mystic Shot at opponent's Scrapper...`);
  const rune1 = findReadyRune(engine, p1);
  if (rune1) engine.processAction({ type: "exhaust_rune", player: p1, runeId: rune1 });
  const rune2 = findReadyRune(engine, p1);
  if (rune2) engine.processAction({ type: "recycle_rune", player: p1, runeId: rune2 });

  const mysticShot = findInHand(engine, p1, "origins-spell-mystic-shot");
  const target = state.players.get(p2)!.base[0];

  if (mysticShot && target) {
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: mysticShot, targets: [target] });
    console.log(`    Chain: ${state.chain.length} entry`);

    // Both pass → spell resolves
    engine.processAction({ type: "pass_priority", player: p2 });
    engine.processAction({ type: "pass_priority", player: p1 });

    const inTrash = state.players.get(p2)!.trash.includes(target);
    console.log(`\n>>> RESULT: target destroyed = ${inTrash} ✓`);
  }
}

// ===========================================================================
// DEMO 2: Long Sword — Activated Ability (Exhaust → +1 Might)
// ===========================================================================

console.log("\n\n" + "=".repeat(70));
console.log("DEMO 2: Long Sword — Activated Ability");
console.log("=".repeat(70));

{
  // Deck: interleaved Scrappers + Long Swords
  const deck: string[] = [];
  for (let i = 0; i < 20; i++) {
    deck.push("origins-unit-zaunite-scrapper");
    deck.push("origins-gear-long-sword");
  }
  const gearDeck: DeckList = {
    name: "Gear Demo",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: deck,
    runeDeckIds: [...copies("origins-rune-fury", 6), ...copies("origins-rune-chaos", 6)],
    battlefieldIds: ["origins-bf-zaun-streets", "origins-bf-piltover-plaza", "origins-bf-zaun-streets"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1, p2 } = setupGame(engine, gearDeck, gearDeck);
  const state = engine.getState();

  // Turn 1: P1 plays Scrapper (1E) + Long Sword (1E) using both runes
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[0] });
  engine.processAction({ type: "exhaust_rune", player: p1, runeId: state.players.get(p1)!.runePool[1] });

  const scrapper = findInHand(engine, p1, "origins-unit-zaunite-scrapper");
  const longSword = findInHand(engine, p1, "origins-gear-long-sword");

  if (scrapper && longSword) {
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: scrapper });
    engine.processAction({ type: "play_card", player: p1, cardInstanceId: longSword });

    console.log(`\n>>> P1 base: ${state.players.get(p1)!.base.length} cards (Scrapper + Long Sword)`);

    // Check Scrapper's Might before buff
    const scrapperDef = engine.getCardDef(scrapper);
    const scrapperCard = state.cards.get(scrapper)!;
    const baseMight = scrapperDef?.might ?? 0;
    const mightBefore = baseMight + scrapperCard.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
    console.log(`    Scrapper Might before: ${mightBefore}`);

    // Activate Long Sword: Exhaust → target friendly unit gets +1 Might
    console.log(`\n>>> Activating Long Sword on Scrapper...`);
    const activated = engine.processAction({
      type: "activate_ability",
      player: p1,
      sourceId: longSword,
      abilityId: "long-sword-effect",
      targets: [scrapper],
    });
    console.log(`    Activated: ${activated}`);
    console.log(`    Chain: ${state.chain.length} entry`);

    // Both pass → ability resolves
    engine.processAction({ type: "pass_priority", player: p2 });
    engine.processAction({ type: "pass_priority", player: p1 });

    const mightAfter = baseMight + scrapperCard.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
    console.log(`\n>>> RESULT: Scrapper Might after: ${mightAfter} (+1 buff) ✓`);
    console.log(`    Long Sword exhausted: ${state.cards.get(longSword)!.exhausted}`);
    console.log(`    Buff duration: ${scrapperCard.modifiers[0]?.duration}`);
  } else {
    console.log("    Missing Scrapper or Long Sword in hand — skipping");
  }
}

// ===========================================================================
// DEMO 3: Mystic Shot + Deny — Counter-Spell Chain (LIFO)
// ===========================================================================

console.log("\n\n" + "=".repeat(70));
console.log("DEMO 3: Mystic Shot + Deny — Counter-Spell Chain");
console.log("=".repeat(70));

{
  // Both players get a mixed deck so the active player (attacker) has
  // Mystic Shot and the non-active player (denier) has Deny, regardless
  // of which player goes first.
  const mixedDeck: string[] = [];
  for (let i = 0; i < 10; i++) {
    mixedDeck.push("origins-unit-zaunite-scrapper");
    mixedDeck.push("origins-spell-mystic-shot");
    mixedDeck.push("origins-unit-zaunite-scrapper");
    mixedDeck.push("origins-spell-denial");
  }

  const sharedDeck: DeckList = {
    name: "Mixed",
    legendId: "origins-legend-jinx",
    chosenChampionId: "origins-champ-jinx-fury",
    mainDeckIds: mixedDeck,
    runeDeckIds: [...copies("origins-rune-fury", 4), ...copies("origins-rune-calm", 4), ...copies("origins-rune-chaos", 4)],
    battlefieldIds: ["origins-bf-zaun-streets", "origins-bf-piltover-plaza", "origins-bf-zaun-streets"],
    sideboardIds: [],
  };

  const engine = createEngine();
  const { p1: attacker, p2: denier } = setupGame(engine, sharedDeck, sharedDeck);
  const state = engine.getState();

  // Turn 1: Attacker plays a Scrapper
  engine.processAction({ type: "exhaust_rune", player: attacker, runeId: state.players.get(attacker)!.runePool[0] });
  const aScrapper = findInHand(engine, attacker, "origins-unit-zaunite-scrapper");
  if (aScrapper) engine.processAction({ type: "play_card", player: attacker, cardInstanceId: aScrapper });
  engine.processAction({ type: "declare_done", player: attacker });

  // Turn 2: Denier plays a Scrapper
  engine.processAction({ type: "exhaust_rune", player: denier, runeId: state.players.get(denier)!.runePool[0] });
  const dScrapper = findInHand(engine, denier, "origins-unit-zaunite-scrapper");
  if (dScrapper) engine.processAction({ type: "play_card", player: denier, cardInstanceId: dScrapper });
  engine.processAction({ type: "declare_done", player: denier });

  // Turn 3: Attacker casts Mystic Shot → Denier responds with Deny
  console.log(`\n>>> ${attacker} casts Mystic Shot at ${denier}'s Scrapper...`);

  // Pay for Mystic Shot (1E + 1 Fury)
  const aRune1 = findReadyRune(engine, attacker);
  if (aRune1) engine.processAction({ type: "exhaust_rune", player: attacker, runeId: aRune1 });
  const aRune2 = findReadyRune(engine, attacker);
  if (aRune2) engine.processAction({ type: "recycle_rune", player: attacker, runeId: aRune2 });

  const mysticShot = findInHand(engine, attacker, "origins-spell-mystic-shot");
  const targetScrapper = state.players.get(denier)!.base[0];

  if (mysticShot && targetScrapper) {
    engine.processAction({
      type: "play_card",
      player: attacker,
      cardInstanceId: mysticShot,
      targets: [targetScrapper],
    });
    console.log(`    Chain: [Mystic Shot] — ${state.chain.length} entry`);
    console.log(`    Priority: ${state.turn.priorityPlayer} (denier = ${denier})`);

    // Pre-load denier's resources for Deny (2E + 1 Calm).
    // In a real game these would be accumulated from rune operations over
    // previous turns; here we set them directly to focus on the chain demo.
    const denierState = state.players.get(denier)!;
    denierState.currentEnergy = 2;
    denierState.currentPower.push({ domain: Domain.Calm, amount: 1 });

    const deny = findInHand(engine, denier, "origins-spell-denial");
    if (deny) {
      console.log(`\n>>> ${denier} responds with Deny!`);
      const denyPlayed = engine.processAction({ type: "play_card", player: denier, cardInstanceId: deny });
      console.log(`    Deny played: ${denyPlayed}`);
      console.log(`    Chain: [Mystic Shot, Deny] — ${state.chain.length} entries`);

      // Both players pass → top of chain (Deny) resolves first (LIFO)
      console.log(`\n>>> Both players pass → Deny resolves first...`);
      engine.processAction({ type: "pass_priority", player: attacker });
      engine.processAction({ type: "pass_priority", player: denier });

      console.log(`    After Deny: chain has ${state.chain.length} entry`);
      if (state.chain.length > 0) {
        console.log(`    Mystic Shot cancelled: ${state.chain[0].cancelled}`);
      }

      // Both pass again → cancelled Mystic Shot pops off (skipped)
      console.log(`>>> Both pass again → cancelled Mystic Shot resolves (skipped)...`);
      engine.processAction({ type: "pass_priority", player: state.turn.priorityPlayer });
      const nextP = state.turn.priorityPlayer;
      engine.processAction({ type: "pass_priority", player: nextP });

      console.log(`    Chain empty: ${state.chain.length === 0}`);

      const alive = denierState.base.includes(targetScrapper);
      const inTrash = denierState.trash.includes(targetScrapper);
      console.log(`\n>>> RESULT: Scrapper alive = ${alive}, in trash = ${inTrash}`);
      if (alive) console.log(`    Deny countered Mystic Shot — Scrapper survived! ✓`);
    } else {
      console.log(`    No Deny in hand — skipping counter demo`);
      engine.processAction({ type: "pass_priority", player: denier });
      engine.processAction({ type: "pass_priority", player: attacker });
    }
  } else {
    console.log("    Missing Mystic Shot or target — skipping demo");
  }
}

// ---------------------------------------------------------------------------
// Final Summary
// ---------------------------------------------------------------------------
console.log("\n" + "=".repeat(70));
console.log("All demos complete.");
console.log("=".repeat(70));
