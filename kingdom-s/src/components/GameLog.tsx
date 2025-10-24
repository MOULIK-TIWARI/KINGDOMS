import React from 'react';
// REMOVED: import { FAKE_GAME_STATE } ...

// Get 'log' and 'turn' from props (passed by App.js)
function GameLog({ log, turn }) {
  return (
    <div className="game-log">
      <h3>Game Log (Turn: {turn})</h3>
      <div className="log-messages">
        {/* We .slice().reverse() to show the newest messages at the top */}
        {log.slice().reverse().map((message, index) => (
          <p key={index}>&gt; {message}</p>
        ))}
      </div>
    </div>
  );
}

export default GameLog;
