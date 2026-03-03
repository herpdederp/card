import type { ChainEntry } from "../../../models/game-state.js";
import type { CardInstanceId, CardDefinition } from "../../../models/card.js";

interface ChainDisplayProps {
  chain: ChainEntry[];
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
}

export function ChainDisplay({ chain, getCardDef }: ChainDisplayProps) {
  return (
    <div className="chain-zone">
      <div className="zone-label">Chain ({chain.length})</div>
      {chain.length === 0 && (
        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Empty</div>
      )}
      {/* Show in LIFO order (newest first) */}
      {[...chain].reverse().map((entry, i) => {
        const def = getCardDef(entry.sourceInstanceId);
        return (
          <div key={entry.id} className={`chain-entry ${entry.cancelled ? "cancelled" : ""}`}>
            <div className="chain-ability">
              {i === 0 && chain.length > 0 ? ">> " : ""}
              {def?.name ?? "?"}: {entry.abilityId}
            </div>
            <div className="chain-controller">
              by {entry.controller}
              {entry.targets.length > 0 && ` -> ${entry.targets.length} target(s)`}
              {entry.cancelled && " [CANCELLED]"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
