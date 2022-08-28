// Firebase

export class FbMoveClass {
  id?: string;
  move_id?: string;
  visible?: boolean;
}

export type FbMove = FbMoveClass;

export class FbPokemonClass {
  pokemon_species_id?: string;
  lvl?: number;
  visible?: boolean;
  moves?: FbMove[];
}

export type FbPokemon = FbPokemonClass;

export type FbRunsPlayers = {
  id?: string;
  wins?: string[];
  pokemon?: FbPokemon[];
};

export type FbRun = {
  id?: string;
  name?: string;
  lvlCap?: number;
  pokAmount?: number;
  players?: FbRunsPlayers[];
  createdAt?: number;
};

export type FbUser = {
  id?: string;
  name?: string;
  admin?: boolean;
};

export type FirebaseScheme = {
  run?: FbRun[];
  runs?: FbRun[];
  users?: FbUser[];
};

export type FirestoreScheme = {
  data?: FirebaseScheme;
  ordered?: FirebaseScheme;
};
