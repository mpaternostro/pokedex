export function waitImageLoad(URL) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = URL;
  });
}

function setNecessaryItems(pokeApiResponse) {
  const necessaryItems = {
    id: pokeApiResponse.id,
    name: pokeApiResponse.name,
    height: pokeApiResponse.height,
    weight: pokeApiResponse.weight,
    types: pokeApiResponse.types,
    stats: pokeApiResponse.stats,
    base_experience: pokeApiResponse.base_experience,
    sprites: pokeApiResponse.sprites.front_default,
  };
  return JSON.stringify(necessaryItems);
}

export async function addToCache(pokemonQuery) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`);
    const data = await response.json();
    localStorage.setItem(`${data.name}`, setNecessaryItems(data));
    return data;
  } catch (error) {
    console.error('API DIDNT FOUND THIS POKEMON', error);
    return undefined;
  }
}

export function getPokemon(pokemon) {
  let cachedPokemon = JSON.parse(localStorage.getItem(pokemon));
  if (cachedPokemon) {
    return cachedPokemon;
  }
  cachedPokemon = addToCache(pokemon);
  return cachedPokemon;
}

export async function getPokemonsData(pokemonsNames) {
  const pokemonsData = pokemonsNames.map(async (pokemon) => {
    const pokemonData = await getPokemon(pokemon);
    return pokemonData;
  });
  return Promise.all(pokemonsData);
}
