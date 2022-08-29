import React from 'react';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../../../app/store';
import RunDashboardCard from './card';
import { FbRun, FbUser } from '../../../firebase/types';
import {
  FIREBASE_COLLECTION_PLAYERS,
  FIREBASE_COLLECTION_RUNS,
  FIREBASE_COLLECTION_USERS,
} from '../../../app/constants';
import addNewRun from '../../../firebase/methods/add-new-run';
import AddRun from './add-run';

const RunsDashboard = () => {
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: FIREBASE_COLLECTION_RUNS,
      orderBy: ['createdAt', 'asc'],
    },
    { collection: FIREBASE_COLLECTION_USERS },
  ]);

  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase,
  ) as any;

  const users = useSelector(
    (state: RootState) => state.firestore.ordered?.users || [],
  );

  const runs = useSelector(
    (state: RootState) => state.firestore.ordered?.runs || [],
  );

  const addRun = (version: string) => {
    addNewRun(firestore, users, version).then(() => {
      // TODO: Add hint
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.find(
          (user: FbUser) =>
            firebaseSelector?.auth?.uid === user.id && user.admin,
        ) && <AddRun onAddRun={addRun} />}
        {runs.map((run: FbRun, index: number) => (
          <RunDashboardCard key={`run-${index}`} run={run} />
        ))}
      </div>
    </div>
  );
};

export default RunsDashboard;
