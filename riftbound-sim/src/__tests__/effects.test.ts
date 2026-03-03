// ============================================================================
// Riftbound TCG — Effects Interpreter Tests
// ============================================================================

import { describe, it, expect } from "vitest";
import { executeEffects, type EffectContext } from "../engine/effects.js";
import type { EffectDescriptor } from "../cards/abilities.js";
import type { CardInstanceId, PlayerId } from "../models/card.js";
import { Domain } from "../models/card.js";
import { makeMinimalState, makeCard, makeUnitDef, makeEffectContext } from "./test-helpers.js";

// ---------------------------------------------------------------------------
// deal_damage
// ---------------------------------------------------------------------------

describe("deal_damage", () => {
  it("deals damage to a targeted unit", () => {
    const state = makeMinimalState();
    const target = makeCard("test-unit", "player2");
    const source = makeCard("test-source", "player1");
    state.cards.set(target.instanceId, target);
    state.cards.set(source.instanceId, source);

    const def = makeUnitDef("test-unit", { health: 5 });
    const cardDb = new Map([[def.id, def]]);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
      cardDb,
    });

    const effects: EffectDescriptor[] = [
      { type: "deal_damage", amount: 3, target: "target" },
    ];

    const events = executeEffects(effects, ctx);

    expect(target.damage).toBe(3);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ type: "effect_damage", amount: 3 });
  });

  it("destroys a unit when damage meets health", () => {
    const state = makeMinimalState();
    const target = makeCard("test-unit", "player2");
    const source = makeCard("test-source", "player1");
    state.cards.set(target.instanceId, target);
    state.cards.set(source.instanceId, source);
    state.players.get("player2")!.base.push(target.instanceId);

    const def = makeUnitDef("test-unit", { health: 2 });
    const cardDb = new Map([[def.id, def]]);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
      cardDb,
    });

    const effects: EffectDescriptor[] = [
      { type: "deal_damage", amount: 2, target: "target" },
    ];

    const events = executeEffects(effects, ctx);

    expect(events.some(e => e.type === "card_destroyed")).toBe(true);
    expect(state.players.get("player2")!.trash).toContain(target.instanceId);
    expect(state.players.get("player2")!.base).not.toContain(target.instanceId);
  });

  it("does not destroy when damage is below health", () => {
    const state = makeMinimalState();
    const target = makeCard("test-unit", "player2");
    const source = makeCard("test-source", "player1");
    state.cards.set(target.instanceId, target);
    state.cards.set(source.instanceId, source);
    state.players.get("player2")!.base.push(target.instanceId);

    const def = makeUnitDef("test-unit", { health: 5 });
    const cardDb = new Map([[def.id, def]]);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
      cardDb,
    });

    const effects: EffectDescriptor[] = [
      { type: "deal_damage", amount: 2, target: "target" },
    ];

    const events = executeEffects(effects, ctx);

    expect(target.damage).toBe(2);
    expect(events.every(e => e.type !== "card_destroyed")).toBe(true);
    expect(state.players.get("player2")!.base).toContain(target.instanceId);
  });

  it("damages all enemy units with 'all_enemy_units' target", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const enemy1 = makeCard("test-unit", "player2");
    const enemy2 = makeCard("test-unit", "player2");
    state.cards.set(source.instanceId, source);
    state.cards.set(enemy1.instanceId, enemy1);
    state.cards.set(enemy2.instanceId, enemy2);
    state.players.get("player2")!.base.push(enemy1.instanceId, enemy2.instanceId);

    const def = makeUnitDef("test-unit", { health: 5 });
    const cardDb = new Map([[def.id, def]]);

    const ctx = makeEffectContext(state, source, { cardDb });

    const effects: EffectDescriptor[] = [
      { type: "deal_damage", amount: 1, target: "all_enemy_units" },
    ];

    const events = executeEffects(effects, ctx);

    expect(enemy1.damage).toBe(1);
    expect(enemy2.damage).toBe(1);
    expect(events.filter(e => e.type === "effect_damage")).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// draw_cards
// ---------------------------------------------------------------------------

describe("draw_cards", () => {
  it("draws cards from deck to hand", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);

    const card1 = makeCard("deck-card-1", "player1");
    const card2 = makeCard("deck-card-2", "player1");
    state.cards.set(card1.instanceId, card1);
    state.cards.set(card2.instanceId, card2);

    const p1 = state.players.get("player1")!;
    p1.mainDeck.push(card1.instanceId, card2.instanceId);

    const ctx = makeEffectContext(state, source);

    const effects: EffectDescriptor[] = [
      { type: "draw_cards", player: "controller", amount: 2 },
    ];

    const events = executeEffects(effects, ctx);

    expect(p1.hand).toContain(card1.instanceId);
    expect(p1.hand).toContain(card2.instanceId);
    expect(p1.mainDeck).toHaveLength(0);
    expect(events).toHaveLength(2);
    expect(events.every(e => e.type === "card_drawn")).toBe(true);
  });

  it("draws for opponent when player is 'opponent'", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);

    const card = makeCard("opp-card", "player2");
    state.cards.set(card.instanceId, card);
    state.players.get("player2")!.mainDeck.push(card.instanceId);

    const ctx = makeEffectContext(state, source);

    const effects: EffectDescriptor[] = [
      { type: "draw_cards", player: "opponent", amount: 1 },
    ];

    executeEffects(effects, ctx);

    expect(state.players.get("player2")!.hand).toContain(card.instanceId);
  });

  it("stops when deck is empty", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);

    const card = makeCard("only-card", "player1");
    state.cards.set(card.instanceId, card);
    state.players.get("player1")!.mainDeck.push(card.instanceId);

    const ctx = makeEffectContext(state, source);

    const effects: EffectDescriptor[] = [
      { type: "draw_cards", player: "controller", amount: 5 },
    ];

    const events = executeEffects(effects, ctx);

    expect(events).toHaveLength(1); // Only 1 card was available
    expect(state.players.get("player1")!.hand).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// buff_might
