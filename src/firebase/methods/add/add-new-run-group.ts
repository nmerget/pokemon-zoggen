import { ExtendedFirestoreInstance } from 'react-redux-firebase';
import { FbRunGroup } from '../../types';
import { FIREBASE_COLLECTION_RUN_GROUPS } from '../../../app/constants';

const addNewRunGroup = async (
  firestore: ExtendedFirestoreInstance,
  version: string,
) => {
  const newRun: FbRunGroup = {
    name: 'New Group',
    createdAt: new Date().getTime(),
    version: version || '1',
  };

  const doc = await firestore
    .collection(FIREBASE_COLLECTION_RUN_GROUPS)
    .add(newRun);
  if (doc.id) {
    await firestore
      .collection(FIREBASE_COLLECTION_RUN_GROUPS)
      .doc(doc.id)
      .update({ id: doc.id });
  }
};

export default addNewRunGroup;
