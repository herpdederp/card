import type { CardInstanceId, DomainPowerCost } from "../../../models/card.js";
import type { CardDefinition } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { CardView } from "../cards/CardView.js";

interface RunePoolZoneProps {
  runePool: CardInstanceId[];
  currentEnergy: number;
  currentPower: DomainPowerCost[];
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
  getCardInstance: (id: CardInstanceId) => CardInstance | undefined;
  canAct: boolean;
  onExhaust: (id: CardInstanceId) => void;
  onRecycle: (id: CardInstanceId) => void;
}

export function RunePoolZone({ runePool, currentEnergy, currentPower, getCardDef, getCardInstance, canAct, onExhaust, onRecycle }: RunePoolZoneProps) {
  return (
    <div className="rune-zone">
      <div className="zone-label">Runes</div>
      {runePool.map(id => {
        const def = getCardDef(id);
        const inst = getCardInstance(id);
        if (!def) return null;
        const isExhausted = inst?.exhausted ?? false;

        return (
          <div key={id} className="rune-card">
            <CardView def={def} instance={inst} mini />
            {canAct && !isExhausted && (
              <div className="rune-actions">
                <button className="btn" onClick={() => onExhaust(id)}>E</button>
                <button className="btn" onClick={() => onRecycle(id)}>R</button>
              </div>
            )}
          </div>
        );
      })}

      <div className="resource-display">
        <span className="energy-display">Energy: {currentEnergy}</span>
        {currentPower.length > 0 && (
          <span className="power-display">
            Power: {currentPower.map(p => `${p.amount} ${p.domain}`).join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
