import { Pokemon } from '../../../../pokemon/types';

export type PokemonAddType = {
  version: string;
  addUserPokemon: (changedPokemon: Pokemon) => void;
};
