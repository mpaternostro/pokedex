import { PokemonData } from '../shared/interfaces/PokemonData';

async function loadPokemon(pokemonName: string): Promise<PokemonData> {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
  return (await fetch(endpoint)).json();
}

export default loadPokemon;
