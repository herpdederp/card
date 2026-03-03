import type { CardInstance } from "../../models/game-state.js";
import type { CardDefinition } from "../../models/card.js";

export function getEffectiveMight(def: CardDefinition, inst: CardInstance): number {
  const base = def.might ?? 0;
  return base + inst.modifiers.reduce((sum, m) => sum + m.mightDelta, 0);
}

export function getEffectiveHealth(def: CardDefinition, inst: CardInstance): number {
  const base = def.health ?? 0;
  return base + inst.modifiers.reduce((sum, m) => sum + m.healthDelta, 0);
}

export function getCurrentHealth(def: CardDefinition, inst: CardInstance): number {
  return getEffectiveHealth(def, inst) - inst.damage;
}
