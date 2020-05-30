// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import loadPokemon from '../api.js';

global.fetch = jest.fn();

describe('tests api call and data stored', () => {
  test('checks if api was called with pokemon name', async () => {
    global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
      resolve({ json: () => (resolve) });
    }));
    await loadPokemon('bulbasaur');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur/');
  });
});
