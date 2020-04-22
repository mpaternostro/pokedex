// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import {
  capitalize, checkValidPage, showSpinner, toggleInputError,
} from '../utilities.js';

test('checks if bulbasaur was capitalized', () => {
  expect(capitalize('bulbasaur')).toBe('Bulbasaur');
});

describe('checks selected page', () => {
  test('checks if selected page is already active', () => {
    document.body.innerHTML = '<li class="page-item active" data-page="1"></li>';
    const activePage = document.querySelector('.active');
    expect(checkValidPage(activePage)).toBe(true);
  });
  test('checks if selected page is disabled', () => {
    document.body.innerHTML = '<li class="page-item disabled" data-page="0"></li>';
    const disabledPage = document.querySelector('.disabled');
    expect(checkValidPage(disabledPage)).toBe(true);
  });
  test('checks if selected page is valid', () => {
    document.body.innerHTML = '<li class="page-item" data-page="2"></li>';
    const validPage = document.querySelector('.page-item');
    expect(checkValidPage(validPage)).toBe(false);
  });
});

test('checks if spinner is shown after function runs', () => {
  const spinnerHTML = `<div id="pokedex">
      <div class="d-flex justify-content-center align-items-center flex-grow-1" id="spinner">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div></div>`;
  document.body.innerHTML = '<div id="pokedex"></div>';
  showSpinner();
  expect(document.body.innerHTML).toMatch(spinnerHTML);
});

describe('hide input error on navbar', () => {
  test('checks if error is hidden and input is not highlighted in red', () => {
    document.body.innerHTML = `<form id="search-pokemon">
    <div id="name-error" class="alert-danger form-control mr-2" role="alert">
      Pokémon not found in database
    </div>
    <input class="alert-danger">
  </form>`;
    const $searchPokemonWithoutErrorHTML = `<form id="search-pokemon">
    
    <input class="">
  </form>`;
    toggleInputError('hide');
    expect(document.body.innerHTML).toMatch($searchPokemonWithoutErrorHTML);
  });

  test('checks if input remains the same after requesting to hide error', () => {
    const searchPokemonWithoutErrorHTML = `<form id="search-pokemon">
    <input class="">
  </form>`;
    document.body.innerHTML = searchPokemonWithoutErrorHTML;
    toggleInputError('hide');
    expect(document.body.innerHTML).toMatch(searchPokemonWithoutErrorHTML);
  });
});

describe('show input error on navbar', () => {
  test('checks if error is shown and input is highlighted in red', () => {
    document.body.innerHTML = `<form id="search-pokemon">
    <input class="">
  </form>`;
    const searchPokemonWithErrorHTML = `<form id="search-pokemon">
      <div id="name-error" class="alert-danger form-control mr-2" role="alert">
        Pokémon not found in database
      </div>
    <input class="alert-danger">
  </form>`;
    toggleInputError('show');
    expect(document.body.innerHTML).toMatch(searchPokemonWithErrorHTML);
  });

  test('checks if error is still shown only one time', () => {
    document.body.innerHTML = `<form id="search-pokemon">
      <div id="name-error" class="alert-danger form-control mr-2" role="alert">
        Pokémon not found in database
      </div>
    <input class="alert-danger">
  </form>`;
    const searchPokemonWithErrorHTML = `<form id="search-pokemon">
      <div id="name-error" class="alert-danger form-control mr-2" role="alert">
        Pokémon not found in database
      </div>
      
    <input class="alert-danger">
  </form>`;
    toggleInputError('show');
    expect(document.body.innerHTML).toMatch(searchPokemonWithErrorHTML);
  });
});
