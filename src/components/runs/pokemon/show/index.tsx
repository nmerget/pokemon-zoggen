import { FbMove } from "../../../../services/types";
import { PokemonShowType } from "./data";

const PokemonShow = ({ poke, index }: PokemonShowType) => {
  return (
    <div className="shadow bg-neutral-50">
      <div className="flex flex-col p-2">
        <div className="flex flex-wrap gap-4">
          <img
            loading="lazy"
            width="64"
            height="64"
            src={
              poke.visible
                ? `/images/official-artwork/${poke.pokemon_species_id}.png`
                : `/images/0.png`
            }
            alt=""
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white">
              {poke.moves?.map((move: FbMove, indexMove: number) => (
                <div
                  key={`poke-${index}-move-${indexMove}`}
                  className="flex space-x-4"
                >
                  Move {indexMove + 1}:{" "}
                  {poke.visible && move.visible ? move.name : "???"}
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
