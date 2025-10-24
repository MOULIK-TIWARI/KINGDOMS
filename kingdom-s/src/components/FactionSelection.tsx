import React from 'react';

// Get 'setPlayerFaction' from the props (passed by App.js)
function FactionSelection({ setPlayerFaction }) {
  const factions = ["Fire", "Water", "Earth", "Air"];

  return (
    <div className="faction-selection">
      <h2>Choose Your Faction</h2>
      <div className="faction-buttons">
        {factions.map(faction => (
          <button key={faction} onClick={() => setPlayerFaction(faction)}>
            Join {faction}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FactionSelection;
