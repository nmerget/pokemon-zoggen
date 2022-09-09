import { ExtendedFirestoreInstance } from 'react-redux-firebase';
import { FbRun, FbUser } from '../../types';
import {
  FIREBASE_COLLECTION_RUN_GROUPS,
  FIREBASE_COLLECTION_RUNS,
  FIREBASE_COLLECTION_USERS,
} from '../../../app/constants';

const addNewRun = async (
  firestore: ExtendedFirestoreInstance,
  users: FbUser[],
  groupId: string,
  version?: string,
) => {
  const newRun: FbRun = {
    name: 'New Run',
    lvlCap: 0,
    pokAmount: 0,
    createdAt: new Date().getTime(),
    version: version || '1',
    groupId,
    players:
      users?.map((user: FbUser) => ({
        id: user.id || '',
        wins: [],
      })) || [],
  };
  const doc = await firestore.collection(FIREBASE_COLLECTION_RUNS).add(newRun);
  if (doc.id) {
    await firestore
      .collection(FIREBASE_COLLECTION_RUNS)
      .doc(doc.id)
      .update({ id: doc.id });
    // TODO: move this to fb functions
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      const runGroupQuery = firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user.id)
        .collection(FIREBASE_COLLECTION_RUN_GROUPS)
        .doc(groupId);
      // eslint-disable-next-line no-await-in-loop
      await runGroupQuery.set({ id: groupId });
      // eslint-disable-next-line no-await-in-loop
      await runGroupQuery.collection(FIREBASE_COLLECTION_RUNS).doc(doc.id).set({
        id: doc.id,
        pokemon: [],
      });
    }
  }
};

export default addNewRun;
