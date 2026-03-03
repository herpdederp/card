import type { CardInstanceId } from "../../../models/card.js";
import type { CardDefinition } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { CardView } from "../cards/CardView.js";

interface HandZoneProps {
  hand: CardInstanceId[];
  getCardDef: (id: CardInstanceId) => CardDefinition | undefined;
  getCardInstance: (id: CardInstanceId) => CardInstance | undefined;
  canPlay: boolean;
  onPlayCard: (id: CardInstanceId) => void;
  selectedForMulligan?: CardInstanceId[];
  onToggleMulligan?: (id: CardInstanceId) => void;
}

export function HandZone({ hand, getCardDef, getCardInstance, canPlay, onPlayCard, selectedForMulligan, onToggleMulligan }: HandZoneProps) {
  return (
    <div className="hand-zone">
      <div className="zone-label">Hand ({hand.length})</div>
      <div className="card-row">
        {hand.map(id => {
          const def = getCardDef(id);
          const inst = getCardInstance(id);
          if (!def) return <div key={id} className="card mini">???</div>;

          const isMulliganSelected = selectedForMulligan?.includes(id);

          return (
            <CardView
              key={id}
              def={def}
              instance={inst}
              selected={isMulliganSelected}
              selectable={canPlay || onToggleMulligan != null}
              onClick={() => {
                if (onToggleMulligan) {
                  onToggleMulligan(id);
                } else if (canPlay) {
                  onPlayCard(id);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
