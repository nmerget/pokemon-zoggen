import * as dotenv from 'dotenv';

dotenv.config();

import * as collections from './collections.js';
import admin from 'firebase-admin';

import { readFileSync } from 'fs';

const seedFirestore = async () => {
  console.log('--- start seedFirestore');
  const dumpFile = process.argv[2];
  if (!dumpFile) {
    console.error('No dump file provided');
    process.exit(1);
  } else {
    console.log('seeding with file:', dumpFile);
  }

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'pokemon-zoggen';

  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  console.log('Generating dump for project', projectId);
  // Initialize firebase instance & firestore
  admin.initializeApp({ projectId });
  const db = admin.firestore();

  let seedJson = JSON.parse(readFileSync(dumpFile).toString());

  console.log('Using collection', collections.default.join(' & '));
  const seedJsonKeys = Object.keys(seedJson);
  for (const collection of collections.default) {
    if (seedJsonKeys.includes(collection)) {
      for (const doc of seedJson[collection]) {
        await db.collection(collection).doc(doc.id).set(doc);
      }

      if (collection === 'users') {
        await admin.auth().importUsers(
          seedJson[collection].map((user) => ({
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
  }

  console.log('database seeded');
  process.exit(0);
};

seedFirestore();
