import { Pokemon } from '../../../pokemon/types';

export type PokemonSelectType = {
  pokemon: Pokemon[];
  value?: Pokemon;
  onSelectPokemon: (pkm: Pokemon) => void;
};
