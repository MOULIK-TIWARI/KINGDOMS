// web/src/components/ActionPanel.js
import React from 'react';
import { FAKE_GAME_STATE } from '../fakeData';

function ActionPanel() {
  const factionNames = Object.keys(FAKE_GAME_STATE.factions);

  return (
    <div className="action-panel">
      <h3>Actions</h3>
      <button onClick={() => console.log('Clicked DEFEND')}>Defend</button>
      <button onClick={() => console.log('Clicked TRAIN')}>Train</button>
      <div>
        <select onChange={(e) => console.log(`Selected ${e.target.value} to attack`)}>
          <option value="">-- Select Target --</option>
          {factionNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
        <button onClick={() => console.log('Clicked ATTACK')}>Attack</button>
      </div>
    </div>
  );
}

export default ActionPanel;