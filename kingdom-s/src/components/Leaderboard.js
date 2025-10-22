// web/src/components/Leaderboard.js
import React from 'react';
import { FAKE_GAME_STATE } from '../fakeData'; // Note the .. to go up one directory

function Leaderboard() {
  const factions = Object.entries(FAKE_GAME_STATE.factions);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        {factions.map(([name, stats]) => (
          <li key={name}>
            <strong>{name}</strong> - HP: {stats.HP}, Score: {stats.Score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;