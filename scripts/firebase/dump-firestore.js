import * as dotenv from 'dotenv';
dotenv.config();

import * as collections from './collections.js';
import admin from 'firebase-admin';

import { writeFileSync, readFileSync } from 'fs';

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

  console.log('Using collection', collections.default.join(' & '));
  const dump = {};
  for (const collection of collections.default) {
    const querySnapshot = await db.collection(collection).get();
    dump[collection] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  writeFileSync(
    `./dumps/dump-${new Date().getTime()}.json`,
    JSON.stringify(dump),
  );
  console.log('Generated dump:', dump);
  process.exit(0);
};

dumpFirestore();
