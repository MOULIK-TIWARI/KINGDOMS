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

// REAL IMPLEMENTATION (ADD THIS)
//JOIN FACTION LOGIC 
async function joinFaction(event: { username: string, factionName: string }, context: Devvit.Context) {
  const { username, factionName } = event;

  // 1. Get the current state
  const stateString = await context.storage.getItem('gameState');
  const state = JSON.parse(stateString);

  // 2. Check if player already joined
  if (state.players[username]) {
    console.log(`ERROR: ${username} tried to join but is already in ${state.players[username]}`);
    return { success: false, message: "You have already joined a faction." };
  }

  // 3. Mutate the state (Add the player)
  state.players[username] = factionName;
  state.gameLog.push(`${username} has joined the ${factionName} faction!`);
  console.log(`SUCCESS: ${username} joined ${factionName}.`);

  // 4. Save the NEW state back to storage
  await context.storage.setItem('gameState', JSON.stringify(state));
  
  return { success: true, message: "Welcome!" };
}


// REAL IMPLEMENTATION (ADD THIS)
//SUBMIT PLAYER ACTION LOGIC
async function submitPlayerAction(event: { username: string, action: string, targetFaction: string | null }, context: Devvit.Context) {
  const { username, action, targetFaction } = event;

  // 1. Get the current state
  const stateString = await context.storage.getItem('gameState');
  const state = JSON.parse(stateString);

  // 2. Find the player's faction
  const playerFaction = state.players[username];
  if (!playerFaction) {
    console.log(`ERROR: ${username} tried to vote but has no faction.`);
    return { success: false, message: "You must join a faction to act." };
  }

  // 3. Mutate the state (Save the vote)
  state.factions[playerFaction].CurrentVote = action;
  state.factions[playerFaction].Target = targetFaction; // This will be null if action is 'Defend' or 'Train'
  console.log(`SUCCESS: ${username} (${playerFaction}) submitted vote: ${action} ${targetFaction || ''}`);

  // 4. Save the NEW state back to storage
  await context.storage.setItem('gameState', JSON.stringify(state));
  
  return { success: true, message: "Action locked in!" };
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