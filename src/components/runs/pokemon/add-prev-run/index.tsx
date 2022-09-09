import Button from '@mui/material/Button';
import { useFirestore } from 'react-redux-firebase';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useCurrentRun, useCurrentUser, useRuns } from '../../../../app/hooks';
import { PokemonAddPrevRunType } from './data';
import {
  FIREBASE_COLLECTION_RUN_GROUPS,
  FIREBASE_COLLECTION_RUNS,
  FIREBASE_COLLECTION_USERS,
} from '../../../../app/constants';
import { FbRun } from '../../../../firebase/types';

const PokemonAddPrevRun = ({ changePokemon }: PokemonAddPrevRunType) => {
  const runs = useRuns();
  const currentRun = useCurrentRun();
  const currentUser = useCurrentUser();
  const firestore = useFirestore();

  const [showProgress, setShowProgress] = useState<boolean>(false);

  if (!currentRun || !runs || runs.length < 1) {
    return null;
  }

  const changePokemonFromPrevRun = async () => {
    setShowProgress(true);
    let pRun;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < runs.length; i++) {
      if (runs[i].id === currentRun.id) {
        pRun = runs[i - 1];
      }
    }
    if (pRun && currentUser) {
      const prevRunPokemon = await firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(currentUser.id)
        .collection(FIREBASE_COLLECTION_RUN_GROUPS)
        .doc(pRun.groupId)
        .collection(FIREBASE_COLLECTION_RUNS)
        .doc(pRun.id)
        .get();

      if (prevRunPokemon.data()) {
        const data = prevRunPokemon.data() as FbRun;
        const prevPokemon =
          data.pokemon?.map((pkm) => ({
            ...pkm,
            lvl: currentRun.lvlCap,
          })) || [];
        changePokemon(prevPokemon);
      }
    }
    setShowProgress(false);
  };

  return (
    <div>
      {showProgress ? (
        <CircularProgress variant="indeterminate" />
      ) : (
        <Button variant="contained" onClick={() => changePokemonFromPrevRun()}>
          Pokemon aus letztem Run übernehmen
        </Button>
      )}
    </div>
  );
};

export default PokemonAddPrevRun;
