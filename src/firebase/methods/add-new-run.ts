import { FbRun, FbUser } from "../../services/types";
import { ExtendedFirestoreInstance } from "react-redux-firebase";
import { DocumentReference } from "@firebase/firestore-types";
import { FIREBASE_COLLECTION_RUNS } from "../../app/constants";

const addNewRun = (
  firestore: ExtendedFirestoreInstance,
  users: FbUser[]
): Promise<DocumentReference<FbRun>> => {
  const newRun: FbRun = {
    name: "New Run",
    lvlCap: 0,
    pokAmount: 0,
    createdAt: new Date().getTime(),
    players:
      users?.map((user: FbUser) => ({
        id: user.id || "",
        name: user.name || "",
        wins: [],
      })) || [],
  };
  return firestore.collection(FIREBASE_COLLECTION_RUNS).add(newRun);
};

export default addNewRun;
