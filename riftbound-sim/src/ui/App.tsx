import { useState } from "react";
import "./App.css";
import { useGameEngine } from "./hooks/useGameEngine.js";
import type { CardInstanceId, PlayerId } from "../models/card.js";
import type { CardInstance } from "../models/game-state.js";
import { TriggerType } from "../models/card.js";
import { PhaseBar } from "./components/board/PhaseBar.js";
import { HandZone } from "./components/zones/HandZone.js";
import { RunePoolZone } from "./components/zones/RunePoolZone.js";
import { BaseZone } from "./components/zones/BaseZone.js";
import { BattlefieldZone } from "./components/zones/BattlefieldZone.js";
import { ChainDisplay } from "./components/zones/ChainDisplay.js";
import { OpponentSummary } from "./components/zones/OpponentSummary.js";
import { EventLog } from "./components/log/EventLog.js";
import { CardView } from "./components/cards/CardView.js";

export function App() {
  const ui = useGameEngine();
  const [vsAI, setVsAI] = useState(true);

  // No game yet — show setup screen
  if (!ui.visibleState || !ui.gameState) {
    return (
      <div className="setup-screen">
        <h1>Riftbound TCG</h1>
        <p>Simulator & Dev Tool</p>
        <div className="mode-toggle">
          <button
            className={`btn ${vsAI ? "btn-primary" : ""}`}
            onClick={() => setVsAI(true)}
          >
            vs AI
          </button>
          <button
            className={`btn ${!vsAI ? "btn-primary" : ""}`}
            onClick={() => setVsAI(false)}
          >
            Hotseat
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => ui.startGame(vsAI)}>
          Start Game
        </button>
      </div>
    );
  }

  const vs = ui.visibleState;
  const gs = ui.gameState;
  const self = vs.self;
  const isActivePlayer = vs.turn.activePlayer === ui.currentViewer;
  const hasPriority = vs.turn.priorityPlayer === ui.currentViewer;
  const inAction = vs.turn.phase === "action";
  const canPlayCards = isActivePlayer && inAction && vs.chain.length === 0 && ui.interactionMode === "idle";
  const canActRunes = hasPriority && (inAction || vs.turn.phase === "showdown");
  const isTargeting = ui.interactionMode === "selecting_targets";
  const isMoving = ui.interactionMode === "selecting_move_destination";

  // Card instance lookup from full state
  const getCardInstance = (id: CardInstanceId): CardInstance | undefined => gs.cards.get(id);

  // Handle game over
  if (gs.gameOver) {
    const winnerLabel = gs.winner
      ? (gs.winner === "player1" ? "You Win!" : (ui.aiPlayer ? "AI Wins!" : `${gs.winner} Wins!`))
      : "Draw!";
    return (
      <div className="game-over-overlay">
        <h2>{winnerLabel}</h2>
        <button className="btn btn-primary" onClick={() => ui.startGame(!!ui.aiPlayer)}>New Game</button>
      </div>
    );
  }

  // Mulligan phase
  if (ui.interactionMode === "selecting_mulligan") {
    return (
      <div className="mulligan-overlay">
        <h2>Mulligan — {ui.currentViewer}</h2>
        <p>Select up to 2 cards to return to your deck, then click Keep.</p>
        <div className="mulligan-cards">
          {self.hand.map(id => {
            const def = ui.getCardDef(id);
            if (!def) return null;
            return (
              <CardView
                key={id}
                def={def}
                instance={getCardInstance(id)}
                selected={ui.mulliganSelection.includes(id)}
                selectable
                onClick={() => ui.toggleMulligan(id)}
              />
            );
          })}
        </div>
        <button className="btn btn-primary" onClick={ui.submitMulligan}>
          {ui.mulliganSelection.length === 0 ? "Keep All" : `Return ${ui.mulliganSelection.length} card(s)`}
        </button>
      </div>
    );
  }

  return (
    <div className="game-board">
      {/* Targeting banner */}
      {isTargeting && ui.targetingContext && (
        <div className="targeting-banner">
          <span>
            Select {ui.targetingContext.requiredCount} {ui.targetingContext.requiredCount === 1 ? "target" : "targets"} — {ui.targetingContext.selectedTargets.length} selected
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              className="btn btn-primary"
              disabled={ui.targetingContext.selectedTargets.length < ui.targetingContext.requiredCount}
              onClick={ui.confirmTargets}
            >
              Confirm
            </button>
            <button className="btn" onClick={ui.cancelTargeting}>Cancel</button>
          </div>
        </div>
      )}

      {/* Moving banner */}
      {isMoving && ui.moveContext && (
        <div className="targeting-banner">
          <span>
            Select a battlefield to move {ui.moveContext.selectedUnits.length} {ui.moveContext.selectedUnits.length === 1 ? "unit" : "units"} to
          </span>
          <button className="btn" onClick={ui.cancelMove}>Cancel</button>
        </div>
      )}

      {/* Phase bar */}
      <PhaseBar
        turn={vs.turn}
        currentViewer={ui.currentViewer}
        interactionMode={ui.interactionMode}
        chainLength={vs.chain.length}
        onPass={() => ui.dispatch({ type: "pass_priority", player: ui.currentViewer })}
        onEndTurn={() => ui.dispatch({ type: "declare_done", player: ui.currentViewer })}
        onSwitchViewer={ui.switchViewer}
      />

      {/* Opponent summary */}
      <OpponentSummary
        opponents={vs.opponents}
        getCardDef={ui.getCardDef}
        getCardInstance={getCardInstance}
        selectableUnits={isTargeting}
        onClickUnit={(id) => {
          if (isTargeting) ui.selectTarget(id);
        }}
      />

      {/* Battlefields */}
      <div className="battlefield-strip">
        {vs.battlefields.map(bf => (
          <BattlefieldZone
            key={bf.cardInstanceId}
            bf={bf}
            viewer={ui.currentViewer}
            getCardDef={ui.getCardDef}
            getCardInstance={getCardInstance}
            isMoveTarget={isMoving}
            onClickBattlefield={() => {
              if (isMoving) ui.selectMoveDestination(bf.cardInstanceId);
            }}
            onClickUnit={(id) => {
              if (isTargeting) ui.selectTarget(id);
            }}
            selectableUnits={isTargeting}
          />
        ))}
      </div>

      {/* Chain */}
      <ChainDisplay chain={vs.chain} getCardDef={ui.getCardDef} />

      {/* Base */}
      <BaseZone
        base={self.base}
        legendId={self.legendInstanceId}
        getCardDef={ui.getCardDef}
        getCardInstance={getCardInstance}
        canAct={isActivePlayer && inAction}
        selectedForMove={ui.moveContext?.selectedUnits ?? []}
        onToggleMoveUnit={(id) => {
          if (isMoving) {
            ui.toggleMoveUnit(id);
          } else {
            ui.beginMove(id);
          }
        }}
        onActivateAbility={(sourceId, abilityId) => {
          const def = ui.getCardDef(sourceId);
          const ability = def?.abilities.find(a => a.id === abilityId);
          if (ability && ability.targetType !== "none") {
            // Enter targeting mode for the ability
            ui.selectTarget(sourceId); // use targeting context
            // Actually need to set up targeting with ability context
            ui.dispatch({
              type: "activate_ability",
              player: ui.currentViewer,
              sourceId,
              abilityId,
              targets: [], // TODO: proper targeting for activated abilities
            });
          } else {
            ui.dispatch({
              type: "activate_ability",
              player: ui.currentViewer,
              sourceId,
              abilityId,
            });
          }
        }}
      />

      {/* Rune Pool */}
      <RunePoolZone
        runePool={self.runePool}
        currentEnergy={self.currentEnergy}
        currentPower={self.currentPower}
        getCardDef={ui.getCardDef}
        getCardInstance={getCardInstance}
        canAct={canActRunes}
        onExhaust={(id) => ui.dispatch({ type: "exhaust_rune", player: ui.currentViewer, runeId: id })}
        onRecycle={(id) => ui.dispatch({ type: "recycle_rune", player: ui.currentViewer, runeId: id })}
      />

      {/* Score */}
      <div className="score-zone">
        {Array.from(vs.scores.entries()).map(([pid, score]) => (
          <span key={pid} style={{ color: pid === ui.currentViewer ? "var(--color-energy)" : "var(--text-secondary)" }}>
            {pid}: {score} / {vs.config.winTarget}
          </span>
        ))}
      </div>

      {/* Hand */}
      <HandZone
        hand={self.hand}
        getCardDef={ui.getCardDef}
        getCardInstance={getCardInstance}
        canPlay={canPlayCards || (hasPriority && vs.chain.length > 0)}
        onPlayCard={ui.beginPlayCard}
      />

      {/* Event Log */}
      <EventLog events={ui.events} />
    </div>
  );
}
