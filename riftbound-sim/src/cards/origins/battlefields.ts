// ============================================================================
// Riftbound TCG — Origins Set: Battlefields
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

export const altarToUnityBattlefield: CardDefinition = {
  id: "origins-bf-altar-to-unity",
  name: "Altar to Unity",
  fullName: "Altar to Unity",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "altar-to-unity-ability",
      name: "Altar to Unity",
      description: "When you hold here, play a 1 Recruit unit token in your base.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, play a 1 Recruit unit token in your base.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, play a 1 Recruit unit token in your base.",
  artAsset: "",
};

export const aspirantsClimbBattlefield: CardDefinition = {
  id: "origins-bf-aspirants-climb",
  name: "Aspirant's Climb",
  fullName: "Aspirant's Climb",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "aspirants-climb-ability",
      name: "Aspirant's Climb",
      description: "Increase the points needed to win the game by 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "Increase the points needed to win the game by 1.",
  rarity: Rarity.Uncommon,
  rulesText: "Increase the points needed to win the game by 1.",
  artAsset: "",
};

export const backAlleyBarBattlefield: CardDefinition = {
  id: "origins-bf-back-alley-bar",
  name: "Back-Alley Bar",
  fullName: "Back-Alley Bar",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "back-alley-bar-ability",
      name: "Back-Alley Bar",
      description: "When a unit moves from here, give it +1 this turn.",
      trigger: TriggerType.OnMove,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When a unit moves from here, give it +1 this turn.",
  rarity: Rarity.Uncommon,
  rulesText: "When a unit moves from here, give it +1 this turn.",
  artAsset: "",
};

export const bandleTreeBattlefield: CardDefinition = {
  id: "origins-bf-bandle-tree",
  name: "Bandle Tree",
  fullName: "Bandle Tree",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "bandle-tree-ability",
      name: "Bandle Tree",
      description: "You may hide an additional card here.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "You may hide an additional card here.",
  rarity: Rarity.Uncommon,
  rulesText: "You may hide an additional card here.",
  artAsset: "",
};

export const fortifiedPositionBattlefield: CardDefinition = {
  id: "origins-bf-fortified-position",
  name: "Fortified Position",
  fullName: "Fortified Position",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "fortified-position-ability",
      name: "Fortified Position",
      description: "When you defend here, choose a unit. It gains SHIELD 2 this combat. (+2 might while It's a defender.)",
      trigger: TriggerType.Static,
      targetType: TargetType.AnyUnit,
    },
  ],
  battlefieldEffect: "When you defend here, choose a unit. It gains SHIELD 2 this combat. (+2 might while It's a defender.)",
  rarity: Rarity.Uncommon,
  rulesText: "When you defend here, choose a unit. It gains SHIELD 2 this combat. (+2 might while It's a defender.)",
  artAsset: "",
};

export const groveOfTheGodWillowBattlefield: CardDefinition = {
  id: "origins-bf-grove-of-the-god-willow",
  name: "Grove of the God-Willow",
  fullName: "Grove of the God-Willow",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "grove-of-the-god-willow-ability",
      name: "Grove of the God-Willow",
      description: "When you hold here, draw 1.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, draw 1.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, draw 1.",
  artAsset: "",
};

export const hallowedTombBattlefield: CardDefinition = {
  id: "origins-bf-hallowed-tomb",
  name: "Hallowed Tomb",
  fullName: "Hallowed Tomb",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "hallowed-tomb-ability",
      name: "Hallowed Tomb",
      description: "When you hold here, you may return your Chosen Champion from your trash to your Champion Zone if it is empty.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, you may return your Chosen Champion from your trash to your Champion Zone if it is empty.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, you may return your Chosen Champion from your trash to your Champion Zone if it is empty.",
  artAsset: "",
};

export const monasteryOfHiranaBattlefield: CardDefinition = {
  id: "origins-bf-monastery-of-hirana",
  name: "Monastery of Hirana",
  fullName: "Monastery of Hirana",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "monastery-of-hirana-ability",
      name: "Monastery of Hirana",
      description: "When you conquer here, you may spend a buff to draw 1.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you conquer here, you may spend a buff to draw 1.",
  rarity: Rarity.Uncommon,
  rulesText: "When you conquer here, you may spend a buff to draw 1.",
  artAsset: "",
};

