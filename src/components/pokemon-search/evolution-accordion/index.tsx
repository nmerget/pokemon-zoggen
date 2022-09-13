import orderBy from 'lodash/orderBy';
import React, { ReactElement } from 'react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Pokemon, PokemonEvolution } from '../../../pokemon/types';
import POKEMON from '../../../data/pokemon';
import EVOLUTIONS from '../../../data/evolutions';
import { AccordionType } from '../../base/accordion-group/data';
import PokemonImage from '../../base/pokemon-image';
import ITEMS from '../../../data/items';

const getEvolutions = (pokemon: Pokemon): Pokemon[] =>
  orderBy(
    POKEMON.filter(
      (pkm) => pkm.evolution_chain_id === pokemon.evolution_chain_id,
    ).map((pkm) => ({
      ...pkm,
      evolution: EVOLUTIONS.find((evo) => evo.evolved_species_id === pkm.id),
    })),
    ['id'],
  );

const getEvolutionType = (evolution: PokemonEvolution): ReactElement => {
  let spanString = '';
  if (evolution.evolution_trigger_id === '1') {
    spanString = `Level: ${evolution.minimum_level}`;
  }
  if (evolution.evolution_trigger_id === '3') {
    const foundItem = ITEMS.find(
      (item) => item.id === evolution.trigger_item_id,
    );
    return (
      <a href={`https://pokewiki.de/${foundItem?.name}`}>{foundItem?.name}</a>
    );
  }
  return <span className="text-sm">{spanString}</span>;
};

const getEvolutionAcc = (pokemon: Pokemon): AccordionType => {
  const evolutions = getEvolutions(pokemon);

  return {
    title: 'Entwicklungen:',
    summary: (
      <div className="flex justify-center gap-2">
        {evolutions.map((pkm) => (
          <PokemonImage
            key={`pkm-image-${pkm.id}`}
            size={40}
            icon
            speciesId={pkm.id}
          />
        ))}
      </div>
    ),
    detail: (
      <div className="flex justify-center gap-2">
        {evolutions.map((pkm) => (
          <React.Fragment key={`evolution-detail-${pkm.id}`}>
            {pkm.evolution && (
              <div className="flex flex-col gap-1 my-auto">
                <ArrowForward className="mx-auto" />
                {getEvolutionType(pkm.evolution)}
              </div>
            )}
            <PokemonImage
              key={`pkm-image-${pkm.id}`}
              size={64}
              speciesId={pkm.id}
            />
          </React.Fragment>
        ))}
      </div>
    ),
  };
};

export default getEvolutionAcc;
