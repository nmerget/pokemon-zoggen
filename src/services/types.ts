export type Pokemon = {};

// Firebase

export type FbMove = {
  id?: string;
  name?: string;
  type_id?: number;
  power?: number;
  pp?: number;
  accuracy?: number;
  move_id?: string;
  local_language_id?: string;
  visible?: boolean;
};

export type FbPokemon = {
  pokemon_species_id?: string;
  name?: string;
  local_language_id?: string;
  genus?: string;
  lvl?: number;
  visible?: boolean;
  moves?: FbMove[];
};

export type FbRunsPlayers = {
  id?: string;
  name?: string;
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
