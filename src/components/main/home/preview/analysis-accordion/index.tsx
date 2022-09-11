import {
  defensiveMultipliers,
  PokemonType,
  TypeMultipliers,
} from '@auroratide/pokemon-types';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { AccordionType } from '../../../../base/accordion-group/data';
import { FbPokemon } from '../../../../../firebase/types';
import { Pokemon } from '../../../../../pokemon/types';
import { getType } from '../../../../base/typing-badge/data';
import TypingBadge from '../../../../base/typing-badge';

type TypingMedian = {
  id: string;
  typing: string;
  median: number;
};

type PokemonArray = (FbPokemon & Pokemon)[] | undefined;

const calculateTypingMedian = (pokemon: PokemonArray): TypingMedian[] => {
  const pkmTypeMultipliers: TypeMultipliers[] = [];
  let analysis: TypeMultipliers | undefined;
  const medians: TypingMedian[] = [];

  pokemon?.forEach((pkm) => {
    const pkmTypes: PokemonType[] =
      (pkm.types?.map((type) => {
        const result = getType(type.type_id);

        if (result === 'plant') {
          return 'grass';
        }
        if (result === 'psycho') {
          return 'psychic';
        }
        return result;
      }) as PokemonType[]) || [];
    const multiplier = defensiveMultipliers(pkmTypes);
    pkmTypeMultipliers.push(multiplier);
    if (!analysis) {
      analysis = multiplier;
    } else {
      Object.keys(multiplier).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        analysis[key] += multiplier[key];
      });
    }
  });

  if (analysis && pokemon && pokemon.length > 0) {
    Object.keys(analysis).forEach((key) => {
      medians.push({
        id: getType(key),
        typing: key,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        median: analysis[key] / pokemon.length,
      });
    });
  }

  return orderBy(medians, ['median'], ['desc']);
};

const getAnalysisAcc = (pokemon: PokemonArray): AccordionType => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonArray>(pokemon);

  useEffect(() => {
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
  }, [pokemon]);

  return {
    title: 'Team-Analyse',
    detail: pokemon ? (
      <div className="flex flex-wrap gap-1">
        {calculateTypingMedian(selectedPokemon).map(
          (type: TypingMedian, index: number) => (
            <div key={`type-median-${index}`} className="flex gap-1">
              <span>{Number(type.median).toFixed(2)}</span>
              <TypingBadge type={type.id} small />
            </div>
          ),
        )}
      </div>
    ) : (
      <span>Keine Analyse möglich</span>
    ),
  };
};

export default getAnalysisAcc;
