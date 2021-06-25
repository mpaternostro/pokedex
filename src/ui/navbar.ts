import Pokemon from '../entities/Pokemon.js';
import { showSpinner, toggleInputError } from '../utilities/utilities.js';
import { getRandomPokemon, getPokemon } from '../services/pokemon.js';
import { checkCurrentPokemon, checkValidPokemon } from '../utilities/check-input.js';

function HomeBtn() {
  const $homeButton = document.querySelector('#home-button') as HTMLAnchorElement;
  $homeButton.addEventListener('click', () => window.location.reload());
}

type CallbackFunction = (pokemon: Pokemon) => void;

function randomBtn(callbackPokemonSelector: CallbackFunction) {
  const $randomButton = document.querySelector('#random-button') as HTMLAnchorElement;
  $randomButton.addEventListener('click', async () => {
    showSpinner();
    const randomPokemon = await getRandomPokemon();
    callbackPokemonSelector(randomPokemon);
  });
}

function searchBtn(callbackPokemonSelector: CallbackFunction) {
  const $searchInput = document.querySelector('#search-pokemon input') as HTMLInputElement;
  const $searchButton = document.querySelector('#search-pokemon button') as HTMLButtonElement;
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

function handleNavbarButtons(callbackPokemonSelector: CallbackFunction) {
  HomeBtn();
  randomBtn(callbackPokemonSelector);
  searchBtn(callbackPokemonSelector);
}

export default handleNavbarButtons;
