import Pokemon from '../entities/Pokemon.js';

export default function mapPokemon(pokemonData) {
  const {
    id, name, height, weight, types, stats,
  } = pokemonData;
  const baseExperience = pokemonData.base_experience;
  const sprite = pokemonData.sprites.front_default;
  const pokemon = new Pokemon(id, name, height, weight, types, stats, baseExperience, sprite);
  return pokemon;
}
