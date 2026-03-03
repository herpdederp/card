import type { CardInstanceId, CardDefinition } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { CardView } from "../cards/CardView.js";
import { TriggerType } from "../../../models/card.js";

interface BaseZoneProps {
  base: CardInstanceId[];
  legendId: CardInstanceId;
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
  getCardInstance: (id: CardInstanceId) => CardInstance | undefined;
  canAct: boolean;
  selectedForMove: CardInstanceId[];
  onToggleMoveUnit: (id: CardInstanceId) => void;
  onActivateAbility: (sourceId: CardInstanceId, abilityId: string) => void;
}

export function BaseZone({ base, legendId, getCardDef, getCardInstance, canAct, selectedForMove, onToggleMoveUnit, onActivateAbility }: BaseZoneProps) {
  const legendDef = getCardDef(legendId);
  const legendInst = getCardInstance(legendId);

  return (
    <div className="base-zone zone">
      <div className="zone-label">Base ({base.length})</div>
      <div className="card-row">
        {legendDef && (
          <CardView def={legendDef} instance={legendInst} />
        )}
        {base.map(id => {
          const def = getCardDef(id);
          const inst = getCardInstance(id);
          if (!def) return null;

          const isSelected = selectedForMove.includes(id);
          const isUnit = def.type === "unit" || def.type === "champion";
          const activatedAbility = def.abilities.find(a => a.trigger === TriggerType.Activated);
          const canActivate = canAct && activatedAbility && !inst?.exhausted;

          return (
            <div key={id} style={{ position: "relative" }}>
              <CardView
                def={def}
                instance={inst}
                selected={isSelected}
                selectable={canAct && isUnit}
                onClick={() => {
                  if (canAct && isUnit) onToggleMoveUnit(id);
                }}
              />
              {canActivate && (
                <button
                  className="btn"
                  style={{ fontSize: 8, padding: "1px 4px", marginTop: 2, width: "100%" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivateAbility(id, activatedAbility.id);
                  }}
                >
                  {activatedAbility.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
