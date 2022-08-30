import got from 'got';
import csvtojsonV2 from 'csvtojson';

import * as FS from 'fs';

const getJSONFromCSV = async (url) => {
  const rawPokeData = await got.get(url);
  return await csvtojsonV2.csv().fromString(rawPokeData.body);
};

const getNamesFromCSV = async (url, langId = '6') => {
  const pokemonNamesJson = await getJSONFromCSV(url);
  return pokemonNamesJson.filter((data) => data.local_language_id === langId);
};

const addPokemon = async () => {
  console.log('Download germanPokenames');
  const germanPokenames = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv',
  );

  console.log('Download allPokemonTypes');
  const allPokemonTypes = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_types.csv',
  );

  console.log('Download germanTypes');
  const germanTypes = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/type_names.csv',
  );

  let pokemon = 'import { Pokemon } from "../pokemon/types";\n';
  pokemon += `\nconst POKEMON: Pokemon[] = ${JSON.stringify(
    germanPokenames.map((poke) => ({
      ...poke,
      types: allPokemonTypes
        .filter((type) => type.pokemon_id === poke.pokemon_species_id)
        .map((type) => ({
          ...type,
          name: germanTypes.find((gType) => gType.type_id === type.type_id)
            .name,
        })),
    })),
  )};\n`;
  pokemon += 'export default POKEMON;';
  FS.writeFileSync('./src/data/pokemon.ts', pokemon);
};

const addMoves = async () => {
  let moves = 'import { PokemonMove } from "../pokemon/types";\n\n';

  console.log('Download germanMovenames');
  const germanMovenames = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/move_names.csv',
  );
  console.log('Download allMoves');
  const allMoves = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/moves.csv',
  );
  moves += `const MOVES: PokemonMove[] = ${JSON.stringify(
    germanMovenames.map((move) => ({
      ...move,
      ...allMoves.find((aMove) => aMove.id === move.move_id),
    })),
  )};\n`;

  moves += 'export default MOVES;';

  FS.writeFileSync('./src/data/moves.ts', moves);
};

const addPokemonPossibleMovesByGen = async (allVersionGroups) => {
  console.log('Download PokemonPossibleMoveType');
  const allPokemonMoves = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_moves.csv',
  );

  const versions = [];

  allVersionGroups?.forEach((version) => {
    const filteredMovesByVersion = allPokemonMoves.filter(
      (move) => move.version_group_id === version.id,
    );
    const pokemon = [];
    filteredMovesByVersion.forEach((move) => {
      let foundPokemon = pokemon.find(
        (poke) => poke.pokemon_species_id === move.pokemon_id,
      );
      if (!foundPokemon) {
        foundPokemon = {
          pokemon_species_id: move.pokemon_id,
          possibleMoves: [],
        };
        pokemon.push(foundPokemon);
      }
      delete move.pokemon_id;
      delete move.version_group_id;
      foundPokemon.possibleMoves.push(move);
    });

    const fileName = `/data/moves/gens/${version.identifier}.json`;
    if (!FS.existsSync(`./public${fileName}`)) {
      FS.writeFileSync(`./public${fileName}`, JSON.stringify(pokemon));
    }

    versions.push({
      version: version.id,
      name: version.identifier,
      pokemonIds: pokemon?.map((poke) => poke.pokemon_species_id) || [],
      possibleMovesFileName: fileName,
    });
  });

  return versions;
};

const run = async () => {
  let versionMovesHeader =
    'import { PokemonVersionType } from "../pokemon/types";\n';

  console.log('Download version_groups');
  const allVersionGroups = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/version_groups.csv',
  );
  const versions = await addPokemonPossibleMovesByGen(
    allVersionGroups.filter(
      (version) => version.id === '1' || version.id === '10',
    ),
  );
  await addPokemon();
  await addMoves();

  versionMovesHeader += `\nconst VERSIONS: PokemonVersionType[] = ${JSON.stringify(
    versions,
  )};\n`;

  versionMovesHeader += `export default VERSIONS;`;

  FS.writeFileSync(`./src/data/versions.ts`, versionMovesHeader);
};

run();
