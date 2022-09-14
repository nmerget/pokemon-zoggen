import React from 'react';
import Link from '@mui/material/Link';
import { Pokemon } from '../../../pokemon/types';
import { AccordionType } from '../../base/accordion-group/data';
import PokemonImage from '../../base/pokemon-image';
import PokemonSelect from '../../base/pokemon-select';
import POKEMON from '../../../data/pokemon';
import VERSIONS from '../../../data/versions';

const getSearchAcc = (
  pokemon: Pokemon | undefined,
  setPokemon: (pkm: Pokemon) => void,
  version: string | undefined,
): AccordionType => {
  const foundVersion = VERSIONS.find((ver) => ver.version === version);
  const availablePokemon = POKEMON.filter(
    (pkm) => !foundVersion || foundVersion.pokemonIds?.includes(pkm.id || ''),
  );
  return {
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
      <div className="flex flex-col gap-4 w-full">
        <PokemonSelect
          pokemon={availablePokemon}
          value={pokemon}
          onSelectPokemon={(pkm) => {
            setPokemon(pkm);
          }}
        />
        {pokemon && (
          <div>
            <span className="text-sm font-bold">Mehr Informationen: </span>
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
  };
};

export default getSearchAcc;
