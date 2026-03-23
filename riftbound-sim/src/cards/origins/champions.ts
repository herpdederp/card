// ============================================================================
// Riftbound TCG — Origins Set: Champions
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

export const dariusTrifarianChampion: CardDefinition = {
  id: "origins-champ-darius-trifarian",
  name: "Darius Trifarian",
  fullName: "Darius Trifarian",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "darius-trifarian-ability",
      name: "Darius Trifarian",
      description: "When you play your second card in a turn, give me +2 might this turn and ready me.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play your second card in a turn, give me +2 might this turn and ready me.",
  artAsset: "",
};

export const dravenShowboatChampion: CardDefinition = {
  id: "origins-champ-draven-showboat",
  name: "Draven Showboat",
  fullName: "Draven Showboat",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "draven-showboat-ability",
      name: "Draven Showboat",
      description: "My Might is increased by your points.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "My Might is increased by your points.",
  artAsset: "",
};

export const tryndamereBarbarianChampion: CardDefinition = {
  id: "origins-champ-tryndamere-barbarian",
  name: "Tryndamere Barbarian",
  fullName: "Tryndamere Barbarian",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  might: 8,
  health: 8,
  keywords: [],
  abilities: [
    {
      id: "tryndamere-barbarian-ability",
      name: "Tryndamere Barbarian",
      description: "When I conquer after an attack, if you assigned 5 or more excess damage to opponent's units, you score 1 Point.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I conquer after an attack, if you assigned 5 or more excess damage to opponent's units, you score 1 Point.",
  artAsset: "",
};

export const vayneHunterChampion: CardDefinition = {
  id: "origins-champ-vayne-hunter",
  name: "Vayne Hunter",
  fullName: "Vayne Hunter",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 2,
  health: 2,
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "vayne-hunter-ability",
      name: "Vayne Hunter",
      description: "ASSAULT 3 (+3 while I'm an attacker.) If an opponent controls a battlefield, I enter ready. When I conquer, you may pay to return me to my owner's hand.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ASSAULT 3 (+3 while I'm an attacker.) If an opponent controls a battlefield, I enter ready. When I conquer, you may pay to return me to my owner's hand.",
  artAsset: "",
};

export const viDestructiveChampion: CardDefinition = {
  id: "origins-champ-vi-destructive",
  name: "Vi Destructive",
  fullName: "Vi Destructive",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "vi-destructive-ability",
      name: "Vi Destructive",
      description: "GANKING (I can move from battlefield to battlefield.) Recycle 1 from your trash: Give me +1 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "GANKING (I can move from battlefield to battlefield.) Recycle 1 from your trash: Give me +1 this turn.",
  artAsset: "",
};

export const kaisaSurvivorChampion: CardDefinition = {
  id: "origins-champ-kaisa-survivor",
  name: "Kai'Sa Survivor",
  fullName: "Kai'Sa Survivor",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "kaisa-survivor-ability",
      name: "Kai'Sa Survivor",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.) When I conquer, draw 1.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.) When I conquer, draw 1.",
  artAsset: "",
};

