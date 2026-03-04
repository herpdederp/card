// ============================================================================
// Riftbound TCG — Origins Set Card Scripts
// ============================================================================
// Implements the ability logic for every sample card that has abilities.
// Uses the hybrid approach: DSL descriptors for simple effects, full scripts
// for complex/context-dependent abilities.
// ============================================================================

import type { CardScript, AbilityImplementation } from "../abilities.js";
import type { CardScriptRegistry } from "../abilities.js";
import type { GameEvent } from "../../models/game-state.js";
import type { CardDefinition } from "../../models/card.js";

// ---------------------------------------------------------------------------
// Jinx Legend: "Loose Cannon"
// OnTurnStart → if hand has 1 or fewer cards, draw 1
// ---------------------------------------------------------------------------

const jinxLegendScript: CardScript = {
  cardDefId: "origins-legend-jinx",
  abilities: new Map<string, AbilityImplementation>([
    ["jinx-legend-ability", {
      mode: "script",
      script: {
        abilityId: "jinx-legend-ability",
        resolve: (state, _source, controller, _targets, _params) => {
          const events: GameEvent[] = [];
          const playerState = state.players.get(controller)!;

          if (playerState.hand.length <= 1 && playerState.mainDeck.length > 0) {
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
// Viktor Legend: "Herald of the Arcane"
// Activated (1E, Tap) → draw a card (simplified from: play a 1M Recruit token)
// ---------------------------------------------------------------------------

const viktorLegendScript: CardScript = {
  cardDefId: "origins-legend-viktor",
  abilities: new Map<string, AbilityImplementation>([
    ["viktor-legend-ability", {
      mode: "dsl",
      effects: [{ type: "draw_cards", player: "controller", amount: 1 }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Lee Sin Legend: "Blind Monk"
// Activated (1E, Tap) → buff a friendly unit (+1 Might)
// ---------------------------------------------------------------------------

const leeSinLegendScript: CardScript = {
  cardDefId: "origins-legend-leesin",
  abilities: new Map<string, AbilityImplementation>([
    ["leesin-legend-ability", {
      mode: "dsl",
      effects: [{ type: "buff_might", amount: 1, target: "target", duration: "end_of_turn" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Jinx Champion (Fury): "Demolitionist"
// OnPlay → discard 2 cards from hand
// ---------------------------------------------------------------------------

const jinxChampionFuryScript: CardScript = {
  cardDefId: "origins-champ-jinx-fury",
  abilities: new Map<string, AbilityImplementation>([
    ["jinx-fury-champ-ability", {
      mode: "script",
      script: {
        abilityId: "jinx-fury-champ-ability",
        resolve: (state, _source, controller, _targets, _params) => {
          const events: GameEvent[] = [];
          const playerState = state.players.get(controller)!;

          for (let i = 0; i < 2 && playerState.hand.length > 0; i++) {
            const discarded = playerState.hand.pop()!;
            playerState.trash.push(discarded);
            events.push({ type: "card_destroyed", cardInstanceId: discarded });
          }

          return events;
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Caitlyn Champion: "Patrolling"
// Activated (Tap) → deal damage equal to Might to target unit
// ---------------------------------------------------------------------------

const caitlynScript: CardScript = {
  cardDefId: "origins-champ-caitlyn",
  abilities: new Map<string, AbilityImplementation>([
    ["caitlyn-ability", {
      mode: "script",
      script: {
        abilityId: "caitlyn-ability",
        resolve: (state, source, _controller, targets, params) => {
          const events: GameEvent[] = [];
          if (targets.length === 0) return events;

          const cardDb = params.cardDb as Map<string, CardDefinition>;
          const sourceDef = cardDb?.get(source.definitionId);
          const damage = sourceDef?.might ?? 3;

          const target = state.cards.get(targets[0]);
          if (target) {
            target.damage += damage;
            events.push({
              type: "effect_damage",
              sourceId: source.instanceId,
              targetId: targets[0],
              amount: damage,
            });
          }

          return events;
        },
      },
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Get Excited!: Action spell
// OnPlay → deal 2 damage to target unit (simplified from discard-based damage)
// ---------------------------------------------------------------------------

const getExcitedScript: CardScript = {
  cardDefId: "origins-spell-get-excited",
  abilities: new Map<string, AbilityImplementation>([
    ["get-excited-effect", {
      mode: "dsl",
      effects: [{ type: "deal_damage", amount: 2, target: "target" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Defy: Reaction spell
// OnPlay → counter a spell on the chain
// ---------------------------------------------------------------------------

const defyScript: CardScript = {
  cardDefId: "origins-spell-defy",
  abilities: new Map<string, AbilityImplementation>([
    ["defy-effect", {
      mode: "script",
      script: {
        abilityId: "defy-effect",
        resolve: (state, source, _controller, _targets, _params) => {
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
// Iron Ballista: Gear (Activated)
// Tap → target friendly unit gets +1 Might this turn
// ---------------------------------------------------------------------------

const ironBallistaScript: CardScript = {
  cardDefId: "origins-gear-iron-ballista",
  abilities: new Map<string, AbilityImplementation>([
    ["iron-ballista-effect", {
      mode: "dsl",
      effects: [{ type: "buff_might", amount: 1, target: "target", duration: "end_of_turn" }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// The Grand Plaza: Battlefield
// OnBattlefieldConquered → conquering player draws a card
// (Simplified from: "When you hold here, if 7+ units, win the game.")
// ---------------------------------------------------------------------------

const grandPlazaScript: CardScript = {
  cardDefId: "origins-bf-grand-plaza",
  abilities: new Map<string, AbilityImplementation>([
    ["grand-plaza-effect", {
      mode: "dsl",
      effects: [{ type: "draw_cards", player: "controller", amount: 1 }],
    }],
  ]),
};

// ---------------------------------------------------------------------------
// Zaun Warrens: Battlefield
// OnBattlefieldConquered → draw 1 (simplified from discard 1, draw 1)
// ---------------------------------------------------------------------------

const zaunWarrensScript: CardScript = {
  cardDefId: "origins-bf-zaun-warrens",
  abilities: new Map<string, AbilityImplementation>([
    ["zaun-warrens-effect", {
      mode: "dsl",
      effects: [{ type: "draw_cards", player: "controller", amount: 1 }],
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
  registry.register(getExcitedScript);
  registry.register(defyScript);
  registry.register(ironBallistaScript);
  registry.register(grandPlazaScript);
  registry.register(zaunWarrensScript);
}
