/* eslint-disable global-require */
// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

// import pokemonsData from './pokemons-data.fixture.js';

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

// jest.mock('../../api/api.js', () => ({
//   __esModule: true,
//   default: jest.fn((pokemonName) => {
//     global.localStorage.setItem(pokemonName, { id: 1, name: pokemonName, height: 7 });
//   }),
// }));

describe('return Pokemon', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  afterEach(() => {
    JSON.parse.mockClear();
  });

  jest.resetModules();
  // const { getPokemon, getRandomPokemon, getPokemonsData } = require('../pokemon.js');
  const { loadPokemon } = require('../pokemon.js');
  const bulbasaurData = '{ id: 1, name: bulbasaur, height: 7 }';

  test('loadPokemon returns Pokemon from localStorage', () => {
    global.localStorage.setItem('bulbasaur', bulbasaurData);
    expect(loadPokemon('bulbasaur')).toEqual(bulbasaurData);
    expect(JSON.parse).toBeCalledTimes(1);
  });

  test('loadPokemon returns an error due to lack of Pokemon name', () => {
    expect(() => loadPokemon())
      .toThrowError(new Error('A Pokemon name is mandatory in order to get Pokemon'));
  });

  test('loadPokemon returns an error due to invalid Pokemon name', () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => null);
    expect(() => loadPokemon('bolbasor'))
      .toThrowError(new Error('bolbasor not found'));
  });

  // test('return pokemon data from localStorage after requesting data to api', async () => {
  //   expect(await getPokemon('bolbasor')).toEqual(bolbasorData);
  //   expect(JSON.parse).toBeCalledTimes(2);
  // });

  // test('return data from a random pokemon', async () => {
  //   expect(await getRandomPokemon()).not.toEqual(bolbasorData);
  //   expect(JSON.parse).toBeCalledTimes(2);
  // });
  // test('create array with pokemons data', async () => {
  //   expect(await getPokemonsData(1)).toEqual(pokemonsData);
  // });
});

describe('save Pokemon', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  afterEach(() => {
    JSON.stringify.mockClear();
  });

  jest.resetModules();
  const { savePokemon } = require('../pokemon.js');
  const bulbasaurData = { id: 1, name: 'bulbasaur', height: 7 };

  test('savePokemon saves Pokemon in localStorage', () => {
    JSON.stringify = jest.fn().mockImplementation((pokemonData) => pokemonData);
    savePokemon('bulbasaur', bulbasaurData);
    expect(JSON.stringify).toBeCalledWith(bulbasaurData);
  });

  test('savePokemon returns an error due to lack of Pokemon name or invalid pokemon Data', () => {
    expect(() => savePokemon('', bulbasaurData))
      .toThrowError(new Error('A Pokemon name and object type data is mandatory in order to save Pokemon'));
    expect(() => savePokemon('bulbasaur', 'invalid Pokemon data'))
      .toThrowError(new Error('A Pokemon name and object type data is mandatory in order to save Pokemon'));
  });
});
