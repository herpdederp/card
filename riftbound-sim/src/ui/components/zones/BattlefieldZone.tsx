import type { BattlefieldState } from "../../../models/game-state.js";
import type { CardInstanceId, CardDefinition, PlayerId } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { CardView } from "../cards/CardView.js";

interface BattlefieldZoneProps {
  bf: BattlefieldState;
  viewer: PlayerId;
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
  getCardInstance: (id: CardInstanceId) => CardInstance | undefined;
  isMoveTarget: boolean;
  onClickBattlefield: () => void;
  onClickUnit: (id: CardInstanceId) => void;
  selectableUnits: boolean;
}

export function BattlefieldZone({ bf, viewer, getCardDef, getCardInstance, isMoveTarget, onClickBattlefield, onClickUnit, selectableUnits }: BattlefieldZoneProps) {
  const bfDef = getCardDef(bf.cardInstanceId);
  const bfName = bfDef?.name ?? "Battlefield";

  // Get opponent(s) and viewer's units
  const opponentIds: PlayerId[] = [];
  for (const [pid] of bf.units) {
    if (pid !== viewer) opponentIds.push(pid as PlayerId);
  }

  const viewerUnits = bf.units.get(viewer) ?? [];

  return (
    <div
      className={`battlefield ${isMoveTarget ? "move-target" : ""}`}
      onClick={isMoveTarget ? onClickBattlefield : undefined}
    >
      <div className="battlefield-header">
        <span>{bfName}</span>
        <span className="battlefield-controller">
          {bf.conqueredBy ? `Conquered: ${bf.conqueredBy}` : bf.controller ? `Ctrl: ${bf.controller}` : "Uncontrolled"}
        </span>
      </div>

      {bfDef?.battlefieldEffect && (
        <div style={{ fontSize: 9, color: "var(--text-secondary)", marginBottom: 2 }}>
          {bfDef.battlefieldEffect}
        </div>
      )}

      {/* Opponent units (top) */}
      {opponentIds.map(oppId => {
        const oppUnits = bf.units.get(oppId) ?? [];
        return (
          <div key={oppId}>
            <div style={{ fontSize: 9, color: "var(--text-muted)" }}>{oppId}'s units:</div>
            <div className="battlefield-units">
              {oppUnits.length === 0 ? (
                <div className="bf-empty">--</div>
              ) : (
                oppUnits.map(uid => {
                  const def = getCardDef(uid);
                  const inst = getCardInstance(uid);
                  if (!def) return null;
                  return (
                    <CardView
                      key={uid}
                      def={def}
                      instance={inst}
                      mini
                      selectable={selectableUnits}
                      onClick={() => onClickUnit(uid)}
                    />
                  );
                })
              )}
            </div>
          </div>
        );
      })}

      <div className="battlefield-divider" />

      {/* Viewer units (bottom) */}
      <div style={{ fontSize: 9, color: "var(--text-muted)" }}>Your units:</div>
      <div className="battlefield-units">
        {viewerUnits.length === 0 ? (
          <div className="bf-empty">--</div>
        ) : (
          viewerUnits.map(uid => {
            const def = getCardDef(uid);
            const inst = getCardInstance(uid);
            if (!def) return null;
            return (
              <CardView
                key={uid}
                def={def}
                instance={inst}
                mini
                selectable={selectableUnits}
                onClick={() => onClickUnit(uid)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
