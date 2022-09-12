import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { useUserRunPokemon } from '../../../../app/hooks';
import { PokemonPreviewType } from './data';
import { FbPokemon } from '../../../../firebase/types';
import { Pokemon } from '../../../../pokemon/types';
import POKEMON from '../../../../data/pokemon';
import AccordionGroup from '../../../base/accordion-group';
import getPokemonAcc from './pokemon-accordion';
import getTypeAcc from './typing-accordion';
import getAnalysisAcc from './analysis-accordion';

const PokemonPreview = ({ currentUser, run }: PokemonPreviewType) => {
  const [pokemon, setPokemon] = useState<(FbPokemon & Pokemon)[] | undefined>();
  const [typeMap, setTypeMap] = useState<any[]>();
  const userRunPokemon = useUserRunPokemon(currentUser.id, run.groupId, run.id);

  useEffect(() => {
    if (userRunPokemon) {
      const changedPokemon = userRunPokemon.map((pkm) => ({
        ...pkm,
        ...POKEMON.find((p) => p.pokemon_species_id === pkm.pokemon_species_id),
      }));
      setPokemon(changedPokemon);
      const tMap: any[] = [];
      changedPokemon.forEach((pkm) => {
        pkm.types?.forEach((type) => {
          let foundType = tMap.find((t) => t.type_id === type.type_id);
          if (!foundType) {
            foundType = {
              type_id: type.type_id,
              name: type.name,
              amount: 0,
            };
            tMap.push(foundType);
          }
          foundType.amount += 1;
        });
      });
      setTypeMap(orderBy(tMap, ['amount'], ['desc']));
    }
  }, [userRunPokemon]);

  return (
    <div>
      <AccordionGroup
        id="preview"
        accordions={[
          getPokemonAcc(pokemon),
          getTypeAcc(typeMap),
          getAnalysisAcc(pokemon),
        ]}
      />
    </div>
  );
};

export default PokemonPreview;
