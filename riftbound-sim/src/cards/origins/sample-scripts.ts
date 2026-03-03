// ============================================================================
// Riftbound TCG — Origins Set Card Scripts
// ============================================================================
// Implements the ability logic for every sample card that has abilities.
// Uses the hybrid approach: DSL descriptors for simple effects, full scripts
// for complex/context-dependent abilities.
// ============================================================================

import type { CardScript, AbilityImplementation } from "../abilities.js";
import type { CardScriptRegistry } from "../abilities.js";
import type { GameState, GameEvent, CardInstance } from "../../models/game-state.js";
import type { CardInstanceId, PlayerId, CardDefinition } from "../../models/card.js";
import { CardType } from "../../models/card.js";

// ---------------------------------------------------------------------------
// Jinx Legend: "Get Excited!"
// OnConquer → deal 1 damage to each enemy unit at another Battlefield
// ---------------------------------------------------------------------------

const jinxLegendScript: CardScript = {
  cardDefId: "origins-legend-jinx",
  abilities: new Map<string, AbilityImplementation>([
    ["jinx-legend-ability", {
      mode: "script",
      script: {
        abilityId: "jinx-legend-ability",
        resolve: (state, source, controller, _targets, params) => {
          const events: GameEvent[] = [];
          const conqueredBfId = params.battlefieldId as CardInstanceId;

          for (const bf of state.battlefields) {
            if (bf.cardInstanceId === conqueredBfId) continue; // "another" battlefield
            for (const [playerId, unitIds] of bf.units) {
              if (playerId === controller) continue; // enemy units only
              for (const unitId of [...unitIds]) { // copy array since we might modify
                const unit = state.cards.get(unitId);
                if (unit) {
                  unit.damage += 1;
                  events.push({
                    type: "effect_damage",
                    sourceId: source.instanceId,
                    targetId: unitId,
                    amount: 1,
                  });
                }
              }
            }
          }

          return events;
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Jinx Champion (Fury): "Fishbones"
// OnConquer → deal 2 damage to target enemy unit
// ---------------------------------------------------------------------------

const jinxChampionFuryScript: CardScript = {
  cardDefId: "origins-champ-jinx-fury",
  abilities: new Map<string, AbilityImplementation>([
    ["jinx-fury-champ-ability", {
      mode: "dsl",
      effects: [{ type: "deal_damage", amount: 2, target: "target" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Caitlyn: "Headshot"
// OnMove → deal 1 damage to target enemy unit at that battlefield
// ---------------------------------------------------------------------------

const caitlynScript: CardScript = {
  cardDefId: "origins-unit-caitlyn",
  abilities: new Map<string, AbilityImplementation>([
    ["caitlyn-ability", {
      mode: "dsl",
      effects: [{ type: "deal_damage", amount: 1, target: "target" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Viktor Legend: "Glorious Evolution" (STATIC)
// When you play a Gear, draw a card
// ---------------------------------------------------------------------------

const viktorLegendScript: CardScript = {
  cardDefId: "origins-legend-viktor",
  abilities: new Map<string, AbilityImplementation>([
    ["viktor-legend-ability", {
      mode: "script",
      script: {
        abilityId: "viktor-legend-ability",
        resolve: (state, _source, controller, _targets, params) => {
          const triggerEvent = params.triggerEvent as GameEvent;
          if (triggerEvent.type !== "card_played") return [];
          if (triggerEvent.player !== controller) return [];

          // Check if the played card is a Gear
          const playedCard = state.cards.get(triggerEvent.cardInstanceId);
          if (!playedCard) return [];

          const cardDb = params.cardDb as Map<string, CardDefinition>;
          if (!cardDb) return [];

          const playedDef = cardDb.get(playedCard.definitionId);
          if (!playedDef || playedDef.type !== CardType.Gear) return [];

          // Draw a card
          const events: GameEvent[] = [];
          const playerState = state.players.get(controller)!;
          if (playerState.mainDeck.length > 0) {
            const drawnId = playerState.mainDeck.shift()!;
            playerState.hand.push(drawnId);
            events.push({ type: "card_drawn", player: controller, cardInstanceId: drawnId });
          }
          return events;
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Lee Sin Legend: "Dragon's Rage" (STATIC)
// After a unit you control wins a Showdown alone, ready it
// ---------------------------------------------------------------------------

const leeSinLegendScript: CardScript = {
  cardDefId: "origins-legend-leesin",
  abilities: new Map<string, AbilityImplementation>([
    ["leesin-legend-ability", {
      mode: "script",
      script: {
        abilityId: "leesin-legend-ability",
        resolve: (state, _source, controller, _targets, params) => {
          const triggerEvent = params.triggerEvent as GameEvent;
          if (triggerEvent.type !== "battlefield_conquered") return [];
          if (triggerEvent.conqueror !== controller) return [];

          const bf = state.battlefields.find(b => b.cardInstanceId === triggerEvent.battlefieldId);
          if (!bf) return [];

          const controllerUnits = bf.units.get(controller) ?? [];
          if (controllerUnits.length !== 1) return []; // Must be "alone"

          const unitId = controllerUnits[0];
          const unit = state.cards.get(unitId);
          if (unit && unit.exhausted) {
            unit.exhausted = false;
          }
          return [];
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Mystic Shot: "Deal 2 damage to a unit"
// OnPlay spell (Action timing), goes on chain
// ---------------------------------------------------------------------------

const mysticShotScript: CardScript = {
  cardDefId: "origins-spell-mystic-shot",
  abilities: new Map<string, AbilityImplementation>([
    ["mystic-shot-effect", {
      mode: "dsl",
      effects: [{ type: "deal_damage", amount: 2, target: "target" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Deny: "Counter a spell on the chain"
// OnPlay spell (Reaction timing), goes on chain
// ---------------------------------------------------------------------------

const denyScript: CardScript = {
  cardDefId: "origins-spell-denial",
  abilities: new Map<string, AbilityImplementation>([
    ["deny-effect", {
      mode: "script",
      script: {
        abilityId: "deny-effect",
        resolve: (state, source, _controller, _targets, _params) => {
          // Counter the topmost non-cancelled entry on the chain
          // (that isn't this Deny itself — Deny has already been popped)
          for (let i = state.chain.length - 1; i >= 0; i--) {
            const entry = state.chain[i];
            if (!entry.cancelled && entry.sourceInstanceId !== source.instanceId) {
              entry.cancelled = true;
              return [{
                type: "card_countered",
                entryId: entry.id,
                counteredBy: source.instanceId,
              }];
            }
          }
          return [];
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Long Sword: "Sharp Edge" (Activated)
// Exhaust → target friendly unit gets +1 Might this turn
// ---------------------------------------------------------------------------

const longSwordScript: CardScript = {
  cardDefId: "origins-gear-long-sword",
  abilities: new Map<string, AbilityImplementation>([
    ["long-sword-effect", {
      mode: "dsl",
      effects: [{ type: "buff_might", amount: 1, target: "target", duration: "end_of_turn" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Piltover Plaza: "City of Progress" (OnBattlefieldConquered)
// When conquered: conquering player draws a card
// ---------------------------------------------------------------------------

const piltoverPlazaScript: CardScript = {
  cardDefId: "origins-bf-piltover-plaza",
  abilities: new Map<string, AbilityImplementation>([
    ["piltover-plaza-effect", {
      mode: "dsl",
      effects: [{ type: "draw_cards", player: "controller", amount: 1 }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Zaun Streets: "Toxic Fumes" (OnBattlefieldConquered)
// When conquered: deal 1 damage to all units here
// ---------------------------------------------------------------------------

const zaunStreetsScript: CardScript = {
  cardDefId: "origins-bf-zaun-streets",
  abilities: new Map<string, AbilityImplementation>([
    ["zaun-streets-effect", {
      mode: "dsl",
      effects: [{ type: "deal_damage", amount: 1, target: "all_units" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

/** Register all Origins sample card scripts with the engine's script registry. */
export function registerOriginsScripts(registry: CardScriptRegistry): void {
  registry.register(jinxLegendScript);
  registry.register(jinxChampionFuryScript);
  registry.register(caitlynScript);
  registry.register(viktorLegendScript);
  registry.register(leeSinLegendScript);
  registry.register(mysticShotScript);
  registry.register(denyScript);
  registry.register(longSwordScript);
  registry.register(piltoverPlazaScript);
  registry.register(zaunStreetsScript);
}
