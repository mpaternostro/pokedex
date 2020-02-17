import everyPokemonName from './pokemon-names.js';

import { getPokemon, getPokemonsData } from './pokemon-search-engine.js';

function browseByID(pokemonID) {
  const pokemonName = everyPokemonName[pokemonID];
  return pokemonName;
}

export function getRandomPokemonName() {
  const lastID = everyPokemonName.length - 3; // -3 because POKEAPI last ID is 807
  const randomID = Math.ceil(Math.random() * lastID);
  const randomPokemonName = everyPokemonName[randomID];
  return randomPokemonName;
}

export function getPokemonsNames(ID) {
  const names = [];
  for (let i = 0; i < 10; i += 1) {
    names.push(browseByID(ID + i));
  }
  return names;
}

export async function getRandomPokemon() {
  const randomPokemonName = getRandomPokemonName();
  const currentPokemon = document.querySelector('#pokedex #pokemon-name').dataset.pokemonName;
  if (randomPokemonName === currentPokemon) {
    return undefined;
  }
  const randomPokemon = await getPokemon(randomPokemonName);
  if (randomPokemon === undefined) {
    return undefined;
  }
  return randomPokemon;
}

export async function arrPokemonsData() {
  const $currentPage = document.querySelector('.pagination .active');
  const currentPageNumber = Number($currentPage.textContent);
  const firstID = (currentPageNumber - 1) * 10 + 1;
  const pokemonsNames = getPokemonsNames(firstID);
  const pokemonsData = await getPokemonsData(pokemonsNames);
  return pokemonsData;
}
