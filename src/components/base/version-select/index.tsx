import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import VERSIONS from '../../../data/versions';
import { PokemonVersionType } from '../../../pokemon/types';
import { VersionSelectType } from './data';

const VersionSelect = ({ version, onChangeVersion }: VersionSelectType) => (
  <FormControl fullWidth>
    <InputLabel id="label-version">Version</InputLabel>
    <Select
      labelId="label-version"
      id="select-version"
      key={`version-select-${version}`}
      value={version}
      label="Version"
      onChange={(event: SelectChangeEvent) =>
        onChangeVersion(event.target.value)
      }
    >
      {VERSIONS.map((v: PokemonVersionType) => (
        <MenuItem
          id={`menu-item-version-${v.version}`}
          key={v.version}
          value={v.version}
        >
          {v.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default VersionSelect;
