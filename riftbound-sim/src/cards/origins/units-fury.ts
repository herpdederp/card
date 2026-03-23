// ============================================================================
// Riftbound TCG — Origins Set: Units (Fury)
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

export const blazingScorcherUnit: CardDefinition = {
  id: "origins-unit-blazing-scorcher",
  name: "Blazing Scorcher",
  fullName: "Blazing Scorcher",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 5, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "blazing-scorcher-ability",
      name: "Blazing Scorcher",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.)",
  artAsset: "",
};

export const brazenBuccaneerUnit: CardDefinition = {
  id: "origins-unit-brazen-buccaneer",
  name: "Brazen Buccaneer",
  fullName: "Brazen Buccaneer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 6, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "brazen-buccaneer-ability",
      name: "Brazen Buccaneer",
      description: "As you play me, you may discard a card as an additional cost. If you do, reduce my cost by .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "As you play me, you may discard a card as an additional cost. If you do, reduce my cost by .",
  artAsset: "",
};

export const flameChompersUnit: CardDefinition = {
  id: "origins-unit-flame-chompers",
  name: "Flame Chompers",
  fullName: "Flame Chompers",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "flame-chompers-ability",
      name: "Flame Chompers",
      description: "When you discard me, you may pay to play me.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you discard me, you may pay to play me.",
  artAsset: "",
};

export const legionRearguardUnit: CardDefinition = {
  id: "origins-unit-legion-rearguard",
  name: "Legion Rearguard",
  fullName: "Legion Rearguard",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "legion-rearguard-ability",
      name: "Legion Rearguard",
      description: "ACCELERATE (As I'm played, you may pay as an additional cost to have me enter ready.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "ACCELERATE (As I'm played, you may pay as an additional cost to have me enter ready.)",
  artAsset: "",
};

export const magmaWurmUnit: CardDefinition = {
  id: "origins-unit-magma-wurm",
  name: "Magma Wurm",
  fullName: "Magma Wurm",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 8,
  health: 8,
  keywords: [],
  abilities: [
    {
      id: "magma-wurm-ability",
      name: "Magma Wurm",
      description: "Other friendly units enter ready.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Other friendly units enter ready.",
  artAsset: "",
};

export const noxusHopefulUnit: CardDefinition = {
  id: "origins-unit-noxus-hopeful",
  name: "Noxus Hopeful",
  fullName: "Noxus Hopeful",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "noxus-hopeful-ability",
      name: "Noxus Hopeful",
      description: "LEGION — I cost less. (Get the effect if you've played another card this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "LEGION — I cost less. (Get the effect if you've played another card this turn.)",
  artAsset: "",
};

export const poutyPoroUnit: CardDefinition = {
  id: "origins-unit-pouty-poro",
  name: "Pouty Poro",
  fullName: "Pouty Poro",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Deflect],
  abilities: [
    {
      id: "pouty-poro-ability",
      name: "Pouty Poro",
      description: "DEFLECT (Opponents must pay to choose me with an ability or spell)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "DEFLECT (Opponents must pay to choose me with an ability or spell)",
  artAsset: "",
};

export const captainFarronUnit: CardDefinition = {
  id: "origins-unit-captain-farron",
  name: "Captain Farron",
  fullName: "Captain Farron",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "captain-farron-ability",
      name: "Captain Farron",
      description: "Other friendly units here have ASSAULT. (+1 while they're attackers.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Other friendly units here have ASSAULT. (+1 while they're attackers.)",
  artAsset: "",
};

export const dangerousDuoUnit: CardDefinition = {
  id: "origins-unit-dangerous-duo",
  name: "Dangerous Duo",
  fullName: "Dangerous Duo",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "dangerous-duo-ability",
      name: "Dangerous Duo",
      description: "LEGION — When you play me, give a unit +2 this turn. (Get the effect if you've played another card this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "LEGION — When you play me, give a unit +2 this turn. (Get the effect if you've played another card this turn.)",
  artAsset: "",
};

export const ragingSoulUnit: CardDefinition = {
  id: "origins-unit-raging-soul",
  name: "Raging Soul",
  fullName: "Raging Soul",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [Keyword.Assault, Keyword.Ganking],
  abilities: [
    {
      id: "raging-soul-ability",
      name: "Raging Soul",
      description: "If you've discarded a card this turn, I have ASSAULT and GANKING. (+1 while I'm an attacker. I can move from battlefield to battlefield)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "If you've discarded a card this turn, I have ASSAULT and GANKING. (+1 while I'm an attacker. I can move from battlefield to battlefield)",
  artAsset: "",
};

export const scrapyardChampionUnit: CardDefinition = {
  id: "origins-unit-scrapyard-champion",
  name: "Scrapyard Champion",
  fullName: "Scrapyard Champion",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "scrapyard-champion-ability",
      name: "Scrapyard Champion",
      description: "LEGION When you play me, discard 2 then draw 2. ( Gain this effect if you've played another card this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "LEGION When you play me, discard 2 then draw 2. ( Gain this effect if you've played another card this turn.)",
  artAsset: "",
};

export const brynhirThundersongUnit: CardDefinition = {
  id: "origins-unit-brynhir-thundersong",
  name: "Brynhir Thundersong",
  fullName: "Brynhir Thundersong",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 6, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "brynhir-thundersong-ability",
      name: "Brynhir Thundersong",
      description: "When you play me, opponents can't play cards this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, opponents can't play cards this turn.",
  artAsset: "",
};

export const ragingFirebrandUnit: CardDefinition = {
  id: "origins-unit-raging-firebrand",
  name: "Raging Firebrand",
  fullName: "Raging Firebrand",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "raging-firebrand-ability",
      name: "Raging Firebrand",
      description: "When you play me, the next spell you play this turn costs [5] less.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, the next spell you play this turn costs [5] less.",
  artAsset: "",
};

export const immortalPhoenixUnit: CardDefinition = {
  id: "origins-unit-immortal-phoenix",
  name: "Immortal Phoenix",
  fullName: "Immortal Phoenix",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "immortal-phoenix-ability",
      name: "Immortal Phoenix",
      description: "ASSAULT 2 (+2 when I'm an attacker.) When you kill a unit with a spell, you may pay to play me from your trash.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "ASSAULT 2 (+2 when I'm an attacker.) When you kill a unit with a spell, you may pay to play me from your trash.",
  artAsset: "",
};

export const kadregrinTheInfernalUnit: CardDefinition = {
  id: "origins-unit-kadregrin-the-infernal",
  name: "Kadregrin the Infernal",
  fullName: "Kadregrin the Infernal",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Fury],
  cost: { energyCost: 9, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  might: 9,
  health: 9,
  keywords: [],
  abilities: [
    {
      id: "kadregrin-the-infernal-ability",
      name: "Kadregrin the Infernal",
      description: "When you play me, draw 1 for each of your MIGHTY units. (A unit is Mighty while it has 5+ Might.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When you play me, draw 1 for each of your MIGHTY units. (A unit is Mighty while it has 5+ Might.)",
  artAsset: "",
};
