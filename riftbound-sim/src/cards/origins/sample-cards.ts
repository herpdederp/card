// ============================================================================
// Riftbound TCG — Origins Set (Sample Cards)
// ============================================================================
// Real card data from the Origins (OGN) set. Abilities are simplified where
// the full effect exceeds engine capabilities (e.g. token creation).
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
  subtitle: "Loose Cannon",
  fullName: "Jinx, Loose Cannon",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Fury, Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "jinx-legend-ability",
      name: "Loose Cannon",
      description: "At the start of your Beginning Phase, draw 1 if you have 1 or fewer cards in your hand.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  championOptions: ["origins-champ-jinx-fury"],
  rarity: Rarity.Rare,
  rulesText: "At the start of your Beginning Phase, draw 1 if you have 1 or fewer cards in your hand.",
  artAsset: "",
};

export const viktorLegend: CardDefinition = {
  id: "origins-legend-viktor",
  name: "Viktor",
  subtitle: "Herald of the Arcane",
  fullName: "Viktor, Herald of the Arcane",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Mind, Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "viktor-legend-ability",
      name: "Herald of the Arcane",
      description: "1, Tap: Play a 1 Might Recruit unit token.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
      cost: { energyCost: 1, powerCosts: [] },
    },
  ],
  championOptions: [],
  rarity: Rarity.Rare,
  rulesText: "1, Tap: Play a 1 Might Recruit unit token.",
  artAsset: "",
};

export const leeSinLegend: CardDefinition = {
  id: "origins-legend-leesin",
  name: "Lee Sin",
  subtitle: "Blind Monk",
  fullName: "Lee Sin, Blind Monk",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Calm, Domain.Body],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "leesin-legend-ability",
      name: "Blind Monk",
      description: "1, Tap: Buff a friendly unit. (If it doesn't have a buff, it gets a +1 Might buff.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
      targetCount: 1,
      cost: { energyCost: 1, powerCosts: [] },
    },
  ],
  championOptions: ["origins-champ-caitlyn"],
  rarity: Rarity.Rare,
  rulesText: "1, Tap: Buff a friendly unit.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Champions
// ---------------------------------------------------------------------------

