// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import { loadTable } from '../table.js';
import tableHTML from './table.fixture.js';
import pokemons from './pokemons.fixture.js';

function deleteWhitespaces(html) {
  return html.replace(/\s/g, '');
}

jest.mock('../../storage/pokemon.js', () => ({
  ...require.requireActual('../../storage/pokemon.js'),
  getPokemon: jest.fn((pokemonName) => {
    const pokemon = { name: pokemonName };
    return pokemon;
  }),
}));

describe('load table', () => {
  document.body.innerHTML = `
  <div id="pokedex">
    <div id="pokemon-name" data-pokemon-name="bulbasaur"></div>
  </div>
  <table>
    <tbody id="pokemon-table"></tbody>
  </table>`;
  loadTable(pokemons);
  const $table = document.querySelector('#pokemon-table');

  test('load table from pokemonList', () => {
    expect(deleteWhitespaces($table.innerHTML)).toEqual(deleteWhitespaces(tableHTML));
  });
});
