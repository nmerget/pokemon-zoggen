import * as dotenv from 'dotenv';

dotenv.config();

import * as collections from './collections.js';
import admin from 'firebase-admin';

import { writeFileSync, readFileSync } from 'fs';

const fillSubCollectionDataRecursive = async (
  db,
  data,
  prevCollection,
  subCollection,
) => {
  for (const document of data) {
    const snap = db.collection(prevCollection.name).doc(document.id);

    const querySnapshot = await snap.collection(subCollection.name).get();
    const subData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (subCollection.sub?.length > 0) {
      for (const sub of subCollection.sub) {
        await fillSubCollectionDataRecursive(snap, subData, subCollection, sub);
      }
    }
    document[subCollection.name] = subData;
  }
};

const dumpFirestore = async () => {
  const prod = process.argv[2];
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  console.log('Generating dump for project', projectId);
  // Initialize firebase instance & firestore
  if (!prod) {
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    admin.initializeApp({ projectId });
  } else {
    const serviceAccount = JSON.parse(
      readFileSync('pokemon-zoggen-firebase-adminsdk.json').toString(),
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  const db = admin.firestore();
  console.log(
    'Using collection',
    collections.default.map((coll) => coll.name).join(' & '),
  );
  const dump = {};
  for (const collection of collections.default) {
    const querySnapshot = await db.collection(collection.name).get();
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (collection.sub?.length > 0) {
      for (const sub of collection.sub) {
        await fillSubCollectionDataRecursive(db, data, collection, sub);
      }
    }
    dump[collection.name] = data;
  }
  writeFileSync(
    `./dumps/dump-${new Date().getTime()}.json`,
    JSON.stringify(dump),
  );
  console.log('Generated dump:', dump.length);
  process.exit(0);
};

dumpFirestore();
