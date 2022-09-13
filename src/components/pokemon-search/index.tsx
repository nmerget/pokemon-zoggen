import React, { useState } from 'react';
import { Pokemon } from '../../pokemon/types';
import AccordionGroup from '../base/accordion-group';
import getSearchAcc from './search-accordion';
import getEvolutionAcc from './evolution-accordion';
import getStatsAcc from './stats-accordion';

const PokemonSearch = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  return (
    <div className="flex flex-col lg:px-96">
      <AccordionGroup
        id="preview"
        accordions={
          pokemon
            ? [
                getSearchAcc(pokemon, setPokemon),
                getEvolutionAcc(pokemon),
                getStatsAcc(pokemon),
              ]
            : [getSearchAcc(pokemon, setPokemon)]
        }
      />
    </div>
  );
};

export default PokemonSearch;
