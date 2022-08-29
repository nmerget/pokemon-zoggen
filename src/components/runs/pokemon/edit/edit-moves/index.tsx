import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { FbMove } from '../../../../../firebase/types';
import { PokemonEditType } from '../data';
import MOVES from '../../../../../data/moves';
import {
  PokemonMove,
  PokemonPossibleMoveType,
} from '../../../../../pokemon/types';
import MoveMethodTag from './move-method-tag';
import TypingBadge from '../../../../base/typing-badge';

const EditMoves = ({
  index,
  poke,
  updateUserPokemon,
  possibleMovesByVersion,
}: PokemonEditType) => {
  const [pkmMoves, setPkmMoves] = useState<PokemonMove[]>();
  useEffect(() => {
    if (possibleMovesByVersion) {
      const foundMoves = possibleMovesByVersion?.find(
        (pkm) => pkm.pokemon_species_id === poke.pokemon_species_id,
      );

      if (foundMoves?.possibleMoves) {
        const allMoves: PokemonMove[] = [];
        orderBy(
          foundMoves.possibleMoves.filter(
            (possMove: PokemonPossibleMoveType) =>
              Number(possMove.level || '101') <= Number(poke.lvl || '-1'),
          ),
          ['pokemon_move_method_id', 'level'],
          ['asc', 'asc'],
        ).forEach((possMove: PokemonPossibleMoveType) => {
          const foundMove = MOVES.find(
            (mv: PokemonMove) => mv.move_id === possMove.move_id,
          );
          if (foundMove) {
            const foundAllMove = allMoves.find(
              (aMove) => aMove.move_id === foundMove.move_id,
            );
            if (foundAllMove) {
              foundAllMove.possibleMoves?.push(possMove);
            } else {
              allMoves.push({ ...foundMove, possibleMoves: [possMove] });
            }
          }
        });

        setPkmMoves(allMoves);
      }
    }
  }, [possibleMovesByVersion, poke]);

  const changePokeMove = (
    indexMove: number,
    changeMoveId?: string,
    visible?: boolean,
  ) => {
    if (changeMoveId && poke.moves) {
      updateUserPokemon(
        index,
        'moves',
        poke.moves.map((move, i) => {
          if (indexMove === i) {
            return {
              ...move,
              move_id: changeMoveId,
              visible: visible || false,
            };
          }
          return move;
        }),
      );
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex">
        <span className="whitespace-nowrap text-md font-bold m-2">Moves:</span>
        <span className="whitespace-nowrap text-md font-bold ml-auto mr-2 my-2">
          Sichtbarkeit
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-4 p-2 bg-white">
        {poke.moves?.map((move: FbMove, indexMove: number) => (
          <div
            key={`foundPoke-${index}-move-${indexMove}`}
            className="flex gap-2"
          >
            {pkmMoves && (
              <div className="contents">
                <Autocomplete
                  className="w-full"
                  value={pkmMoves.find(
                    (pMoveOne) => pMoveOne.move_id === move.move_id,
                  )}
                  options={pkmMoves}
                  autoHighlight
                  autoSelect
                  onChange={(event, selectedMove) => {
                    if (selectedMove) {
                      changePokeMove(
                        indexMove,
                        selectedMove.move_id,
                        move.visible,
                      );
                    }
                  }}
                  getOptionLabel={(option) => option?.name || ''}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <div className="flex gap-2">
                        <TypingBadge
                          type={option.type_id || '-1'}
                          text={option.name}
                          small
                        />
                        {option.possibleMoves?.map((possMove, i) => (
                          <MoveMethodTag
                            key={`poss-move-${possMove.move_id}-${i}`}
                            possibleMove={possMove}
                          />
                        ))}
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <div>
                      <TextField {...params} label={`Move ${indexMove + 1}:`} />
                    </div>
                  )}
                />
              </div>
            )}
            <FormGroup className="my-auto w-fit">
              <FormControlLabel
                control={
                  <Switch
                    checked={move.visible || false}
                    onChange={(event) =>
                      changePokeMove(
                        indexMove,
                        move.move_id,
                        event.target.checked,
                      )
                    }
                  />
                }
                label=""
              />
            </FormGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditMoves;
