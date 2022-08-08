import { ExtendedFirestoreInstance } from "react-redux-firebase";

export const updateDoc = (
  firestore: ExtendedFirestoreInstance,
  collection: string,
  doc: any
): Promise<void> => {
  return firestore.collection(collection).doc(doc.id).update(doc);
};
