import { ExtendedFirestoreInstance } from 'react-redux-firebase';

// eslint-disable-next-line import/prefer-default-export
export const updateDoc = (
  firestore: ExtendedFirestoreInstance,
  collection: string,
  doc: any,
): Promise<void> => firestore.collection(collection).doc(doc.id).update(doc);
