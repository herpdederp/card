// ============================================================================
// Riftbound TCG — Origins Set: Units (Order)
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

export const cruelPatronUnit: CardDefinition = {
  id: "origins-unit-cruel-patron",
  name: "Cruel Patron",
  fullName: "Cruel Patron",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "cruel-patron-ability",
      name: "Cruel Patron",
      description: "As an additional cost to play me, kill a friendly unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "As an additional cost to play me, kill a friendly unit.",
  artAsset: "",
};

export const daringPoroUnit: CardDefinition = {
  id: "origins-unit-daring-poro",
  name: "Daring Poro",
  fullName: "Daring Poro",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "daring-poro-ability",
      name: "Daring Poro",
      description: "ASSAULT (+1 might while I'm an attacker.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "ASSAULT (+1 might while I'm an attacker.)",
  artAsset: "",
};

export const faithfulManufactorUnit: CardDefinition = {
  id: "origins-unit-faithful-manufactor",
  name: "Faithful Manufactor",
  fullName: "Faithful Manufactor",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [],
  abilities: [
    {
      id: "faithful-manufactor-ability",
      name: "Faithful Manufactor",
      description: "When you play me, play a 1 Recruit unit token here.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play me, play a 1 Recruit unit token here.",
  artAsset: "",
};

export const pettyOfficerUnit: CardDefinition = {
  id: "origins-unit-petty-officer",
  name: "Petty Officer",
  fullName: "Petty Officer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 5, powerCosts: [] },
  might: 5,
  health: 5,
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "petty-officer-ability",
      name: "Petty Officer",
      description: "ASSAULT (+1 while I'm an attacker.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "ASSAULT (+1 while I'm an attacker.)",
  artAsset: "",
};

export const soaringScoutUnit: CardDefinition = {
  id: "origins-unit-soaring-scout",
  name: "Soaring Scout",
  fullName: "Soaring Scout",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  might: 1,
  health: 1,
  keywords: [],
  abilities: [
    {
      id: "soaring-scout-ability",
      name: "Soaring Scout",
      description: "Deathknell Play your top rune exhausted. (When I die, get the effect.)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Deathknell Play your top rune exhausted. (When I die, get the effect.)",
  artAsset: "",
};

export const trifarianGloryseekerUnit: CardDefinition = {
  id: "origins-unit-trifarian-gloryseeker",
  name: "Trifarian Gloryseeker",
  fullName: "Trifarian Gloryseeker",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  might: 2,
  health: 2,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "trifarian-gloryseeker-ability",
      name: "Trifarian Gloryseeker",
      description: "LEGION — When you play me, buff me. (If I don't have a buff, I get a +1 buff. Get the effect if you've played another card this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "LEGION — When you play me, buff me. (If I don't have a buff, I get a +1 buff. Get the effect if you've played another card this turn.)",
  artAsset: "",
};

export const vanguardSergeantUnit: CardDefinition = {
  id: "origins-unit-vanguard-sergeant",
  name: "Vanguard Sergeant",
  fullName: "Vanguard Sergeant",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "vanguard-sergeant-ability",
      name: "Vanguard Sergeant",
      description: "Retrieved from \"",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "Retrieved from \"",
  artAsset: "",
};

export const noxianDrummerUnit: CardDefinition = {
  id: "origins-unit-noxian-drummer",
  name: "Noxian Drummer",
  fullName: "Noxian Drummer",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "noxian-drummer-ability",
      name: "Noxian Drummer",
      description: "When I move to a battlefield, play a 1 Recruit unit token here. (It is also at the battlefield.)",
      trigger: TriggerType.OnMove,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When I move to a battlefield, play a 1 Recruit unit token here. (It is also at the battlefield.)",
  artAsset: "",
};

export const peakGuardianUnit: CardDefinition = {
  id: "origins-unit-peak-guardian",
  name: "Peak Guardian",
  fullName: "Peak Guardian",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "peak-guardian-ability",
      name: "Peak Guardian",
      description: "When you play me, buff me. Then, if I am at a battlefield, buff all other friendly units there. (To buff a unit give it a +1 if it doesn't already have one.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, buff me. Then, if I am at a battlefield, buff all other friendly units there. (To buff a unit give it a +1 if it doesn't already have one.)",
  artAsset: "",
};

export const solariChiefUnit: CardDefinition = {
  id: "origins-unit-solari-chief",
  name: "Solari Chief",
  fullName: "Solari Chief",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "solari-chief-ability",
      name: "Solari Chief",
      description: "When you play me, choose an enemy unit. If it is stunned, kill it. Otherwise, stun it.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, choose an enemy unit. If it is stunned, kill it. Otherwise, stun it.",
  artAsset: "",
};

export const spectralMatronUnit: CardDefinition = {
  id: "origins-unit-spectral-matron",
  name: "Spectral Matron",
  fullName: "Spectral Matron",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "spectral-matron-ability",
      name: "Spectral Matron",
      description: "When you play me, you may play a unit costing no more than 3 and no more than from your trash, ignoring its cost.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play me, you may play a unit costing no more than 3 and no more than from your trash, ignoring its cost.",
  artAsset: "",
};

export const albusFerrosUnit: CardDefinition = {
  id: "origins-unit-albus-ferros",
  name: "Albus Ferros",
  fullName: "Albus Ferros",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "albus-ferros-ability",
      name: "Albus Ferros",
      description: "When you play me, spend any number of buffs. For each buff spent, channel 1 rune exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, spend any number of buffs. For each buff spent, channel 1 rune exhausted.",
  artAsset: "",
};

export const commanderLedrosUnit: CardDefinition = {
  id: "origins-unit-commander-ledros",
  name: "Commander Ledros",
  fullName: "Commander Ledros",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 4 }] },
  might: 8,
  health: 8,
  keywords: [Keyword.Deflect, Keyword.Ganking],
  abilities: [
    {
      id: "commander-ledros-ability",
      name: "Commander Ledros",
      description: "As you play me, you may kill any number of friendly units as an additional cost. Reduce my cost by order for each killed this way. DEFLECT (Opponents must pay rune to choose me with a spell or ability.) GANKING (I can move from battlefield to battlefield.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "As you play me, you may kill any number of friendly units as an additional cost. Reduce my cost by order for each killed this way. DEFLECT (Opponents must pay rune to choose me with a spell or ability.) GANKING (I can move from battlefield to battlefield.)",
  artAsset: "",
};

export const harnessedDragonUnit: CardDefinition = {
  id: "origins-unit-harnessed-dragon",
  name: "Harnessed Dragon",
  fullName: "Harnessed Dragon",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "harnessed-dragon-ability",
      name: "Harnessed Dragon",
      description: "When you play me, kill a unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, kill a unit.",
  artAsset: "",
};

export const machineEvangelUnit: CardDefinition = {
  id: "origins-unit-machine-evangel",
  name: "Machine Evangel",
  fullName: "Machine Evangel",
  set: CardSet.Origins,
  type: CardType.Unit,
  domains: [Domain.Order],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "machine-evangel-ability",
      name: "Machine Evangel",
      description: "When you play me, draw 1 for each gear you control.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play me, draw 1 for each gear you control.",
  artAsset: "",
};
