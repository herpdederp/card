import { useEffect, useRef } from "react";
import type { GameEvent } from "../../../models/game-state.js";
import { formatEvent } from "../../utils/event-formatter.js";

interface EventLogProps {
  events: GameEvent[];
}

export function EventLog({ events }: EventLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events.length]);

  // Show last 100 events
  const visible = events.slice(-100);

  return (
    <div className="log-zone">
      <div className="zone-label">Event Log</div>
      {visible.map((event, i) => (
        <div
          key={i}
          className={`log-entry ${event.type === "turn_started" ? "turn-start" : ""}`}
        >
          {formatEvent(event)}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
