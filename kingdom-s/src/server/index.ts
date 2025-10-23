// In: src/server/index.ts
import { Devvit } from '@devvit/public-api';

// --- 1. Define Initial Game State (from your README) ---
const INITIAL_GAME_STATE = {
  players: {}, // Starts empty
  factions: {
    "Fire":  { "HP": 100, "Score": 10, "CurrentVote": null, "Target": null },
    "Water": { "HP": 100, "Score": 10, "CurrentVote": null, "Target": null },
    "Earth": { "HP": 100, "Score": 10, "CurrentVote": null, "Target": null },
    "Air":   { "HP": 100, "Score": 10, "CurrentVote": null, "Target": null }
  },
  turnNumber: 1,
  gameLog: ["Turn 0: The game has begun!"]
};

// --- 2. Configure Devvit & Set Initial Storage ---
Devvit.configure({
  // This event runs ONCE when you install your app
  onInstall: async (context) => {
    // Set the starting game state in storage
    await context.storage.setItem('gameState', JSON.stringify(INITIAL_GAME_STATE));
    
    // Send a log to the terminal!
    console.log('Game installed successfully. Initial storage set.');
  },
});

// --- 3. API Functions (The Contract) ---

// REAL FUNCTION (Read-Only)
async function getGameState(event: any, context: Devvit.Context) {
  console.log('getGameState was called'); // Log the call
  const stateString = await context.storage.getItem('gameState');
  return JSON.parse(stateString); // Send back the game state
}

// REAL FUNCTION (Read-Only)
async function getPlayerFaction(event: { username: string }, context: Devvit.Context) {
  const { username } = event;
  console.log(`getPlayerFaction was called for ${username}`);
  const state = JSON.parse(await context.storage.getItem('gameState'));
  return state.players[username] || null; 
}

// STUB FUNCTION (Write)
async function joinFaction(event: { username: string, factionName: string }, context: Devvit.Context) {
  const { username, factionName } = event;
  console.log(`STUB: ${username} is trying to join ${factionName}`);
  
  // TODO: On Day 3, we will add the logic here.
  
  return { success: true, message: "Stub: Join faction not yet implemented." };
}

// STUB FUNCTION (Write)
async function submitPlayerAction(event: { username: string, action: string, targetFaction: string | null }, context: Devvit.Context) {
  const { username, action, targetFaction } = event;
  console.log(`STUB: ${username} trying to ${action} ${targetFaction || ''}`);
  
  // TODO: On Day 3, we will add logic here.
  
  return { success: true, message: "Stub: Submit action not yet implemented." };
}

// --- 4. Expose Functions to Frontend ---
// This "opens the doors" so the frontend can call your functions
Devvit.addCustomPostHandler('getGameState', getGameState);
Devvit.addCustomPostHandler('getPlayerFaction', getPlayerFaction);
Devvit.addCustomPostHandler('joinFaction', joinFaction);
Devvit.addCustomPostHandler('submitPlayerAction', submitPlayerAction);

// We will also add this one (a stub for now)
Devvit.addSchedulerJob({
  name: 'processTurn',
  onRun: async (event, context) => {
    console.log('STUB: Scheduled job "processTurn" ran, but has NO LOGIC!');
    // TODO: On Day 4, we will build this.
  },
});

export default Devvit;