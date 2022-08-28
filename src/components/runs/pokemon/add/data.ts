import { Pokemon } from '../../../../pokemon/types';

export type PokemonAddType = {
  addUserPokemon: (changedPokemon: Pokemon) => void;
};
