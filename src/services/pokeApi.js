export async function getPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data = await res.json();

    if (!data?.sprites?.front_default) return null;
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getAnimatedPikachu() {
  return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif";
}