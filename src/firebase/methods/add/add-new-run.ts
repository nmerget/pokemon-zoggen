import { ExtendedFirestoreInstance } from 'react-redux-firebase';
import { FbRun, FbUser } from '../../types';
import { FIREBASE_COLLECTION_RUNS } from '../../../app/constants';

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
        name: user.name || '',
        wins: [],
      })) || [],
  };
  const doc = await firestore.collection(FIREBASE_COLLECTION_RUNS).add(newRun);
  if (doc.id) {
    await firestore
      .collection(FIREBASE_COLLECTION_RUNS)
      .doc(doc.id)
      .update({ id: doc.id });
  }
};

export default addNewRun;
