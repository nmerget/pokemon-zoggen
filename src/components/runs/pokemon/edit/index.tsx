import { FbPokemon } from '../../../../firebase/types';
import { PokemonEditType } from './data';
import { POKEMON } from '../../../../app/data';
import { Pokemon } from '../../../../pokemon/types';
import EditGeneral from './edit-general';
import EditMoves from './edit-moves';

function PokemonEdit({
  poke,
  index,
  updateUserPokemon,
  onDeletePokemon,
}: PokemonEditType) {
  const foundPoke: Pokemon & FbPokemon = {
    ...POKEMON.find((p) => p.pokemon_species_id === poke.pokemon_species_id),
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

        <EditMoves
          index={index}
          updateUserPokemon={updateUserPokemon}
          poke={foundPoke}
        />
      </div>
    </div>
  );
}

export default PokemonEdit;