export const volibearFuriousChampion: CardDefinition = {
  id: "origins-champ-volibear-furious",
  name: "Volibear Furious",
  fullName: "Volibear Furious",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Fury],
  cost: { energyCost: 10, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  might: 9,
  health: 9,
  keywords: [Keyword.Deflect],
  abilities: [
    {
      id: "volibear-furious-ability",
      name: "Volibear Furious",
      description: "DEFLECT 2 ( Opponents must pay to choose me with a spell or ability.) When I attack, deal 5 damage split among any number of enemy units here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "DEFLECT 2 ( Opponents must pay to choose me with a spell or ability.) When I attack, deal 5 damage split among any number of enemy units here.",
  artAsset: "",
};

export const ahriAlluringChampion: CardDefinition = {
  id: "origins-champ-ahri-alluring",
  name: "Ahri Alluring",
  fullName: "Ahri Alluring",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "ahri-alluring-ability",
      name: "Ahri Alluring",
      description: "When I hold, you score 1 point.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I hold, you score 1 point.",
  artAsset: "",
};

export const blitzcrankImpassiveChampion: CardDefinition = {
  id: "origins-champ-blitzcrank-impassive",
  name: "Blitzcrank Impassive",
  fullName: "Blitzcrank Impassive",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "blitzcrank-impassive-ability",
      name: "Blitzcrank Impassive",
      description: "TANK (I must be assigned combat damage first.) When you play me to a battlefield, you may move an enemy unit to here. When i hold, return me to my owner's hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "TANK (I must be assigned combat damage first.) When you play me to a battlefield, you may move an enemy unit to here. When i hold, return me to my owner's hand.",
  artAsset: "",
};

export const sonaHarmoniousChampion: CardDefinition = {
  id: "origins-champ-sona-harmonious",
  name: "Sona Harmonious",
  fullName: "Sona Harmonious",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "sona-harmonious-ability",
      name: "Sona Harmonious",
      description: "While I'm at a battlefield, ready 4 friendly runes at the end of your turn.",
      trigger: TriggerType.OnTurnEnd,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "While I'm at a battlefield, ready 4 friendly runes at the end of your turn.",
  artAsset: "",
};

export const taricProtectorChampion: CardDefinition = {
  id: "origins-champ-taric-protector",
  name: "Taric Protector",
  fullName: "Taric Protector",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "taric-protector-ability",
      name: "Taric Protector",
      description: "SHIELD (+1 might while I'm a defender.) TANK (I must be assigned combat damage first.) Other friendly units here have SHIELD.",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "SHIELD (+1 might while I'm a defender.) TANK (I must be assigned combat damage first.) Other friendly units here have SHIELD.",
  artAsset: "",
};

export const yasuoRemorsefulChampion: CardDefinition = {
  id: "origins-champ-yasuo-remorseful",
  name: "Yasuo Remorseful",
  fullName: "Yasuo Remorseful",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Calm, amount: 2 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "yasuo-remorseful-ability",
      name: "Yasuo Remorseful",
      description: "When I attack, deal damage equal to my Might to an enemy here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I attack, deal damage equal to my Might to an enemy here.",
  artAsset: "",
};

export const leeSinAsceticChampion: CardDefinition = {
  id: "origins-champ-lee-sin-ascetic",
  name: "Lee Sin Ascetic",
  fullName: "Lee Sin Ascetic",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "lee-sin-ascetic-ability",
      name: "Lee Sin Ascetic",
      description: "SHIELD (+1 while I'm a defender.) [tap]: Buff me. (I get +1 buff.) I can have any number of buffs.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "SHIELD (+1 while I'm a defender.) [tap]: Buff me. (I get +1 buff.) I can have any number of buffs.",
  artAsset: "",
};

export const leonaZealotChampion: CardDefinition = {
  id: "origins-champ-leona-zealot",
  name: "Leona Zealot",
  fullName: "Leona Zealot",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Calm],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "leona-zealot-ability",
      name: "Leona Zealot",
      description: "If an opponent's score is within 3 points of the Victory Score, I enter ready. Stunned enemy units here have -8 , to a minimum of 1 .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "If an opponent's score is within 3 points of the Victory Score, I enter ready. Stunned enemy units here have -8 , to a minimum of 1 .",
  artAsset: "",
};

export const drMundoExpertChampion: CardDefinition = {
  id: "origins-champ-dr-mundo-expert",
  name: "Dr. Mundo",
  subtitle: "Expert",
  fullName: "Dr. Mundo, Expert",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Mind, amount: 2 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "dr-mundo-expert-ability",
      name: "Expert",
      description: "My Might is increased by the number of cards in your trash. At the start of your Beginning Phase, recycle 3 from your trash.",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "My Might is increased by the number of cards in your trash. At the start of your Beginning Phase, recycle 3 from your trash.",
  artAsset: "",
};

export const ekkoRecurrentChampion: CardDefinition = {
  id: "origins-champ-ekko-recurrent",
  name: "Ekko Recurrent",
  fullName: "Ekko Recurrent",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "ekko-recurrent-ability",
      name: "Ekko Recurrent",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.) DEATHKNELL - Recycle me to ready your runes. (When I die, get the effect.)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.) DEATHKNELL - Recycle me to ready your runes. (When I die, get the effect.)",
  artAsset: "",
};

export const heimerdingerInventorChampion: CardDefinition = {
  id: "origins-champ-heimerdinger-inventor",
  name: "Heimerdinger Inventor",
  fullName: "Heimerdinger Inventor",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "heimerdinger-inventor-ability",
      name: "Heimerdinger Inventor",
      description: "I have all [tap] abilities of all friendly legends, units, and gears.",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "I have all [tap] abilities of all friendly legends, units, and gears.",
  artAsset: "",
};

