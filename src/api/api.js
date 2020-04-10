function setNecessaryItems(pokeApiResponse) {
  const {
    id,
    name,
    height,
    weight,
    types,
    stats,
    // eslint-disable-next-line camelcase
    base_experience,
    sprites: { front_default: sprite },
  } = pokeApiResponse;
  const necessaryItems = {
    id, name, height, weight, types, stats, base_experience, sprite,
  };
  return JSON.stringify(necessaryItems);
}

async function addPokemonToCache(pokemonQuery) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`;
  const response = await fetch(endpoint);
  const data = await response.json();
  localStorage.setItem(`${data.name}`, setNecessaryItems(data));
}

export default addPokemonToCache;
