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

const calculateTypingMedian = (pokemon: PokemonArray): TypingMedian[] => {
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
        median: Number(Number(analysis[key] - pokemon.length + 1).toFixed(2)),
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

  const changeSelectedPkm = (pkm: FbPokemon & Pokemon) => {
    if (selectedPokemon?.includes(pkm)) {
      setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pkm.id));
    } else {
      setSelectedPokemon([...(selectedPokemon || []), pkm]);
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
                changeSelectedPkm(pkm);
              }}
            >
              <PokemonImage size={48} speciesId={pkm.id} icon alt={pkm.name} />
              {selectedPokemon?.includes(pkm) ? (
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
          {calculateTypingMedian(selectedPokemon).map(
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
                  }`}
                >
                  {type.median >= 0 ? '+' : ''}
                  {type.median.toFixed(2)}
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
