// src/api/leaderboard.js
export async function fetchLeaderboard() {
  // Mocked leaderboard data
  return [
    { id: 1, name: "Alice", score: 120 },
    { id: 2, name: "Bob", score: 95 },
    { id: 3, name: "Charlie", score: 80 },
    { id: 4, name: "Alice", score: 120 },
    { id: 5, name: "Bob", score: 95 },
    { id: 6, name: "Charlie", score: 80 }
  ];
}