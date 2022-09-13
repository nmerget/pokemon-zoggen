export type PokemonPossibleMoveType = {
  move_id?: string;
  pokemon_move_method_id?: string;
  level?: string;
  order?: string;
};

export type PokemonItem = {
  id?: string;
  name?: string;
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

export type PokemonEvolution = {
  id?: string;
  evolved_species_id?: string;
  evolution_trigger_id?: string;
  trigger_item_id?: string;
  minimum_level?: string;
  gender_id?: string;
  location_id?: string;
  held_item_id?: string;
  time_of_day?: string;
  known_move_id?: string;
  known_move_type_id?: string;
  minimum_happiness?: string;
  minimum_beauty?: string;
  minimum_affection?: string;
  relative_physical_stats?: string;
  party_species_id?: string;
  party_type_id?: string;
  trade_species_id?: string;
  needs_overworld_rain?: string;
  turn_upside_down?: string;
};

export type PokemonType = {
  type_id?: string;
  name?: string;
};
export type PokemonStat = {
  base_stat?: string;
  effort?: string;
};
export type PokemonAbility = {
  ability_id?: string;
  is_hidden?: string;
};

export type Pokemon = {
  id?: string;
  name?: string;
  evolves_from_species_id?: string;
  evolution_chain_id?: string;
  types?: PokemonType[];
  stats?: PokemonStat[];
  abilities?: PokemonAbility[];
  possibleMoves?: PokemonPossibleMoveType[];
  evolution?: PokemonEvolution;
};
export type PokemonKey = keyof Pokemon;

export type PokemonVersionType = {
  version: string;
  name: string;
  pokemonIds?: string[];
  possibleMovesFileName?: string;
};
