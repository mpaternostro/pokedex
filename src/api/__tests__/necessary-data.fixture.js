const necessaryData = '{"id":1,"name":"bulbasaur","height":7,"weight":69,"types":[{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}},{"slot":1,"type":{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}}],"stats":[{"value":45,"name":"speed"},{"value":65,"name":"special-defense"},{"value":65,"name":"special-attack"},{"value":49,"name":"defense"},{"value":49,"name":"attack"},{"value":45,"name":"hp"}],"baseExperience":64,"sprite":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}';
const singleTypeNecessaryData = '{"id":4,"name":"charmander","height":6,"weight":85,"types":[{"slot":1,"type":{"name":"fire","url":"https://pokeapi.co/api/v2/type/10/"}}],"stats":[{"value":65,"name":"speed"},{"value":50,"name":"special-defense"},{"value":60,"name":"special-attack"},{"value":43,"name":"defense"},{"value":52,"name":"attack"},{"value":39,"name":"hp"}],"baseExperience":62,"sprite":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}';

export const pokemonNecessaryData = JSON.parse(necessaryData);
export const singleTypePokemonNecessaryData = JSON.parse(singleTypeNecessaryData);

export default necessaryData;
