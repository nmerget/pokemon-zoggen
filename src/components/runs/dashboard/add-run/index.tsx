import AddIcon from '@mui/icons-material/Add';
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from '../../../base/alert-dialog';
import { AddRunType } from './data';
import { PokemonVersionType } from '../../../../pokemon/types';
import VERSIONS from '../../../../data/versions';

const AddRun = ({ onAddRun }: AddRunType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [version, setVersion] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };
  return (
    <>
      <AlertDialog
        open={open}
        handleClose={(okay: boolean) => {
          if (okay) {
            onAddRun?.(version);
          }
          setOpen(false);
        }}
        title="Version auswählen"
        content={
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={version}
              label="Age"
              onChange={handleChange}
            >
              {VERSIONS.map((v: PokemonVersionType) => (
                <MenuItem key={v.version} value={v.version}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <Fab
        size="small"
        sx={{ position: 'fixed' }}
        onClick={() => {
          setOpen(true);
        }}
        color="secondary"
        aria-label="add"
        className="bottom-3 right-3"
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AddRun;
