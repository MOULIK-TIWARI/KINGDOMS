// web/src/components/FactionSelection.js
import React from 'react';

function FactionSelection() {
  const factions = ["Fire", "Water", "Earth", "Air"];

  return (
    <div className="faction-selection">
      <h2>Choose Your Faction</h2>
      <div className="faction-buttons">
        {factions.map(faction => (
          <button key={faction} onClick={() => console.log(`Clicked JOIN ${faction}`)}>
            Join {faction}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FactionSelection;