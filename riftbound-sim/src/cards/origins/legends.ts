// ============================================================================
// Riftbound TCG — Origins Set: Legends
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

export const kaisaDaughterOfTheVoidLegend: CardDefinition = {
  id: "origins-legend-kaisa-daughter-of-the-void",
  name: "Kai'Sa Daughter of the Void",
  fullName: "Kai'Sa Daughter of the Void",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Fury, Domain.Mind],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "kaisa-daughter-of-the-void-ability",
      name: "Kai'Sa Daughter of the Void",
      description: "[tap] REACTION - ADD . Use only to play spells. (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "[tap] REACTION - ADD . Use only to play spells. (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const volibearRelentlessStormLegend: CardDefinition = {
  id: "origins-legend-volibear-relentless-storm",
  name: "Volibear Relentless Storm",
  fullName: "Volibear Relentless Storm",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Fury, Domain.Body],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "volibear-relentless-storm-ability",
      name: "Volibear Relentless Storm",
      description: "When you play a MIGHTY unit, you may exhaust me to channel 1 rune exhausted. (A unit is Mighty while it has 5+ .)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play a MIGHTY unit, you may exhaust me to channel 1 rune exhausted. (A unit is Mighty while it has 5+ .)",
  artAsset: "",
};

export const dariusHandOfNoxusLegend: CardDefinition = {
  id: "origins-legend-darius-hand-of-noxus",
  name: "Darius Hand of Noxus",
  fullName: "Darius Hand of Noxus",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Fury, Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "darius-hand-of-noxus-ability",
      name: "Darius Hand of Noxus",
      description: "[tap] REACTION, LEGION — ADD (Abilities that add resources can't be reacted to. Get the effect if you've played a card this turn.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "[tap] REACTION, LEGION — ADD (Abilities that add resources can't be reacted to. Get the effect if you've played a card this turn.)",
  artAsset: "",
};

export const ahriNineTailedFoxLegend: CardDefinition = {
  id: "origins-legend-ahri-nine-tailed-fox",
  name: "Ahri Nine-Tailed Fox",
  fullName: "Ahri Nine-Tailed Fox",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Calm, Domain.Mind],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "ahri-nine-tailed-fox-ability",
      name: "Ahri Nine-Tailed Fox",
      description: "When an enemy unit attacks a battlefield you control, give it -1 this turn, to a minimum of 1",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When an enemy unit attacks a battlefield you control, give it -1 this turn, to a minimum of 1",
  artAsset: "",
};

export const yasuoUnforgivenLegend: CardDefinition = {
  id: "origins-legend-yasuo-unforgiven",
  name: "Yasuo Unforgiven",
  fullName: "Yasuo Unforgiven",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Calm, Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "yasuo-unforgiven-ability",
      name: "Yasuo Unforgiven",
      description: ", [tap] : Move a friendly unit to or from your base.",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: ", [tap] : Move a friendly unit to or from your base.",
  artAsset: "",
};

export const leonaRadiantDawnLegend: CardDefinition = {
  id: "origins-legend-leona-radiant-dawn",
  name: "Leona Radiant Dawn",
  fullName: "Leona Radiant Dawn",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Calm, Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "leona-radiant-dawn-ability",
      name: "Leona Radiant Dawn",
      description: "When you stun one or more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you stun one or more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff.)",
  artAsset: "",
};

export const teemoSwiftScoutLegend: CardDefinition = {
  id: "origins-legend-teemo-swift-scout",
  name: "Teemo Swift Scout",
  fullName: "Teemo Swift Scout",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Mind, Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "teemo-swift-scout-ability",
      name: "Teemo Swift Scout",
      description: "You may pay to hide a card with HIDDEN instead of . , [tap] Put a Teemo unit you own into your hand from your Champion Zone on the board.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "You may pay to hide a card with HIDDEN instead of . , [tap] Put a Teemo unit you own into your hand from your Champion Zone on the board.",
  artAsset: "",
};

export const missFortuneBountyHunterLegend: CardDefinition = {
  id: "origins-legend-miss-fortune-bounty-hunter",
  name: "Miss Fortune Bounty Hunter",
  fullName: "Miss Fortune Bounty Hunter",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Body, Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "miss-fortune-bounty-hunter-ability",
      name: "Miss Fortune Bounty Hunter",
      description: "[tap]: Give a unit GANKING this tum. (It can move from battlefield to battlefield.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "[tap]: Give a unit GANKING this tum. (It can move from battlefield to battlefield.)",
  artAsset: "",
};

export const settTheBossLegend: CardDefinition = {
  id: "origins-legend-sett-the-boss",
  name: "Sett The Boss",
  fullName: "Sett The Boss",
  set: CardSet.Origins,
  type: CardType.Legend,
  domains: [Domain.Body, Domain.Order],
  cost: { energyCost: 0, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "sett-the-boss-ability",
      name: "Sett The Boss",
      description: "When a buffed unit you control would die, you may pay and exhaust me to spend its buff and recall it exhausted instead. (Send it to base. This isn't a move.) When you conquer, ready me.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When a buffed unit you control would die, you may pay and exhaust me to spend its buff and recall it exhausted instead. (Send it to base. This isn't a move.) When you conquer, ready me.",
  artAsset: "",
};
