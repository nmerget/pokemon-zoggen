import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { useUserRunPokemon } from '../../../../app/hooks';
import { PokemonPreviewType } from './data';
import { FbPokemon } from '../../../../firebase/types';
import PokemonImage from '../../../base/pokemon-image';
import { Pokemon, PokemonType } from '../../../../pokemon/types';
import POKEMON from '../../../../data/pokemon';
import TypingBadge from '../../../base/typing-badge';
import AccordionGroup from '../../../base/accordion-group';
import { AccordionType } from '../../../base/accordion-group/data';

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

  const getPokemonAcc = (): AccordionType => {
    const getItems = (detail: boolean) =>
      pokemon ? (
        <div className="flex gap-1">
          {pokemon.map((pkm: FbPokemon & Pokemon, index: number) => (
            <div
              key={`pokemon-preview-${index}`}
              className="flex flex-col gap-2"
            >
              <PokemonImage
                size={detail ? 48 : 40}
                speciesId={pkm.pokemon_species_id}
                icon
              />
              {detail && (
                <>
                  <span className="rounded-full px-3 py-1.5 bg-green-100 text-green-600 text-xs mx-auto">
                    {pkm.lvl}
                  </span>
                  {pkm.types?.map((type: PokemonType, tIndex: number) => (
                    <div key={`pkm-${index}-type-${tIndex}`}>
                      <TypingBadge type={type.type_id} text={type.name} small />
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <span>Keine Pokemon gefunden.</span>
      );

    return {
      title: 'Pokemon',
      summary: getItems(false),
      detail: getItems(true),
    };
  };

  const getTypeAcc = (): AccordionType => ({
    title: 'Typenübersicht',
    detail: typeMap ? (
      <div className="flex flex-wrap gap-1">
        {typeMap.map((type: any, index: number) => (
          <div key={`type-amount-${index}`} className="flex gap-1">
            <span>{type.amount || 0}x</span>
            <TypingBadge type={type.type_id} text={type.name} small />
          </div>
        ))}
      </div>
    ) : (
      <span>Keine Typen gefunden</span>
    ),
  });

  return (
    <div>
      <AccordionGroup
        id="preview"
        accordions={[getPokemonAcc(), getTypeAcc()]}
      />
    </div>
  );
};

export default PokemonPreview;
