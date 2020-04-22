// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import { checkCurrentPokemon, checkValidPokemon } from '../check-input.js';

describe('checks currently displayed pokemon', () => {
  document.body.innerHTML = '<div id="pokemon-name" data-pokemon-name="bulbasaur"></div>';
  test('checks if bulbasaur is the currently displayed pokemon', () => {
    expect(checkCurrentPokemon('bulbasaur')).toBe(true);
  });
  test('checks if charmander is the currently displayed pokemon', () => {
    expect(checkCurrentPokemon('charmander')).toBe(false);
  });
});

test('checks if bulbasaur exist in database', () => {
  expect(checkValidPokemon('bulbasaur')).toBe('bulbasaur');
});

test('checks if bulbasor exist in database', () => {
  expect(checkValidPokemon('bulbasor')).not.toBe('bulbasor');
});
