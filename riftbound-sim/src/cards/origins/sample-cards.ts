// ============================================================================
// Riftbound TCG — Origins Set (Sample Cards)
// ============================================================================
// These are example card definitions to demonstrate the data model.
// The full set (~298 cards) would be imported from a JSON data file
// scraped/transcribed from the official card database.
// ============================================================================

import {
  type CardDefinition,
  CardType,
  CardSet,
  Domain,
  Rarity,
  Keyword,
  SpellTiming,
  type AbilityDefinition,
  TriggerType,
  TargetType,
} from "../../models/card.js";

// ---------------------------------------------------------------------------
// Legends
// ---------------------------------------------------------------------------

export const jinxLegend: CardDefinition = {
  id: "origins-legend-jinx",
  name: "Jinx",
  subtitle: "The Loose Cannon",
  fullName: "Jinx, The Loose Cannon",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Fury, Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "jinx-legend-ability",
      name: "Get Excited!",
      description: "When you conquer a Battlefield, deal 1 damage to each enemy unit at another Battlefield.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  championOptions: ["origins-champ-jinx-fury", "origins-champ-jinx-chaos"],
  rarity: Rarity.Legendary,
  rulesText: "When you conquer a Battlefield, deal 1 damage to each enemy unit at another Battlefield.",
  artAsset: "",
};

export const viktorLegend: CardDefinition = {
  id: "origins-legend-viktor",
  name: "Viktor",
  subtitle: "The Machine Herald",
  fullName: "Viktor, The Machine Herald",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Mind, Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "viktor-legend-ability",
      name: "Glorious Evolution",
      description: "When you play a Gear, draw a card.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  championOptions: ["origins-champ-viktor-mind", "origins-champ-viktor-order"],
  rarity: Rarity.Legendary,
  rulesText: "When you play a Gear, draw a card.",
  artAsset: "",
};

export const leeSinLegend: CardDefinition = {
  id: "origins-legend-leesin",
  name: "Lee Sin",
  subtitle: "The Blind Monk",
  fullName: "Lee Sin, The Blind Monk",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Calm, Domain.Body],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "leesin-legend-ability",
      name: "Dragon's Rage",
      description: "After a unit you control wins a Showdown alone, ready it.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  championOptions: ["origins-champ-leesin-calm", "origins-champ-leesin-body"],
  rarity: Rarity.Legendary,
  rulesText: "After a unit you control wins a Showdown alone, ready it.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Champions (Chosen Champion units)
// ---------------------------------------------------------------------------

export const jinxChampionFury: CardDefinition = {
  id: "origins-champ-jinx-fury",
  name: "Jinx",
  subtitle: "Powder Monkey",
  fullName: "Jinx, Powder Monkey",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 4,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "jinx-fury-champ-ability",
      name: "Fishbones",
      description: "When I conquer a Battlefield, deal 2 damage to a unit.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.EnemyUnit,
      targetCount: 1,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I conquer a Battlefield, deal 2 damage to a unit.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------

export const caitlynUnit: CardDefinition = {
  id: "origins-unit-caitlyn",
  name: "Caitlyn",
  subtitle: "Sheriff of Piltover",
  fullName: "Caitlyn, Sheriff of Piltover",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 3,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "caitlyn-ability",
      name: "Headshot",
      description: "When I move to a Battlefield, deal 1 damage to a unit there.",
      trigger: TriggerType.OnMove,
      targetType: TargetType.EnemyUnit,
      targetCount: 1,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When I move to a Battlefield, deal 1 damage to a unit there.",
  artAsset: "",
};

export const piltoverEnforcerUnit: CardDefinition = {
  id: "origins-unit-piltover-enforcer",
  name: "Piltover Enforcer",
  fullName: "Piltover Enforcer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 1, powerCosts: [] },
  might: 2,
  health: 1,
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "",
  artAsset: "",
};

export const zauniteScrapperUnit: CardDefinition = {
  id: "origins-unit-zaunite-scrapper",
  name: "Zaunite Scrapper",
  fullName: "Zaunite Scrapper",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 1, powerCosts: [] },
  might: 1,
  health: 2,
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "",
  artAsset: "",
};

export const shadowAssassinUnit: CardDefinition = {
  id: "origins-unit-shadow-assassin",
  name: "Shadow Assassin",
  fullName: "Shadow Assassin",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 1,
  keywords: [Keyword.Ganking],
  abilities: [],
  rarity: Rarity.Uncommon,
  rulesText: "Ganking",
  artAsset: "",
};