export const jinxChampionFury: CardDefinition = {
  id: "origins-champ-jinx-fury",
  name: "Jinx",
  subtitle: "Demolitionist",
  fullName: "Jinx, Demolitionist",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Accelerate, Keyword.Assault],
  abilities: [
    {
      id: "jinx-fury-champ-ability",
      name: "Demolitionist",
      description: "Accelerate. Assault 2. When you play me, discard 2.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Accelerate. Assault 2. When you play me, discard 2.",
  artAsset: "",
};

export const caitlynChampion: CardDefinition = {
  id: "origins-champ-caitlyn",
  name: "Caitlyn",
  subtitle: "Patrolling",
  fullName: "Caitlyn, Patrolling",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "caitlyn-ability",
      name: "Patrolling",
      description: "Tap: Deal damage equal to my Might to a unit at a battlefield.",
      trigger: TriggerType.Activated,
      targetType: TargetType.AnyUnit,
      targetCount: 1,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "I must be assigned combat damage last. Tap: Deal damage equal to my Might to a unit at a battlefield.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------

export const chemtechEnforcerUnit: CardDefinition = {
  id: "origins-unit-chemtech-enforcer",
  name: "Chemtech Enforcer",
  fullName: "Chemtech Enforcer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Assault],
  abilities: [],
  rarity: Rarity.Common,
  rulesText: "Assault 2. When you play me, discard 1.",
  artAsset: "",
};

export const noxusSaboteurUnit: CardDefinition = {
  id: "origins-unit-noxus-saboteur",
  name: "Noxus Saboteur",
  fullName: "Noxus Saboteur",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "noxus-saboteur-ability",
      name: "Sabotage",
      description: "Your opponents' Hidden cards can't be revealed here.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Your opponents' Hidden cards can't be revealed here.",
  artAsset: "",
};

export const eagerApprenticeUnit: CardDefinition = {
  id: "origins-unit-eager-apprentice",
  name: "Eager Apprentice",
  fullName: "Eager Apprentice",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "eager-apprentice-ability",
      name: "Spell Discount",
      description: "While I'm at a battlefield, the Energy costs for spells you play is reduced by 1, to a minimum of 1.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "While I'm at a battlefield, the Energy costs for spells you play is reduced by 1, to a minimum of 1.",
  artAsset: "",
};

export const bilgewaterBullyUnit: CardDefinition = {
  id: "origins-unit-bilgewater-bully",
  name: "Bilgewater Bully",
  fullName: "Bilgewater Bully",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 6, powerCosts: [] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "bilgewater-bully-ability",
      name: "Bully",
      description: "While I'm buffed, I have Ganking.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "While I'm buffed, I have Ganking.",
  artAsset: "",
};

export const vanguardCaptainUnit: CardDefinition = {
  id: "origins-unit-vanguard-captain",
  name: "Vanguard Captain",
  fullName: "Vanguard Captain",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "vanguard-captain-ability",
      name: "Rally the Troops",
      description: "Legion: When you play me, play two 1 Might Recruit unit tokens here.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
      condition: "Legion",
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Legion: When you play me, play two 1 Might Recruit unit tokens here.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Spells
// ---------------------------------------------------------------------------

export const getExcitedSpell: CardDefinition = {
  id: "origins-spell-get-excited",
  name: "Get Excited!",
  fullName: "Get Excited!",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "get-excited-effect",
      name: "Get Excited!",
      description: "Discard 1. Deal its Energy cost as damage to a unit at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
      targetCount: 1,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "Action — Discard 1. Deal its Energy cost as damage to a unit at a battlefield.",
  artAsset: "",
};

export const defySpell: CardDefinition = {
  id: "origins-spell-defy",
  name: "Defy",
  fullName: "Defy",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "defy-effect",
      name: "Defy",
      description: "Counter a spell that costs no more than 4 Energy and no more than 1 Power.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "Reaction — Counter a spell that costs no more than 4 Energy and no more than 1 Power.",
  artAsset: "",
};

// ---------------------------------------------------------------------------
// Gear
// ---------------------------------------------------------------------------

export const ironBallistaGear: CardDefinition = {
  id: "origins-gear-iron-ballista",
  name: "Iron Ballista",
  fullName: "Iron Ballista",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Fury],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "iron-ballista-effect",
      name: "Ballista Shot",
      description: "Tap: A unit you control gets +1 Might this turn.",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
      targetCount: 1,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Tap: A unit you control gets +1 Might this turn.",
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

export const grandPlazaBattlefield: CardDefinition = {
  id: "origins-bf-grand-plaza",
  name: "The Grand Plaza",
  fullName: "The Grand Plaza",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "grand-plaza-effect",
      name: "Grand Plaza",
      description: "When you hold here, if you have 7+ units here, you win the game.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, if you have 7+ units here, you win the game.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, if you have 7+ units here, you win the game.",
  artAsset: "",
};

export const zaunWarrensBattlefield: CardDefinition = {
  id: "origins-bf-zaun-warrens",
  name: "Zaun Warrens",
  fullName: "Zaun Warrens",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "zaun-warrens-effect",
      name: "Zaun Warrens",
      description: "When you conquer here, discard 1 then draw 1.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you conquer here, discard 1 then draw 1.",
  rarity: Rarity.Uncommon,
  rulesText: "When you conquer here, discard 1 then draw 1.",
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
  caitlynChampion,
  // Units
  chemtechEnforcerUnit,
  noxusSaboteurUnit,
  eagerApprenticeUnit,
  bilgewaterBullyUnit,
  vanguardCaptainUnit,
  // Spells
  getExcitedSpell,
  defySpell,
  // Gear
  ironBallistaGear,
  // Runes
  furyRune,
  calmRune,
  mindRune,
  bodyRune,
  chaosRune,
  orderRune,
  // Battlefields
  grandPlazaBattlefield,
  zaunWarrensBattlefield,
];
