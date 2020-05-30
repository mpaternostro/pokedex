// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import mapPokemon from '../pokemon.js';
import Pokemon from '../../entities/Pokemon.js';
import pokemonData from './pokemon-data.fixture.js';
import PokemonFixture from './Pokemon.fixture.js';

test('mapPokemon returns Pokemon from pokemonData', () => {
  expect(mapPokemon(pokemonData)).toEqual(PokemonFixture);
  expect(mapPokemon(pokemonData)).toEqual(expect.any(Pokemon));
});
