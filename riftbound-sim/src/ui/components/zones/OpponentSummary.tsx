import type { OpponentVisibleState } from "../../../models/game-state.js";
import type { CardInstanceId, CardDefinition } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { CardView } from "../cards/CardView.js";

interface OpponentSummaryProps {
  opponents: OpponentVisibleState[];
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
  getCardInstance: (id: CardInstanceId) => CardInstance | undefined;
  selectableUnits: boolean;
  onClickUnit: (id: CardInstanceId) => void;
}

export function OpponentSummary({ opponents, getCardDef, getCardInstance, selectableUnits, onClickUnit }: OpponentSummaryProps) {
  return (
    <div className="opponent-zone">
      {opponents.map(opp => {
        const legendDef = getCardDef(opp.legendInstanceId);
        return (
          <div key={opp.id} className="opponent-info">
            {legendDef && (
              <CardView def={legendDef} mini />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontWeight: 600 }}>{opp.id}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span className="opponent-stat">Hand: <span>{opp.handSize}</span></span>
                <span className="opponent-stat">Deck: <span>{opp.mainDeckSize}</span></span>
                <span className="opponent-stat">Score: <span>{opp.score}</span></span>
              </div>
            </div>

            {/* Opponent base cards */}
            <div className="card-row">
              {opp.base.map(id => {
                const def = getCardDef(id);
                const inst = getCardInstance(id);
                if (!def) return null;
                return (
                  <CardView
                    key={id}
                    def={def}
                    instance={inst}
                    mini
                    selectable={selectableUnits}
                    onClick={() => onClickUnit(id)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
