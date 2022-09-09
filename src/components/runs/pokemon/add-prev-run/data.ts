import { FbPokemon } from '../../../../firebase/types';
import { Pokemon } from '../../../../pokemon/types';

export type PokemonAddPrevRunType = {
  changePokemon: (pkm: (FbPokemon & Pokemon)[]) => void;
};
