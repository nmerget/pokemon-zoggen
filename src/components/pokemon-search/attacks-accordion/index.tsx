import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { TableBody, TableCell, TableRow } from '@mui/material';
import orderBy from 'lodash/orderBy';
import Link from '@mui/material/Link';
import MOVES from '../../../data/moves';
import {
  Pokemon,
  PokemonMove,
  PokemonPossibleMoveType,
} from '../../../pokemon/types';
import { AccordionType } from '../../base/accordion-group/data';
import TypingBadge from '../../base/typing-badge';
import MoveMethodTag from '../../runs/pokemon/edit/edit-moves/move-method-tag';

const tableHeaders = ['Art', 'Attacke', 'Typ', 'Kat.', 'Pow.', 'Gen.', 'AP'];

const getStatusImage = (id?: string): string =>
  id === '2' ? 'PhysischIC.png' : id === '3' ? 'SpezialIC.png' : 'StatusIC.png';

const getAttacksAcc = (
  pokemon: Pokemon,
  allPossibleMoves: Pokemon[],
): AccordionType => {
  const possibleMovesByVersion: (PokemonPossibleMoveType &
    PokemonMove & { lvl: number })[] = orderBy(
    (
      allPossibleMoves
        .find((pkm) => pkm.id === pokemon.id)
        ?.possibleMoves?.map((mv) => ({
          ...mv,
          ...(MOVES.find((move) => move.id === mv.move_id) || {}),
        })) || []
    ).map((move) => ({ ...move, lvl: Number(move.level || '101') })),
    ['pokemon_move_method_id', 'lvl'],
    ['asc', 'asc'],
  );

  return {
    title: 'Attacken:',
    summary: (
      <span>{possibleMovesByVersion?.length || 0} Lernbare Attacken</span>
    ),
    detail: (
      <div className="flex flex-col w-full">
        <div className="bg-white w-full h-4 sticky -top-2" />
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header.toLowerCase()} sx={{ padding: '2px' }}>
                  <span className="font-bold text-sm">{header}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {possibleMovesByVersion.map((row, index) => (
              <TableRow
                key={`${row.name}-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ padding: '2px' }}>
                  <MoveMethodTag possibleMove={row} />
                </TableCell>
                <TableCell sx={{ padding: '2px' }}>
                  <Link
                    href={`https://pokewiki.de/${row.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs"
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell sx={{ padding: '2px' }}>
                  <div className="flex">
                    <TypingBadge type={row.type_id} small />
                  </div>
                </TableCell>
                <TableCell sx={{ padding: '2px' }}>
                  <img
                    src={`/images/${getStatusImage(row.damage_class_id)}`}
                    alt="damage-class"
                  />
                </TableCell>
                <TableCell align="center" sx={{ padding: '2px' }}>
                  <span className="text-xs">{row.power || '---'}</span>
                </TableCell>
                <TableCell align="center" sx={{ padding: '2px' }}>
                  <span className="text-xs">{row.accuracy || '---'}</span>
                </TableCell>
                <TableCell align="center" sx={{ padding: '2px' }}>
                  <span className="text-xs">{row.pp || '---'}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ),
  };
};

export default getAttacksAcc;
