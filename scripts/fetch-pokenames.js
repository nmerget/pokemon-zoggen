import got from "got";
import csvtojsonV2 from "csvtojson";

import * as FS from "fs";

const getNamesFromCSV = async (url, langId = "6") => {
  const rawPokeNamesData = await got.get(url);
  const pokemonNamesJson = await csvtojsonV2
    .csv()
    .fromString(rawPokeNamesData.body);
  return pokemonNamesJson.filter((data) => data.local_language_id === langId);
};

const run = async () => {
  const germanPokenames = await getNamesFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv",
    "6"
  );
  const germanMovenames = await getNamesFromCSV(
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/move_names.csv",
    "6"
  );
  let data = 'import { FbPokemon } from "../services/types";\n';
  data += `export const POKENAMES: FbPokemon[] = ${JSON.stringify(germanPokenames)};`;
  data += `export const MOVENAMES = ${JSON.stringify(germanMovenames)};`;

  FS.writeFileSync("./src/app/data.ts", data);
};

run();
