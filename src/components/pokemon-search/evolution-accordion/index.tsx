import orderBy from 'lodash/orderBy';
import React from 'react';
import { Pokemon } from '../../../pokemon/types';
import POKEMON from '../../../data/pokemon';
import EVOLUTIONS from '../../../data/evolutions';
import { AccordionType } from '../../base/accordion-group/data';
import PokemonImage from '../../base/pokemon-image';
import EvolutionTree from './evolution-tree';

const getOrderedEvolutions = (pokemon: Pokemon): Pokemon[] =>
  orderBy(
    POKEMON.filter(
      (pkm) => pkm.evolution_chain_id === pokemon.evolution_chain_id,
    ).map((pkm) => ({
      ...pkm,
      evolutionType: EVOLUTIONS.find(
        (evo) => evo.evolved_species_id === pkm.id,
      ),
    })),
    ['order'],
  );

const getEvolutionTree = (
  orderedEvolutions: Pokemon[],
): Pokemon[][] | undefined => {
  const evolutionStack = [...orderedEvolutions];
  const result: Pokemon[][] = [[], [], []];
  while (evolutionStack.length > 0) {
    const pokemon = evolutionStack.shift();
    if (pokemon) {
      if (!pokemon.evolutionType) {
        result[0].push(pokemon);
      } else {
        const basePokemon = result[0][0];
        if (pokemon.evolves_from_species_id === basePokemon.id) {
          result[1].push(pokemon);
        } else {
          result[2].push(pokemon);
        }
      }
    }
  }
  return result;
};

const getEvolutionAcc = (pokemon: Pokemon): AccordionType => {
  const orderedEvolutions = getOrderedEvolutions(pokemon);
  const evolutionTree = getEvolutionTree(orderedEvolutions);

  return {
    title: 'Entwicklungen:',
    summary: (
      <div className="flex flex-wrap justify-center gap-2">
        {orderedEvolutions.map((pkm) => (
          <PokemonImage
            key={`pkm-image-${pkm.id}`}
            size={40}
            icon
            speciesId={pkm.id}
          />
        ))}
      </div>
    ),
    detail: evolutionTree ? (
      <div className="flex flex-col w-full gap-2">
        {evolutionTree
          .filter((pokemonTree) => pokemonTree.length > 0)
          .map((pokemonTree: Pokemon[], index: number) => (
            <EvolutionTree
              key={`evolution-stage-${index + 1}`}
              index={index + 1}
              pokemonTree={pokemonTree}
            />
          ))}
      </div>
    ) : (
      <span>Keine Entwicklungen gefunden</span>
    ),
  };
};

export default getEvolutionAcc;
