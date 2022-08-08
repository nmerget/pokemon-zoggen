import { FbMove } from "../../../../services/types";
import { PokemonShowType } from "./data";
import PokemonImage from "../../../base/pokemon-image";
import TypingBadge from "../../../base/typing-badge";
import { MOVENAMES } from "../../../../app/data";

const PokemonShow = ({ poke, index }: PokemonShowType) => {
  return (
    <div className="shadow bg-neutral-50">
      <div className="flex flex-col p-2">
        <div className="flex flex-wrap gap-4">
          <PokemonImage
            size={64}
            speciesId={poke.pokemon_species_id}
            alt={poke.name}
            invisible={!poke.visible}
          />
          <span className="whitespace-nowrap text-lg font-bold my-auto md:basis-1/5">
            {poke.visible ? poke.name : "???"}
          </span>

          <span className="rounded-full ml-auto my-auto px-3 py-1.5 bg-green-100 text-green-600">
            Lvl: {poke.visible ? poke.lvl : "???"}
          </span>
        </div>

        {poke.visible && (
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-md font-bold m-2">
              Moves:
            </span>
            <div className="flex flex-wrap gap-2 px-4 bg-white mb-2">
              {poke.moves?.map((move: FbMove, indexMove: number) => (
                <div
                  key={`poke-${index}-move-${indexMove}`}
                  className="flex space-x-4"
                >
                  <TypingBadge
                    type={
                      poke.visible && move.visible && move.move_id
                        ? MOVENAMES.find((m) => m.move_id === move.move_id)
                            ?.type_id || "-1"
                        : "-1"
                    }
                    text={poke.visible && move.visible ? move.name : "???"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonShow;
