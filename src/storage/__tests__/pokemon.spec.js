/* eslint-disable global-require */
// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import pokemonsData from './pokemons-data.fixture.js';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

JSON.parse = jest.fn().mockImplementation((pokemonData) => pokemonData);

jest.mock('../../api/api.js', () => ({
  __esModule: true,
  default: jest.fn((pokemonName) => {
    global.localStorage.setItem(pokemonName, `{id: 1, name: ${pokemonName}, height: 7}`);
  }),
}));

describe('return pokemon data', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  afterEach(() => {
    JSON.parse.mockClear();
  });

  jest.resetModules();
  const { getPokemon, getRandomPokemon, getPokemonsData } = require('../pokemon.js');
  const bolbasorData = '{id: 1, name: bolbasor, height: 7}';

  test('return pokemon data from localStorage in first try', async () => {
    global.localStorage.setItem('bolbasor', bolbasorData);
    expect(await getPokemon('bolbasor')).toEqual(bolbasorData);
    expect(JSON.parse).toBeCalledTimes(1);
  });

  test('return pokemon data from localStorage after requesting data to api', async () => {
    expect(await getPokemon('bolbasor')).toEqual(bolbasorData);
    expect(JSON.parse).toBeCalledTimes(2);
  });

  test('return data from a random pokemon', async () => {
    expect(await getRandomPokemon()).not.toEqual(bolbasorData);
    expect(JSON.parse).toBeCalledTimes(2);
  });
  test('create array with pokemons data', async () => {
    expect(await getPokemonsData(1)).toEqual(pokemonsData);
  });
});
