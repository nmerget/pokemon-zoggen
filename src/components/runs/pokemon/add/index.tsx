import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import POKEMON from '../../../../data/pokemon';
import { PokemonAddType } from './data';
import { Pokemon } from '../../../../pokemon/types';
import VERSIONS from '../../../../data/versions';
import PokemonSelect from '../../../base/pokemon-select';

function PokemonAdd({ addUserPokemon, version }: PokemonAddType) {
  const [autoValue, setAutoValue] = useState<Pokemon>();
  const pokeNamesVersion = [
    ...POKEMON.filter((poke) =>
      VERSIONS.find((v) => v.version === version)?.pokemonIds?.includes(
        poke?.id || '',
      ),
    ),
  ];
  return (
    <div className="flex flex-col">
      <span className="whitespace-nowrap text-lg font-bold mb-4">
        Nächstes Pokemon:
      </span>
      <div className="flex flex-wrap gap-4">
        <PokemonSelect
          pokemon={pokeNamesVersion}
          onSelectPokemon={(pkm: Pokemon) => {
            setAutoValue(pkm);
          }}
        />
        <div className="m-auto">
          <Button
            id="add-pokemon-button"
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={!autoValue}
            onClick={() => {
              if (autoValue) {
                addUserPokemon(autoValue);
              }
              setAutoValue(undefined);
            }}
          >
            Hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PokemonAdd;
