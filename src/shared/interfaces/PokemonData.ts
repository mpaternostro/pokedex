/* eslint-disable camelcase */

import { Type } from './type';

export interface ApiStat {
  base_stat: number;
  stat: {
    name: string;
  }
}

export interface PokemonData {
  id: string;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  stats: ApiStat[];
  base_experience: number;
  sprites: {
    front_default: string;
  }
}
