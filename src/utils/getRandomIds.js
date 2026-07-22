export const getRandomIds = (count) => {
  const ids = new Set();

  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 386) + 1);
  }

  return [...ids];
};
