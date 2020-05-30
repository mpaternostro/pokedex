/* eslint-disable global-require */
// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import getPokemonFromApi from '../../api/api.js';

import {
  getPokemon, getRandomPokemon, getPokemons,
} from '../pokemon.js';

import pokemonsData from './pokemons.fixture.js';

jest.mock('../../api/api.js', () => ({
  __esModule: true,
  default: jest.fn((name) => ({ id: 1, name, height: 7 })),
}));

jest.mock('../../mapper/pokemon.js', () => ({
  __esModule: true,
  default: jest.fn((data) => data),
}));

beforeEach(() => {
  getPokemonFromApi.mockClear();
});

describe('test getPokemon functionality', () => {
  const storage = require('../../storage/pokemon.js');
  const pokemonName = 'bulbasaur';
  const pokemonData = { id: 1, name: 'bulbasaur', height: 7 };

  test('getPokemon returns an error due to lack of Pokemon name', async () => {
    await expect(getPokemon()).rejects
      .toThrowError(new Error('A Pokemon name is mandatory in order to get Pokemon'));
  });

  test('getPokemon returns requested Pokemon from localStorage', async () => {
    storage.loadPokemon = jest.fn((name) => ({ id: 1, name, height: 7 }));

    await expect(getPokemon(pokemonName)).resolves.toEqual(pokemonData);
    expect(storage.loadPokemon).toHaveBeenCalledTimes(1);
    expect(storage.loadPokemon).toHaveBeenCalledWith(pokemonName);

    storage.loadPokemon.mockClear();
  });

  test('getPokemon returns requested Pokemon from API', async () => {
    storage.loadPokemon = jest.fn(() => {
      throw new Error('error');
    });
    storage.savePokemon = jest.fn();

    expect(await getPokemon(pokemonName)).toEqual(pokemonData);
  });
});

test('getRandomPokemon returns a random Pokemon', async () => {
  const getRandomPokemonData = await getRandomPokemon();
  const pokemonData = { id: 1, name: getPokemonFromApi.mock.results[0].value.name, height: 7 };

  expect(getRandomPokemonData).toEqual(pokemonData);
});

test('getPokemons returns array filled with Pokemons data', async () => {
  const getPokemonsData = await getPokemons('2');

  expect(getPokemonsData).toEqual(pokemonsData);
});
