import got from "got";
import csvtojsonV2 from "csvtojson";

import * as FS from "fs";

const getJSONFromCSV = async (url) => {
  const rawPokeData = await got.get(url);
  return await csvtojsonV2.csv().fromString(rawPokeData.body);
};

const getNamesFromCSV = async (url, langId = "6") => {
  const pokemonNamesJson = await getJSONFromCSV(url);
  return pokemonNamesJson.filter((data) => data.local_language_id === langId);
};

const addPokemon = async () => {
  const germanPokenames = await getNamesFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv"
  );
  const allPokemonTypes = await getJSONFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_types.csv"
  );

  const germanTypes = await getNamesFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/type_names.csv"
  );

  return `export const POKEMON: FbPokemon[] = ${JSON.stringify(
    germanPokenames.map((poke) => ({
      ...poke,
      types: allPokemonTypes
        .filter((type) => type.pokemon_id === poke.pokemon_species_id)
        .map((type) => ({
          ...type,
          name: germanTypes.find((gType) => gType.type_id === type.type_id)
            .name,
        })),
    }))
  )};`;
};

const run = async () => {
  const germanMovenames = await getNamesFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/move_names.csv"
  );
  const allMoves = await getJSONFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/moves.csv"
  );
  let data = 'import { FbPokemon } from "../services/types";\n';
  data += await addPokemon();
  data += `export const MOVES = ${JSON.stringify(
    germanMovenames.map((move) => ({
      ...move,
      ...allMoves.find((aMove) => aMove.id === move.move_id),
    }))
  )};`;

  FS.writeFileSync("./src/app/data.ts", data);
};

run();
