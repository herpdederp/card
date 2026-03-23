// ============================================================================
// Riftbound TCG — Origins Set: Units (Calm)
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

export const clockworkKeeperUnit: CardDefinition = {
  id: "origins-unit-clockwork-keeper",
  name: "Clockwork Keeper",
  fullName: "Clockwork Keeper",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "clockwork-keeper-ability",
      name: "Clockwork Keeper",
      description: "As you play me, you may pay as an additional cost. If you do, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "As you play me, you may pay as an additional cost. If you do, draw 1.",
  artAsset: "",
};

export const playfulPhantomUnit: CardDefinition = {
  id: "origins-unit-playful-phantom",
  name: "Playful Phantom",
  fullName: "Playful Phantom",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 5, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "playful-phantom-ability",
      name: "Playful Phantom",
      description: "Retrieved from \"",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Retrieved from \"",
  artAsset: "",
};

export const solariShieldbearerUnit: CardDefinition = {
  id: "origins-unit-solari-shieldbearer",
  name: "Solari Shieldbearer",
  fullName: "Solari Shieldbearer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "solari-shieldbearer-ability",
      name: "Solari Shieldbearer",
      description: "When you play me, stun a unit. (It doesn't deal combat damage this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, stun a unit. (It doesn't deal combat damage this turn.)",
  artAsset: "",
};

export const stalwartPoroUnit: CardDefinition = {
  id: "origins-unit-stalwart-poro",
  name: "Stalwart Poro",
  fullName: "Stalwart Poro",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "stalwart-poro-ability",
      name: "Stalwart Poro",
      description: "SHIELD (+1 while I'm a defender.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "SHIELD (+1 while I'm a defender.)",
  artAsset: "",
};

export const sunlitGuardianUnit: CardDefinition = {
  id: "origins-unit-sunlit-guardian",
  name: "Sunlit Guardian",
  fullName: "Sunlit Guardian",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "sunlit-guardian-ability",
      name: "Sunlit Guardian",
      description: "SHIELD (+1 while I'm a defender.) TANK (I must be assigned combat damage first.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "SHIELD (+1 while I'm a defender.) TANK (I must be assigned combat damage first.)",
  artAsset: "",
};

export const wielderOfWaterUnit: CardDefinition = {
  id: "origins-unit-wielder-of-water",
  name: "Wielder of Water",
  fullName: "Wielder of Water",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "wielder-of-water-ability",
      name: "Wielder of Water",
      description: "While I'm attacking or defending alone, I have +2 .",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "While I'm attacking or defending alone, I have +2 .",
  artAsset: "",
};

export const adaptatronUnit: CardDefinition = {
  id: "origins-unit-adaptatron",
  name: "Adaptatron",
  fullName: "Adaptatron",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "adaptatron-ability",
      name: "Adaptatron",
      description: "When I conquer, you may kill a gear. If you do, buff me. (If I don't have a buff, I get a +1 buff.)",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When I conquer, you may kill a gear. If you do, buff me. (If I don't have a buff, I get a +1 buff.)",
  artAsset: "",
};

export const eclipseHeraldUnit: CardDefinition = {
  id: "origins-unit-eclipse-herald",
  name: "Eclipse Herald",
  fullName: "Eclipse Herald",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 7,
  health: 7,
  keywords: [],
  abilities: [
    {
      id: "eclipse-herald-ability",
      name: "Eclipse Herald",
      description: "When you stun an enemy unit, ready me and give me +1 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you stun an enemy unit, ready me and give me +1 this turn.",
  artAsset: "",
};

export const poroHerderUnit: CardDefinition = {
  id: "origins-unit-poro-herder",
  name: "Poro Herder",
  fullName: "Poro Herder",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "poro-herder-ability",
      name: "Poro Herder",
      description: "When you play me, if you control a Poro, buff me and draw 1. (If I don't have a buff, I get a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, if you control a Poro, buff me and draw 1. (If I don't have a buff, I get a +1 buff.)",
  artAsset: "",
};

export const wizenedElderUnit: CardDefinition = {
  id: "origins-unit-wizened-elder",
  name: "Wizened Elder",
  fullName: "Wizened Elder",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "wizened-elder-ability",
      name: "Wizened Elder",
      description: "While I'm buffed, I have an additional +1 .",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "While I'm buffed, I have an additional +1 .",
  artAsset: "",
};

export const mageseekerWardenUnit: CardDefinition = {
  id: "origins-unit-mageseeker-warden",
  name: "Mageseeker Warden",
  fullName: "Mageseeker Warden",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "mageseeker-warden-ability",
      name: "Mageseeker Warden",
      description: "While I'm at a battlefield, opponents can only play units to their base. While I'm at a battlefield, spells and abilities can't ready enemy units and gears.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "While I'm at a battlefield, opponents can only play units to their base. While I'm at a battlefield, spells and abilities can't ready enemy units and gears.",
  artAsset: "",
};

export const tastyFaefolkUnit: CardDefinition = {
  id: "origins-unit-tasty-faefolk",
  name: "Tasty Faefolk",
  fullName: "Tasty Faefolk",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 7, powerCosts: [] },
  might: 6,
  health: 6,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "tasty-faefolk-ability",
      name: "Tasty Faefolk",
      description: "ACCELERATE (You may play as an additional cost to have me enter ready.) DEATHKNELL — Channel 2 runes exhausted and draw 1. (When I die, get the effect.)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ACCELERATE (You may play as an additional cost to have me enter ready.) DEATHKNELL — Channel 2 runes exhausted and draw 1. (When I die, get the effect.)",
  artAsset: "",
};

export const whiteflameProtectorUnit: CardDefinition = {
  id: "origins-unit-whiteflame-protector",
  name: "Whiteflame Protector",
  fullName: "Whiteflame Protector",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Calm],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Calm, amount: 2 }] },
  might: 8,
  health: 8,
  keywords: [],
  abilities: [
    {
      id: "whiteflame-protector-ability",
      name: "Whiteflame Protector",
      description: "When you play me, give a unit +8 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When you play me, give a unit +8 this turn.",
  artAsset: "",
};
