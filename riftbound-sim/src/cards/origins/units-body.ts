// ============================================================================
// Riftbound TCG — Origins Set: Units (Body)
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

export const crackshotCorsairUnit: CardDefinition = {
  id: "origins-unit-crackshot-corsair",
  name: "Crackshot Corsair",
  fullName: "Crackshot Corsair",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "crackshot-corsair-ability",
      name: "Crackshot Corsair",
      description: "When I attack, deal 1 to an enemy unit here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When I attack, deal 1 to an enemy unit here.",
  artAsset: "",
};

export const duneDrakeUnit: CardDefinition = {
  id: "origins-unit-dune-drake",
  name: "Dune Drake",
  fullName: "Dune Drake",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 5, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "dune-drake-ability",
      name: "Dune Drake",
      description: "When I attack, give me +2 might if there is a ready enemy unit here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When I attack, give me +2 might if there is a ready enemy unit here.",
  artAsset: "",
};

export const firstMateUnit: CardDefinition = {
  id: "origins-unit-first-mate",
  name: "First Mate",
  fullName: "First Mate",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "first-mate-ability",
      name: "First Mate",
      description: "When you play me, ready another unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, ready another unit.",
  artAsset: "",
};

export const pakaaCubUnit: CardDefinition = {
  id: "origins-unit-pakaa-cub",
  name: "Pakaa Cub",
  fullName: "Pakaa Cub",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "pakaa-cub-ability",
      name: "Pakaa Cub",
      description: "HIDDEN (Hide now for to react with later for .)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for .)",
  artAsset: "",
};

export const pitRookieUnit: CardDefinition = {
  id: "origins-unit-pit-rookie",
  name: "Pit Rookie",
  fullName: "Pit Rookie",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "pit-rookie-ability",
      name: "Pit Rookie",
      description: "When you play me, buff another friendly unit. (If it doesn't have a buff, it gets +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, buff another friendly unit. (If it doesn't have a buff, it gets +1 buff.)",
  artAsset: "",
};

export const stormclawUrsineUnit: CardDefinition = {
  id: "origins-unit-stormclaw-ursine",
  name: "Stormclaw Ursine",
  fullName: "Stormclaw Ursine",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 7, powerCosts: [] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "stormclaw-ursine-ability",
      name: "Stormclaw Ursine",
      description: "Tank ( I must be assigned combat damage first. ) When you play me, channel 1 rune exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Tank ( I must be assigned combat damage first. ) When you play me, channel 1 rune exhausted.",
  artAsset: "",
};

export const cithriaOfCloudfieldUnit: CardDefinition = {
  id: "origins-unit-cithria-of-cloudfield",
  name: "Cithria of Cloudfield",
  fullName: "Cithria of Cloudfield",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [] },
  might: 1,
  health: 1,
  keywords: [],
  abilities: [
    {
      id: "cithria-of-cloudfield-ability",
      name: "Cithria of Cloudfield",
      description: "When you play another unit, buff me. (If i don't have a buff, I get a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play another unit, buff me. (If i don't have a buff, I get a +1 buff.)",
  artAsset: "",
};

export const heraldOfScalesUnit: CardDefinition = {
  id: "origins-unit-herald-of-scales",
  name: "Herald of Scales",
  fullName: "Herald of Scales",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "herald-of-scales-ability",
      name: "Herald of Scales",
      description: "Your Dragons' Energy costs are reduced by , to a minimum of .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Your Dragons' Energy costs are reduced by , to a minimum of .",
  artAsset: "",
};

export const kinkouMonkUnit: CardDefinition = {
  id: "origins-unit-kinkou-monk",
  name: "Kinkou Monk",
  fullName: "Kinkou Monk",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "kinkou-monk-ability",
      name: "Kinkou Monk",
      description: "When you play me, buff two other friendly units. (Each one that doesn't have a buff gets a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, buff two other friendly units. (Each one that doesn't have a buff gets a +1 buff.)",
  artAsset: "",
};

export const mountainDrakeUnit: CardDefinition = {
  id: "origins-unit-mountain-drake",
  name: "Mountain Drake",
  fullName: "Mountain Drake",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 9, powerCosts: [] },
  might: 10,
  health: 10,
  keywords: [],
  abilities: [
    {
      id: "mountain-drake-ability",
      name: "Mountain Drake",
      description: "Retrieved from \"",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Retrieved from \"",
  artAsset: "",
};

export const wildclawShamanUnit: CardDefinition = {
  id: "origins-unit-wildclaw-shaman",
  name: "Wildclaw Shaman",
  fullName: "Wildclaw Shaman",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "wildclaw-shaman-ability",
      name: "Wildclaw Shaman",
      description: "When you play me, you may spend a buff to buff me and ready me. (If I don't have a buff, I get a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, you may spend a buff to buff me and ready me. (If I don't have a buff, I get a +1 buff.)",
  artAsset: "",
};

export const carnivorousSnapvineUnit: CardDefinition = {
  id: "origins-unit-carnivorous-snapvine",
  name: "Carnivorous Snapvine",
  fullName: "Carnivorous Snapvine",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "carnivorous-snapvine-ability",
      name: "Carnivorous Snapvine",
      description: "When you play me, choose a unit at a battlefield. We deal damage equal to our Mights to each other.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, choose a unit at a battlefield. We deal damage equal to our Mights to each other.",
  artAsset: "",
};

export const krakenHunterUnit: CardDefinition = {
  id: "origins-unit-kraken-hunter",
  name: "Kraken Hunter",
  fullName: "Kraken Hunter",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Accelerate, Keyword.Assault],
  abilities: [
    {
      id: "kraken-hunter-ability",
      name: "Kraken Hunter",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.) ASSAULT (+1 while I'm an attacker.) As you play me, you may spend any number of buffs as an additional cost. Reduce my cost by for each buff you spend.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.) ASSAULT (+1 while I'm an attacker.) As you play me, you may spend any number of buffs as an additional cost. Reduce my cost by for each buff you spend.",
  artAsset: "",
};

export const deadbloomPredatorUnit: CardDefinition = {
  id: "origins-unit-deadbloom-predator",
  name: "Deadbloom Predator",
  fullName: "Deadbloom Predator",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Body],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  might: 8,
  health: 8,
  keywords: [Keyword.Deflect],
  abilities: [
    {
      id: "deadbloom-predator-ability",
      name: "Deadbloom Predator",
      description: "DEFLECT (Opponents must pay to choose me with a spell or ability.) You may play me to an occupied enemy battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "DEFLECT (Opponents must pay to choose me with a spell or ability.) You may play me to an occupied enemy battlefield.",
  artAsset: "",
};
