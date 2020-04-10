import addPokemonToCache from '../api/api.js';
import everyPokemonName from '../pokemon-names.js';

function getRandomPokemonName() {
  const lastID = everyPokemonName.length - 1;
  const randomID = Math.ceil(Math.random() * lastID);
  const randomPokemonName = everyPokemonName[randomID];
  return randomPokemonName;
}

export async function getPokemon(pokemonName) {
  let cachedPokemon = JSON.parse(localStorage.getItem(pokemonName));
  if (cachedPokemon) return cachedPokemon;
  await addPokemonToCache(pokemonName);
  cachedPokemon = JSON.parse(localStorage.getItem(pokemonName));
  return cachedPokemon;
}

export async function getRandomPokemon() {
  const randomPokemonName = getRandomPokemonName();
  const randomPokemon = await getPokemon(randomPokemonName);
  if (randomPokemon === undefined) return undefined;
  return randomPokemon;
}

function createArrayPokemonNames(currentPage) {
  const firstID = (currentPage - 1) * 10 + 1;
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
