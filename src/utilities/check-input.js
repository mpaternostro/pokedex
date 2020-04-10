import everyPokemonName from '../pokemon-names.js';

export function checkCurrentPokemon(pokemonName) {
  const currentPokemon = document.querySelector('#pokemon-name').dataset.pokemonName;
  if (pokemonName === currentPokemon) return true;
  return false;
}

export function checkValidPokemon(pokemonName) {
  const pokemonFound = everyPokemonName.find((pokemon) => pokemon === pokemonName);
  return pokemonFound;
}
