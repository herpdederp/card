// ============================================================================
// Riftbound TCG — Origins Set: Units (Mind)
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

export const jeweledColossusUnit: CardDefinition = {
  id: "origins-unit-jeweled-colossus",
  name: "Jeweled Colossus",
  fullName: "Jeweled Colossus",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 5, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "jeweled-colossus-ability",
      name: "Jeweled Colossus",
      description: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) SHIELD (+1 while I'm a defender.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) SHIELD (+1 while I'm a defender.)",
  artAsset: "",
};

export const lecturingYordleUnit: CardDefinition = {
  id: "origins-unit-lecturing-yordle",
  name: "Lecturing Yordle",
  fullName: "Lecturing Yordle",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "lecturing-yordle-ability",
      name: "Lecturing Yordle",
      description: "TANK (I must be assigned combat damage first.) When you play me, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "TANK (I must be assigned combat damage first.) When you play me, draw 1.",
  artAsset: "",
};

export const megaMechUnit: CardDefinition = {
  id: "origins-unit-mega-mech",
  name: "Mega-Mech",
  fullName: "Mega-Mech",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 7, powerCosts: [] },
  might: 8,
  health: 8,
  keywords: [],
  abilities: [
    {
      id: "mega-mech-ability",
      name: "Mega-Mech",
      description: "Retrieved from \"",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Retrieved from \"",
  artAsset: "",
};

export const pitCrewUnit: CardDefinition = {
  id: "origins-unit-pit-crew",
  name: "Pit Crew",
  fullName: "Pit Crew",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "pit-crew-ability",
      name: "Pit Crew",
      description: "When you play a gear, ready me.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play a gear, ready me.",
  artAsset: "",
};

export const riptideRexUnit: CardDefinition = {
  id: "origins-unit-riptide-rex",
  name: "Riptide Rex",
  fullName: "Riptide Rex",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Mind, amount: 2 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "riptide-rex-ability",
      name: "Riptide Rex",
      description: "When you play me, deal 6 to an enemy unit at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, deal 6 to an enemy unit at a battlefield.",
  artAsset: "",
};

export const watchfulSentryUnit: CardDefinition = {
  id: "origins-unit-watchful-sentry",
  name: "Watchful Sentry",
  fullName: "Watchful Sentry",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [] },
  might: 1,
  health: 1,
  keywords: [],
  abilities: [
    {
      id: "watchful-sentry-ability",
      name: "Watchful Sentry",
      description: "Deathknell — Draw 1. When I die, get the effect.)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Deathknell — Draw 1. When I die, get the effect.)",
  artAsset: "",
};

export const blastconeFaeUnit: CardDefinition = {
  id: "origins-unit-blastcone-fae",
  name: "Blastcone Fae",
  fullName: "Blastcone Fae",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 2,
  health: 2,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "blastcone-fae-ability",
      name: "Blastcone Fae",
      description: "HIDDEN (Hide now for to react with later for .) When you play me, give a unit -2 this turn, to a minimum of 1",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "HIDDEN (Hide now for to react with later for .) When you play me, give a unit -2 this turn, to a minimum of 1",
  artAsset: "",
};

export const gemcraftSeerUnit: CardDefinition = {
  id: "origins-unit-gemcraft-seer",
  name: "Gemcraft Seer",
  fullName: "Gemcraft Seer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "gemcraft-seer-ability",
      name: "Gemcraft Seer",
      description: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) Other friendly units have VISION.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "VISION (When you play me, look at the top card of your Main Deck. You may recycle it.) Other friendly units have VISION.",
  artAsset: "",
};

export const ravenbloomStudentUnit: CardDefinition = {
  id: "origins-unit-ravenbloom-student",
  name: "Ravenbloom Student",
  fullName: "Ravenbloom Student",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "ravenbloom-student-ability",
      name: "Ravenbloom Student",
      description: "When you play a spell, give me +1 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play a spell, give me +1 this turn.",
  artAsset: "",
};

export const spriteMotherUnit: CardDefinition = {
  id: "origins-unit-sprite-mother",
  name: "Sprite Mother",
  fullName: "Sprite Mother",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [Keyword.Temporary],
  abilities: [
    {
      id: "sprite-mother-ability",
      name: "Sprite Mother",
      description: "When you play me, play a ready 3 might Sprite unit token with TEMPORARY here. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, play a ready 3 might Sprite unit token with TEMPORARY here. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
  artAsset: "",
};

export const avaAchieverUnit: CardDefinition = {
  id: "origins-unit-ava-achiever",
  name: "Ava Achiever",
  fullName: "Ava Achiever",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 5, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "ava-achiever-ability",
      name: "Ava Achiever",
      description: "When I attack, you may pay to play a card with HIDDEN from your hand here, ignoring its cost.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I attack, you may pay to play a card with HIDDEN from your hand here, ignoring its cost.",
  artAsset: "",
};

export const thousandTailedWatcherUnit: CardDefinition = {
  id: "origins-unit-thousand-tailed-watcher",
  name: "Thousand-Tailed Watcher",
  fullName: "Thousand-Tailed Watcher",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 7,
  health: 7,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "thousand-tailed-watcher-ability",
      name: "Thousand-Tailed Watcher",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.) When you play me, give enemy units -3 this turn, to a minimum of 1 .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.) When you play me, give enemy units -3 this turn, to a minimum of 1 .",
  artAsset: "",
};

export const wraithOfEchoesUnit: CardDefinition = {
  id: "origins-unit-wraith-of-echoes",
  name: "Wraith of Echoes",
  fullName: "Wraith of Echoes",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Mind],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "wraith-of-echoes-ability",
      name: "Wraith of Echoes",
      description: "The first time a friendly unit dies each turn, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "The first time a friendly unit dies each turn, draw 1.",
  artAsset: "",
};
