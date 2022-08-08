import { FbPokemon, FbRun } from "../../../../services/types";

export type PokemonEditType = {
  poke: FbPokemon;
  index: number;
  run?: FbRun;
  updateUserPokemon: (
    changedPokemon: FbPokemon,
    key: string,
    value: any
  ) => void;
  onDeletePokemon: () => void;
};
