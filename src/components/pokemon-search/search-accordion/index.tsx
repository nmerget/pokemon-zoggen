import React from 'react';
import { Pokemon } from '../../../pokemon/types';
import { AccordionType } from '../../base/accordion-group/data';
import PokemonImage from '../../base/pokemon-image';
import PokemonSelect from '../../base/pokemon-select';
import POKEMON from '../../../data/pokemon';

const getSearchAcc = (
  pokemon: Pokemon | undefined,
  setPokemon: (pkm: Pokemon) => void,
): AccordionType => ({
  title: 'Pokemon suchen:',
  summary: (
    <div className="flex">
      {pokemon && <PokemonImage speciesId={pokemon.id} icon size={40} />}
      <span className="my-auto">
        #{pokemon?.id} {pokemon?.name}
      </span>
    </div>
  ),
  detail: (
    <PokemonSelect
      pokemon={POKEMON}
      onSelectPokemon={(pkm) => {
        setPokemon(pkm);
      }}
    />
  ),
});

export default getSearchAcc;
