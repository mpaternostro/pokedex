import { getRandomPokemonName, browseByID } from './pokemon-names.js';

import { previous, next, pageSelector } from './page-management.js';

import { waitImageLoad, getPokemon } from './pokemon-search-engine.js';

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

function toggleInputError(behavior) {
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

export async function loadPokedex(pokeInfoObject) {
  if (pokeInfoObject === undefined) {
    return;
  }
  const image = await waitImageLoad(`https://pokeres.bastionbot.org/images/pokemon/${pokeInfoObject.id}.png`).catch((error) => console.error('COULD NOT GET PHOTO', error));
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

function loadTable(pokemonTableData, pokeInfoObject) {
  const pokemonSprite = pokemonTableData.children[0].children[0];
  const pokemonName = pokemonTableData.children[2];
  const pokemonHP = pokemonTableData.children[3];
  const pokemonATK = pokemonTableData.children[4];
  const pokemonDEF = pokemonTableData.children[5];
  if (pokeInfoObject.sprites.front_default) {
    pokemonSprite.src = `${pokeInfoObject.sprites.front_default}`;
  } else {
    pokemonSprite.src = `${pokeInfoObject.sprites}`;
  }
  pokemonName.textContent = `${capitalize(pokeInfoObject.name)}`;
  pokemonHP.textContent = `${pokeInfoObject.stats[5].base_stat}`;
  pokemonATK.textContent = `${pokeInfoObject.stats[4].base_stat}`;
  pokemonDEF.textContent = `${pokeInfoObject.stats[3].base_stat}`;
}


export async function getRandomPokemon() {
  const randomPokemonName = getRandomPokemonName();
  const currentPokemon = document.querySelector('#pokedex #pokemon-name').dataset.pokemonName;
  if (randomPokemonName === currentPokemon) {
    return undefined;
  }
  const randomPokemon = await getPokemon(randomPokemonName);
  if (randomPokemon === undefined) {
    return undefined;
  }
  toggleSpinner('show');
  return randomPokemon;
}

export async function listPokemons() {
  const $pokemonNumbers = Array.from(document.querySelectorAll('#pokemon-table .pokemon-id')); // <th>[10]
  const $listOfPokemons = Array.from(document.querySelector('#pokemon-table').children); // <tr>[10]
  const $currentPage = document.querySelector('.pagination').children[1];
  const currentPageNumber = Number($currentPage.textContent);
  const firstID = (currentPageNumber - 1) * 10 + 1;
  const pokemons = browseByID(firstID);
  const pokemonsData = [];
  for (let i = 0; i < 10; i += 1) {
    pokemonsData.push(await getPokemon(pokemons));
  }
  $pokemonNumbers.forEach((value, i) => {
    $pokemonNumbers[i].textContent = firstID + i;
  });
  $listOfPokemons.forEach((value, i) => {
    // const cachedPokemon = JSON.parse(localStorage.getItem(`${pokemonsToShowInTable[i].toLowerCase()}`));
    // if (cachedPokemon) {
    //   loadTable(value, cachedPokemon);
    // } else {
    //   loadTable(value, getPokemon(pokemonsToShowInTable[i]));
    // }
    loadTable(value, pokemonsData[i]);
  });
}

function checkInvalidSelection(userSelection) {
  if (userSelection.children[0].classList.contains('disabled') || userSelection.classList.contains('active')) {
    return true;
  }
  return false;
}

export function pageHandler() {
  const $pagination = document.querySelector('.pagination');
  $pagination.addEventListener('click', (valorEvento) => {
    const $selectedElement = valorEvento.target.parentElement;
    const $previous = $pagination.children[0];
    const $next = $pagination.children[4];
    if (checkInvalidSelection($selectedElement) === true) {
      return;
    }
    if ($selectedElement === $previous) {
      previous();
      listPokemons();
      return;
    }
    if ($selectedElement === $next) {
      next();
      listPokemons();
      return;
    }
    pageSelector($selectedElement);
    listPokemons();
  });
}
