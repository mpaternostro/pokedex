import { getRandomPokemon } from './pokemon-names-functions.js';

import { waitImageLoad, getPokemon } from './pokemon-search-engine.js';

import { checkCurrentPokemon } from './validations.js';

export function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

export function toggleSpinner(behavior) {
  const $spinner = document.querySelector('#spinner');
  const $pokedex = document.querySelector('#pokedex');
  if (behavior === 'hide') {
    $spinner.classList.remove('d-flex');
    $spinner.classList.add('d-none');
    $pokedex.classList.remove('d-none');
    $pokedex.classList.add('d-flex');
  }
  if (behavior === 'show') {
    $pokedex.classList.remove('d-flex');
    $pokedex.classList.add('d-none');
    $spinner.classList.remove('d-none');
    $spinner.classList.add('d-flex');
  }
}

function toggleInputError(behavior) {
  const $searchInput = document.querySelector('#pokemon-tracker input');
  const $nameError = document.querySelector('#name-error');
  if (behavior === 'hide') {
    $nameError.classList.add('d-none');
    $searchInput.classList.remove('alert-danger');
  }
  if (behavior === 'show') {
    $nameError.classList.remove('d-none');
    $searchInput.classList.add('alert-danger');
  }
}

export async function loadPokedex(pokeInfoObject) {
  if (pokeInfoObject === undefined) {
    toggleSpinner('hide');
    return;
  }
  const image = await waitImageLoad(`https://pokeres.bastionbot.org/images/pokemon/${pokeInfoObject.id}.png`)
    .catch((error) => console.error('COULD NOT GET PHOTO', error));
  const pokemonStats = {
    $image: document.querySelector('#pokedex-image'),
    $name: document.querySelector('#pokedex #pokemon-name'),
    $id: document.querySelector('#pokedex #pokemon-id'),
    $height: document.querySelector('#height'),
    $weight: document.querySelector('#weight'),
    $type: document.querySelector('#type'),
    $baseStats: Array.from(document.querySelectorAll('.base-stats')),
    $baseExperience: document.querySelector('#base-experience'),
  };
  pokemonStats.$image.src = image.src;
  pokemonStats.$name.dataset.PokemonName = pokeInfoObject.name;
  pokemonStats.$name.textContent = `${capitalize(pokeInfoObject.name)}`;
  pokemonStats.$id.dataset.PokemonID = pokeInfoObject.id;
  pokemonStats.$id.textContent = `[${pokeInfoObject.id}]`;
  pokemonStats.$height.textContent = `Height: ${pokeInfoObject.height / 10} m`;
  pokemonStats.$weight.textContent = `Weight: ${pokeInfoObject.weight / 10} kg`;
  pokemonStats.$type.textContent = `Type: ${capitalize(pokeInfoObject.types[0].type.name)}
                  ${pokeInfoObject.types[1] ? capitalize(pokeInfoObject.types[1].type.name) : ''}`;
  pokemonStats.$baseStats.forEach((value, i) => {
    pokemonStats.$baseStats[i].textContent = `${capitalize(pokeInfoObject.stats[i].stat.name)}: ${pokeInfoObject.stats[i].base_stat}`;
  });
  pokemonStats.$baseExperience.textContent = `Base Experience: ${pokeInfoObject.base_experience}`;
  toggleSpinner('hide');
}

export function loadTable(pokeInfoObject) {
  const $listOfPokemons = Array.from(document.querySelector('#pokemon-table').children); // <tr>[10]
  $listOfPokemons.forEach((row, i) => {
    const pokemonSprite = row.children[0].children[0];
    const pokemonID = row.children[1];
    const pokemonName = row.children[2];
    const pokemonHP = row.children[3];
    const pokemonATK = row.children[4];
    const pokemonDEF = row.children[5];
    if (pokeInfoObject[i].sprites.front_default) {
      pokemonSprite.src = `${pokeInfoObject[i].sprites.front_default}`;
    } else {
      pokemonSprite.src = `${pokeInfoObject[i].sprites}`;
    }
    pokemonID.dataset.pokemonId = pokeInfoObject[i].id;
    pokemonID.textContent = pokeInfoObject[i].id;
    pokemonName.dataset.pokemonName = pokeInfoObject[i].name;
    pokemonName.textContent = `${capitalize(pokeInfoObject[i].name)}`;
    pokemonHP.textContent = `${pokeInfoObject[i].stats[5].base_stat}`;
    pokemonATK.textContent = `${pokeInfoObject[i].stats[4].base_stat}`;
    pokemonDEF.textContent = `${pokeInfoObject[i].stats[3].base_stat}`;
  });
}

export function loadPokedexFromTable(callbackPokemonSelector) {
  const $pokemonTable = document.querySelector('#pokemon-table');
  Array.from($pokemonTable.children).forEach((value) => {
    value.addEventListener('click', async () => {
      toggleSpinner('show');
      const { pokemonName } = value.children[2].dataset;
      if (checkCurrentPokemon(pokemonName) === true) {
        return;
      }
      const pokemon = await getPokemon(pokemonName);
      callbackPokemonSelector(pokemon);
    });
  });
}

function HomeBtn() {
  const $homeButton = document.querySelector('#home-button');
  $homeButton.addEventListener('click', () => {
    window.location.reload();
  });
}

function randomBtn(callbackPokemonSelector) {
  const $randomButton = document.querySelector('#random-button');
  $randomButton.addEventListener('click', async () => {
    toggleSpinner('show');
    const randomPokemon = await getRandomPokemon();
    if (checkCurrentPokemon(randomPokemon) === true) {
      callbackPokemonSelector(undefined);
      return;
    }
    callbackPokemonSelector(randomPokemon);
  });
}

function searchBtn(callbackPokemonSelector) {
  const $searchButton = document.querySelector('#pokemon-tracker button');
  const $searchInput = document.querySelector('#pokemon-tracker input');
  $searchButton.addEventListener('click', async (valorEvento) => {
    toggleSpinner('show');
    const inputValue = $searchInput.value;
    if (checkCurrentPokemon(inputValue) === true) {
      callbackPokemonSelector(undefined);
      return;
    }
    toggleInputError('hide');
    const pokemon = await getPokemon(inputValue);
    if (pokemon === undefined) {
      toggleInputError('show');
      callbackPokemonSelector(pokemon);
      return;
    }
    callbackPokemonSelector(pokemon);
    valorEvento.preventDefault();
  });
}

export function handleButtons(callbackPokemonSelector) {
  HomeBtn();
  randomBtn(callbackPokemonSelector);
  searchBtn(callbackPokemonSelector);
}