export const kaisaEvolutionaryChampion: CardDefinition = {
  id: "origins-champ-kaisa-evolutionary",
  name: "Kai'Sa Evolutionary",
  fullName: "Kai'Sa Evolutionary",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "kaisa-evolutionary-ability",
      name: "Kai'Sa Evolutionary",
      description: "GANKING (I can move from battlefield to battlefield.) When I conquer, you may play a spell from your trash with Energy cost less than your points without paying its Energy cost. Then recycle it, (You must still pay its Power cost.)",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "GANKING (I can move from battlefield to battlefield.) When I conquer, you may play a spell from your trash with Energy cost less than your points without paying its Energy cost. Then recycle it, (You must still pay its Power cost.)",
  artAsset: "",
};

export const malzaharFanaticChampion: CardDefinition = {
  id: "origins-champ-malzahar-fanatic",
  name: "Malzahar Fanatic",
  fullName: "Malzahar Fanatic",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 4, powerCosts: [] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "malzahar-fanatic-ability",
      name: "Malzahar Fanatic",
      description: "Kill a friend unit or gear, [tap] : ACTION — ADD . (Use on your turn or in showdowns. Abilities that add resources can't be reacted to.)",
      trigger: TriggerType.Activated,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Kill a friend unit or gear, [tap] : ACTION — ADD . (Use on your turn or in showdowns. Abilities that add resources can't be reacted to.)",
  artAsset: "",
};

export const viktorInnovatorChampion: CardDefinition = {
  id: "origins-champ-viktor-innovator",
  name: "Viktor Innovator",
  fullName: "Viktor Innovator",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "viktor-innovator-ability",
      name: "Viktor Innovator",
      description: "When you play a card on an opponent's turn, play a 1 Recruit unit token in your base.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When you play a card on an opponent's turn, play a 1 Recruit unit token in your base.",
  artAsset: "",
};

export const ahriInquisitiveChampion: CardDefinition = {
  id: "origins-champ-ahri-inquisitive",
  name: "Ahri Inquisitive",
  fullName: "Ahri Inquisitive",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "ahri-inquisitive-ability",
      name: "Ahri Inquisitive",
      description: "When I attack or defend, give an enemy unit here -2 this turn, to a minimum of 1 .",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When I attack or defend, give an enemy unit here -2 this turn, to a minimum of 1 .",
  artAsset: "",
};

export const teemoStrategistChampion: CardDefinition = {
  id: "origins-champ-teemo-strategist",
  name: "Teemo Strategist",
  fullName: "Teemo Strategist",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  might: 2,
  health: 2,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "teemo-strategist-ability",
      name: "Teemo Strategist",
      description: "HIDDEN (Hide now for to react with later for .) When I defend or I'm from HIDDEN, reveal the top 5 cards of your Main Deck. Deal 1 to an enemy unit here for each card with HIDDEN, then recycle them.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "HIDDEN (Hide now for to react with later for .) When I defend or I'm from HIDDEN, reveal the top 5 cards of your Main Deck. Deal 1 to an enemy unit here for each card with HIDDEN, then recycle them.",
  artAsset: "",
};

export const aniviaPrimalChampion: CardDefinition = {
  id: "origins-champ-anivia-primal",
  name: "Anivia Primal",
  fullName: "Anivia Primal",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  might: 8,
  health: 8,
  keywords: [],
  abilities: [
    {
      id: "anivia-primal-ability",
      name: "Anivia Primal",
      description: "When I attack, deal 3 to all enemy units here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I attack, deal 3 to all enemy units here.",
  artAsset: "",
};

export const leeSinCenteredChampion: CardDefinition = {
  id: "origins-champ-lee-sin-centered",
  name: "Lee Sin Centered",
  fullName: "Lee Sin Centered",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 6, powerCosts: [] },
  might: 6,
  health: 6,
  keywords: [Keyword.Accelerate],
  abilities: [
    {
      id: "lee-sin-centered-ability",
      name: "Lee Sin Centered",
      description: "ACCELERATE (You may pay as an additional cost to have me enter ready.) Other buffed friendly units at my battlefield have +2 .",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "ACCELERATE (You may pay as an additional cost to have me enter ready.) Other buffed friendly units at my battlefield have +2 .",
  artAsset: "",
};

export const qiyanaVictoriousChampion: CardDefinition = {
  id: "origins-champ-qiyana-victorious",
  name: "Qiyana Victorious",
  fullName: "Qiyana Victorious",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Deflect],
  abilities: [
    {
      id: "qiyana-victorious-ability",
      name: "Qiyana Victorious",
      description: "DEFLECT (Opponents must pay to choose me with a spell or ability.) When I conquer, draw 1 or channel 1 rune exhausted.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "DEFLECT (Opponents must pay to choose me with a spell or ability.) When I conquer, draw 1 or channel 1 rune exhausted.",
  artAsset: "",
};

export const udyrWildmanChampion: CardDefinition = {
  id: "origins-champ-udyr-wildman",
  name: "Udyr Wildman",
  fullName: "Udyr Wildman",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "udyr-wildman-ability",
      name: "Udyr Wildman",
      description: "Spend my buff: Choose one you've not chosen turn — • Deal 2 to a unit at a battlefield. • Stun a unit at a battlefield • Ready me. • Give me GANKING this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Spend my buff: Choose one you've not chosen turn — • Deal 2 to a unit at a battlefield. • Stun a unit at a battlefield • Ready me. • Give me GANKING this turn.",
  artAsset: "",
};

export const volibearImposingChampion: CardDefinition = {
  id: "origins-champ-volibear-imposing",
  name: "Volibear Imposing",
  fullName: "Volibear Imposing",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 12, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  might: 10,
  health: 10,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "volibear-imposing-ability",
      name: "Volibear Imposing",
      description: "SHIELD 3 (+3 while I'm a defender.) TANK (I must be assigned combat damage first.) When an opponent moves to a battlefield other than mine, draw 1. (Bases are not battlefields.)",
      trigger: TriggerType.OnMove,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "SHIELD 3 (+3 while I'm a defender.) TANK (I must be assigned combat damage first.) When an opponent moves to a battlefield other than mine, draw 1. (Bases are not battlefields.)",
  artAsset: "",
};

export const warwickHunterChampion: CardDefinition = {
  id: "origins-champ-warwick-hunter",
  name: "Warwick",
  subtitle: "Hunter",
  fullName: "Warwick, Hunter",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "warwick-hunter-ability",
      name: "Hunter",
      description: "I enter ready. When I attack, destroy all damaged enemy units here.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "I enter ready. When I attack, destroy all damaged enemy units here.",
  artAsset: "",
};

export const missFortuneCaptainChampion: CardDefinition = {
  id: "origins-champ-miss-fortune-captain",
  name: "Miss Fortune",
  subtitle: "Captain",
  fullName: "Miss Fortune, Captain",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [Keyword.Accelerate, Keyword.Ganking],
  abilities: [
    {
      id: "miss-fortune-captain-ability",
      name: "Captain",
      description: "ACCELERATE. GANKING. The first time I move each turn, you may ready something else that's exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "ACCELERATE. GANKING. The first time I move each turn, you may ready something else that's exhausted.",
  artAsset: "",
};

export const settBrawlerChampion: CardDefinition = {
  id: "origins-champ-sett-brawler",
  name: "Sett Brawler",
  fullName: "Sett Brawler",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Body],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "sett-brawler-ability",
      name: "Sett Brawler",
      description: "When I'm played and when I conquer, buff me. (If I don't have a buff, I get a +1 buff.) Spend my buff: Give me +4 this turn.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When I'm played and when I conquer, buff me. (If I don't have a buff, I get a +1 buff.) Spend my buff: Give me +4 this turn.",
  artAsset: "",
};

export const kaynUnleashedChampion: CardDefinition = {
  id: "origins-champ-kayn-unleashed",
  name: "Kayn Unleashed",
  fullName: "Kayn Unleashed",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "kayn-unleashed-ability",
      name: "Kayn Unleashed",
      description: "GANKING (I can move from battlefield to battlefield.) If I have moved twice this turn, I don't take damage.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "GANKING (I can move from battlefield to battlefield.) If I have moved twice this turn, I don't take damage.",
  artAsset: "",
};

export const kogmawCausticChampion: CardDefinition = {
  id: "origins-champ-kogmaw-caustic",
  name: "Kog'Maw Caustic",
  fullName: "Kog'Maw Caustic",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 1,
  health: 1,
  keywords: [],
  abilities: [
    {
      id: "kogmaw-caustic-ability",
      name: "Kog'Maw Caustic",
      description: "DEATHKNELL - Deal 4 to all units at my battlefield. (When I die, get the effect)",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "DEATHKNELL - Deal 4 to all units at my battlefield. (When I die, get the effect)",
  artAsset: "",
};

export const missFortuneBuccaneerChampion: CardDefinition = {
  id: "origins-champ-miss-fortune-buccaneer",
  name: "Miss Fortune Buccaneer",
  fullName: "Miss Fortune Buccaneer",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "miss-fortune-buccaneer-ability",
      name: "Miss Fortune Buccaneer",
      description: "You may play me to an open battlefield. Friendly units may be played to open battlefields.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "You may play me to an open battlefield. Friendly units may be played to open battlefields.",
  artAsset: "",
};

export const nocturneHorrifyingChampion: CardDefinition = {
  id: "origins-champ-nocturne-horrifying",
  name: "Nocturne Horrifying",
  fullName: "Nocturne Horrifying",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "nocturne-horrifying-ability",
      name: "Nocturne Horrifying",
      description: "GANKING (I can move from battlefield to battlefield.) When you look at cards from the top of your deck (and don't draw them) and see me, you may play me for .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "GANKING (I can move from battlefield to battlefield.) When you look at cards from the top of your deck (and don't draw them) and see me, you may play me for .",
  artAsset: "",
};

export const teemoScoutChampion: CardDefinition = {
  id: "origins-champ-teemo-scout",
  name: "Teemo Scout",
  fullName: "Teemo Scout",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  might: 1,
  health: 1,
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "teemo-scout-ability",
      name: "Teemo Scout",
      description: "HIDDEN (Hide now for to react with later for .) When you play me, give me +3 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "HIDDEN (Hide now for to react with later for .) When you play me, give me +3 this turn.",
  artAsset: "",
};

export const twistedFateGamblerChampion: CardDefinition = {
  id: "origins-champ-twisted-fate-gambler",
  name: "Twisted Fate Gambler",
  fullName: "Twisted Fate Gambler",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "twisted-fate-gambler-ability",
      name: "Twisted Fate Gambler",
      description: "When I attack, reveal the top rune of your rune deck, then recycle it. Do one of the following based on its domain: - Deal 2 to an enemy unit here and 1 to all other enemy units here. - Draw 1. - Stun an enemy unit.",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "When I attack, reveal the top rune of your rune deck, then recycle it. Do one of the following based on its domain: - Deal 2 to an enemy unit here and 1 to all other enemy units here. - Draw 1. - Stun an enemy unit.",
  artAsset: "",
};

export const jinxRebelChampion: CardDefinition = {
  id: "origins-champ-jinx-rebel",
  name: "Jinx Rebel",
  fullName: "Jinx Rebel",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "jinx-rebel-ability",
      name: "Jinx Rebel",
      description: "When you discard one or more cards, ready me and give me +1 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When you discard one or more cards, ready me and give me +1 this turn.",
  artAsset: "",
};

export const yasuoWindriderChampion: CardDefinition = {
  id: "origins-champ-yasuo-windrider",
  name: "Yasuo Windrider",
  fullName: "Yasuo Windrider",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Chaos],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Ganking],
  abilities: [
    {
      id: "yasuo-windrider-ability",
      name: "Yasuo Windrider",
      description: "GANKING (I can move from battlefield to battlefield) The third time I move in a turn, you score 1 point.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "GANKING (I can move from battlefield to battlefield) The third time I move in a turn, you score 1 point.",
  artAsset: "",
};

export const fioraVictoriousChampion: CardDefinition = {
  id: "origins-champ-fiora-victorious",
  name: "Fiora Victorious",
  fullName: "Fiora Victorious",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [] },
  might: 4,
  health: 4,
  keywords: [Keyword.Deflect, Keyword.Ganking, Keyword.Shield],
  abilities: [
    {
      id: "fiora-victorious-ability",
      name: "Fiora Victorious",
      description: "While I'm MIGHTY, I have DEFLECT, GANKING and SHIELD. (I'm Mighty while I have 5+ .)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "While I'm MIGHTY, I have DEFLECT, GANKING and SHIELD. (I'm Mighty while I have 5+ .)",
  artAsset: "",
};

export const karmaChannelerChampion: CardDefinition = {
  id: "origins-champ-karma-channeler",
  name: "Karma Channeler",
  fullName: "Karma Channeler",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [],
  abilities: [
    {
      id: "karma-channeler-ability",
      name: "Karma Channeler",
      description: "Vision (When you play me, look at the top card of your Main Deck. You may recycle it.) When you recycle one or more cards, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff. Runes aren't cards.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Vision (When you play me, look at the top card of your Main Deck. You may recycle it.) When you recycle one or more cards, buff a friendly unit. (If it doesn't have a buff, it gets a +1 buff. Runes aren't cards.)",
  artAsset: "",
};

export const karthusEternalChampion: CardDefinition = {
  id: "origins-champ-karthus-eternal",
  name: "Karthus Eternal",
  fullName: "Karthus Eternal",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [],
  abilities: [
    {
      id: "karthus-eternal-ability",
      name: "Karthus Eternal",
      description: "Your DEATHKNELL effects trigger an additional time.",
      trigger: TriggerType.OnDestroy,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "Your DEATHKNELL effects trigger an additional time.",
  artAsset: "",
};

export const leonaDeterminedChampion: CardDefinition = {
  id: "origins-champ-leona-determined",
  name: "Leona Determined",
  fullName: "Leona Determined",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "leona-determined-ability",
      name: "Leona Determined",
      description: "SHIELD (+1 Might while I'm a defender.) When I attack, stun an enemy unit here. (It doesn't deal combat damage this turn.)",
      trigger: TriggerType.OnShowdownStart,
      targetType: TargetType.EnemyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "SHIELD (+1 Might while I'm a defender.) When I attack, stun an enemy unit here. (It doesn't deal combat damage this turn.)",
  artAsset: "",
};

export const settKingpinChampion: CardDefinition = {
  id: "origins-champ-sett-kingpin",
  name: "Sett Kingpin",
  fullName: "Sett Kingpin",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 5,
  health: 5,
  keywords: [],
  abilities: [
    {
      id: "sett-kingpin-ability",
      name: "Sett Kingpin",
      description: "TANK (I must be assigned combat damage first.) I get +1 for each buffed friendly unit at my battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "TANK (I must be assigned combat damage first.) I get +1 for each buffed friendly unit at my battlefield.",
  artAsset: "",
};

export const shenKinkouChampion: CardDefinition = {
  id: "origins-champ-shen-kinkou",
  name: "Shen Kinkou",
  fullName: "Shen Kinkou",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 3,
  health: 3,
  keywords: [Keyword.Shield],
  abilities: [
    {
      id: "shen-kinkou-ability",
      name: "Shen Kinkou",
      description: "REACTION (Play any time, even before spells and abilities resolve, including to a battlefield you control.) SHIELD 2 (+2 while I'm a defender.) TANK (I must be assigned combat damage first.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Rare,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve, including to a battlefield you control.) SHIELD 2 (+2 while I'm a defender.) TANK (I must be assigned combat damage first.)",
  artAsset: "",
};

export const dariusExecutionerChampion: CardDefinition = {
  id: "origins-champ-darius-executioner",
  name: "Darius Executioner",
  fullName: "Darius Executioner",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 6,
  health: 6,
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "darius-executioner-ability",
      name: "Darius Executioner",
      description: "LEGION - When you play me, ready me. (Get the effect if you've played another card this turn) Other friendly units have +1 here.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "LEGION - When you play me, ready me. (Get the effect if you've played another card this turn) Other friendly units have +1 here.",
  artAsset: "",
};

export const viktorLeaderChampion: CardDefinition = {
  id: "origins-champ-viktor-leader",
  name: "Viktor Leader",
  fullName: "Viktor Leader",
  set: CardSet.Origins,
  type: CardType.Champion,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  might: 4,
  health: 4,
  keywords: [],
  abilities: [
    {
      id: "viktor-leader-ability",
      name: "Viktor Leader",
      description: "When another non-Recruit unit you control dies, play a 1 might Recruit unit token into your base.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  rarity: Rarity.Epic,
  rulesText: "When another non-Recruit unit you control dies, play a 1 might Recruit unit token into your base.",
  artAsset: "",
};
