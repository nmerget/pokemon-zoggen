import { FbMove } from '../../../../firebase/types';
import { PokemonShowType } from './data';
import PokemonImage from '../../../base/pokemon-image';
import TypingBadge from '../../../base/typing-badge';
import { MOVES, POKEMON } from '../../../../app/data';
import { PokemonType } from '../../../../pokemon/types';

function PokemonShow({ poke, index }: PokemonShowType) {
  const foundPoke = {
    ...POKEMON.find((p) => p.pokemon_species_id === poke.pokemon_species_id),
    ...poke,
  };
  return (
    <div className="shadow bg-neutral-50">
      <div className="flex flex-col p-2">
        <div className="flex flex-wrap gap-4">
          <PokemonImage
            size={64}
            speciesId={foundPoke.pokemon_species_id}
            alt={foundPoke.name}
            invisible={!foundPoke.visible}
          />
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-lg font-bold my-auto md:basis-1/5">
              {foundPoke.visible ? foundPoke.name : '???'}
            </span>
            {foundPoke.visible && (
              <div className="flex gap-1">
                {foundPoke.types?.map((type: PokemonType) => (
                  <TypingBadge
                    key={type.slot}
                    type={type.type_id || '-1'}
                    text={type.name}
                    small
                  />
                ))}
              </div>
            )}
          </div>

          <span className="rounded-full ml-auto my-auto px-3 py-1.5 bg-green-100 text-green-600">
            Lvl: {foundPoke.visible ? foundPoke.lvl : '???'}
          </span>
        </div>

        {foundPoke.visible && (
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-md font-bold m-2">
              Moves:
            </span>
            <div className="flex flex-wrap gap-2 px-4 bg-white mb-2">
              {foundPoke.moves?.map((move: FbMove, indexMove: number) => (
                <div
                  key={`foundPoke-${index}-move-${indexMove}`}
                  className="flex space-x-4"
                >
                  <TypingBadge
                    type={
                      foundPoke.visible && move.visible && move.move_id
                        ? MOVES.find((m) => m.move_id === move.move_id)
                            ?.type_id || '-1'
                        : '-1'
                    }
                    text={
                      foundPoke.visible && move.visible
                        ? MOVES.find((m) => m.move_id === move.move_id)?.name
                        : '???'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonShow;
