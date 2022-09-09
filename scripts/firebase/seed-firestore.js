import * as dotenv from 'dotenv';

dotenv.config();

import * as collections from './collections.js';
import admin from 'firebase-admin';

import { readFileSync } from 'fs';

const seedSubCollectionRecursive = async (
  prevQuery,
  prevDoc,
  subCollection,
) => {
  const jsonKeys = Object.keys(prevDoc);
  if (jsonKeys.includes(subCollection.name)) {
    for (const doc of prevDoc[subCollection.name]) {
      const snapQuery = prevQuery.collection(subCollection.name).doc(doc.id);
      if (subCollection.sub?.length > 0) {
        for (const sub of subCollection.sub) {
          await seedSubCollectionRecursive(snapQuery, doc, sub);
          delete doc[sub.name];
        }
      }
      await snapQuery.set(doc);
    }
  }
};

const seedFirestore = async () => {
  console.log('--- start seedFirestore');
  const dumpFile = process.argv[2];

  const prod = process.argv[3];
  if (!dumpFile) {
    console.error('No dump file provided');
    process.exit(1);
  } else {
    console.log('seeding with file:', dumpFile);
  }

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'pokemon-zoggen';

  if (!prod) {
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
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

  let seedJson = JSON.parse(readFileSync(dumpFile).toString());

  console.log(
    'Using collection',
    collections.default.map((coll) => coll.name).join(' & '),
  );
  for (const collection of collections.default) {
    await seedSubCollectionRecursive(db, seedJson, collection);

    if (!prod && collection.name === 'users') {
      await admin.auth().importUsers(
        seedJson[collection.name].map((user) => ({
          uid: user.id,
          displayName: user.name,
          providerData: [
            {
              uid: user.id,
              displayName: user.name,
              providerId: 'google.com',
            },
          ],
        })),
      );
    }
  }

  console.log('database seeded');
  process.exit(0);
};

seedFirestore();
