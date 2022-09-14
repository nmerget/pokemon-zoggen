/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  defensiveMultipliers,
  PokemonType,
  TypeMultipliers,
} from '@auroratide/pokemon-types';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { AccordionType } from '../../../../base/accordion-group/data';
import { FbPokemon } from '../../../../../firebase/types';
import { Pokemon } from '../../../../../pokemon/types';
import { getType } from '../../../../base/typing-badge/data';
import TypingBadge from '../../../../base/typing-badge';
import PokemonImage from '../../../../base/pokemon-image';

type TypingMedian = {
  id: string;
  typing: string;
  median: number;
};

type PokemonArray = (FbPokemon & Pokemon)[] | undefined;

const calculateAnalysis = (pokemon: PokemonArray): TypeMultipliers[] => {
  const analysis: TypeMultipliers[] = [];
  pokemon?.forEach((pkm) => {
    const pkmTypes: PokemonType[] = pkm.types?.map((type) => {
      const result = getType(type.type_id);

      if (result === 'plant') {
        return 'grass';
      }
      if (result === 'psycho') {
        return 'psychic';
      }
      return result;
    }) as PokemonType[];
    if (pkmTypes?.length > 0) {
      analysis.push(defensiveMultipliers([...pkmTypes]));
    }
  });
  return analysis;
};

const calculateTypingMedian = (
  selectedPokemon: number[],
  multipliers: TypeMultipliers[],
): TypingMedian[] => {
  const medians: TypingMedian[] = [];
  const analysis: TypeMultipliers = {
    normal: 0,
    dark: 0,
    fighting: 0,
    flying: 0,
    poison: 0,
    ground: 0,
    rock: 0,
    bug: 0,
    ghost: 0,
    steel: 0,
    fire: 0,
    water: 0,
    grass: 0,
    electric: 0,
    psychic: 0,
    ice: 0,
    dragon: 0,
    fairy: 0,
  };

  selectedPokemon.forEach((index: number) => {
    Object.keys(multipliers[index]).forEach((key) => {
      // @ts-ignore
      const factor = multipliers[index][key];
      // @ts-ignore
      analysis[key] +=
        factor === 1
          ? 0
          : factor === 0
          ? -4
          : factor < 1
          ? -1 / factor
          : factor;
    });
  });

  if (analysis) {
    Object.keys(analysis).forEach((key) => {
      medians.push({
        id: getType(key),
        typing: key,
        median:
          // @ts-ignore
          Number(analysis[key]),
      });
    });
  }

  return orderBy(medians, ['median'], ['desc']);
};

const getAnalysisAcc = (pokemon: PokemonArray): AccordionType => {
  const [selectedPokemon, setSelectedPokemon] = useState<number[]>();
  const [analysis, setAnalysis] = useState<TypeMultipliers[]>();

  useEffect(() => {
    if (pokemon) {
      setSelectedPokemon(Array.from({ length: pokemon.length }, (v, i) => i));
      setAnalysis(calculateAnalysis(pokemon));
    }
  }, [pokemon]);

  const changeSelectedPkm = (index: number) => {
    if (selectedPokemon?.includes(index)) {
      setSelectedPokemon(selectedPokemon.filter((i) => i !== index));
    } else {
      setSelectedPokemon([...(selectedPokemon || []), index]);
    }
  };

  return {
    title: 'Analyse Typen',
    detail: pokemon ? (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1 border-t border-b p-2 border-gray-300">
          {pokemon.map((pkm: FbPokemon & Pokemon, index: number) => (
            <IconButton
              style={{ padding: 0 }}
              size="small"
              key={`pokemon-preview-${index}`}
              className="flex relative"
              onClick={() => {
                changeSelectedPkm(index);
              }}
            >
              <PokemonImage size={48} speciesId={pkm.id} icon alt={pkm.name} />
              {selectedPokemon?.includes(index) ? (
                <CheckIcon
                  className="absolute bottom-0 -right-1 text-green-500"
                  fontSize="small"
                />
              ) : (
                <CloseIcon
                  className="absolute bottom-0 -right-1 text-red-500"
                  fontSize="small"
                />
              )}
            </IconButton>
          ))}
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-4">
          {selectedPokemon &&
            analysis &&
            calculateTypingMedian(selectedPokemon, analysis).map(
              (type: TypingMedian, index: number) => (
                <div key={`type-median-${index}`} className="flex gap-2 p-2">
                  <span
                    className={`w-12 ${
                      type.median > 2
                        ? 'text-red-500'
                        : type.median > 1
                        ? 'text-yellow-500'
                        : type.median < 1
                        ? 'text-green-600'
                        : ''
                    } ${type.median >= 0 && 'pl-1.5'}`}
                  >
                    {type.median.toFixed(0)}
                  </span>
                  <TypingBadge type={type.id} small />
                </div>
              ),
            )}
        </div>
      </div>
    ) : (
      <span>Keine Analyse möglich</span>
    ),
  };
};

export default getAnalysisAcc;
