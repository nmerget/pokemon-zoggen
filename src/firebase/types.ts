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
  version?: string;
  groupId?: string;
  pokemon?: FbPokemon[];
};

export type FbUser = {
  id?: string;
  name?: string;
  admin?: boolean;
};

export type FbRunGroup = {
  id?: string;
  runIds?: string[];
  version?: string;
  name?: string;
  createdAt?: number;
};

export type FbCurrent = {
  id?: string;
  currentGroupId?: string;
};

export type FirebaseScheme = {
  runs?: FbRun[];
  users?: FbUser[];
  current?: FbCurrent[];
  groups?: FbRunGroup[];
  // storeAs (only for frontend no real db)
  run?: FbRun[];
  runPokemon?: FbRun[];
};

export type FirestoreScheme = {
  data?: FirebaseScheme;
  ordered?: FirebaseScheme;
};
