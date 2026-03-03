import { useState } from "react";
import type { CardDefinition } from "../../../models/card.js";
import type { CardInstance } from "../../../models/game-state.js";
import { getDomainColor } from "../../utils/domain-colors.js";
import { getEffectiveMight, getCurrentHealth, getEffectiveHealth } from "../../utils/card-display.js";
import { getCardImageUrl } from "../../utils/card-images.js";

interface CardViewProps {
  def: CardDefinition;
  instance?: CardInstance;
  mini?: boolean;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
}

export function CardView({ def, instance, mini, selected, selectable, onClick }: CardViewProps) {
  const borderColor = def.domains.length > 0 ? getDomainColor(def.domains[0]) : undefined;
  const isExhausted = instance?.exhausted ?? false;
  const hasDamage = instance && instance.damage > 0;
  const imageUrl = getCardImageUrl(def.id);
  const [imgFailed, setImgFailed] = useState(false);

  const classes = [
    "card",
    mini ? "mini" : "",
    isExhausted ? "exhausted" : "",
    selected ? "selected" : "",
    selectable ? "selectable" : "",
  ].filter(Boolean).join(" ");

  const costStr = def.cost.energyCost > 0 || def.cost.powerCosts.length > 0
    ? `${def.cost.energyCost}${def.cost.powerCosts.map(p => `+${p.amount}${p.domain[0].toUpperCase()}`).join("")}`
    : "";

  const showStats = def.might != null || def.health != null;
  const might = instance && def.might != null ? getEffectiveMight(def, instance) : def.might;
  const health = instance && def.health != null ? getCurrentHealth(def, instance) : def.health;
  const maxHealth = instance && def.health != null ? getEffectiveHealth(def, instance) : def.health;
  const isDamaged = health != null && maxHealth != null && health < maxHealth;

  const modSummary = instance?.modifiers
    .filter(m => m.mightDelta !== 0 || m.healthDelta !== 0)
    .map(m => {
      const parts = [];
      if (m.mightDelta !== 0) parts.push(`${m.mightDelta > 0 ? "+" : ""}${m.mightDelta}M`);
      if (m.healthDelta !== 0) parts.push(`${m.healthDelta > 0 ? "+" : ""}${m.healthDelta}H`);
      return parts.join("/");
    })
    .join(", ");

  return (
    <div
      className={classes}
      style={borderColor ? { borderColor } : undefined}
      onClick={onClick}
      title={`${def.fullName}\n${def.rulesText}`}
    >
      <div className="card-name">{def.name}</div>
      <div className="card-type">{def.type}</div>
      {costStr && <div className="card-cost">{costStr}</div>}

      {imageUrl && !imgFailed ? (
        <div className="card-art">
          <img
            src={imageUrl}
            alt={def.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <div
          className="card-art card-art-fallback"
          style={borderColor ? { background: `linear-gradient(135deg, ${borderColor}33, ${borderColor}11)` } : undefined}
        />
      )}

      {!mini && def.keywords.length > 0 && (
        <div className="card-keywords">
          {def.keywords.map(kw => (
            <span key={kw} className="keyword-tag">{kw}</span>
          ))}
        </div>
      )}

      {!mini && def.rulesText && (
        <div className="card-text">{def.rulesText}</div>
      )}

      {modSummary && <div className="card-modifiers">{modSummary}</div>}

      {showStats && (
        <div className="card-stats">
          <span className="card-might">{might ?? "?"}</span>
          <span className={`card-health ${isDamaged ? "damaged" : ""}`}>
            {health ?? "?"}
          </span>
        </div>
      )}

      {hasDamage && instance!.damage > 0 && (
        <div className="card-damage-counter">-{instance!.damage}</div>
      )}
    </div>
  );
}
