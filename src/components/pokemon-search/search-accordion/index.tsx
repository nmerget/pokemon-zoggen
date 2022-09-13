import React from 'react';
import Link from '@mui/material/Link';
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
      {pokemon && (
        <span className="my-auto">
          #{pokemon?.id} {pokemon?.name}
        </span>
      )}
    </div>
  ),
  detail: (
    <div className="flex gap-8 w-full">
      <PokemonSelect
        pokemon={POKEMON}
        value={pokemon}
        onSelectPokemon={(pkm) => {
          setPokemon(pkm);
        }}
      />
      {pokemon && (
        <div className="my-auto">
          <Link
            href={`https://pokewiki.de/${pokemon.name}`}
            target="_blank"
            rel="noreferrer"
          >
            PokeWiki
          </Link>
        </div>
      )}
    </div>
  ),
});

export default getSearchAcc;
