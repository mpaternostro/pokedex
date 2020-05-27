import Pokemon from '../entities/Pokemon.js';

export default function mapPokemon(pokemonData) {
  const {
    id, name, height, weight, types, stats,
  } = pokemonData;
  const baseExperience = pokemonData.base_experience;
  const sprite = pokemonData.sprites.front_default;
  const baseStats = stats.map((stat) => ({
    value: stat.base_stat,
    name: stat.stat.name,
  }));
  const pokemon = new Pokemon(id, name, height, weight, types, baseStats, baseExperience, sprite);
  return pokemon;
}
