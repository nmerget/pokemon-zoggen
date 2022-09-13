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

const addGermanTypings = async (germanTypes) => {
  let typings = 'import { PokemonType } from "../pokemon/types";\n';
  typings += `\nconst TYPINGS: PokemonType[] = ${JSON.stringify(
    germanTypes.map((type) => ({ type_id: type.type_id, name: type.name })),
  )};\n`;
  typings += 'export default TYPINGS;';
  FS.writeFileSync('./src/data/typings.ts', typings);
};

const addPokemon = async () => {
  console.log('Download allPokemon');
  const allPokemon = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species.csv',
  );

  console.log('Download germanPokenames');
  const germanPokenames = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv',
  );

  console.log('Download allPokemonTypes');
  const allPokemonTypes = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_types.csv',
  );

  console.log('Download allPokemonStats');
  const allPokemonStats = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_stats.csv',
  );

  console.log('Download allPokemonAbilities');
  const allPokemonAbilities = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_abilities.csv',
  );

  console.log('Download germanTypes');
  const germanTypes = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/type_names.csv',
  );

  await addGermanTypings(germanTypes);

  let pokemon = 'import { Pokemon } from "../pokemon/types";\n';
  pokemon += `\nconst POKEMON: Pokemon[] = ${JSON.stringify(
    germanPokenames.map((poke) => {
      const pokemonSpecies = allPokemon.find(
        (pkm) => pkm.id === poke.pokemon_species_id,
      );
      return {
        id: poke.pokemon_species_id,
        name: poke.name,
        evolves_from_species_id: pokemonSpecies.evolves_from_species_id,
        evolution_chain_id: pokemonSpecies.evolution_chain_id,
        order: pokemonSpecies.order,
        isBaby: pokemonSpecies.is_baby === '1',
        types: allPokemonTypes
          .filter((type) => type.pokemon_id === poke.pokemon_species_id)
          .map((type) => ({
            type_id: type.type_id,
            name: germanTypes.find((gType) => gType.type_id === type.type_id)
              .name,
          })),
        stats: allPokemonStats
          .filter((type) => type.pokemon_id === poke.pokemon_species_id)
          .map((stat) => ({
            base_stat: stat.base_stat,
            effort: stat.effort,
          })),
        abilities: allPokemonAbilities
          .filter((type) => type.pokemon_id === poke.pokemon_species_id)
          .map((stat) => ({
            ability_id: stat.ability_id,
            is_hidden: stat.is_hidden,
          })),
      };
    }),
  )};\n`;
  pokemon += 'export default POKEMON;';
  FS.writeFileSync('./src/data/pokemon.ts', pokemon);
};

const addItems = async () => {
  let items = 'import { PokemonItem } from "../pokemon/types";\n\n';

  console.log('Download germanItems');
  const germanItemNames = await getNamesFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/item_names.csv',
  );
  items += `const ITEMS: PokemonItem[] = ${JSON.stringify(
    germanItemNames.map((item) => ({
      id: item.item_id,
      name: item.name,
    })),
  )};\n`;

  items += 'export default ITEMS;';

  FS.writeFileSync('./src/data/items.ts', items);
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

const addEvolutions = async () => {
  let evolutions = 'import { PokemonEvolution } from "../pokemon/types";\n\n';

  console.log('Download pokemonEvolutions');
  const allEvolutions = await getJSONFromCSV(
    'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_evolution.csv',
  );
  evolutions += `const EVOLUTIONS: PokemonEvolution[] = ${JSON.stringify(
    allEvolutions,
  )};\n`;

  evolutions += 'export default EVOLUTIONS;';

  FS.writeFileSync('./src/data/evolutions.ts', evolutions);
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
      let foundPokemon = pokemon.find((poke) => poke.id === move.pokemon_id);
      if (!foundPokemon) {
        foundPokemon = {
          id: move.pokemon_id,
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
      pokemonIds: pokemon?.map((poke) => poke.id) || [],
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
  await addEvolutions();
  await addItems();

  versionMovesHeader += `\nconst VERSIONS: PokemonVersionType[] = ${JSON.stringify(
    versions,
  )};\n`;

  versionMovesHeader += `export default VERSIONS;`;

  FS.writeFileSync(`./src/data/versions.ts`, versionMovesHeader);
};

run();
