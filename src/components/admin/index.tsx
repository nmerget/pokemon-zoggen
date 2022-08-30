import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import Button from '@mui/material/Button';
import {
  FIREBASE_COLLECTION_CURRENT,
  FIREBASE_COLLECTION_RUN_GROUPS,
} from '../../app/constants';
import AlertDialog from '../base/alert-dialog';
import VERSIONS from '../../data/versions';
import { PokemonVersionType } from '../../pokemon/types';
import addNewRunGroup from '../../firebase/methods/add/add-new-run-group';
import addNewRun from '../../firebase/methods/add/add-new-run';
import { useCurrent, useRunGroups, useRuns, useUsers } from '../../app/hooks';

const Admin = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [version, setVersion] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };
  const firestore = useFirestore();

  const groups = useRunGroups();
  const runs = useRuns(true);
  const users = useUsers();
  const current = useCurrent();

  return (
    <div className="flex flex-col gap-4">
      {groups &&
        groups.map((group, index) => (
          <Paper key={`group-${index}`} className="flex flex-col p-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="whitespace-nowrap text-lg font-bold">
                  Gruppe {index + 1}:
                </span>
                <div className="my-auto">
                  {current && current.currentGroupId !== group.id && (
                    <Button
                      color="inherit"
                      onClick={() => {
                        firestore
                          .collection(FIREBASE_COLLECTION_CURRENT)
                          .doc(current.id)
                          .update({ currentGroupId: group.id });
                      }}
                      variant="contained"
                    >
                      Aktuellen wechseln
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <TextField
                  label="Name"
                  variant="outlined"
                  value={group.name}
                  onChange={(event) => {
                    firestore
                      .collection(FIREBASE_COLLECTION_RUN_GROUPS)
                      .doc(group.id)
                      .update({ name: event.target.value });
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {runs
                    ?.filter((run) => run.groupId === group.id)
                    .map((run) => (
                      <Chip
                        className="my-auto"
                        key={`run-${run.id}`}
                        label={run.name}
                      />
                    ))}
                </div>
                <div className="my-auto">
                  {users?.length > 0 && (
                    <Button
                      id={`add-run-button-${index}`}
                      onClick={() => {
                        addNewRun(
                          firestore,
                          users,
                          group.id || '',
                          group.version,
                        );
                      }}
                      variant="contained"
                    >
                      Run hinzufügen
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Paper>
        ))}

      <AlertDialog
        open={open}
        handleClose={(okay: boolean) => {
          if (okay) {
            addNewRunGroup(firestore, version);
          }
          setOpen(false);
        }}
        title="Version auswählen"
        content={
          <FormControl fullWidth>
            <InputLabel id="label-version">Version</InputLabel>
            <Select
              labelId="label-version"
              id="select-version"
              value={version}
              label="Age"
              onChange={handleChange}
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
        }
      />
      <div className="w-full flex">
        <div className="mx-auto">
          <Button
            id="add-group"
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
          >
            Gruppe hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
