import TextField from '@mui/material/TextField/TextField';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import AlertDialog from '../../../../base/alert-dialog';
import TypingBadge from '../../../../base/typing-badge';
import PokemonImage from '../../../../base/pokemon-image';
import { PokemonEditType } from '../data';

const EditGeneral = ({
  index,
  onDeletePokemon,
  poke,
  updateUserPokemon,
}: PokemonEditType) => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap gap-4">
      <AlertDialog
        open={deleteOpen}
        handleClose={(okay: boolean) => {
          if (okay) {
            onDeletePokemon?.();
          }
          setDeleteOpen(false);
        }}
        title="Pokemon löschen?"
        message="Willst du das Pokemon aus diesem Run löschen?"
      />
      <PokemonImage
        size={56}
        speciesId={poke.pokemon_species_id}
        alt={poke.name}
      />

      <div className="flex flex-col">
        <span className="whitespace-nowrap text-lg font-bold my-auto md:basis-1/5">
          {poke.name || 'Error'}
        </span>

        <div className="flex gap-1">
          {poke.types?.map((type) => (
            <TypingBadge
              key={type.slot}
              type={type.type_id || '-1'}
              text={type.name}
              small
            />
          ))}
        </div>
      </div>
      <div className="flex basis-2/6 ml-auto md:basis-1/5">
        <TextField
          sx={{ margin: 'auto' }}
          id="outlined-number"
          label="Lvl"
          type="number"
          value={poke.lvl}
          onChange={(event) =>
            updateUserPokemon(index, 'lvl', parseInt(event.target.value, 10))
          }
        />
      </div>
      <FormGroup className="my-auto">
        <FormControlLabel
          control={
            <Switch
              checked={poke.visible || false}
              onChange={(event) =>
                updateUserPokemon(index, 'visible', event.target.checked)
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
  );
};

export default EditGeneral;
