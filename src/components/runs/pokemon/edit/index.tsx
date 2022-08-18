import TextField from "@mui/material/TextField/TextField";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import { FbMove } from "../../../../services/types";
import { PokemonEditType } from "./data";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AlertDialog from "../../../base/alert-dialog";
import { useState } from "react";
import { MOVES, POKEMON } from "../../../../app/data";
import { Autocomplete } from "@mui/material";
import PokemonImage from "../../../base/pokemon-image";
import TypingBadge from "../../../base/typing-badge";

const PokemonEdit = ({
  poke,
  index,
  updateUserPokemon,
  onDeletePokemon,
}: PokemonEditType) => {
  const foundPoke = {
    ...POKEMON.find((p) => p.pokemon_species_id === poke.pokemon_species_id),
    ...poke,
  };
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const pokeMovesGenOne = MOVES.filter(
    (move) => parseInt(move.move_id || "-1", 10) < 165
  );

  const changePokeMove = (changeMove: FbMove, indexMove: number) => {
    if (foundPoke.moves) {
      updateUserPokemon(
        foundPoke,
        "moves",
        foundPoke.moves.map((move, index) => {
          if (indexMove === index) {
            return changeMove;
          }
          return move;
        })
      );
    }
  };

  return (
    <div className="shadow bg-neutral-1000">
      <AlertDialog
        open={deleteOpen}
        handleClose={(okay: boolean) => {
          if (okay) {
            onDeletePokemon();
          }
          setDeleteOpen(false);
        }}
        title="Pokemon löschen?"
        message="Willst du das Pokemon aus diesem Run löschen?"
      />
      <div className="flex flex-col p-2">
        <div className="flex flex-wrap gap-4">
          <PokemonImage
            size={56}
            speciesId={foundPoke.pokemon_species_id}
            alt={foundPoke.name}
          />

          <div className="flex flex-col">
            <span className="whitespace-nowrap text-lg font-bold my-auto md:basis-1/5">
              {foundPoke.visible ? foundPoke.name : "???"}
            </span>
            {foundPoke.visible && (
              <div className="flex gap-1">
                {foundPoke.types?.map((type) => (
                  <TypingBadge
                    key={type.slot}
                    type={type.type_id || "-1"}
                    text={type.name}
                    small
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex basis-2/6 ml-auto md:basis-1/5">
            <TextField
              sx={{ margin: "auto" }}
              id="outlined-number"
              label="Lvl"
              type="number"
              value={foundPoke.lvl}
              onChange={(event) =>
                updateUserPokemon(
                  foundPoke,
                  "lvl",
                  parseInt(event.target.value, 10)
                )
              }
            />
          </div>
          <FormGroup className="my-auto">
            <FormControlLabel
              control={
                <Switch
                  checked={foundPoke.visible}
                  onChange={(event) =>
                    updateUserPokemon(
                      foundPoke,
                      "visible",
                      event.target.checked
                    )
                  }
                />
              }
              label="Sichtbar"
            />
          </FormGroup>
          <div className="ml-auto flex">
            <div className="my-auto">
              <Button
                color="error"
                size="medium"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteOpen(true)}
              >
                Löschen
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <span className="whitespace-nowrap text-md font-bold m-2">
              Moves:
            </span>
            <span className="whitespace-nowrap text-md font-bold ml-auto mr-2 my-2">
              Sichtbarkeit
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-white">
            {foundPoke.moves?.map((move: FbMove, indexMove: number) => (
              <div
                key={`foundPoke-${index}-move-${indexMove}`}
                className="flex space-x-4"
              >
                <div className="contents">
                  <Autocomplete
                    className="w-full"
                    value={pokeMovesGenOne.find(
                      (pMoveOne) => pMoveOne.move_id === move.move_id
                    )}
                    options={pokeMovesGenOne}
                    autoHighlight
                    autoSelect
                    onChange={(event, selectedMove) => {
                      if (selectedMove) {
                        // @ts-ignore
                        changePokeMove(selectedMove, indexMove);
                      }
                    }}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <div>
                        <TextField
                          {...params}
                          label={`Move ${indexMove + 1}:`}
                        />
                      </div>
                    )}
                  />
                </div>
                <FormGroup className="my-auto">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={move.visible}
                        onChange={(event) =>
                          changePokeMove(
                            { ...move, visible: event.target.checked },
                            indexMove
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
      </div>
    </div>
  );
};

export default PokemonEdit;
