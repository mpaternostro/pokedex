// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import handleNavbarButtons from '../navbar.js';

jest.mock('../../storage/pokemon.js', () => ({
  __esModule: true,
  getPokemon: jest.fn((pokemonName) => `{ id: 4, name: ${pokemonName}, height: 8 }`),
  getRandomPokemon: jest.fn(() => '{ id: 25, name: pikachu, height: 6 }'),
}));

const indexHTML = `
    <a id="home-button"></a>
    <a id="random-button"></a>
    <form id="search-pokemon">
      <input type="search">
      <button type="submit"></button>
    </form>
    <div id="pokedex"></div>`;
const pokedexHTML = '<strong id="pokemon-name" data-pokemon-name="pikachu">Pikachu</strong>';
const spinner = `
      <div class="d-flex justify-content-center align-items-center flex-grow-1" id="spinner">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>`;

describe('click random button in navbar', () => {
  document.body.innerHTML = indexHTML;
  const callbackFn = jest.fn();
  const $pokedex = document.querySelector('#pokedex');
  const randomPokemon = '{ id: 25, name: pikachu, height: 6 }';
  handleNavbarButtons(callbackFn);
  const $randomButton = document.querySelector('#random-button');
  $randomButton.click();

  test('pokedex shows spinner after clicking random button', () => {
    expect($pokedex.innerHTML).toMatch(spinner);
  });

  test('callbackFn gets called with random pokemon', () => {
    expect(callbackFn).toHaveBeenCalledWith(randomPokemon);
  });
});

describe('search by pokemon name', () => {
  document.body.innerHTML = indexHTML;
  const callbackFn = jest.fn();
  handleNavbarButtons(callbackFn);
  const $searchInput = document.querySelector('#search-pokemon input');
  const $searchButton = document.querySelector('#search-pokemon button');
  const $pokedex = document.querySelector('#pokedex');
  $pokedex.innerHTML = pokedexHTML;
  const pokemonName = 'charmander';
  const pokemonData = `{ id: 4, name: ${pokemonName}, height: 8 }`;
  $searchInput.value = pokemonName;
  $searchButton.click();

  test('pokedex shows spinner', () => {
    expect($pokedex.innerHTML).toMatch(spinner);
  });

  test('callbackFn gets called with charmander', () => {
    expect(callbackFn).toHaveBeenCalledWith(pokemonData);
  });

  test('callbackFn doesn\'t get called with bolbasor', () => {
    callbackFn.mockClear();
    const wrongPokemonName = 'bolbasor';
    $searchInput.value = wrongPokemonName;
    $pokedex.innerHTML = pokedexHTML;
    $searchButton.click();
    expect(callbackFn).not.toHaveBeenCalled();
  });

  test('pokedex still shows charmander', () => {
    expect($pokedex.innerHTML).toMatch(pokedexHTML);
  });
});
