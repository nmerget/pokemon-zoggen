import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import POKEMON from '../../../../data/pokemon';
import { PokemonAddType } from './data';
import PokemonImage from '../../../base/pokemon-image';
import { Pokemon } from '../../../../pokemon/types';
import VERSIONS from '../../../../data/versions';

function PokemonAdd({ addUserPokemon, version }: PokemonAddType) {
  const [autoValue, setAutoValue] = useState<Pokemon>();
  const pokeNamesVersion = [
    ...POKEMON.filter((poke) =>
      VERSIONS.find((v) => v.version === version)?.pokemonIds?.includes(
        poke?.pokemon_species_id || '',
      ),
    ),
  ];
  return (
    <div className="flex flex-col">
      <span className="whitespace-nowrap text-lg font-bold mb-4">
        Nächstes Pokemon:
      </span>
      <div className="flex flex-wrap gap-4">
        <Autocomplete
          key={`add-input-${autoValue?.pokemon_species_id || 'unknown'}`}
          className="w-full"
          value={autoValue}
          options={pokeNamesVersion}
          autoHighlight
          autoSelect
          onChange={(_, pokemon) => {
            if (pokemon) {
              setAutoValue(pokemon);
            }
          }}
          getOptionLabel={(option) => option?.name || ''}
          renderInput={(params) => (
            <div>
              <TextField {...params} label="Pokemon" />
            </div>
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <PokemonImage
                size={56}
                speciesId={option.pokemon_species_id}
                alt={option.name}
              />
              {option.name}
            </Box>
          )}
        />
        <div className="m-auto">
          <Button
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
