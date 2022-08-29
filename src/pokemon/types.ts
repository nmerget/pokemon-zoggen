export type PokemonPossibleMoveType = {
  move_id?: string;
  pokemon_move_method_id?: string;
  level?: string;
  order?: string;
};

export type PokemonMove = {
  id?: string;
  name?: string;
  type_id?: string;
  power?: string;
  pp?: string;
  accuracy?: string;
  move_id?: string;
  local_language_id?: string;
  identifier?: string;
  generation_id?: string;
  priority?: string;
  target_id?: string;
  damage_class_id?: string;
  effect_id?: string;
  effect_chance?: string;
  contest_type_id?: string;
  contest_effect_id?: string;
  super_contest_effect_id?: string;
  possibleMoves?: PokemonPossibleMoveType[];
};

export type PokemonType = {
  pokemon_id?: string;
  type_id?: string;
  slot?: string;
  name?: string;
};

export type Pokemon = {
  pokemon_id?: string;
  pokemon_species_id?: string;
  name?: string;
  local_language_id?: string;
  genus?: string;
  types?: PokemonType[];
  possibleMoves?: PokemonPossibleMoveType[];
};
export type PokemonKey = keyof Pokemon;

export type PokemonVersionType = {
  version: string;
  name: string;
  pokemonIds?: string[];
  possibleMovesFileName?: string;
};
