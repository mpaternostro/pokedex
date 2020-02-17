export function checkCurrentPokemon(pokemonName) {
  const currentPokemon = document.querySelector('#pokedex #pokemon-name').dataset.pokemonName;
  if (pokemonName === currentPokemon) {
    return true;
  }
  return false;
}

export function checkInvalidSelection(userSelection) {
  if (userSelection.children[0].classList.contains('disabled') || userSelection.classList.contains('active')) {
    return true;
  }
  return false;
}
