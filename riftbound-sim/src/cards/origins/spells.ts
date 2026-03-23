// ============================================================================
// Riftbound TCG — Origins Set: Spells
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

export const cleaveSpell: CardDefinition = {
  id: "origins-spell-cleave",
  name: "Cleave",
  fullName: "Cleave",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [Keyword.Assault],
  abilities: [
    {
      id: "cleave-ability",
      name: "Cleave",
      description: "ACTION (Play on your turn or in showdowns.) Give a unit ASSAULT 3 this turn. (+3 while it's an attacker.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Give a unit ASSAULT 3 this turn. (+3 while it's an attacker.)",
  artAsset: "",
};

export const disintegrateSpell: CardDefinition = {
  id: "origins-spell-disintegrate",
  name: "Disintegrate",
  fullName: "Disintegrate",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "disintegrate-ability",
      name: "Disintegrate",
      description: "ACTION (Play on your turn or showdowns.) Deal 3 to a unit at a battlefield. If this kills it, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or showdowns.) Deal 3 to a unit at a battlefield. If this kills it, draw 1.",
  artAsset: "",
};

export const hextechRaySpell: CardDefinition = {
  id: "origins-spell-hextech-ray",
  name: "Hextech Ray",
  fullName: "Hextech Ray",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "hextech-ray-ability",
      name: "Hextech Ray",
      description: "ACTION (Play on your turn or in showdowns.) Deal 3 damage to a unit at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Deal 3 damage to a unit at a battlefield.",
  artAsset: "",
};

export const skySplitterSpell: CardDefinition = {
  id: "origins-spell-sky-splitter",
  name: "Sky Splitter",
  fullName: "Sky Splitter",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "sky-splitter-ability",
      name: "Sky Splitter",
      description: "ACTION (Play on your turn or in showdowns.) This spell's Energy cost is reduced by the highest Might among units you control. Deal 5 to a unit at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) This spell's Energy cost is reduced by the highest Might among units you control. Deal 5 to a unit at a battlefield.",
  artAsset: "",
};

export const thermoBeamSpell: CardDefinition = {
  id: "origins-spell-thermo-beam",
  name: "Thermo Beam",
  fullName: "Thermo Beam",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "thermo-beam-ability",
      name: "Thermo Beam",
      description: "ACTION (Play on your turn or in showdowns) Kill all gear.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns) Kill all gear.",
  artAsset: "",
};

export const voidSeekerSpell: CardDefinition = {
  id: "origins-spell-void-seeker",
  name: "Void Seeker",
  fullName: "Void Seeker",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "void-seeker-ability",
      name: "Void Seeker",
      description: "ACTION (Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield. Draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield. Draw 1.",
  artAsset: "",
};

export const blindFurySpell: CardDefinition = {
  id: "origins-spell-blind-fury",
  name: "Blind Fury",
  fullName: "Blind Fury",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "blind-fury-ability",
      name: "Blind Fury",
      description: "ACTION (Play on your turn or in showdowns.) Each opponent reveals the top card of their Main Deck. Choose one and play it, ignoring its cost. Then recycle the rest.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Rare,
  rulesText: "ACTION (Play on your turn or in showdowns.) Each opponent reveals the top card of their Main Deck. Choose one and play it, ignoring its cost. Then recycle the rest.",
  artAsset: "",
};

export const fallingStarSpell: CardDefinition = {
  id: "origins-spell-falling-star",
  name: "Falling Star",
  fullName: "Falling Star",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "falling-star-ability",
      name: "Falling Star",
      description: "Do this twice: Deal 3 to a unit. (You can choose different units.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Do this twice: Deal 3 to a unit. (You can choose different units.)",
  artAsset: "",
};

export const shakedownSpell: CardDefinition = {
  id: "origins-spell-shakedown",
  name: "Shakedown",
  fullName: "Shakedown",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "shakedown-ability",
      name: "Shakedown",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Choose an enemy unit. Deal 6 to it unless its controller has you draw 2.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Rare,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Choose an enemy unit. Deal 6 to it unless its controller has you draw 2.",
  artAsset: "",
};

export const charmSpell: CardDefinition = {
  id: "origins-spell-charm",
  name: "Charm",
  fullName: "Charm",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "charm-ability",
      name: "Charm",
      description: "Move an enemy unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Common,
  rulesText: "Move an enemy unit.",
  artAsset: "",
};

export const enGardeSpell: CardDefinition = {
  id: "origins-spell-en-garde",
  name: "En Garde",
  fullName: "En Garde",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "en-garde-ability",
      name: "En Garde",
      description: "REACTION (Play any time, even before spells or abilities resolve.) Give a friendly unit +1 might, then an additional +1 this turn if it is the only unit you control there.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells or abilities resolve.) Give a friendly unit +1 might, then an additional +1 this turn if it is the only unit you control there.",
  artAsset: "",
};

export const findYourCenterSpell: CardDefinition = {
  id: "origins-spell-find-your-center",
  name: "Find Your Center",
  fullName: "Find Your Center",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "find-your-center-ability",
      name: "Find Your Center",
      description: "ACTION (Play on your turn or in showdowns.) If an opponent's score is within 3 points of the Victory Score, this costs less. Draw 1 and channel 1 rune exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) If an opponent's score is within 3 points of the Victory Score, this costs less. Draw 1 and channel 1 rune exhausted.",
  artAsset: "",
};

export const meditationSpell: CardDefinition = {
  id: "origins-spell-meditation",
  name: "Meditation",
  fullName: "Meditation",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "meditation-ability",
      name: "Meditation",
      description: "REACTION (Play anytime, even before spells and abilities resolve.) As an additional cost to play this, you may exhaust a friendly unit. If you do, draw 2. Otherwise, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play anytime, even before spells and abilities resolve.) As an additional cost to play this, you may exhaust a friendly unit. If you do, draw 2. Otherwise, draw 1.",
  artAsset: "",
};

export const runePrisonSpell: CardDefinition = {
  id: "origins-spell-rune-prison",
  name: "Rune Prison",
  fullName: "Rune Prison",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "rune-prison-ability",
      name: "Rune Prison",
      description: "ACTION (Play on your turn or in showdowns.) Stun a unit. (It doesn't deal combat damage this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Stun a unit. (It doesn't deal combat damage this turn.)",
  artAsset: "",
};

export const standUnitedSpell: CardDefinition = {
  id: "origins-spell-stand-united",
  name: "Stand United",
  fullName: "Stand United",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "stand-united-ability",
      name: "Stand United",
      description: "HIDDEN (Hide now for to react with later for ) ACTION (Play on your turn or in showdowns.) Buff a friendly unit. Buffs give an additional +1 to friendly units this turn. (To buff a unit, give it a +1 buff it it doesn't already have one.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for ) ACTION (Play on your turn or in showdowns.) Buff a friendly unit. Buffs give an additional +1 to friendly units this turn. (To buff a unit, give it a +1 buff it it doesn't already have one.)",
  artAsset: "",
};

export const blockSpell: CardDefinition = {
  id: "origins-spell-block",
  name: "Block",
  fullName: "Block",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [Keyword.Hidden, Keyword.Shield],
  abilities: [
    {
      id: "block-ability",
      name: "Block",
      description: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or in showdowns.) Give a unit SHIELD 3 and TANK this turn. (+3 while it's a defender. It must be assigned combat damage first.)",
      trigger: TriggerType.Static,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or in showdowns.) Give a unit SHIELD 3 and TANK this turn. (+3 while it's a defender. It must be assigned combat damage first.)",
  artAsset: "",
};

export const disciplineSpell: CardDefinition = {
  id: "origins-spell-discipline",
  name: "Discipline",
  fullName: "Discipline",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "discipline-ability",
      name: "Discipline",
      description: "REACTION (Play anytime, even before spells and abilities resolve.) Give a unit +2 this turn. Draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Uncommon,
  rulesText: "REACTION (Play anytime, even before spells and abilities resolve.) Give a unit +2 this turn. Draw 1.",
  artAsset: "",
};

export const reinforceSpell: CardDefinition = {
  id: "origins-spell-reinforce",
  name: "Reinforce",
  fullName: "Reinforce",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 5, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "reinforce-ability",
      name: "Reinforce",
      description: "Look at the top 5 cards of you Main Deck. You may play a unit from among them. Its Energy cost is reduced by [5]. Then recycle the remaining cards.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Look at the top 5 cards of you Main Deck. You may play a unit from among them. Its Energy cost is reduced by [5]. Then recycle the remaining cards.",
  artAsset: "",
};

export const windWallSpell: CardDefinition = {
  id: "origins-spell-wind-wall",
  name: "Wind Wall",
  fullName: "Wind Wall",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "wind-wall-ability",
      name: "Wind Wall",
      description: "REACTION (Play anytime, even before spells and abilities resolve.) Counter a spell.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Uncommon,
  rulesText: "REACTION (Play anytime, even before spells and abilities resolve.) Counter a spell.",
  artAsset: "",
};

export const lastStandSpell: CardDefinition = {
  id: "origins-spell-last-stand",
  name: "Last Stand",
  fullName: "Last Stand",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [Keyword.Temporary],
  abilities: [
    {
      id: "last-stand-ability",
      name: "Last Stand",
      description: "ACTION (Play on your turn or in showdowns.) Double a friendly unit's Might this turn. Give it TEMPORARY. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Rare,
  rulesText: "ACTION (Play on your turn or in showdowns.) Double a friendly unit's Might this turn. Give it TEMPORARY. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
  artAsset: "",
};

export const partyFavorsSpell: CardDefinition = {
  id: "origins-spell-party-favors",
  name: "Party Favors",
  fullName: "Party Favors",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "party-favors-ability",
      name: "Party Favors",
      description: "Each other player chooses Cards or Runes. For each player that chooses Cards, you and that player each draw 1. For each player that chooses Runes, you and that player each channel 1 rune exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Each other player chooses Cards or Runes. For each player that chooses Cards, you and that player each draw 1. For each player that chooses Runes, you and that player each channel 1 rune exhausted.",
  artAsset: "",
};

export const mysticReversalSpell: CardDefinition = {
  id: "origins-spell-mystic-reversal",
  name: "Mystic Reversal",
  fullName: "Mystic Reversal",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Calm, amount: 3 }] },
  keywords: [],
  abilities: [
    {
      id: "mystic-reversal-ability",
      name: "Mystic Reversal",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Gain control of a spell. You may make new choices for it.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Epic,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Gain control of a spell. You may make new choices for it.",
  artAsset: "",
};

export const consultThePastSpell: CardDefinition = {
  id: "origins-spell-consult-the-past",
  name: "Consult the Past",
  fullName: "Consult the Past",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 4, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "consult-the-past-ability",
      name: "Consult the Past",
      description: "HIDDEN (Hide now for to react with later for .) REACTION (Play any time, even before spells and abilities resolve.) Draw 2.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for .) REACTION (Play any time, even before spells and abilities resolve.) Draw 2.",
  artAsset: "",
};

export const fallingCometSpell: CardDefinition = {
  id: "origins-spell-falling-comet",
  name: "Falling Comet",
  fullName: "Falling Comet",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 5, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "falling-comet-ability",
      name: "Falling Comet",
      description: "ACTION (play on your turn or in showdowns.) Deal 6 to a unit at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (play on your turn or in showdowns.) Deal 6 to a unit at a battlefield.",
  artAsset: "",
};

export const smokeScreenSpell: CardDefinition = {
  id: "origins-spell-smoke-screen",
  name: "Smoke Screen",
  fullName: "Smoke Screen",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "smoke-screen-ability",
      name: "Smoke Screen",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Give a unit -4 this turn, to a minimum of 1 .",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Give a unit -4 this turn, to a minimum of 1 .",
  artAsset: "",
};

export const spriteCallSpell: CardDefinition = {
  id: "origins-spell-sprite-call",
  name: "Sprite Call",
  fullName: "Sprite Call",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [Keyword.Hidden, Keyword.Temporary],
  abilities: [
    {
      id: "sprite-call-ability",
      name: "Sprite Call",
      description: "HIDDEN (Hide now for to react with later for ) ACTION (Play on your turn or in showdowns.) Play a ready 3 Sprite unit token with TEMPORARY (Kill it at the start of its controller's Beginning Phase, before scoring.)",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for ) ACTION (Play on your turn or in showdowns.) Play a ready 3 Sprite unit token with TEMPORARY (Kill it at the start of its controller's Beginning Phase, before scoring.)",
  artAsset: "",
};

export const stupefySpell: CardDefinition = {
  id: "origins-spell-stupefy",
  name: "Stupefy",
  fullName: "Stupefy",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "stupefy-ability",
      name: "Stupefy",
      description: "REACTION (Play anytime, even before spells and abilities resolve.) Give a unit +1 this turn, to a minimum of 1 . Draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play anytime, even before spells and abilities resolve.) Give a unit +1 this turn, to a minimum of 1 . Draw 1.",
  artAsset: "",
};

export const portalRescueSpell: CardDefinition = {
  id: "origins-spell-portal-rescue",
  name: "Portal Rescue",
  fullName: "Portal Rescue",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "portal-rescue-ability",
      name: "Portal Rescue",
      description: "ACTION (Play on your turn or in showdowns.) Banish a friendly unit, then play it to base, ignoring its cost.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns.) Banish a friendly unit, then play it to base, ignoring its cost.",
  artAsset: "",
};

export const retreatSpell: CardDefinition = {
  id: "origins-spell-retreat",
  name: "Retreat",
  fullName: "Retreat",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "retreat-ability",
      name: "Retreat",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Uncommon,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted.",
  artAsset: "",
};

export const singularitySpell: CardDefinition = {
  id: "origins-spell-singularity",
  name: "Singularity",
  fullName: "Singularity",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Mind, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "singularity-ability",
      name: "Singularity",
      description: "Deal 6 to each of up to two units.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Deal 6 to each of up to two units.",
  artAsset: "",
};

export const convergentMutationSpell: CardDefinition = {
  id: "origins-spell-convergent-mutation",
  name: "Convergent Mutation",
  fullName: "Convergent Mutation",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "convergent-mutation-ability",
      name: "Convergent Mutation",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Choose a friendly unit. Increase its Might until it equals the Might of another friendly unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Rare,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Choose a friendly unit. Increase its Might until it equals the Might of another friendly unit.",
  artAsset: "",
};

export const progressDaySpell: CardDefinition = {
  id: "origins-spell-progress-day",
  name: "Progress Day",
  fullName: "Progress Day",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "progress-day-ability",
      name: "Progress Day",
      description: "Draw 4.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Draw 4.",
  artAsset: "",
};

export const promisingFutureSpell: CardDefinition = {
  id: "origins-spell-promising-future",
  name: "Promising Future",
  fullName: "Promising Future",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "promising-future-ability",
      name: "Promising Future",
      description: "Each player looks at the top 5 cards of their Main Deck, chooses one, then recycles the rest. Starting with the next player, each player plays those cards ignoring Energy costs. (They must still pay Power costs)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Each player looks at the top 5 cards of their Main Deck, chooses one, then recycles the rest. Starting with the next player, each player plays those cards ignoring Energy costs. (They must still pay Power costs)",
  artAsset: "",
};

export const timeWarpSpell: CardDefinition = {
  id: "origins-spell-time-warp",
  name: "Time Warp",
  fullName: "Time Warp",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 10, powerCosts: [{ domain: Domain.Mind, amount: 4 }] },
  keywords: [],
  abilities: [
    {
      id: "time-warp-ability",
      name: "Time Warp",
      description: "Take a turn after this one. Banish this.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Take a turn after this one. Banish this.",
  artAsset: "",
};

export const uncheckedPowerSpell: CardDefinition = {
  id: "origins-spell-unchecked-power",
  name: "Unchecked Power",
  fullName: "Unchecked Power",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Mind, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "unchecked-power-ability",
      name: "Unchecked Power",
      description: "Exhaust all friendly units, then deal 12 to all units at battlefields.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Exhaust all friendly units, then deal 12 to all units at battlefields.",
  artAsset: "",
};

export const cannonBarrageSpell: CardDefinition = {
  id: "origins-spell-cannon-barrage",
  name: "Cannon Barrage",
  fullName: "Cannon Barrage",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "cannon-barrage-ability",
      name: "Cannon Barrage",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Deal 2 to all enemy units in combat.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Deal 2 to all enemy units in combat.",
  artAsset: "",
};

export const challengeSpell: CardDefinition = {
  id: "origins-spell-challenge",
  name: "Challenge",
  fullName: "Challenge",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "challenge-ability",
      name: "Challenge",
      description: "ACTION (Play on your turn or in showdowns.) Choose a friendly unit and an enemy unit. they deal damage equal to their Mights to each other.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Choose a friendly unit and an enemy unit. they deal damage equal to their Mights to each other.",
  artAsset: "",
};

export const confrontSpell: CardDefinition = {
  id: "origins-spell-confront",
  name: "Confront",
  fullName: "Confront",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "confront-ability",
      name: "Confront",
      description: "ACTION (Play on your turn or in showdowns.) Units you play this turn enter ready. Draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Units you play this turn enter ready. Draw 1.",
  artAsset: "",
};

export const flurryOfBladesSpell: CardDefinition = {
  id: "origins-spell-flurry-of-blades",
  name: "Flurry of Blades",
  fullName: "Flurry of Blades",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "flurry-of-blades-ability",
      name: "Flurry of Blades",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields.",
  artAsset: "",
};

export const mobilizeSpell: CardDefinition = {
  id: "origins-spell-mobilize",
  name: "Mobilize",
  fullName: "Mobilize",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "mobilize-ability",
      name: "Mobilize",
      description: "Channel 1 rune exhausted, if you couldn't, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Common,
  rulesText: "Channel 1 rune exhausted, if you couldn't, draw 1.",
  artAsset: "",
};

export const catalystOfAeonsSpell: CardDefinition = {
  id: "origins-spell-catalyst-of-aeons",
  name: "Catalyst of Aeons",
  fullName: "Catalyst of Aeons",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "catalyst-of-aeons-ability",
      name: "Catalyst of Aeons",
      description: "Channel 2 rune exhausted. If you couldn't channel 2 runes this way, draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Channel 2 rune exhausted. If you couldn't channel 2 runes this way, draw 1.",
  artAsset: "",
};

export const spoilsOfWarSpell: CardDefinition = {
  id: "origins-spell-spoils-of-war",
  name: "Spoils of War",
  fullName: "Spoils of War",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "spoils-of-war-ability",
      name: "Spoils of War",
      description: "REACTION (Play any time, even before spells and abilities resolve.) If an enemy unit has died this turn, this costs less. Draw 2.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Uncommon,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) If an enemy unit has died this turn, this costs less. Draw 2.",
  artAsset: "",
};

export const unyieldingSpiritSpell: CardDefinition = {
  id: "origins-spell-unyielding-spirit",
  name: "Unyielding Spirit",
  fullName: "Unyielding Spirit",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "unyielding-spirit-ability",
      name: "Unyielding Spirit",
      description: "REACTION (Play at any time, even before spells and abilities resolve.) Prevent all spell and ability damage this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Uncommon,
  rulesText: "REACTION (Play at any time, even before spells and abilities resolve.) Prevent all spell and ability damage this turn.",
  artAsset: "",
};

export const wallopSpell: CardDefinition = {
  id: "origins-spell-wallop",
  name: "Wallop",
  fullName: "Wallop",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "wallop-ability",
      name: "Wallop",
      description: "ACTION (Play on your turn or in showdowns.) As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's cost. Ready a unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns.) As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's cost. Ready a unit.",
  artAsset: "",
};

export const overtOperationSpell: CardDefinition = {
  id: "origins-spell-overt-operation",
  name: "Overt Operation",
  fullName: "Overt Operation",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Body, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "overt-operation-ability",
      name: "Overt Operation",
      description: "ACTION (Play on your turn or in showdowns.) For each friendly unit, you may spend its buff to ready it. Then buff all friendly units. (Each one that doesn't have a buff gets a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Rare,
  rulesText: "ACTION (Play on your turn or in showdowns.) For each friendly unit, you may spend its buff to ready it. Then buff all friendly units. (Each one that doesn't have a buff gets a +1 buff.)",
  artAsset: "",
};

export const primalStrengthSpell: CardDefinition = {
  id: "origins-spell-primal-strength",
  name: "Primal Strength",
  fullName: "Primal Strength",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "primal-strength-ability",
      name: "Primal Strength",
      description: "ACTION (Play on your turn or in showdowns.) Give a unit +7 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Rare,
  rulesText: "ACTION (Play on your turn or in showdowns.) Give a unit +7 this turn.",
  artAsset: "",
};

export const sabotageSpell: CardDefinition = {
  id: "origins-spell-sabotage",
  name: "Sabotage",
  fullName: "Sabotage",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "sabotage-ability",
      name: "Sabotage",
      description: "Choose an opponent. They reveal their hand. Choose a non-unit card from it, and recycle that card.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Choose an opponent. They reveal their hand. Choose a non-unit card from it, and recycle that card.",
  artAsset: "",
};

export const fightOrFlightSpell: CardDefinition = {
  id: "origins-spell-fight-or-flight",
  name: "Fight or Flight",
  fullName: "Fight or Flight",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "fight-or-flight-ability",
      name: "Fight or Flight",
      description: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or in showdowns.) Move a unit from a battlefield to its base.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or in showdowns.) Move a unit from a battlefield to its base.",
  artAsset: "",
};

export const gustSpell: CardDefinition = {
  id: "origins-spell-gust",
  name: "Gust",
  fullName: "Gust",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "gust-ability",
      name: "Gust",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 or less to its owner's hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 or less to its owner's hand.",
  artAsset: "",
};

export const morbidReturnSpell: CardDefinition = {
  id: "origins-spell-morbid-return",
  name: "Morbid Return",
  fullName: "Morbid Return",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "morbid-return-ability",
      name: "Morbid Return",
      description: "ACTION (Play on your turn or in showdowns.) Return a unit from your trash to your hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Return a unit from your trash to your hand.",
  artAsset: "",
};

export const rebukeSpell: CardDefinition = {
  id: "origins-spell-rebuke",
  name: "Rebuke",
  fullName: "Rebuke",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Chaos, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "rebuke-ability",
      name: "Rebuke",
      description: "ACTION (Play on your turn or in showdowns.) Return a unit at a battlefield to its owner's hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (Play on your turn or in showdowns.) Return a unit at a battlefield to its owner's hand.",
  artAsset: "",
};

export const rideTheWindSpell: CardDefinition = {
  id: "origins-spell-ride-the-wind",
  name: "Ride the Wind",
  fullName: "Ride the Wind",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "ride-the-wind-ability",
      name: "Ride the Wind",
      description: "ACTION (play on your turn or in showdowns.) Move a friendly unit and ready it.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "ACTION (play on your turn or in showdowns.) Move a friendly unit and ready it.",
  artAsset: "",
};

export const acceptableLossesSpell: CardDefinition = {
  id: "origins-spell-acceptable-losses",
  name: "Acceptable Losses",
  fullName: "Acceptable Losses",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "acceptable-losses-ability",
      name: "Acceptable Losses",
      description: "ACTION (Play on your turn or in showdowns.) Each player kills one of their gear.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns.) Each player kills one of their gear.",
  artAsset: "",
};

export const fadingMemoriesSpell: CardDefinition = {
  id: "origins-spell-fading-memories",
  name: "Fading Memories",
  fullName: "Fading Memories",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  keywords: [Keyword.Temporary],
  abilities: [
    {
      id: "fading-memories-ability",
      name: "Fading Memories",
      description: "Give a unit at a battlefield or a gear TEMPORARY. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
      trigger: TriggerType.OnTurnStart,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Give a unit at a battlefield or a gear TEMPORARY. (Kill it at the start of its controller's Beginning Phase, before scoring.)",
  artAsset: "",
};

export const stackedDeckSpell: CardDefinition = {
  id: "origins-spell-stacked-deck",
  name: "Stacked Deck",
  fullName: "Stacked Deck",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "stacked-deck-ability",
      name: "Stacked Deck",
      description: "ACTION (play on your turn or in showdowns.) Look at the top 3 cards of your Main Deck. Put 1 into your hand and recycle the rest.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (play on your turn or in showdowns.) Look at the top 3 cards of your Main Deck. Put 1 into your hand and recycle the rest.",
  artAsset: "",
};

export const whirlwindSpell: CardDefinition = {
  id: "origins-spell-whirlwind",
  name: "Whirlwind",
  fullName: "Whirlwind",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "whirlwind-ability",
      name: "Whirlwind",
      description: "Starting with the next player, each player may return a unit to its owner's hand.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Starting with the next player, each player may return a unit to its owner's hand.",
  artAsset: "",
};

export const theHarrowingSpell: CardDefinition = {
  id: "origins-spell-the-harrowing",
  name: "The Harrowing",
  fullName: "The Harrowing",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Chaos, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "the-harrowing-ability",
      name: "The Harrowing",
      description: "Play a unit from your trash, ignoring its Energy cost. (You must still pay its Power cost.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Play a unit from your trash, ignoring its Energy cost. (You must still pay its Power cost.)",
  artAsset: "",
};

export const invertTimelinesSpell: CardDefinition = {
  id: "origins-spell-invert-timelines",
  name: "Invert Timelines",
  fullName: "Invert Timelines",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Chaos, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "invert-timelines-ability",
      name: "Invert Timelines",
      description: "Each player discards their hand, then draws 4.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Each player discards their hand, then draws 4.",
  artAsset: "",
};

export const possessionSpell: CardDefinition = {
  id: "origins-spell-possession",
  name: "Possession",
  fullName: "Possession",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Chaos],
  cost: { energyCost: 8, powerCosts: [{ domain: Domain.Chaos, amount: 3 }] },
  keywords: [],
  abilities: [
    {
      id: "possession-ability",
      name: "Possession",
      description: "ACTION (Play on your turn or in showdowns.) Move an enemy unit at a battlefield. Take control of it and recall it. (Send it to your base. This isn't a move.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "ACTION (Play on your turn or in showdowns.) Move an enemy unit at a battlefield. Take control of it and recall it. (Send it to your base. This isn't a move.)",
  artAsset: "",
};

export const backToBackSpell: CardDefinition = {
  id: "origins-spell-back-to-back",
  name: "Back to Back",
  fullName: "Back to Back",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "back-to-back-ability",
      name: "Back to Back",
      description: "REACTION (Play any time, even before spells and abilities resolve.) Give two friendly units each +2 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) Give two friendly units each +2 this turn.",
  artAsset: "",
};

export const callToGlorySpell: CardDefinition = {
  id: "origins-spell-call-to-glory",
  name: "Call to Glory",
  fullName: "Call to Glory",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "call-to-glory-ability",
      name: "Call to Glory",
      description: "REACTION (Play any time, even before spells and abilities resolve.) As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's cost. Give a unit +3 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Common,
  rulesText: "REACTION (Play any time, even before spells and abilities resolve.) As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's cost. Give a unit +3 this turn.",
  artAsset: "",
};

export const cullTheWeakSpell: CardDefinition = {
  id: "origins-spell-cull-the-weak",
  name: "Cull the Weak",
  fullName: "Cull the Weak",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "cull-the-weak-ability",
      name: "Cull the Weak",
      description: "Each player kills one of their units.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Common,
  rulesText: "Each player kills one of their units.",
  artAsset: "",
};

export const hiddenBladeSpell: CardDefinition = {
  id: "origins-spell-hidden-blade",
  name: "Hidden Blade",
  fullName: "Hidden Blade",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "hidden-blade-ability",
      name: "Hidden Blade",
      description: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or showdowns.) Kill a unit at a battlefield, Its controller draws 2.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Common,
  rulesText: "HIDDEN (Hide now for to react with later for .) ACTION (Play on your turn or showdowns.) Kill a unit at a battlefield, Its controller draws 2.",
  artAsset: "",
};

export const facebreakerSpell: CardDefinition = {
  id: "origins-spell-facebreaker",
  name: "Facebreaker",
  fullName: "Facebreaker",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "facebreaker-ability",
      name: "Facebreaker",
      description: "HIDDEN (Hide now for to react with later for .) ACTION (play on your turn or in showdowns.) Stun a friendly unit and an enemy unit at the same battlefield. (They don't deal combat damage this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "HIDDEN (Hide now for to react with later for .) ACTION (play on your turn or in showdowns.) Stun a friendly unit and an enemy unit at the same battlefield. (They don't deal combat damage this turn.)",
  artAsset: "",
};

export const imperialDecreeSpell: CardDefinition = {
  id: "origins-spell-imperial-decree",
  name: "Imperial Decree",
  fullName: "Imperial Decree",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 5, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "imperial-decree-ability",
      name: "Imperial Decree",
      description: "ACTION (Play on your turn or in showdowns.) When any unit takes damage this turn, kill it.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (Play on your turn or in showdowns.) When any unit takes damage this turn, kill it.",
  artAsset: "",
};

export const salvageSpell: CardDefinition = {
  id: "origins-spell-salvage",
  name: "Salvage",
  fullName: "Salvage",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Order, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "salvage-ability",
      name: "Salvage",
      description: "ACTION (play on your turn or in showdowns.) You may kill a gear. Draw 1.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Uncommon,
  rulesText: "ACTION (play on your turn or in showdowns.) You may kill a gear. Draw 1.",
  artAsset: "",
};

export const vengeanceSpell: CardDefinition = {
  id: "origins-spell-vengeance",
  name: "Vengeance",
  fullName: "Vengeance",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "vengeance-ability",
      name: "Vengeance",
      description: "Kill a unit.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Uncommon,
  rulesText: "Kill a unit.",
  artAsset: "",
};

export const grandStrategemSpell: CardDefinition = {
  id: "origins-spell-grand-strategem",
  name: "Grand Strategem",
  fullName: "Grand Strategem",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 3 }] },
  keywords: [],
  abilities: [
    {
      id: "grand-strategem-ability",
      name: "Grand Strategem",
      description: "Give friendly units +5 this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Give friendly units +5 this turn.",
  artAsset: "",
};

export const kingsEdictSpell: CardDefinition = {
  id: "origins-spell-kings-edict",
  name: "King's Edict",
  fullName: "King's Edict",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "kings-edict-ability",
      name: "King's Edict",
      description: "Starting with the next player, each other player chooses a unit you don't control that hasn't been chosen for this spell. Kill those units.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Starting with the next player, each other player chooses a unit you don't control that hasn't been chosen for this spell. Kill those units.",
  artAsset: "",
};

export const divineJudgmentSpell: CardDefinition = {
  id: "origins-spell-divine-judgment",
  name: "Divine Judgment",
  fullName: "Divine Judgment",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Order],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Order, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "divine-judgment-ability",
      name: "Divine Judgment",
      description: "Each player chooses 2 units, 2 gear, 2 runes, and 2 cards in their hands. Recycle the rest.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Rare,
  rulesText: "Each player chooses 2 units, 2 gear, 2 runes, and 2 cards in their hands. Recycle the rest.",
  artAsset: "",
};

export const icathianRainSpell: CardDefinition = {
  id: "origins-spell-icathian-rain",
  name: "Icathian Rain",
  fullName: "Icathian Rain",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury, Domain.Mind],
  cost: { energyCost: 7, powerCosts: [{ domain: Domain.Fury, amount: 3 }] },
  keywords: [],
  abilities: [
    {
      id: "icathian-rain-ability",
      name: "Icathian Rain",
      description: "Do this 6 times: Deal 2 to a unit. (You can choose different units.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Do this 6 times: Deal 2 to a unit. (You can choose different units.)",
  artAsset: "",
};

export const stormbringerSpell: CardDefinition = {
  id: "origins-spell-stormbringer",
  name: "Stormbringer",
  fullName: "Stormbringer",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury, Domain.Body],
  cost: { energyCost: 6, powerCosts: [{ domain: Domain.Fury, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "stormbringer-ability",
      name: "Stormbringer",
      description: "Choose a friendly unit in your base. Deal damage equal to its Might to all enemies at a battlefield, then move your unit there.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Choose a friendly unit in your base. Deal damage equal to its Might to all enemies at a battlefield, then move your unit there.",
  artAsset: "",
};

export const superMegaDeathRocketSpell: CardDefinition = {
  id: "origins-spell-super-mega-death-rocket",
  name: "Super Mega Death Rocket!",
  fullName: "Super Mega Death Rocket!",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury, Domain.Chaos],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "super-mega-death-rocket-ability",
      name: "Super Mega Death Rocket!",
      description: "Deal 5 to a unit. When you conquer, you may discard 1 to return this from your trash to your hand.",
      trigger: TriggerType.OnConquer,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Deal 5 to a unit. When you conquer, you may discard 1 to return this from your trash to your hand.",
  artAsset: "",
};

export const noxianGuillotineSpell: CardDefinition = {
  id: "origins-spell-noxian-guillotine",
  name: "Noxian Guillotine",
  fullName: "Noxian Guillotine",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Fury, Domain.Order],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Fury, amount: 1 }] },
  keywords: [Keyword.Legion],
  abilities: [
    {
      id: "noxian-guillotine-ability",
      name: "Noxian Guillotine",
      description: "ACTION (Play on your turn or in showdowns.) Choose a unit. Kill it the next time it takes damage this turn. LEGION - Kill it now instead. (Get the effect if you've played another card this turn)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.AnyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "ACTION (Play on your turn or in showdowns.) Choose a unit. Kill it the next time it takes damage this turn. LEGION - Kill it now instead. (Get the effect if you've played another card this turn)",
  artAsset: "",
};

export const foxFireSpell: CardDefinition = {
  id: "origins-spell-fox-fire",
  name: "Fox-Fire",
  fullName: "Fox-Fire",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm, Domain.Mind],
  cost: { energyCost: 3, powerCosts: [] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "fox-fire-ability",
      name: "Fox-Fire",
      description: "HIDDEN (hide now for rune to react with later for 0.) ACTION (Play on your turn or in showdowns.) Kill any number of units at a battlefield with total Might 4 or less.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "HIDDEN (hide now for rune to react with later for 0.) ACTION (Play on your turn or in showdowns.) Kill any number of units at a battlefield with total Might 4 or less.",
  artAsset: "",
};

export const dragonsRageSpell: CardDefinition = {
  id: "origins-spell-dragons-rage",
  name: "Dragon's Rage",
  fullName: "Dragon's Rage",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm, Domain.Body],
  cost: { energyCost: 4, powerCosts: [{ domain: Domain.Calm, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "dragons-rage-ability",
      name: "Dragon's Rage",
      description: "Move an enemy unit. Then choose another enemy unit at its destination. They deal damage equal to their Mights to each other.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.EnemyUnit,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Move an enemy unit. Then choose another enemy unit at its destination. They deal damage equal to their Mights to each other.",
  artAsset: "",
};

export const lastBreathSpell: CardDefinition = {
  id: "origins-spell-last-breath",
  name: "Last Breath",
  fullName: "Last Breath",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm, Domain.Chaos],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "last-breath-ability",
      name: "Last Breath",
      description: "ACTION (Play on your turn or in showdowns.) Ready a friendly unit. It deals damage equal to its Might to an enemy at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "ACTION (Play on your turn or in showdowns.) Ready a friendly unit. It deals damage equal to its Might to an enemy at a battlefield.",
  artAsset: "",
};

export const zenithBladeSpell: CardDefinition = {
  id: "origins-spell-zenith-blade",
  name: "Zenith Blade",
  fullName: "Zenith Blade",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Calm, Domain.Order],
  cost: { energyCost: 3, powerCosts: [{ domain: Domain.Calm, amount: 2 }] },
  keywords: [],
  abilities: [
    {
      id: "zenith-blade-ability",
      name: "Zenith Blade",
      description: "ACTION (Play on your turn or in showdowns.) Stun an enemy at a battlefield. You may move a friendly unit to that enemy unit's battlefield. (A stunned unit doesn't deal combat damage this turn.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "ACTION (Play on your turn or in showdowns.) Stun an enemy at a battlefield. You may move a friendly unit to that enemy unit's battlefield. (A stunned unit doesn't deal combat damage this turn.)",
  artAsset: "",
};

export const guerillaWarfareSpell: CardDefinition = {
  id: "origins-spell-guerilla-warfare",
  name: "Guerilla Warfare",
  fullName: "Guerilla Warfare",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind, Domain.Chaos],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [Keyword.Hidden],
  abilities: [
    {
      id: "guerilla-warfare-ability",
      name: "Guerilla Warfare",
      description: "Return up to two cards with HIDDEN from your trash to your hand. You can hide ignoring costs this turn.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Return up to two cards with HIDDEN from your trash to your hand. You can hide ignoring costs this turn.",
  artAsset: "",
};

export const siphonPowerSpell: CardDefinition = {
  id: "origins-spell-siphon-power",
  name: "Siphon Power",
  fullName: "Siphon Power",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Mind, Domain.Order],
  cost: { energyCost: 2, powerCosts: [{ domain: Domain.Mind, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "siphon-power-ability",
      name: "Siphon Power",
      description: "REACTION (Play any time, even before spells or abilities are resolved.) Choose a battlefield. Give friendly units there +1 this turn and enemy units there -1 , to a minimum of 1",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Reaction,
  rarity: Rarity.Epic,
  rulesText: "REACTION (Play any time, even before spells or abilities are resolved.) Choose a battlefield. Give friendly units there +1 this turn and enemy units there -1 , to a minimum of 1",
  artAsset: "",
};

export const bulletTimeSpell: CardDefinition = {
  id: "origins-spell-bullet-time",
  name: "Bullet Time",
  fullName: "Bullet Time",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body, Domain.Chaos],
  cost: { energyCost: 1, powerCosts: [] },
  keywords: [],
  abilities: [
    {
      id: "bullet-time-ability",
      name: "Bullet Time",
      description: "ACTION (Play on your turn or showdowns.) Pay an amount of to deal that much damage to all enemy units at a battlefield.",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.None,
    },
  ],
  spellTiming: SpellTiming.Action,
  rarity: Rarity.Epic,
  rulesText: "ACTION (Play on your turn or showdowns.) Pay an amount of to deal that much damage to all enemy units at a battlefield.",
  artAsset: "",
};

export const showstopperSpell: CardDefinition = {
  id: "origins-spell-showstopper",
  name: "Showstopper",
  fullName: "Showstopper",
  set: CardSet.Origins,
  type: CardType.Spell,
  domains: [Domain.Body, Domain.Order],
  cost: { energyCost: 1, powerCosts: [{ domain: Domain.Body, amount: 1 }] },
  keywords: [],
  abilities: [
    {
      id: "showstopper-ability",
      name: "Showstopper",
      description: "Buff a friendly unit in your base, then move it to a battlefield. (If it doesn't have a buff, it gets a +1 buff.)",
      trigger: TriggerType.OnPlay,
      targetType: TargetType.FriendlyUnit,
    },
  ],
  spellTiming: SpellTiming.Normal,
  rarity: Rarity.Epic,
  rulesText: "Buff a friendly unit in your base, then move it to a battlefield. (If it doesn't have a buff, it gets a +1 buff.)",
  artAsset: "",
};
