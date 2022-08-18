import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { FbPokemon } from "../../../../services/types";
import { POKEMON } from "../../../../app/data";
import { PokemonAddType } from "./data";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PokemonImage from "../../../base/pokemon-image";

const PokemonAdd = ({ addUserPokemon }: PokemonAddType) => {
  const [autoValue, setAutoValue] = useState<FbPokemon>();
  const pokeNamesGenOne = POKEMON.filter(
    (poke) => parseInt(poke.pokemon_species_id || "-1", 10) < 152
  );
  return (
    <div className="flex flex-col">
      <span className="whitespace-nowrap text-lg font-bold mb-4">
        Nächstes Pokemon:
      </span>
      <div className="flex flex-wrap gap-4">
        <Autocomplete
          key={`add-input-${autoValue?.pokemon_species_id || "unknown"}`}
          className="w-full"
          value={autoValue}
          options={pokeNamesGenOne}
          autoHighlight
          autoSelect
          onChange={(_, pokemon) => {
            if (pokemon) {
              // @ts-ignore
                setAutoValue(pokemon);
            }
          }}
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => (
            <div>
              <TextField {...params} label="Pokemon" />
            </div>
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
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
};

export default PokemonAdd;
