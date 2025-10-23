import React from 'react';
// REMOVED: import { FAKE_GAME_STATE } ...

// Get 'factions' from the props (passed by App.js)
function Leaderboard({ factions }) {
  // Use the 'factions' prop directly
  const factionEntries = Object.entries(factions);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        {factionEntries.map(([name, stats]) => (
          <li key={name}>
            <strong>{name}</strong> - HP: {stats.HP}, Score: {stats.Score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
