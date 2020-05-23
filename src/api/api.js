async function loadPokemon(pokemonName) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
  return (await fetch(endpoint)).json();
}

export default loadPokemon;
