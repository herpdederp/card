import type { TurnState } from "../../../models/game-state.js";
import type { PlayerId } from "../../../models/card.js";
import type { InteractionMode } from "../../hooks/useGameEngine.js";

interface PhaseBarProps {
  turn: TurnState;
  currentViewer: PlayerId;
  interactionMode: InteractionMode;
  onPass: () => void;
  onEndTurn: () => void;
  onSwitchViewer: (p: PlayerId) => void;
  chainLength: number;
}

export function PhaseBar({ turn, currentViewer, interactionMode, onPass, onEndTurn, onSwitchViewer, chainLength }: PhaseBarProps) {
  const isActivePlayer = turn.activePlayer === currentViewer;
  const hasPriority = turn.priorityPlayer === currentViewer;

  return (
    <div className="phase-bar">
      <span className="turn-info">Turn {turn.turnNumber}</span>
      <span>{turn.activePlayer}'s turn</span>
      <span className="phase-name">{turn.phase}</span>
      <span className="priority-indicator">
        Priority: {turn.priorityPlayer}
        {hasPriority && " (YOU)"}
      </span>

      <div className="actions">
        {hasPriority && (chainLength > 0 || turn.phase === "showdown") && (
          <button className="btn" onClick={onPass}>Pass Priority</button>
        )}
        {isActivePlayer && turn.phase === "action" && chainLength === 0 && (
          <button className="btn" onClick={onEndTurn}>End Turn</button>
        )}
      </div>

      <div className="viewer-switch">
        <span style={{ fontSize: 10, color: "var(--text-muted)", marginRight: 4 }}>View:</span>
        <button
          className={`btn ${currentViewer === "player1" ? "btn-primary" : ""}`}
          onClick={() => onSwitchViewer("player1")}
          style={{ fontSize: 10, padding: "2px 8px" }}
        >P1</button>
        <button
          className={`btn ${currentViewer === "player2" ? "btn-primary" : ""}`}
          onClick={() => onSwitchViewer("player2")}
          style={{ fontSize: 10, padding: "2px 8px" }}
        >P2</button>
      </div>
    </div>
  );
}
