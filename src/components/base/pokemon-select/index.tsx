import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import PokemonImage from '../pokemon-image';
import { PokemonSelectType } from './data';

const PokemonSelect = ({
  pokemon,
  value,
  onSelectPokemon,
}: PokemonSelectType) => (
  <div className="flex gap-2 w-full">
    {value && (
      <PokemonImage className="m-auto" size={40} icon speciesId={value.id} />
    )}
    <Autocomplete
      id="input-add-pokemon"
      key="input-add-pokemon"
      className="w-full"
      value={value}
      options={pokemon}
      autoHighlight
      autoSelect
      onChange={(_, pkm) => {
        if (pkm) {
          onSelectPokemon(pkm);
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
          id={`add-pokemon-${option.id}`}
          component="li"
          sx={{
            '& > img': {
              mr: 2,
              flexShrink: 0,
            },
          }}
          {...props}
        >
          <PokemonImage size={56} speciesId={option.id} alt={option.name} />
          {option.name}
        </Box>
      )}
    />
  </div>
);

export default PokemonSelect;
