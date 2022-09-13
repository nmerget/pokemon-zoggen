import { FbPokemon } from '../../../../../firebase/types';
import { Pokemon, PokemonType } from '../../../../../pokemon/types';
import { AccordionType } from '../../../../base/accordion-group/data';
import PokemonImage from '../../../../base/pokemon-image';
import TypingBadge from '../../../../base/typing-badge';

const getPokemonAcc = (
  pokemon: (FbPokemon & Pokemon)[] | undefined,
): AccordionType => {
  const getItems = (detail: boolean) =>
    pokemon ? (
      <div className="flex gap-1">
        {pokemon.map((pkm: FbPokemon & Pokemon, index: number) => (
          <div key={`pokemon-preview-${index}`} className="flex flex-col gap-2">
            <PokemonImage
              size={detail ? 48 : 36}
              speciesId={pkm.id}
              icon
              alt={pkm.name}
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

export default getPokemonAcc;
