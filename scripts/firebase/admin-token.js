import * as dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';

const dumpFirestore = async () => {
  const uid = process.argv[2];
  if (!uid) {
    console.error('uid missing');
    process.exit(1);
  }
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  admin.initializeApp({ projectId });
  return await admin.auth().createCustomToken(uid);
};

dumpFirestore();
