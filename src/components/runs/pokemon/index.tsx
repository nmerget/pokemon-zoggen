import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { FbPokemon, FbRun } from "../../../services/types";
import { SyntheticEvent, useEffect, useState } from "react";
import { updateDoc } from "../../../firebase/utils";
import { useFirestore } from "react-redux-firebase";
import PokemonEdit from "./edit";
import PokemonAdd from "./add";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PokemonShow from "./show";
import { getPlayerName } from "../../../app/utils";
import Button from "@mui/material/Button";

import ListIcon from "@mui/icons-material/List";

import EditIcon from "@mui/icons-material/Edit";

const RunsPokemon = () => {
  const [localPokemon, setLocalPokemon] = useState<FbPokemon[]>([]);

  const [localRun, setLocalRun] = useState<FbRun>();

  const [tabIndex, setTabIndex] = useState(0);

  const [editMode, setEditMode] = useState<boolean>(false);

  const onChangeTabIndex = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const run = useSelector((state: RootState) => state.firestore.ordered?.run);
  const firestore = useFirestore();
  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;
  const users = useSelector(
    (state: RootState) => state.firestore.ordered?.users || []
  );

  const currentUser = users.find(
    (user) => firebaseSelector?.auth?.uid === user.id
  );

  const getCurrentPokemon = () => {
    return (
      localRun?.players?.find((player) => player.id === currentUser?.id)
        ?.pokemon || []
    );
  };

  useEffect(() => {
    if (run && run.length > 0) {
      setLocalRun(run[0]);
    }
  }, [run]);

  useEffect(() => {
    const currentPokemon = getCurrentPokemon();
    setLocalPokemon(currentPokemon);
    if (localRun && currentUser && currentPokemon.length === 0) {
      setEditMode(true);
    }
  }, [localRun, currentUser]);

  const updateUserPokemon = (poke: FbPokemon, key: string, value: any) => {
    const changePokemon = localPokemon.map((localPok) => {
      if (localPok === poke) {
        return {
          ...localPok,
          [key]: value,
        };
      }
      return localPok;
    });
    setLocalPokemon(changePokemon);
    updateRunDoc(changePokemon);
  };

  const addUserPokemon = (selectedPokemon: FbPokemon) => {
    const changePokemon = [
      ...localPokemon,
      {
        ...selectedPokemon,
        lvl: localRun?.lvlCap || 100,
        moves: [{}, {}, {}, {}],
      },
    ];
    setLocalPokemon(changePokemon);
    updateRunDoc(changePokemon);
  };

  const deleteUserPokemon = (poke: FbPokemon) => {
    const changePokemon = localPokemon.filter((pokemon) => pokemon !== poke);
    setLocalPokemon(changePokemon);
    updateRunDoc(changePokemon);
  };

  const updateRunDoc = (changePokemon: FbPokemon[]) => {
    if (localRun) {
      updateDoc(firestore, "runs", {
        ...localRun,
        players:
          localRun.players?.map((player) => {
            if (player.id === currentUser?.id) {
              return { ...player, pokemon: changePokemon };
            }
            return player;
          }) || [],
      });
    }
  };

  if (!currentUser) {
    return <span>Kein aktiver Nutzer gefunden.</span>;
  }

  const getPokemonByTab = () => {
    const user = users[tabIndex];
    if (user) {
      return (
        <div key={`tab-content-${user.name}`}>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <span className="whitespace-nowrap text-lg font-bold">
                Pokemon {editMode ? "Bearbeiten" : "Liste"}:
              </span>
              {user.id === currentUser.id && (
                <div className="ml-auto">
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(!editMode)}
                    startIcon={editMode ? <ListIcon /> : <EditIcon />}
                  >
                    {editMode ? "Anzeigen" : "Bearbeiten"}
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {(user.id !== currentUser.id || !editMode) &&
                localRun?.players &&
                localRun?.players
                  .find((player) => player.id === user.id)
                  ?.pokemon?.map((poke, indexPoke) => (
                    <PokemonShow
                      key={`pokeshow-${indexPoke}`}
                      poke={poke}
                      index={indexPoke}
                    />
                  ))}

              {user.id === currentUser.id && editMode && (
                <>
                  {(!localPokemon ||
                    localPokemon.length < (localRun?.pokAmount || 10)) && (
                    <PokemonAdd addUserPokemon={addUserPokemon} />
                  )}
                  {localPokemon &&
                    localPokemon.map((poke: FbPokemon, index) => (
                      <PokemonEdit
                        key={`pokemon-${index}`}
                        poke={poke}
                        index={index}
                        updateUserPokemon={updateUserPokemon}
                        onDeletePokemon={() => deleteUserPokemon(poke)}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:p-4 space-y-4">
      <span className="whitespace-nowrap text-lg font-bold">Spieler:</span>
      <div className="bg-neutral-100 shadow">
        <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
          <Tabs
            value={tabIndex}
            onChange={onChangeTabIndex}
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="User Pokemon"
          >
            {users.map((user) => (
              <Tab
                key={`tab-${getPlayerName(user.name)}`}
                label={getPlayerName(user.name)}
              />
            ))}
          </Tabs>
        </Box>
      </div>

      {getPokemonByTab()}
    </div>
  );
};

export default RunsPokemon;
