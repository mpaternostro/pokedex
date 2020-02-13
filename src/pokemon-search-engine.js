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
    return data.name;
  } catch (error) {
    console.error('API DIDNT FOUND THIS POKEMON', error);
    return undefined;
  }
}

function addToCacheLoadTable(pokemonRow) { // no va a existir mas
  const pokemonID = pokemonRow.children[1].textContent;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    .then((response) => response.json())
    .then((responseJSON) => {
      localStorage.setItem(`${responseJSON.name}`, setNecessaryItems(responseJSON));
      // loadTable(pokemonRow, responseJSON);
    });
}

// le das el nombre de un pokemon y el sabe que hacer para que vos obtengas la data que necesitas
export function getPokemon(pokemon) {
  // cuando este todo bien, el toLowerCase se podria skipear
  const pokemonLowerCase = pokemon.toLowerCase();
  let cachedPokemon = JSON.parse(localStorage.getItem(pokemonLowerCase));
  if (cachedPokemon) {
    return cachedPokemon;
  }
  cachedPokemon = addToCache(pokemonLowerCase);
  return cachedPokemon;
}
