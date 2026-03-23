// ============================================================================
// Riftbound TCG — Origins Set: Units (Chaos)
// ============================================================================
// Auto-generated from data/origins-cards.json by tools/generate-cards.mjs
// Do not edit manually — re-run the generator to update.
// ============================================================================

import {
  type CardDefinition,
  CardType,
  CardSet,
  Domain,
  Rarity,
  Keyword,
  SpellTiming,
  TriggerType,
  TargetType,
} from "../../models/card.js";

export const cemeteryAttendantUnit: CardDefinition = {
  id: "origins-unit-cemetery-attendant",
  name: "Cemetery Attendant",
  fullName: "Cemetery Attendant",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "cemetery-attendant-ability",
      name: "Cemetery Attendant",
      description: "When you play me, return a unit from your trash to your hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, return a unit from your trash to your hand.",
  artAsset: "",
};

export const emberMonkUnit: CardDefinition = {
  id: "origins-unit-ember-monk",
  name: "Ember Monk",
  fullName: "Ember Monk",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "ember-monk-ability",
      name: "Ember Monk",
      description: "When you play a card from HIDDEN, give me +2 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play a card from HIDDEN, give me +2 this turn.",
  artAsset: "",
};

export const mysticPoroUnit: CardDefinition = {
  id: "origins-unit-mystic-poro",
  name: "Mystic Poro",
  fullName: "Mystic Poro",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "mystic-poro-ability",
      name: "Mystic Poro",
      description: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.)",
  artAsset: "",
};

export const saiScoutUnit: CardDefinition = {
  id: "origins-unit-sai-scout",
  name: "Sai Scout",
  fullName: "Sai Scout",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 6, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "sai-scout-ability",
      name: "Sai Scout",
      description: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) You may play me to an open battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) You may play me to an open battlefield.",
  artAsset: "",
};

export const shipyardSkulkerUnit: CardDefinition = {
  id: "origins-unit-shipyard-skulker",
  name: "Shipyard Skulker",
  fullName: "Shipyard Skulker",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "shipyard-skulker-ability",
      name: "Shipyard Skulker",
      description: "HIDDEN (Hide for now to react with later.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide for now to react with later.)",
  artAsset: "",
};

export const sneakyDeckhandUnit: CardDefinition = {
  id: "origins-unit-sneaky-deckhand",
  name: "Sneaky Deckhand",
  fullName: "Sneaky Deckhand",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "sneaky-deckhand-ability",
      name: "Sneaky Deckhand",
      description: "You may play me to an open battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "You may play me to an open battlefield.",
  artAsset: "",
};

export const stealthyPursuerUnit: CardDefinition = {
  id: "origins-unit-stealthy-pursuer",
  name: "Stealthy Pursuer",
  fullName: "Stealthy Pursuer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "stealthy-pursuer-ability",
      name: "Stealthy Pursuer",
      description: "When a friendly unit moves from my location, I may be moved with it.",
      trigger: TriggerType.OnMove,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When a friendly unit moves from my location, I may be moved with it.",
  artAsset: "",
};

export const undercoverAgentUnit: CardDefinition = {
  id: "origins-unit-undercover-agent",
  name: "Undercover Agent",
  fullName: "Undercover Agent",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "undercover-agent-ability",
      name: "Undercover Agent",
      description: "DEATHKNELL — Discard 2, then draw 2. (When I die, get the effect.)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "DEATHKNELL — Discard 2, then draw 2. (When I die, get the effect.)",
  artAsset: "",
};

export const travelingMerchantUnit: CardDefinition = {
  id: "origins-unit-traveling-merchant",
  name: "Traveling Merchant",
  fullName: "Traveling Merchant",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "traveling-merchant-ability",
      name: "Traveling Merchant",
      description: "When I move, discard 1 then draw 1.",
      trigger: TriggerType.OnMove,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When I move, discard 1 then draw 1.",
  artAsset: "",
};

export const zauniteBouncerUnit: CardDefinition = {
  id: "origins-unit-zaunite-bouncer",
  name: "Zaunite Bouncer",
  fullName: "Zaunite Bouncer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 2 }] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "zaunite-bouncer-ability",
      name: "Zaunite Bouncer",
      description: "When you play me, return another unit at a battlefield to its owner's hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, return another unit at a battlefield to its owner's hand.",
  artAsset: "",
};

export const maddenedMarauderUnit: CardDefinition = {
  id: "origins-unit-maddened-marauder",
  name: "Maddened Marauder",
  fullName: "Maddened Marauder",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 5, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "maddened-marauder-ability",
      name: "Maddened Marauder",
      description: "Tank (I must be assigned combat damage first.) When you play me, move a unit from a battlefield to its base.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Tank (I must be assigned combat damage first.) When you play me, move a unit from a battlefield to its base.",
  artAsset: "",
};

export const mindsplitterUnit: CardDefinition = {
  id: "origins-unit-mindsplitter",
  name: "Mindsplitter",
  fullName: "Mindsplitter",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Chaos, amount: 2 }] },
  might: 7,
  health: 7,
  keywords: [],
  abilities: [
    {
      id: "mindsplitter-ability",
      name: "Mindsplitter",
      description: "When you play me, choose an opponent. They reveal their hand. Choose a card from it, and they discard that card.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, choose an opponent. They reveal their hand. Choose a card from it, and they discard that card.",
  artAsset: "",
};

export const rhasaTheSundererUnit: CardDefinition = {
  id: "origins-unit-rhasa-the-sunderer",
  name: "Rhasa the Sunderer",
  fullName: "Rhasa the Sunderer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 10, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "rhasa-the-sunderer-ability",
      name: "Rhasa the Sunderer",
      description: "I cost less for each card in your trash.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "I cost less for each card in your trash.",
  artAsset: "",
};

export const soulgorgerUnit: CardDefinition = {
  id: "origins-unit-soulgorger",
  name: "Soulgorger",
  fullName: "Soulgorger",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Chaos, amount: 2 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "soulgorger-ability",
      name: "Soulgorger",
      description: "When you play me, you may play a unit from your trash, ignoring its Energy cost. (You may still pay its Power cost.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, you may play a unit from your trash, ignoring its Energy cost. (You may still pay its Power cost.)",
  artAsset: "",
};

export const tideturnerUnit: CardDefinition = {
  id: "origins-unit-tideturner",
  name: "Tideturner",
  fullName: "Tideturner",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "tideturner-ability",
      name: "Tideturner",
      description: "HIDDEN (Hide now for to react with later for .) When you play me, you may choose a friendly unit. Move me to its location and it to my original location.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "HIDDEN (Hide now for to react with later for .) When you play me, you may choose a friendly unit. Move me to its location and it to my original location.",
  artAsset: "",
};
