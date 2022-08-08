import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { FbRun, FbRunsPlayers, FbUser } from "../../../services/types";
import { updateDoc } from "../../../firebase/utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getPlayerName } from "../../../app/utils";
import Paper from "@mui/material/Paper";
import RunsPokemon from "../pokemon";

const getChangedPlayers = (
  players: FbRunsPlayers[],
  currentUser: FbUser,
  checkedUser: FbUser
): FbRunsPlayers[] => {
  return players.map((player) => {
    if (player.id === currentUser.id || "") {
      return {
        ...player,
        wins: player?.wins?.includes(checkedUser.id || "")
          ? player.wins.filter((win) => win !== checkedUser.id || "")
          : [...(player.wins || []), checkedUser.id || ""],
      };
    }
    return player;
  });
};

const RunsEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const firestore = useFirestore();
  useFirestoreConnect([
    { collection: "runs", doc: params.runId, storeAs: "run" },
    { collection: "users" },
  ]);

  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;

  const users = useSelector(
    (state: RootState) => state.firestore.ordered?.users || []
  );

  const run = useSelector((state: RootState) => state.firestore.ordered?.run);

  const [localRun, setLocalRun] = useState<FbRun>();

  useEffect(() => {
    if (run && run.length > 0) {
      setLocalRun(run[0]);
    }
  }, [run]);

  return (
    <Paper className="flex flex-col p-4">
      <div className="w-fit mb-4">
        <Button onClick={() => navigate(-1)} variant="outlined">
          Zurück
        </Button>
      </div>

      {localRun && (
        <div className="flex flex-col md:flex-row space-y-4">
          <div className="md:w-1/2">
            <RunsPokemon />
          </div>
          {users.find(
            (user: FbUser) =>
              firebaseSelector?.auth?.uid === user.id && user.admin
          ) && (
            <div className="flex flex-col md:w-1/2 space-y-4">
              <span className="whitespace-nowrap text-lg font-bold">
                Einstellungen Run:
              </span>
              <TextField
                label="Name"
                variant="outlined"
                value={localRun.name}
                onChange={(event) => {
                  setLocalRun({ ...localRun, name: event.target.value });
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
                    lvlCap: parseInt(event.target.value, 10),
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
                    pokAmount: parseInt(event.target.value, 10),
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
                    .map((innerUser: FbUser, index) => (
                      <FormControlLabel
                        key={`checkbox-${innerUser.id}-${index}`}
                        control={
                          <Checkbox
                            checked={
                              localRun?.players
                                ?.find((player) => player?.id === user?.id)
                                ?.wins?.includes(innerUser?.id || "") || false
                            }
                            onChange={() => {
                              setLocalRun({
                                ...localRun,
                                players: getChangedPlayers(
                                  localRun.players || [],
                                  user,
                                  innerUser
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
                onClick={() => updateDoc(firestore, "runs", localRun)}
                className="mx-auto"
                variant="contained"
              >
                Speichern
              </Button>
            </div>
          )}
        </div>
      )}
    </Paper>
  );
};

export default RunsEdit;