export const stoneGolemUnit: CardDefinition = {
  id: "origins-unit-stone-golem",
  name: "Stone Golem",
  fullName: "Stone Golem",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 5,
  health: 6,
  keywords: [],
  abilities: [],
  rarity: Rarity.Rare,
  rulesText: "",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Spells
// ---------------------------------------------------------------------------

export const mysticShotSpell: CardDefinition = {
  id: "origins-spell-mystic-shot",
  name: "Mystic Shot",
  fullName: "Mystic Shot",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "mystic-shot-effect",
      name: "Mystic Shot",
      description: "Deal 2 damage to a unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
      targetCount: 1,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "Action — Deal 2 damage to a unit.",
  artAsset: "",
};

export const denialSpell: CardDefinition = {
  id: "origins-spell-denial",
  name: "Deny",
  fullName: "Deny",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "deny-effect",
      name: "Deny",
      description: "Counter a spell.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Rare,
  rulesText: "Reaction — Counter a spell on the chain.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Gear
// ---------------------------------------------------------------------------

export const longSwordGear: CardDefinition = {
  id: "origins-gear-long-sword",
  name: "Long Sword",
  fullName: "Long Sword",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "long-sword-effect",
      name: "Sharp Edge",
      description: "Exhaust: a unit you control gets +1 Might this turn.",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
      targetCount: 1,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Exhaust: a unit you control gets +1 Might this turn.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Runes
// ---------------------------------------------------------------------------

export const furyRune: CardDefinition = {
  id: "origins-rune-fury",
  name: "Fury Rune",
  fullName: "Fury Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Fury],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Fury Power.",
  artAsset: "",
};

export const calmRune: CardDefinition = {
  id: "origins-rune-calm",
  name: "Calm Rune",
  fullName: "Calm Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Calm],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Calm Power.",
  artAsset: "",
};

export const mindRune: CardDefinition = {
  id: "origins-rune-mind",
  name: "Mind Rune",
  fullName: "Mind Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Mind],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Mind Power.",
  artAsset: "",
};

export const bodyRune: CardDefinition = {
  id: "origins-rune-body",
  name: "Body Rune",
  fullName: "Body Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Body],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Body Power.",
  artAsset: "",
};

export const chaosRune: CardDefinition = {
  id: "origins-rune-chaos",
  name: "Chaos Rune",
  fullName: "Chaos Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Chaos Power.",
  artAsset: "",
};

export const orderRune: CardDefinition = {
  id: "origins-rune-order",
  name: "Order Rune",
  fullName: "Order Rune",
  set: CardSet.Origins,
  type: CardType.Rune,
  domains: [Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Exhaust to generate 1 Energy. Recycle to generate 1 Order Power.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Battlefields
// ---------------------------------------------------------------------------

export const piltoverBattlefield: CardDefinition = {
  id: "origins-bf-piltover-plaza",
  name: "Piltover Plaza",
  fullName: "Piltover Plaza",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "piltover-plaza-effect",
      name: "City of Progress",
      description: "When conquered: the conquering player draws a card.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When conquered: the conquering player draws a card.",
  rarity: Rarity.Uncommon,
  rulesText: "When conquered: the conquering player draws a card.",
  artAsset: "",
};

export const zaunBattlefield: CardDefinition = {
  id: "origins-bf-zaun-streets",
  name: "Zaun Streets",
  fullName: "Zaun Streets",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "zaun-streets-effect",
      name: "Toxic Fumes",
      description: "When conquered: deal 1 damage to all units here.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When conquered: deal 1 damage to all units here.",
  rarity: Rarity.Common,
  rulesText: "When conquered: deal 1 damage to all units here.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// All sample cards
// ---------------------------------------------------------------------------

export const originsCards: CardDefinition[] = [
  // Legends
  jinxLegend,
  viktorLegend,
  leeSinLegend,
  // Champions
  jinxChampionFury,
  // Units
  caitlynUnit,
  piltoverEnforcerUnit,
  zauniteScrapperUnit,
  shadowAssassinUnit,
  stoneGolemUnit,
  // Spells
  mysticShotSpell,
  denialSpell,
  // Gear
  longSwordGear,
  // Runes
  furyRune,
  calmRune,
  mindRune,
  bodyRune,
  chaosRune,
  orderRune,
  // Battlefields
  piltoverBattlefield,
  zaunBattlefield,
];
