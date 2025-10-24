import React, { useState } from 'react';
import { devvit } from '@devvit/public-api'; // Import devvit to call the backend

// Get data and functions from props (passed by App.js)
function ActionPanel({ factions, playerFaction, onActionSubmitted }) {
  const [target, setTarget] = useState('');
  
  // Filter out our own faction from the attack list
  const factionNames = Object.keys(factions).filter(name => name !== playerFaction);

  // This function now calls the backend!
  const handleAction = async (action) => {
    if (action === 'Attack' && !target) {
      alert('Please select a target to attack!');
      return;
    }

    console.log(`Submitting action: ${action}, Target: ${target}`);
    try {
      // Call the backend 'submitAction' function
      await devvit.callPlugin('submitAction', {
        action: action,
        target: target,
        playerFaction: playerFaction,
      });
      // After it succeeds, call the refresh function from App.js
      onActionSubmitted();
    } catch (e) {
      console.error('Failed to submit action:', e);
      alert('Error submitting action. See console for details.');
    }
  };

  return (
    <div className="action-panel">
      <h3>Actions</h3>
      <button onClick={() => handleAction('Defend')}>Defend</button>
      <button onClick={() => handleAction('Train')}>Train</button>
      <div className="attack-action">
        <select onChange={(e) => setTarget(e.target.value)} value={target}>
          <option value="">-- Select Target --</option>
          {factionNames.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
        <button onClick={() => handleAction('Attack')}>Attack</button>
      </div>
    </div>
  );
}

export default ActionPanel;