export const novariFightingPitBattlefield: CardDefinition = {
  id: "origins-bf-novari-fighting-pit",
  name: "Novari Fighting Pit",
  fullName: "Novari Fighting Pit",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "novari-fighting-pit-ability",
      name: "Novari Fighting Pit",
      description: "When you hold here, buff a unit here. (If it doesn't have a buff, it gets a +1 buff.)",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, buff a unit here. (If it doesn't have a buff, it gets a +1 buff.)",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, buff a unit here. (If it doesn't have a buff, it gets a +1 buff.)",
  artAsset: "",
};

export const obeliskOfPowerBattlefield: CardDefinition = {
  id: "origins-bf-obelisk-of-power",
  name: "Obelisk of Power",
  fullName: "Obelisk of Power",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "obelisk-of-power-ability",
      name: "Obelisk of Power",
      description: "At the start of each player's first Beginning Phase, that player channels 1 rune.",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "At the start of each player's first Beginning Phase, that player channels 1 rune.",
  rarity: Rarity.Uncommon,
  rulesText: "At the start of each player's first Beginning Phase, that player channels 1 rune.",
  artAsset: "",
};

export const reaversRowBattlefield: CardDefinition = {
  id: "origins-bf-reavers-row",
  name: "Reaver's Row",
  fullName: "Reaver's Row",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "reavers-row-ability",
      name: "Reaver's Row",
      description: "When you defend here, you may move a friendly unit here to base.",
      trigger: TriggerType.OnMove,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  battlefieldEffect: "When you defend here, you may move a friendly unit here to base.",
  rarity: Rarity.Uncommon,
  rulesText: "When you defend here, you may move a friendly unit here to base.",
  artAsset: "",
};

export const reckonersArenaBattlefield: CardDefinition = {
  id: "origins-bf-reckoners-arena",
  name: "Reckoner's Arena",
  fullName: "Reckoner's Arena",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "reckoners-arena-ability",
      name: "Reckoner's Arena",
      description: "When you hold here, activate the conquer effects of units here.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, activate the conquer effects of units here.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, activate the conquer effects of units here.",
  artAsset: "",
};

export const sigilOfTheStormBattlefield: CardDefinition = {
  id: "origins-bf-sigil-of-the-storm",
  name: "Sigil of the Storm",
  fullName: "Sigil of the Storm",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "sigil-of-the-storm-ability",
      name: "Sigil of the Storm",
      description: "When you conquer here, recycle one of your runes.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you conquer here, recycle one of your runes.",
  rarity: Rarity.Uncommon,
  rulesText: "When you conquer here, recycle one of your runes.",
  artAsset: "",
};

export const startippedPeakBattlefield: CardDefinition = {
  id: "origins-bf-startipped-peak",
  name: "Startipped Peak",
  fullName: "Startipped Peak",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "startipped-peak-ability",
      name: "Startipped Peak",
      description: "When you hold here, you may channel 1 rune exhausted.",
      trigger: TriggerType.OnBattlefieldConquered,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you hold here, you may channel 1 rune exhausted.",
  rarity: Rarity.Uncommon,
  rulesText: "When you hold here, you may channel 1 rune exhausted.",
  artAsset: "",
};

export const targonsPeakBattlefield: CardDefinition = {
  id: "origins-bf-targons-peak",
  name: "Targon's Peak",
  fullName: "Targon's Peak",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "targons-peak-ability",
      name: "Targon's Peak",
      description: "When you conquer here, choose 2 runes. Ready them at the end of this turn.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you conquer here, choose 2 runes. Ready them at the end of this turn.",
  rarity: Rarity.Uncommon,
  rulesText: "When you conquer here, choose 2 runes. Ready them at the end of this turn.",
  artAsset: "",
};

