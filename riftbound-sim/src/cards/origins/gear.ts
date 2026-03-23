// ============================================================================
// Riftbound TCG — Origins Set: Gear
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

export const sunDiscGear: CardDefinition = {
  id: "origins-gear-sun-disc",
  name: "Sun Disc",
  fullName: "Sun Disc",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "sun-disc-ability",
      name: "Sun Disc",
      description: "[tap]: LEGION — The next unit you play this turn enters ready. (Get the effect if you've played another card this turn.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "[tap]: LEGION — The next unit you play this turn enters ready. (Get the effect if you've played another card this turn.)",
  artAsset: "",
};

export const unlicensedArmoryGear: CardDefinition = {
  id: "origins-gear-unlicensed-armory",
  name: "Unlicensed Armory",
  fullName: "Unlicensed Armory",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "unlicensed-armory-ability",
      name: "Unlicensed Armory",
      description: "Discard 1, [tap]: Choose a friendly unit. The next time it dies this turn, you may pay to recall it exhausted instead. (Send it to base. This isn't a move.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Discard 1, [tap]: Choose a friendly unit. The next time it dies this turn, you may pay to recall it exhausted instead. (Send it to base. This isn't a move.)",
  artAsset: "",
};

export const ravenbornTomeGear: CardDefinition = {
  id: "origins-gear-ravenborn-tome",
  name: "Ravenborn Tome",
  fullName: "Ravenborn Tome",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "ravenborn-tome-ability",
      name: "Ravenborn Tome",
      description: "[tap]: The next spell you play deals 1 Bonus Damage (Each instance of damage the spell deals is increased by 1.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "[tap]: The next spell you play deals 1 Bonus Damage (Each instance of damage the spell deals is increased by 1.)",
  artAsset: "",
};

export const sealOfRageGear: CardDefinition = {
  id: "origins-gear-seal-of-rage",
  name: "Seal of Rage",
  fullName: "Seal of Rage",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Fury],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-rage-ability",
      name: "Seal of Rage",
      description: "[tap]: REACTION — ADD . (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap]: REACTION — ADD . (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const maskOfForesightGear: CardDefinition = {
  id: "origins-gear-mask-of-foresight",
  name: "Mask of Foresight",
  fullName: "Mask of Foresight",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "mask-of-foresight-ability",
      name: "Mask of Foresight",
      description: "When a friendly unit attacks or defends alone, give it +1 this turn.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When a friendly unit attacks or defends alone, give it +1 this turn.",
  artAsset: "",
};

