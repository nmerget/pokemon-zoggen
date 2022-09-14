import ArrowDownward from '@mui/icons-material/ArrowDownward';
import React, { ReactElement } from 'react';
import Link from '@mui/material/Link';
import { EvolutionTreeType } from './data';
import PokemonImage from '../../../base/pokemon-image';
import { Pokemon, PokemonEvolution } from '../../../../pokemon/types';
import MOVES from '../../../../data/moves';
import ITEMS from '../../../../data/items';
import TYPINGS from '../../../../data/typings';

const getEvolutionType = (
  name: string,
  isBaby: boolean,
  evolution: PokemonEvolution,
): ReactElement => {
  let spanString = '';
  let link: string | undefined;
  let linkPath: string | undefined;
  if (evolution.known_move_type_id) {
    link = `Level-Up mit Attackentyp ${
      TYPINGS.find((type) => type.type_id === evolution.known_move_type_id)
        ?.name || ''
    }`;
    linkPath = name;
  } else if (evolution.time_of_day) {
    link = `Level-Up bei ${evolution.time_of_day === 'day' ? 'Tag' : 'Nacht'} ${
      evolution.minimum_level ? `(Lvl: ${evolution.minimum_level})` : ''
    }`;
    linkPath = name;
  } else if (evolution.known_move_id) {
    link = `Level-Up mit ${
      MOVES.find((move) => move.move_id === evolution.known_move_id)?.name || ''
    }`;
    linkPath = name;
  } else if (evolution.location_id) {
    link = 'Level-Up Ort';
    linkPath = name;
  } else if (isBaby || evolution.minimum_happiness) {
    link = 'Freundschaft';
  } else if (evolution.evolution_trigger_id === '1') {
    spanString = `Level: ${evolution.minimum_level}`;
  } else if (evolution.evolution_trigger_id === '4') {
    spanString = 'Level: 20 (max. 5 Pkm)';
  } else if (evolution.evolution_trigger_id === '3') {
    const foundItem = ITEMS.find(
      (item) => item.id === evolution.trigger_item_id,
    );
    link = foundItem?.name;
  } else if (evolution.held_item_id) {
    const foundItem = ITEMS.find((item) => item.id === evolution.held_item_id);
    link = `Tausch mit ${foundItem?.name}`;
    linkPath = foundItem?.name;
  }

  if (link) {
    return (
      <Link
        href={`https://pokewiki.de/${linkPath || link}`}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </Link>
    );
  }
  return <span className="text-sm">{spanString}</span>;
};

const EvolutionImage = ({
  id,
  name,
  isBaby,
  evolutionType,
}: Pokemon): ReactElement => (
  <div className="flex flex-col gap-1 mx-auto">
    {evolutionType && (
      <>
        <ArrowDownward className="mx-auto" />
        {getEvolutionType(name || '', isBaby || false, evolutionType)}
      </>
    )}
    <PokemonImage className="mx-auto" size={64} speciesId={id} />
  </div>
);

const EvolutionTree = ({ pokemonTree, index }: EvolutionTreeType) => (
  <div className="flex gap-8 w-full">
    <span className="my-auto font-bold">{index}.</span>
    <div className="flex flex-wrap justify-center gap-2 mx-auto">
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {pokemonTree.map((pkm) => (
        <EvolutionImage
          key={`evolution-image-${pkm.id}`}
          evolutionType={pkm.evolutionType}
          {...pkm}
        />
      ))}
    </div>
  </div>
);

export default EvolutionTree;
