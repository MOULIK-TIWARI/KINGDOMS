// web/src/components/GameLog.js
import React from 'react';
import { FAKE_GAME_STATE } from '../fakeData';

function GameLog() {
  return (
    <div className="game-log">
      <h3>Game Log (Turn: {FAKE_GAME_STATE.turnNumber})</h3>
      {FAKE_GAME_STATE.gameLog.map((message, index) => (
        <p key={index}>&gt; {message}</p>
      ))}
    </div>
  );
}

export default GameLog;