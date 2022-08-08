import { FbPokemon, FbRun } from "../../../../services/types";

export type PokemonAddType = {
  addUserPokemon: (changedPokemon: FbPokemon) => void;
};