export const spiritsRefugeGear: CardDefinition = {
  id: "origins-gear-spirits-refuge",
  name: "Spirit's Refuge",
  fullName: "Spirit's Refuge",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [Keyword.Deflect],
  abilities: [
    {
      id: "spirits-refuge-ability",
      name: "Spirit's Refuge",
      description: "When you play this, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff.) Friendly buffed units have DEFLECT if they didn't already. (Opponents must pay to choose those units with a spell or ability.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you play this, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff.) Friendly buffed units have DEFLECT if they didn't already. (Opponents must pay to choose those units with a spell or ability.)",
  artAsset: "",
};

export const solariShrineGear: CardDefinition = {
  id: "origins-gear-solari-shrine",
  name: "Solari Shrine",
  fullName: "Solari Shrine",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "solari-shrine-ability",
      name: "Solari Shrine",
      description: "When you kill a stunned enemy unit, you may exhaust this to draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you kill a stunned enemy unit, you may exhaust this to draw 1.",
  artAsset: "",
};

export const zhonyasHourglassGear: CardDefinition = {
  id: "origins-gear-zhonyas-hourglass",
  name: "Zhonya's Hourglass",
  fullName: "Zhonya's Hourglass",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "zhonyas-hourglass-ability",
      name: "Zhonya's Hourglass",
      description: "HIDDEN (Hide for now to react with later for .) The next time a friendly unit would die, kill this instead. Recall that unit exhausted. (Send it to base. This isn't a move.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "HIDDEN (Hide for now to react with later for .) The next time a friendly unit would die, kill this instead. Recall that unit exhausted. (Send it to base. This isn't a move.)",
  artAsset: "",
};

export const sealOfFocusGear: CardDefinition = {
  id: "origins-gear-seal-of-focus",
  name: "Seal of Focus",
  fullName: "Seal of Focus",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Calm],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-focus-ability",
      name: "Seal of Focus",
      description: "[tap]: REACTION — ADD . (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap]: REACTION — ADD . (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const orbOfRegretGear: CardDefinition = {
  id: "origins-gear-orb-of-regret",
  name: "Orb of Regret",
  fullName: "Orb of Regret",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Mind],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "orb-of-regret-ability",
      name: "Orb of Regret",
      description: "[tap]: Give a unit -1 this turn, to a minimum of of 1 .",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "[tap]: Give a unit -1 this turn, to a minimum of of 1 .",
  artAsset: "",
};

export const energyConduitGear: CardDefinition = {
  id: "origins-gear-energy-conduit",
  name: "Energy Conduit",
  fullName: "Energy Conduit",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "energy-conduit-ability",
      name: "Energy Conduit",
      description: "[tap]: REACTION - ADD 1. (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "[tap]: REACTION - ADD 1. (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const garbageGrabberGear: CardDefinition = {
  id: "origins-gear-garbage-grabber",
  name: "Garbage Grabber",
  fullName: "Garbage Grabber",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "garbage-grabber-ability",
      name: "Garbage Grabber",
      description: "Recycle 3 from your trash, , [tap]: Draw 1.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Recycle 3 from your trash, , [tap]: Draw 1.",
  artAsset: "",
};

export const mushroomPouchGear: CardDefinition = {
  id: "origins-gear-mushroom-pouch",
  name: "Mushroom Pouch",
  fullName: "Mushroom Pouch",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "mushroom-pouch-ability",
      name: "Mushroom Pouch",
      description: "At the start of your Beginning Phase, if you control a facedown card at a battlefield, draw 1.",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "At the start of your Beginning Phase, if you control a facedown card at a battlefield, draw 1.",
  artAsset: "",
};

export const sealOfInsightGear: CardDefinition = {
  id: "origins-gear-seal-of-insight",
  name: "Seal of Insight",
  fullName: "Seal of Insight",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Mind],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-insight-ability",
      name: "Seal of Insight",
      description: "[tap]: REACTION - ADD . Activate this any time. (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap]: REACTION - ADD . Activate this any time. (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const arenaBarGear: CardDefinition = {
  id: "origins-gear-arena-bar",
  name: "Arena Bar",
  fullName: "Arena Bar",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "arena-bar-ability",
      name: "Arena Bar",
      description: "[tap]: Buff an exhausted friendly unit. (If it doesn't have a buff, it gets a +1 buff.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "[tap]: Buff an exhausted friendly unit. (If it doesn't have a buff, it gets a +1 buff.)",
  artAsset: "",
};

export const piratesHavenGear: CardDefinition = {
  id: "origins-gear-pirates-haven",
  name: "Pirate's Haven",
  fullName: "Pirate's Haven",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "pirates-haven-ability",
      name: "Pirate's Haven",
      description: "When you ready a friendly unit, give it +1 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When you ready a friendly unit, give it +1 this turn.",
  artAsset: "",
};

export const mistfallGear: CardDefinition = {
  id: "origins-gear-mistfall",
  name: "Mistfall",
  fullName: "Mistfall",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "mistfall-ability",
      name: "Mistfall",
      description: "When you buff a friendly unit, you may pay and exhaust this to ready it.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you buff a friendly unit, you may pay and exhaust this to ready it.",
  artAsset: "",
};

export const dazzlingAuroraGear: CardDefinition = {
  id: "origins-gear-dazzling-aurora",
  name: "Dazzling Aurora",
  fullName: "Dazzling Aurora",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 9, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "dazzling-aurora-ability",
      name: "Dazzling Aurora",
      description: "At the end of your turn, reveal cards from the top of your Main Deck until you reveal a unit. Play it, ignoring its cost, and recycle the rest.",
      trigger: TriggerType.OnTurnEnd,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "At the end of your turn, reveal cards from the top of your Main Deck until you reveal a unit. Play it, ignoring its cost, and recycle the rest.",
  artAsset: "",
};

export const sealOfStrengthGear: CardDefinition = {
  id: "origins-gear-seal-of-strength",
  name: "Seal of Strength",
  fullName: "Seal of Strength",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Body],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-strength-ability",
      name: "Seal of Strength",
      description: "[tap]: REACTION — ADD . Activate this any time. (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap]: REACTION — ADD . Activate this any time. (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const packOfWondersGear: CardDefinition = {
  id: "origins-gear-pack-of-wonders",
  name: "Pack of Wonders",
  fullName: "Pack of Wonders",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "pack-of-wonders-ability",
      name: "Pack of Wonders",
      description: "[tap]: Return another friendly gear, unit, or HIDDEN card to its owner's hand.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "[tap]: Return another friendly gear, unit, or HIDDEN card to its owner's hand.",
  artAsset: "",
};

export const scrapheapGear: CardDefinition = {
  id: "origins-gear-scrapheap",
  name: "Scrapheap",
  fullName: "Scrapheap",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "scrapheap-ability",
      name: "Scrapheap",
      description: "When this is played, discarded, or killed, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When this is played, discarded, or killed, draw 1.",
  artAsset: "",
};

export const theSyrenGear: CardDefinition = {
  id: "origins-gear-the-syren",
  name: "The Syren",
  fullName: "The Syren",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "the-syren-ability",
      name: "The Syren",
      description: ", [tap]: Move a friendly unit at a battlefield to your base.",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: ", [tap]: Move a friendly unit at a battlefield to your base.",
  artAsset: "",
};

export const treasureTroveGear: CardDefinition = {
  id: "origins-gear-treasure-trove",
  name: "Treasure Trove",
  fullName: "Treasure Trove",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "treasure-trove-ability",
      name: "Treasure Trove",
      description: "When this leaves the board, draw 1 and channel 1 rune exhausted. , [Tap]: Kill this.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "When this leaves the board, draw 1 and channel 1 rune exhausted. , [Tap]: Kill this.",
  artAsset: "",
};

export const sealOfDiscordGear: CardDefinition = {
  id: "origins-gear-seal-of-discord",
  name: "Seal of Discord",
  fullName: "Seal of Discord",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Chaos],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-discord-ability",
      name: "Seal of Discord",
      description: "[tap] : REACTION — ADD . (Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap] : REACTION — ADD . (Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const forgeOfTheFutureGear: CardDefinition = {
  id: "origins-gear-forge-of-the-future",
  name: "Forge of the Future",
  fullName: "Forge of the Future",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "forge-of-the-future-ability",
      name: "Forge of the Future",
      description: "When you play this, play a 1 Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Common,
  rulesText: "When you play this, play a 1 Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes.",
  artAsset: "",
};

export const symbolOfTheSolariGear: CardDefinition = {
  id: "origins-gear-symbol-of-the-solari",
  name: "Symbol of the Solari",
  fullName: "Symbol of the Solari",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Order],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "symbol-of-the-solari-ability",
      name: "Symbol of the Solari",
      description: "If a combat where you are the attacker ends in a tie, recall ALL units instead. (Send them to base. This isn't a move. Ties are calculated after combat damage is dealt.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "If a combat where you are the attacker ends in a tie, recall ALL units instead. (Send them to base. This isn't a move. Ties are calculated after combat damage is dealt.)",
  artAsset: "",
};

export const vanguardHelmGear: CardDefinition = {
  id: "origins-gear-vanguard-helm",
  name: "Vanguard Helm",
  fullName: "Vanguard Helm",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "vanguard-helm-ability",
      name: "Vanguard Helm",
      description: "Give a friendly unit +1 Might.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Uncommon,
  rulesText: "Give a friendly unit +1 Might.",
  artAsset: "",
};

export const baitedHookGear: CardDefinition = {
  id: "origins-gear-baited-hook",
  name: "Baited Hook",
  fullName: "Baited Hook",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "baited-hook-ability",
      name: "Baited Hook",
      description: "[Tap]: Kill a friendly unit. Look at the top 5 cards of your Main Deck. You may play a unit from among them that has Might up to 1 more than the killed unit, ignoring its cost. Then recycle the rest.",
      trigger: TriggerType.Activated,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[Tap]: Kill a friendly unit. Look at the top 5 cards of your Main Deck. You may play a unit from among them that has Might up to 1 more than the killed unit, ignoring its cost. Then recycle the rest.",
  artAsset: "",
};

export const sealOfUnityGear: CardDefinition = {
  id: "origins-gear-seal-of-unity",
  name: "Seal of Unity",
  fullName: "Seal of Unity",
  set: CardSet.Origins,
  type: CardType.Gear,
  domains: [Domain.Order],
  cost: { energyCost: 0, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "seal-of-unity-ability",
      name: "Seal of Unity",
      description: "[tap] : Add . Activate this any time.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "[tap] : Add . Activate this any time.",
  artAsset: "",
};
