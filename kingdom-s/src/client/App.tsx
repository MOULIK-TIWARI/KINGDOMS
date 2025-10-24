// In: src/client/App.tsx
import React, { useState, useEffect, useContext } from 'react';
// 1. Import Devvit.Context and useCurrentUser
import { Devvit, useCurrentUser } from '@devvit/public-api';

// 2. Import your components
import Leaderboard from './components/Leaderboard';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';
import FactionSelection from './components/FactionSelection';

function App() {
  // 3. Get Devvit's magic tools
  const { devvit } = useContext(Devvit.Context);
  const currentUser = useCurrentUser();

  // 4. Create REAL state to hold your data
  const [gameState, setGameState] = useState(null);
  const [playerFaction, setPlayerFaction] = useState(null);

  // 5. This function fetches ALL data from the backend
  const fetchData = async () => {
    if (!currentUser) return; // Don't fetch if no user

    console.log("Fetching game state...");
    // 6. Use 'callCustomPost', not 'callPlugin'
    const state = await devvit.callCustomPost('getGameState', {});
    const faction = await devvit.callCustomPost('getPlayerFaction', { 
      username: currentUser.username 
    });

    setGameState(state);
    setPlayerFaction(faction);
    console.log("Data fetched!", state, faction);
  };

  // 7. This runs ONCE when the app loads
  useEffect(() => {
    fetchData();
  }, [currentUser]); // Re-run if the user changes

  // 8. These are your "write" functions
  const handleJoinFaction = async (factionName: string) => {
    console.log(`Attempting to join ${factionName}...`);
    await devvit.callCustomPost('joinFaction', {
      username: currentUser.username,
      factionName: factionName,
    });
    fetchData(); // After joining, refresh all data to update the UI
  };

  const handleSubmitAction = async (action: string, target: string | null) => {
    console.log(`Attempting to ${action} ${target || ''}...`);
    await devvit.callCustomPost('submitPlayerAction', {
      username: currentUser.username,
      action: action,
      targetFaction: target,
    });
    fetchData(); // After submitting, refresh all data to update the UI
  };

  // --- RENDER LOGIC ---

  // Show a loading screen while data is fetched
  if (!gameState || !currentUser) {
    return <h1>Loading...</h1>;
  }

  // The logic is now based on REAL state
  const hasJoinedFaction = playerFaction !== null;

  return (
    <div>
      <h1>Kingdoms Factions (Real)</h1>
      <p>Welcome, {currentUser.username}!</p>
      
      {hasJoinedFaction ? (
        // If player has joined, show the game
        <>
          <p>You are in the {playerFaction} Faction.</p>
          {/* Pass the real data to your components (uncomment these) */}
          {/* <Leaderboard gameState={gameState} /> */}
          {/* <ActionPanel onSubmit={handleSubmitAction} /> */}
          {/* <GameLog gameState={gameState} /> */}
        </>
      ) : (
        // If player has NOT joined, show the join screen
        <>
          <h2>Welcome! Choose your Faction:</h2>
          {/* Pass the real function to your component (uncomment this) */}
          {/* <FactionSelection onJoin={handleJoinFaction} /> */}
        </>
      )}
    </div>
  );
}

export default App;