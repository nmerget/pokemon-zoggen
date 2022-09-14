import { SyntheticEvent, useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { CircularProgress, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ListIcon from '@mui/icons-material/List';

import EditIcon from '@mui/icons-material/Edit';
import { fetchMovesByVersion, getPlayerName } from '../../../app/utils';
import PokemonShow from './show';
import PokemonAdd from './add';
import PokemonEdit from './edit';
import { FbPokemon, FbUser } from '../../../firebase/types';
import {
  FIREBASE_COLLECTION_RUN_GROUPS,
  FIREBASE_COLLECTION_RUNS,
  FIREBASE_COLLECTION_USERS,
} from '../../../app/constants';
import { Pokemon } from '../../../pokemon/types';
import {
  useCurrentRun,
  useCurrentUser,
  useUserRunPokemon,
  useUsers,
} from '../../../app/hooks';
import PokemonAddPrevRun from './add-prev-run';

function RunsPokemon() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState<FbUser>();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [possibleMovesByVersion, setPossibleMovesByVersion] =
    useState<Pokemon[]>();

  const onChangeTabIndex = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const firestore = useFirestore();
  const users = useUsers();
  const currentUser = useCurrentUser();
  const currentRun = useCurrentRun();

  const [pokemon, setPokemon] = useState<FbPokemon[]>();

  const userRunPokemon = useUserRunPokemon(
    selectedUser?.id,
    currentRun?.groupId,
    currentRun?.id,
  );

  useEffect(() => {
    if (users && users.length > tabIndex) {
      setPokemon(undefined);
      const user = users[tabIndex];
      setSelectedUser(user);
    }
  }, [users, tabIndex, currentUser]);

  useEffect(() => {
    setPokemon(userRunPokemon);
  }, [userRunPokemon]);

  useEffect(() => {
    if (editMode && currentRun && !possibleMovesByVersion) {
      const fetchData = async () => {
        setPossibleMovesByVersion(
          await fetchMovesByVersion(currentRun.version || ''),
        );
      };

      // eslint-disable-next-line no-console
      fetchData().catch(console.error);
    }
  }, [editMode, possibleMovesByVersion, currentRun]);

  const updatePokemon = (changePokemon: FbPokemon[]) => {
    if (currentUser?.id && currentRun?.id && currentRun?.groupId) {
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(currentUser.id)
        .collection(FIREBASE_COLLECTION_RUN_GROUPS)
        .doc(currentRun.groupId)
        .collection(FIREBASE_COLLECTION_RUNS)
        .doc(currentRun.id)
        .update({
          id: currentRun.id,
          pokemon: changePokemon,
        });
    }
  };

  const updateUserPokemon = (index: number, key: string, value: any) => {
    const changePokemon =
      pokemon?.map((localPok, pokeIndex) => {
        if (pokeIndex === index) {
          return {
            ...localPok,
            [key]: value,
          };
        }
        return localPok;
      }) || [];
    updatePokemon(changePokemon);
  };

  const addUserPokemon = (selectedPokemon: Pokemon) => {
    const changePokemon = [
      ...(pokemon || []),
      {
        pokemon_species_id: selectedPokemon.id,
        visible: false,
        lvl: currentRun?.lvlCap || 100,
        moves: [{}, {}, {}, {}],
      },
    ];
    console.log(changePokemon);
    updatePokemon(changePokemon);
  };

  const deleteUserPokemon = (poke: FbPokemon) => {
    const changePokemon = pokemon
      ? pokemon.filter((p) => p.pokemon_species_id !== poke.pokemon_species_id)
      : [];
    updatePokemon(changePokemon);
  };

  if (!currentUser) {
    return <span>Kein aktiver Nutzer gefunden.</span>;
  }

  const getPokemonByTab = () => {
    if (selectedUser) {
      return (
        <div key={`tab-content-${selectedUser.name}`}>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <span className="whitespace-nowrap text-lg font-bold">
                Pokemon {editMode ? 'Bearbeiten' : 'Liste'}:
              </span>
              {selectedUser.id === currentUser.id && (
                <div className="ml-auto">
                  <Button
                    id="button-edit-mode"
                    variant="outlined"
                    onClick={() => setEditMode(!editMode)}
                    startIcon={editMode ? <ListIcon /> : <EditIcon />}
                  >
                    {editMode ? 'Anzeigen' : 'Bearbeiten'}
                  </Button>
                </div>
              )}
            </div>
            <div id="pokemon-container" className="flex flex-col gap-4">
              {!pokemon && <CircularProgress variant="indeterminate" />}
              {(selectedUser.id !== currentUser.id || !editMode) &&
                pokemon?.map((poke, indexPoke) => (
                  <PokemonShow
                    key={`pokeshow-${indexPoke}`}
                    poke={poke}
                    index={indexPoke}
                  />
                ))}

              {selectedUser.id === currentUser.id && editMode && (
                <>
                  {pokemon && pokemon.length === 0 && (
                    <PokemonAddPrevRun changePokemon={updatePokemon} />
                  )}
                  {pokemon && pokemon.length < (currentRun?.pokAmount || 6) && (
                    <PokemonAdd
                      version={currentRun?.version || '1'}
                      addUserPokemon={addUserPokemon}
                    />
                  )}
                  {pokemon &&
                    pokemon.map((poke: FbPokemon, index) => (
                      <PokemonEdit
                        key={`pokemon-${index}-${poke.pokemon_species_id}`}
                        poke={poke}
                        index={index}
                        updateUserPokemon={updateUserPokemon}
                        onDeletePokemon={() => deleteUserPokemon(poke)}
                        possibleMovesByVersion={possibleMovesByVersion}
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
        <Box
          sx={{
            maxWidth: {
              xs: 320,
              sm: 480,
            },
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={onChangeTabIndex}
            variant="scrollable"
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
}

export default RunsPokemon;
