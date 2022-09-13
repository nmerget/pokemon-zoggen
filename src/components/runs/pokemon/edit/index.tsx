import { FbPokemon } from '../../../../firebase/types';
import { PokemonEditType } from './data';
import POKEMON from '../../../../data/pokemon';
import { Pokemon } from '../../../../pokemon/types';
import EditGeneral from './edit-general';
import EditMoves from './edit-moves';

function PokemonEdit({
  poke,
  index,
  updateUserPokemon,
  onDeletePokemon,
  possibleMovesByVersion,
}: PokemonEditType) {
  const foundPoke: Pokemon & FbPokemon = {
    ...POKEMON.find((p) => p.id === poke.id),
    ...poke,
  };

  return (
    <div className="shadow bg-neutral-1000">
      <div className="flex flex-col p-2">
        <EditGeneral
          index={index}
          updateUserPokemon={updateUserPokemon}
          onDeletePokemon={onDeletePokemon}
          poke={foundPoke}
        />

        {possibleMovesByVersion && (
          <EditMoves
            index={index}
            updateUserPokemon={updateUserPokemon}
            possibleMovesByVersion={possibleMovesByVersion}
            poke={foundPoke}
          />
        )}
      </div>
    </div>
  );
}

export default PokemonEdit;
