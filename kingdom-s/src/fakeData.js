// web/src/fakeData.js
export const FAKE_GAME_STATE = {
  factions: {
    "Fire": { "HP": 100, "Score": 10 },
    "Water": { "HP": 80, "Score": 15 }, // Make data different to see UI changes
    "Earth": { "HP": 90, "Score": 5 },
    "Air": { "HP": 100, "Score": 12 }
  },
  turnNumber: 2,
  gameLog: ["Turn 1: Fire attacked Water!", "Turn 2: Game is active."]
};
// Simulate a player who has already joined
export const FAKE_PLAYER_FACTION = "Water"; 
// export const FAKE_PLAYER_FACTION = null; // <-- Use this to test the "join" screen