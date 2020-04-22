// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import addPokemonToCache from '../api.js';
import bulbasaurData from './bulbasaur.fixture.json';
import necessaryData from './necessary-data.fixture.js';

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

global.fetch = jest.fn();

describe('tests api call and data stored', () => {
  test('checks if api was called with pokemon name', async () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
      resolve({ json: () => bulbasaurData });
    }));
    await addPokemonToCache('bulbasaur');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur/');
  });

  test('checks if localStorage was written with pokemon necessary data', () => {
    expect(global.localStorage.getItem('bulbasaur')).toBe(necessaryData);
  });
});
