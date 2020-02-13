import { getRandomPokemonName, browseByID } from './pokemon-names.js';

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

export function loadPokedex(pokeInfoObject) {
  waitImageLoad(`https://pokeres.bastionbot.org/images/pokemon/${pokeInfoObject.id}.png`)
    .then((image) => {
      pokemonStats.$pokemonImage.src = image.src;
      pokemonStats.$pokemonName.textContent = `${capitalize(pokeInfoObject.name)}`;
      pokemonStats.$pokemonID.textContent = ` [${pokeInfoObject.id}]`;
      pokemonStats.$height.textContent = `Height: ${pokeInfoObject.height / 10} m`;
      pokemonStats.$weight.textContent = `Weight: ${pokeInfoObject.weight / 10} kg`;
      pokemonStats.$type.textContent = `Type: ${capitalize(pokeInfoObject.types[0].type.name)}
                  ${pokeInfoObject.types[1] ? capitalize(pokeInfoObject.types[1].type.name) : ''}`;
      pokemonStats.$baseStats.forEach((value, i) => {
        value.textContent = `${capitalize(pokeInfoObject.stats[i].stat.name)}: ${pokeInfoObject.stats[i].base_stat}`;
      });
      pokemonStats.$baseExperience.textContent = `Base Experience: ${pokeInfoObject.base_experience}`;
      toggleSpinner('hide');
    })
    .catch((error) => console.error('NO PUDE CARGAR LA IMAGEN', error));
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


export async function loadRandomPokemon() {
  const randomPokemonName = getRandomPokemonName();
  const currentPokemon = document.querySelector('#pokedex #pokemon-name').dataset.pokemonName;
  if (randomPokemonName === currentPokemon) {
    return;
  }
  const randomPokemon = await getPokemon(randomPokemonName);
  if (randomPokemon === undefined) {
    return;
  }
  toggleSpinner('show');
  console.log(randomPokemon);
  loadPokedex(randomPokemon);
}

export function listPokemons() {
  const $pokemonNumbers = Array.from(document.querySelectorAll('.pokemon-number')); // <th>[10]
  const $listOfPokemons = Array.from(document.querySelector('#pokemon-table').children); // <tr>[10]
  const currentPageNumber = Number($currentPage.textContent);
  const firstID = (currentPageNumber - 1) * 10 + 1;
  const pokemonsToShowInTable = browseByID(firstID);
  $pokemonNumbers.forEach((value, i) => {
    value.textContent = firstID + i;
  });
  $listOfPokemons.forEach((value, i) => {
    const cachedPokemon = JSON.parse(localStorage.getItem(`${pokemonsToShowInTable[i].toLowerCase()}`));
    if (cachedPokemon) {
      loadTable(value, cachedPokemon);
    } else {
      // addToCache($listOfPokemons[i]);
      addToCache(pokemonsToShowInTable[i].toLowerCase());
      loadTable(value, cachedPokemon);
    }
  });
}
