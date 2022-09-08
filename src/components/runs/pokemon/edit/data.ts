import { FbPokemon } from '../../../../firebase/types';
import { Pokemon } from '../../../../pokemon/types';

export type PokemonEditType = {
  poke: FbPokemon & Pokemon;
  index: number;
  updateUserPokemon: (index: number, key: string, value: any) => void;
  onDeletePokemon?: () => void;
  possibleMovesByVersion?: Pokemon[];
};