// ---------------------------------------------------------------------------

describe("buff_might", () => {
  it("adds a modifier with correct might delta", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
    });

    const effects: EffectDescriptor[] = [
      { type: "buff_might", amount: 2, target: "target", duration: "end_of_turn" },
    ];

    executeEffects(effects, ctx);

    expect(target.modifiers).toHaveLength(1);
    expect(target.modifiers[0].mightDelta).toBe(2);
    expect(target.modifiers[0].duration).toBe("end_of_turn");
  });

  it("adds permanent buff", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
    });

    const effects: EffectDescriptor[] = [
      { type: "buff_might", amount: 1, target: "target", duration: "permanent" },
    ];

    executeEffects(effects, ctx);

    expect(target.modifiers[0].duration).toBe("permanent");
  });
});

// ---------------------------------------------------------------------------
// heal
// ---------------------------------------------------------------------------

describe("heal", () => {
  it("reduces damage on a unit", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    target.damage = 4;
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
    });

    const effects: EffectDescriptor[] = [
      { type: "heal", amount: 2, target: "target" },
    ];

    executeEffects(effects, ctx);

    expect(target.damage).toBe(2);
  });

  it("does not heal below 0 damage", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    target.damage = 1;
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
    });

    const effects: EffectDescriptor[] = [
      { type: "heal", amount: 5, target: "target" },
    ];

    executeEffects(effects, ctx);

    expect(target.damage).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// destroy_target
// ---------------------------------------------------------------------------

describe("destroy_target", () => {
  it("removes unit from base and moves to trash", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player2");
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);
    state.players.get("player2")!.base.push(target.instanceId);

    const ctx = makeEffectContext(state, source, {
      targets: [target.instanceId],
    });

    const effects: EffectDescriptor[] = [
      { type: "destroy_target", target: "target" },
    ];

    const events = executeEffects(effects, ctx);

    expect(state.players.get("player2")!.base).not.toContain(target.instanceId);
    expect(state.players.get("player2")!.trash).toContain(target.instanceId);
    expect(events.some(e => e.type === "card_destroyed")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// generate_energy / generate_power
// ---------------------------------------------------------------------------

describe("resource generation", () => {
  it("generates energy", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);

    const ctx = makeEffectContext(state, source);

    executeEffects([{ type: "generate_energy", amount: 3 }], ctx);

    expect(state.players.get("player1")!.currentEnergy).toBe(3);
  });

  it("generates domain power", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);

    const ctx = makeEffectContext(state, source);

    executeEffects([{ type: "generate_power", domain: Domain.Mind, amount: 2 }], ctx);

    const power = state.players.get("player1")!.currentPower;
    expect(power).toHaveLength(1);
    expect(power[0]).toMatchObject({ domain: Domain.Mind, amount: 2 });
  });
});

// ---------------------------------------------------------------------------
// conditional
// ---------------------------------------------------------------------------

describe("conditional", () => {
  it("executes 'then' branch when condition is true", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);
    state.players.get("player1")!.score = 5;

    const ctx = makeEffectContext(state, source);

    const effects: EffectDescriptor[] = [
      {
        type: "conditional",
        condition: { type: "score_comparison", player: "controller", comparison: ">=", value: 3 },
        then: { type: "generate_energy", amount: 2 },
      },
    ];

    executeEffects(effects, ctx);

    expect(state.players.get("player1")!.currentEnergy).toBe(2);
  });

  it("executes 'else' branch when condition is false", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    state.cards.set(source.instanceId, source);
    state.players.get("player1")!.score = 1;

    const ctx = makeEffectContext(state, source);

    const effects: EffectDescriptor[] = [
      {
        type: "conditional",
        condition: { type: "score_comparison", player: "controller", comparison: ">=", value: 3 },
        then: { type: "generate_energy", amount: 5 },
        else: { type: "generate_energy", amount: 1 },
      },
    ];

    executeEffects(effects, ctx);

    expect(state.players.get("player1")!.currentEnergy).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// exhaust_target / ready_target
// ---------------------------------------------------------------------------

describe("exhaust and ready", () => {
  it("exhausts a target", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, { targets: [target.instanceId] });

    executeEffects([{ type: "exhaust_target", target: "target" }], ctx);

    expect(target.exhausted).toBe(true);
  });

  it("readies a target", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    target.exhausted = true;
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, { targets: [target.instanceId] });

    executeEffects([{ type: "ready_target", target: "target" }], ctx);

    expect(target.exhausted).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Multiple effects in sequence
// ---------------------------------------------------------------------------

describe("sequential effects", () => {
  it("executes multiple effects in order", () => {
    const state = makeMinimalState();
    const source = makeCard("test-source", "player1");
    const target = makeCard("test-unit", "player1");
    state.cards.set(source.instanceId, source);
    state.cards.set(target.instanceId, target);

    const ctx = makeEffectContext(state, source, { targets: [target.instanceId] });

    const effects: EffectDescriptor[] = [
      { type: "buff_might", amount: 3, target: "target", duration: "end_of_turn" },
      { type: "generate_energy", amount: 1 },
    ];

    executeEffects(effects, ctx);

    expect(target.modifiers).toHaveLength(1);
    expect(target.modifiers[0].mightDelta).toBe(3);
    expect(state.players.get("player1")!.currentEnergy).toBe(1);
  });
});
