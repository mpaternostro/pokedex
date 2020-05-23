export function loadPokemon(pokemonName) {
  if (!pokemonName) {
    throw new Error('A Pokemon name is mandatory in order to get Pokemon');
  }

  const pokemon = JSON.parse(localStorage.getItem(pokemonName));
  if (pokemon === null) {
    throw new Error(`${pokemonName} not found`);
  }

  return pokemon;
}

export function savePokemon(pokemonName, pokemonData) {
  if (!pokemonName || typeof pokemonData !== 'object') {
    throw new Error('A Pokemon name and object type data is mandatory in order to save Pokemon');
  }

  localStorage.setItem(pokemonName, JSON.stringify(pokemonData));
}
