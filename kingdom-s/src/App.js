import React, { useState, useEffect } from 'react';
import { devvit } from '@devvit/public-api'; // Import devvit's frontend library
import './App.css';

// Import all your child components
import FactionSelection from './components/FactionSelection';
import Leaderboard from './components/Leaderboard';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';

function App() {
  // 1. Use 'useState' to store the game data. It starts as 'null' (loading).
  const [gameState, setGameState] = useState(null);
  
  // 2. Use 'useState' to track the player's chosen faction.
  const [playerFaction, setPlayerFaction] = useState(null);

  // 3. This 'useEffect' hook runs ONCE when the app first loads
  useEffect(() => {
    // We define an async function inside to fetch our data
    async function fetchGameState() {
      try {
        // This is the magic! Call your backend 'getGameState' function
        const state = await devvit.callPlugin('getGameState', {});
        setGameState(state); // Store the response in our state
        console.log("Successfully fetched game state:", state);
      } catch (e) {
        console.error("Failed to fetch game state:", e);
      }
    }
    fetchGameState(); // Call the function
  }, []); // The empty array [] means "run this only once on mount"

  // This function will be passed to ActionPanel to refresh data after a click
  const refreshGameState = async () => {
    const state = await devvit.callPlugin('getGameState', {});
    setGameState(state);
  };

  // 4. While gameState is still 'null', show a loading screen
  if (!gameState) {
    return <div className="loading"><h1>Loading Game...</h1></div>;
  }

  // 5. Once data is loaded, show the correct UI
  return (
    <div className="App">
      <header>
        <h1>Faction Warfare</h1>
      </header>
      <main>
        {playerFaction ? (
          // If player has chosen a faction, show the game UI
          <>
            <h2>Welcome, {playerFaction} Faction!</h2>
            <div className="game-interface">
              {/* Pass the real data down as props */}
              <Leaderboard factions={gameState.factions} />
              <ActionPanel
                factions={gameState.factions}
                playerFaction={playerFaction}
                onActionSubmitted={refreshGameState} // Pass the refresh function
              />
              <GameLog
                log={gameState.gameLog}
                turn={gameState.turnNumber}
              
              />
            </div>
          </>
        ) : (
          // Otherwise, show the faction selection UI
          // Pass the 'setPlayerFaction' function so it can update the state
          <FactionSelection setPlayerFaction={setPlayerFaction} />
        )}
      </main>
    </div>
  );
}

export default App;
