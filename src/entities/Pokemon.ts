import { Type } from 'src/shared/interfaces/type';

interface Stat {
  value: number;
  name: string;
}

class Pokemon {
  id: string;

  name: string;

  height: number;

  weight: number;

  types: Type[];

  stats: Stat[];

  baseExperience: number;

  sprite: string;

  constructor(
    id: string,
    name: string,
    height: number,
    weight: number,
    types: Type[] = [],
    stats: Stat[] = [],
    baseExperience: number,
    sprite: string,
  ) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.stats = stats;
    this.baseExperience = baseExperience;
    this.sprite = sprite;
  }
}

export default Pokemon;
