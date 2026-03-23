// ============================================================================
// Riftbound TCG — Simulator
// ============================================================================
// Public API exports
// ============================================================================

// Card data model
export * from "./models/card.js";
export * from "./models/game-state.js";

// Card database
export { CardDatabase } from "./cards/database.js";
export { CardScriptRegistry } from "./cards/abilities.js";
export type { EffectDescriptor, AbilityScript, CardScript, AbilityImplementation } from "./cards/abilities.js";

// Engine
export { RiftboundEngine } from "./engine/engine.js";
export { SeededRNG, combineSeeds } from "./engine/rng.js";
export { executeEffects } from "./engine/effects.js";
export { findTriggeredAbilities, checkStaticAbilities } from "./engine/triggers.js";

// Card data (full Origins set + backward-compatible alias)
export { originsAllCards, originsCards } from "./cards/origins/index.js";
export { registerOriginsScripts } from "./cards/origins/sample-scripts.js";
