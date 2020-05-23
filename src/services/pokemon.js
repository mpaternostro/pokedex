import loadPokemonFromApi from '../api/api.js';
import {
  loadPokemon as loadPokemonFromLocalStorage,
  savePokemon as savePokemonInLocalStorage,
} from '../storage/pokemon.js';
import mapPokemon from '../mapper/pokemon.js';
import everyPokemonName from '../pokemon-names.js';

export async function getPokemon(pokemonName) {
  if (!pokemonName) {
    throw new Error('A Pokemon name is mandatory in order to get Pokemon');
  }

  let pokemon;
  try {
    pokemon = loadPokemonFromLocalStorage(pokemonName);
  } catch (e) {
    const pokemonData = await loadPokemonFromApi(pokemonName);
    pokemon = mapPokemon(pokemonData);
    savePokemonInLocalStorage(pokemonName, pokemon);
  }

  return pokemon;
}

function getRandomPokemonName() {
  const lastID = everyPokemonName.length - 1;
  const randomID = Math.ceil(Math.random() * lastID);
  const randomPokemonName = everyPokemonName[randomID];
  return randomPokemonName;
}

export async function getRandomPokemon() {
  const randomPokemonName = getRandomPokemonName();
  const randomPokemon = await getPokemon(randomPokemonName);
  return randomPokemon;
}

function createArrayPokemonNames(currentPage) {
  const firstID = (currentPage - 1) * 10;
  const pokemonNames = [];
  for (let i = firstID; i < firstID + 10; i += 1) pokemonNames.push(everyPokemonName[i]);
  return pokemonNames;
}

export async function getPokemonsData(pageNumber) {
  const pokemonsNames = createArrayPokemonNames(pageNumber);
  const pokemonsData = pokemonsNames.map(async (pokemon) => {
    const pokemonData = await getPokemon(pokemon);
    return pokemonData;
  });
  return Promise.all(pokemonsData);
}
