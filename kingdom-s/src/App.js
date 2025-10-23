// web/src/App.js
import React from 'react';
import './App.css'; // We will create this file for styling

// Import the components and fake data
import FactionSelection from './components/FactionSelection';
import Leaderboard from './components/Leaderboard';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';
import { FAKE_PLAYER_FACTION } from './fakeData';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Faction Warfare</h1>
      </header>
      <main>
        {FAKE_PLAYER_FACTION ? (
          // If player has joined, show the game screen
          <>
            <h2>Welcome, {FAKE_PLAYER_FACTION} Faction!</h2>
            <div className="game-interface">
              <Leaderboard />
              <ActionPanel />
              <GameLog />
            </div>
          </>
        ) : (
          // Otherwise, show the faction selection screen
          <FactionSelection />
        )}
      </main>
    </div>
  );
}

export default App;