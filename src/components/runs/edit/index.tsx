import { useNavigate } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { FbRun, FbRunsPlayers, FbUser } from '../../../firebase/types';
import { updateDoc } from '../../../firebase/utils';
import { getPlayerName } from '../../../app/utils';
import RunsPokemon from '../pokemon';
import { FIREBASE_COLLECTION_RUNS } from '../../../app/constants';
import { useAdmin, useCurrentRun, useUsers } from '../../../app/hooks';

const getChangedPlayers = (
  players: FbRunsPlayers[],
  currentUser: FbUser,
  checkedUser: FbUser,
): FbRunsPlayers[] =>
  players.map((player) => {
    if (player.id === currentUser.id || '') {
      return {
        ...player,
        wins: player?.wins?.includes(checkedUser.id || '')
          ? player.wins.filter((win) => win !== checkedUser.id || '')
          : [...(player.wins || []), checkedUser.id || ''],
      };
    }
    return player;
  });

function RunsEdit() {
  const navigate = useNavigate();

  const firestore = useFirestore();

  const currentRun = useCurrentRun();

  const admin = useAdmin();

  const users = useUsers();

  const [localRun, setLocalRun] = useState<FbRun>();

  useEffect(() => {
    if (currentRun) {
      setLocalRun(currentRun);
    }
  }, [currentRun]);

  return (
    <Paper className="flex flex-col p-4">
      <div className="w-fit mb-4">
        <Button
          id="back-button-run-edit"
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Zurück
        </Button>
      </div>

      {localRun && (
        <div className="flex flex-col md:flex-row space-y-4">
          <div className="md:w-1/2">
            <RunsPokemon />
          </div>
          {admin && (
            <div className="flex flex-col md:w-1/2 space-y-4">
              <span className="whitespace-nowrap text-lg font-bold">
                Einstellungen Run:
              </span>
              <TextField
                label="Name"
                variant="outlined"
                value={localRun.name}
                onChange={(event) => {
                  setLocalRun({
                    ...localRun,
                    name: event.target.value,
                  });
                }}
              />
              <TextField
                type="number"
                label="Level Cap"
                variant="outlined"
                value={localRun.lvlCap}
                onChange={(event) => {
                  setLocalRun({
                    ...localRun,
                    lvlCap: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  });
                }}
              />
              <TextField
                type="number"
                label="Pokemon"
                variant="outlined"
                value={localRun.pokAmount}
                onChange={(event) => {
                  setLocalRun({
                    ...localRun,
                    pokAmount: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  });
                }}
              />

              {users.map((user: FbUser, index) => (
                <div key={`user-${index}`} className="flex items-center">
                  <span className="font-bold mr-4">
                    {getPlayerName(user.name)} Siege:
                  </span>
                  {users
                    .filter((innerUser: FbUser) => innerUser.id !== user.id)
                    .map((innerUser: FbUser, i) => (
                      <FormControlLabel
                        key={`checkbox-${innerUser.id}-${i}`}
                        control={
                          <Checkbox
                            checked={
                              localRun?.players
                                ?.find((player) => player?.id === user?.id)
                                ?.wins?.includes(innerUser?.id || '') || false
                            }
                            onChange={() => {
                              setLocalRun({
                                ...localRun,
                                players: getChangedPlayers(
                                  localRun.players || [],
                                  user,
                                  innerUser,
                                ),
                              });
                            }}
                          />
                        }
                        label={getPlayerName(innerUser.name)}
                      />
                    ))}
                </div>
              ))}

              <Button
                onClick={() =>
                  updateDoc(firestore, FIREBASE_COLLECTION_RUNS, localRun)
                }
                className="mx-auto"
                variant="contained"
                disabled={
                  !localRun.name ||
                  localRun.lvlCap === undefined ||
                  localRun.pokAmount === undefined
                }
              >
                Speichern
              </Button>
            </div>
          )}
        </div>
      )}
    </Paper>
  );
}

export default RunsEdit;
