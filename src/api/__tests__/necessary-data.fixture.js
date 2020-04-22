const necessaryData = '{"id":1,"name":"bulbasaur","height":7,"weight":69,"types":[{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}},{"slot":1,"type":{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}}],"stats":[{"base_stat":45,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":65,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":65,"effort":1,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":49,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":49,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":45,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}],"base_experience":64,"sprite":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}';
const singleTypeNecessaryData = '{"id":4,"name":"charmander","height":6,"weight":85,"types":[{"slot":1,"type":{"name":"fire","url":"https://pokeapi.co/api/v2/type/10/"}}],"stats":[{"base_stat":65,"effort":1,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":50,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":60,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":43,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":52,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":39,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}],"base_experience":62,"sprite":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}';

export const pokemonNecessaryData = JSON.parse(necessaryData);
export const singleTypePokemonNecessaryData = JSON.parse(singleTypeNecessaryData);

export default necessaryData;
