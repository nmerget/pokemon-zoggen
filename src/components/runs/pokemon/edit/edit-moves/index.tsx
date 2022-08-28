import { FbMove } from '../../../../../firebase/types';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import { PokemonEditType } from '../data';
import { MOVES } from '../../../../../app/data';

const EditMoves = ({ index, poke, updateUserPokemon }: PokemonEditType) => {
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
      <div className="grid md:grid-cols-2 gap-4 p-4 bg-white">
        {poke.moves?.map((move: FbMove, indexMove: number) => (
          <div
            key={`foundPoke-${index}-move-${indexMove}`}
            className="flex space-x-4"
          >
            <div className="contents">
              <Autocomplete
                className="w-full"
                value={MOVES.find(
                  (pMoveOne) => pMoveOne.move_id === move.move_id,
                )}
                options={MOVES}
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
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <div>
                    <TextField {...params} label={`Move ${indexMove + 1}:`} />
                  </div>
                )}
              />
            </div>
            <FormGroup className="my-auto">
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