export const theArenasGreatestBattlefield: CardDefinition = {
  id: "origins-bf-the-arenas-greatest",
  name: "The Arena's Greatest",
  fullName: "The Arena's Greatest",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "the-arenas-greatest-ability",
      name: "The Arena's Greatest",
      description: "At the start of each player's first Beginning Phase, that player gains 1 point.",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "At the start of each player's first Beginning Phase, that player gains 1 point.",
  rarity: Rarity.Uncommon,
  rulesText: "At the start of each player's first Beginning Phase, that player gains 1 point.",
  artAsset: "",
};

export const theCandlelitSanctumBattlefield: CardDefinition = {
  id: "origins-bf-the-candlelit-sanctum",
  name: "The Candlelit Sanctum",
  fullName: "The Candlelit Sanctum",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "the-candlelit-sanctum-ability",
      name: "The Candlelit Sanctum",
      description: "When you conquer here, look at the top two cards of your Main Deck. You may recycle one or both of them. Put those you don't back in any order.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "When you conquer here, look at the top two cards of your Main Deck. You may recycle one or both of them. Put those you don't back in any order.",
  rarity: Rarity.Uncommon,
  rulesText: "When you conquer here, look at the top two cards of your Main Deck. You may recycle one or both of them. Put those you don't back in any order.",
  artAsset: "",
};

export const theDreamingTreeBattlefield: CardDefinition = {
  id: "origins-bf-the-dreaming-tree",
  name: "The Dreaming Tree",
  fullName: "The Dreaming Tree",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "the-dreaming-tree-ability",
      name: "The Dreaming Tree",
      description: "The first time you choose a friendly unit with a spell here each turn, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  battlefieldEffect: "The first time you choose a friendly unit with a spell here each turn, draw 1.",
  rarity: Rarity.Uncommon,
  rulesText: "The first time you choose a friendly unit with a spell here each turn, draw 1.",
  artAsset: "",
};

export const trifarianWarCampBattlefield: CardDefinition = {
  id: "origins-bf-trifarian-war-camp",
  name: "Trifarian War Camp",
  fullName: "Trifarian War Camp",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "trifarian-war-camp-ability",
      name: "Trifarian War Camp",
      description: "Units here have +1 . (Including attackers.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "Units here have +1 . (Including attackers.)",
  rarity: Rarity.Uncommon,
  rulesText: "Units here have +1 . (Including attackers.)",
  artAsset: "",
};

export const vilemawsLairBattlefield: CardDefinition = {
  id: "origins-bf-vilemaws-lair",
  name: "Vilemaw's Lair",
  fullName: "Vilemaw's Lair",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "vilemaws-lair-ability",
      name: "Vilemaw's Lair",
      description: "Units can't move from here to base.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "Units can't move from here to base.",
  rarity: Rarity.Uncommon,
  rulesText: "Units can't move from here to base.",
  artAsset: "",
};

export const voidGateBattlefield: CardDefinition = {
  id: "origins-bf-void-gate",
  name: "Void Gate",
  fullName: "Void Gate",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "void-gate-ability",
      name: "Void Gate",
      description: "Spells and abilities affecting units here each deal 1 Bonus Damage. (Each instance of damage the spell deals is increased by 1.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "Spells and abilities affecting units here each deal 1 Bonus Damage. (Each instance of damage the spell deals is increased by 1.)",
  rarity: Rarity.Uncommon,
  rulesText: "Spells and abilities affecting units here each deal 1 Bonus Damage. (Each instance of damage the spell deals is increased by 1.)",
  artAsset: "",
};

export const windsweptHillockBattlefield: CardDefinition = {
  id: "origins-bf-windswept-hillock",
  name: "Windswept Hillock",
  fullName: "Windswept Hillock",
  set: CardSet.Origins,
  type: CardType.Battlefield,
  domains: [],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "windswept-hillock-ability",
      name: "Windswept Hillock",
      description: "Units here have Ganking . (They can move battlefield to battlefield.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  battlefieldEffect: "Units here have Ganking . (They can move battlefield to battlefield.)",
  rarity: Rarity.Uncommon,
  rulesText: "Units here have Ganking . (They can move battlefield to battlefield.)",
  artAsset: "",
};
