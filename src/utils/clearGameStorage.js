export function clearGameStorage(difficulty) {
  const keys = [
    `deck-${difficulty}`,
    `moves-${difficulty}`,
    `matchedPairs-${difficulty}`,
    `foundPairs-${difficulty}`,
    `hintCount-${difficulty}`,
    `time-${difficulty}`,
    `started-${difficulty}`,
    `matchedCards-${difficulty}`,
  ];

  keys.forEach((key) => localStorage.removeItem(key));
}