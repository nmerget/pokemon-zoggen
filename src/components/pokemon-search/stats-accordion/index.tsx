import React from 'react';
import { Divider } from '@mui/material';
import { Pokemon, PokemonStat } from '../../../pokemon/types';
import { AccordionType } from '../../base/accordion-group/data';

const getStatName = (index: number): string => {
  if (index === 1) {
    return 'ANG';
  }
  if (index === 2) {
    return 'DEF';
  }
  if (index === 3) {
    return 'S.A';
  }
  if (index === 4) {
    return 'S.D';
  }
  if (index === 5) {
    return 'INT';
  }
  return 'KP';
};

const getStatColor = (index: number): string => {
  if (index === 1) {
    return 'orange-500';
  }
  if (index === 2) {
    return 'yellow-500';
  }
  if (index === 3) {
    return 'blue-500';
  }
  if (index === 4) {
    return 'green-500';
  }
  if (index === 5) {
    return 'pink-500';
  }
  return 'red-500';
};

const getStatsSum = (stats: PokemonStat[]): number => {
  let sum = 0;
  stats.forEach((stat) => {
    sum += Number(stat.base_stat);
  });
  return sum;
};

const getStatsAcc = (pokemon: Pokemon): AccordionType => ({
  title: 'Statuswerte:',
  summary: (
    <div className="flex gap-0.5">
      {pokemon.stats?.map((stat, index) => (
        <React.Fragment key={`stat-summary-${index}`}>
          <span className={`text-${getStatColor(index)}`}>
            {stat.base_stat}
          </span>
          <span>
            {index === (pokemon?.stats?.length || 100) - 1 ? '=' : '|'}
          </span>
        </React.Fragment>
      ))}
      <span>{getStatsSum(pokemon.stats || [])}</span>
    </div>
  ),
  detail: (
    <div className="grid grid-cols-4 gap-1 w-full">
      <span className="font-bold">Wert</span>
      <span className="font-bold">EVs</span>
      <span className="col-span-2 font-bold">Basiswert</span>
      {pokemon.stats?.map((stat, index) => (
        <React.Fragment key={`stat-${index}`}>
          <span>{getStatName(index)}</span>
          <span>{stat.effort}</span>
          <div className="col-span-2 my-auto flex gap-2">
            <span className="text-sm w-10">{stat.base_stat}</span>
            <div className="relative w-full my-auto">
              <div className="w-full h-3 bg-gray-100" />
              <div
                className={`${
                  Math.floor(Number(stat.base_stat) / 12) > 11
                    ? 'w-full'
                    : `w-${Math.floor(Number(stat.base_stat) / 12)}/12`
                } top-0 absolute h-3 bg-${getStatColor(index)}`}
              />
            </div>
          </div>
        </React.Fragment>
      ))}
      <Divider className="col-span-4" />
      <span className="col-span-2 font-bold">Summe:</span>
      <span className="col-span-2 text-sm">
        {getStatsSum(pokemon.stats || [])}
      </span>
    </div>
  ),
});

export default getStatsAcc;
