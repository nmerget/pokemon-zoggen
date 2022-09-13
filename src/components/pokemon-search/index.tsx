import React, { useEffect, useState } from 'react';
import { Pokemon } from '../../pokemon/types';
import AccordionGroup from '../base/accordion-group';
import getSearchAcc from './search-accordion';
import getEvolutionAcc from './evolution-accordion';
import getStatsAcc from './stats-accordion';
import getAttacksAcc from './attacks-accordion';
import { useCurrentRun } from '../../app/hooks';
import { fetchMovesByVersion } from '../../app/utils';
import getVersionAcc from './version-accordion';

const PokemonSearch = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const currentRun = useCurrentRun();

  const [version, setVersion] = useState<string>();
  const [allPossibleMovesByVersion, setAllPossibleMovesByVersion] =
    useState<Pokemon[]>();

  useEffect(() => {
    if (currentRun) {
      setVersion(currentRun.version);
    }
  }, [currentRun]);

  useEffect(() => {
    if (version) {
      const fetchData = async () => {
        const allPossibleMoves = await fetchMovesByVersion(version);
        setAllPossibleMovesByVersion(allPossibleMoves);
      };

      // eslint-disable-next-line no-console
      fetchData().catch(console.error);
    }
  }, [version]);

  return (
    <div className="flex flex-col lg:px-96">
      <AccordionGroup
        id="preview"
        openStartIndex={1}
        accordions={
          pokemon && allPossibleMovesByVersion
            ? [
                getVersionAcc(setVersion, version),
                getSearchAcc(pokemon, setPokemon, version),
                getEvolutionAcc(pokemon),
                getStatsAcc(pokemon),
                getAttacksAcc(pokemon, allPossibleMovesByVersion),
              ]
            : [
                getVersionAcc(setVersion, version),
                getSearchAcc(pokemon, setPokemon, version),
              ]
        }
      />
    </div>
  );
};

export default PokemonSearch;
