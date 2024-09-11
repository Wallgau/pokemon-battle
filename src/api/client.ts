export const fetchWithAbort = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export interface Pokemon {
  name: string;
  sprite: string;
  move: string;
  movePower: number;
}

const API_BASE = "https://pokeapi.co/api/v2";

export const fetchPokemon = async (
  id: number,
  signal: AbortSignal
): Promise<Pokemon> => {
  const pokemon = await fetchWithAbort(`${API_BASE}/pokemon/${id}`, signal);
  const randomMove =
    pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name;
  const move = await fetchWithAbort(`${API_BASE}/move/${randomMove}`, signal);

  return {
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
    move: move.name,
    movePower: move.power || 0,
  };
};

export const fetchRandomPokemon = async (
  signal: AbortSignal
): Promise<Pokemon> => {
  //used to select a random Pokémon ID from the the first 151 Pokémons
  const randomId = Math.floor(Math.random() * 151) + 1;
  return await fetchPokemon(randomId, signal);
};
