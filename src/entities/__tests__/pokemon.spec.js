// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import Pokemon from '../Pokemon.js';

describe('class constructor Pokemon got called', () => {
  test('returned a Pokemon with expected properties', () => {
    const bulbasaur = new Pokemon(
      1,
      'bulbasaur',
      7,
      69,
      ['poison', 'grass'],
      [
        { value: 45, name: 'speed' },
        { value: 65, name: 'special-defense' },
        { value: 65, name: 'special-attack' },
        { value: 49, name: 'defense' },
        { value: 49, name: 'attack' },
        { value: 45, name: 'hp' },
      ],
      64,
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    );

    expect(bulbasaur.id).toEqual(1);
    expect(bulbasaur.name).toEqual('bulbasaur');
    expect(bulbasaur.height).toEqual(7);
    expect(bulbasaur.weight).toEqual(69);
    expect(bulbasaur.types).toEqual(['poison', 'grass']);
    expect(bulbasaur.stats).toEqual([
      { value: 45, name: 'speed' },
      { value: 65, name: 'special-defense' },
      { value: 65, name: 'special-attack' },
      { value: 49, name: 'defense' },
      { value: 49, name: 'attack' },
      { value: 45, name: 'hp' },
    ]);
    expect(bulbasaur.baseExperience).toEqual(64);
    expect(bulbasaur.sprite).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  });

  test('returned a Pokemon with default types and stats', () => {
    const bulbasaur = new Pokemon(
      1,
      'bulbasaur',
      7,
      69,
    );

    expect(bulbasaur.id).toEqual(1);
    expect(bulbasaur.name).toEqual('bulbasaur');
    expect(bulbasaur.height).toEqual(7);
    expect(bulbasaur.weight).toEqual(69);
    expect(bulbasaur.types).toEqual([]);
    expect(bulbasaur.stats).toEqual([]);
  });
});
