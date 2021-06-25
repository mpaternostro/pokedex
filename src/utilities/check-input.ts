import everyPokemonName from '../pokemon-names.js';

export function checkCurrentPokemon(pokemonName: string) {
  const $pokemonName = document.querySelector('#pokemon-name') as HTMLElement;
  const currentPokemon = $pokemonName.dataset.pokemonName;
  if (pokemonName === currentPokemon) return true;
  return false;
}

export function checkValidPokemon(pokemonName: string) {
  const pokemonFound = everyPokemonName.find((pokemon) => pokemon === pokemonName);
  return pokemonFound;
}
