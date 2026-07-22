const SCOREBOARD_KEY = "scoreboard";

export function getScoreboard() {
  try {
    const stored = localStorage.getItem(SCOREBOARD_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function updateScoreboard(difficulty, { score, moves }) {
  const board = getScoreboard();
  const current = board[difficulty] || { bestScore: null, bestMoves: null };

  const bestScore =
    current.bestScore === null ? score : Math.max(current.bestScore, score);

  const bestMoves =
    current.bestMoves === null ? moves : Math.min(current.bestMoves, moves);

  board[difficulty] = { bestScore, bestMoves };

  localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(board));

  return board[difficulty];
}

export function clearScoreboard() {
  localStorage.removeItem(SCOREBOARD_KEY);
}