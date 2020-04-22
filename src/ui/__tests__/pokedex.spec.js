// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import loadPokedex from '../pokedex.js';
import { multiTypePokemonHTML, singleTypePokemonHTML } from './pokedex.fixture.js';
import { pokemonNecessaryData, singleTypePokemonNecessaryData } from '../../api/__tests__/necessary-data.fixture.js';

function deleteWhitespaces(html) {
  return html.replace(/\s/g, '');
}

jest.mock('../../utilities/utilities.js', () => ({
  ...require.requireActual('../../utilities/utilities.js'),
  waitImageLoad: jest.fn(async (url) => {
    const image = { src: url };
    return image;
  }),
}));

describe('pokedex gets loaded as expected', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="pokedex"></div>';
  });

  test('multi type pokemon gets loaded as expected', async () => {
    await loadPokedex(pokemonNecessaryData);
    const $pokedex = document.querySelector('#pokedex');
    expect(deleteWhitespaces($pokedex.innerHTML)).toMatch(deleteWhitespaces(multiTypePokemonHTML));
  });

  test('single type pokemon gets loaded as expected', async () => {
    await loadPokedex(singleTypePokemonNecessaryData);
    const $pokedex = document.querySelector('#pokedex');
    expect(deleteWhitespaces($pokedex.innerHTML)).toMatch(deleteWhitespaces(singleTypePokemonHTML));
  });
});
