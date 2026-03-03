import type { GameEvent } from "../../models/game-state.js";

export function formatEvent(event: GameEvent): string {
  switch (event.type) {
    case "game_started": return "Game started";
    case "turn_started": return `Turn ${event.turnNumber}: ${event.player}'s turn`;
    case "phase_changed": return `Phase: ${event.phase}`;
    case "card_drawn": return `${event.player} drew a card`;
    case "rune_channeled": return `${event.player} channeled a rune`;
    case "card_played": return `${event.player} played a card`;
    case "units_moved": return `${event.player} moved ${event.unitIds.length} unit(s)`;
    case "showdown_started": return `Showdown started!`;
    case "combat_damage": return `Combat: ${event.amount} damage`;
    case "card_destroyed": return `Card destroyed`;
    case "battlefield_conquered": return `${event.conqueror} conquered a battlefield!`;
    case "score_changed": return `${event.player}: ${event.oldScore} -> ${event.newScore} (${event.reason})`;
    case "rune_exhausted": return `${event.player} exhausted rune (+${event.energyGenerated}E)`;
    case "rune_recycled": return `${event.player} recycled rune (+${event.powerGenerated}P)`;
    case "chain_entry_added": return `Chain: ${event.entry.abilityId} added`;
    case "chain_entry_resolved": return `Chain entry resolved`;
    case "ability_triggered": return `Ability triggered: ${event.abilityId}`;
    case "effect_damage": return `Effect: ${event.amount} damage`;
    case "card_countered": return `Spell countered!`;
    case "token_created": return `Token created`;
    case "game_over": return `Game over! ${event.winner ?? "Draw"} — ${event.reason}`;
  }
}
