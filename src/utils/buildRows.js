export function buildRows(deck, rowSizes) {
  let index = 0;

  return rowSizes.map((size) => {
    const row = deck.slice(index, index + size);
    index += size;
    return row;
  });
}