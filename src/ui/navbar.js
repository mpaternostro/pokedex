import { showSpinner, toggleInputError } from '../utilities/utilities.js';
import { getRandomPokemon, getPokemon } from '../storage/pokemon.js';
import { checkCurrentPokemon, checkValidPokemon } from '../utilities/check-input.js';

function HomeBtn() {
  const $homeButton = document.querySelector('#home-button');
  $homeButton.addEventListener('click', () => window.location.reload());
}

function randomBtn(callbackPokemonSelector) {
  const $randomButton = document.querySelector('#random-button');
  $randomButton.addEventListener('click', async () => {
    showSpinner();
    const randomPokemon = await getRandomPokemon();
    callbackPokemonSelector(randomPokemon);
  });
}

function searchBtn(callbackPokemonSelector) {
  const $searchInput = document.querySelector('#search-pokemon input');
  const $searchButton = document.querySelector('#search-pokemon button');
  $searchButton.addEventListener('click', async (valorEvento) => {
    valorEvento.preventDefault();
    toggleInputError('hide');
    const inputValue = $searchInput.value.toLowerCase();
    if (!inputValue || checkCurrentPokemon(inputValue)) return;
    if (!checkValidPokemon(inputValue)) {
      toggleInputError('show');
      return;
    }
    showSpinner();
    const pokemon = await getPokemon(inputValue);
    callbackPokemonSelector(pokemon);
  });
}

function handleNavbarButtons(callbackPokemonSelector) {
  HomeBtn();
  randomBtn(callbackPokemonSelector);
  searchBtn(callbackPokemonSelector);
}

export default handleNavbarButtons;
