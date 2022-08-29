import * as dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';

import { readFileSync } from 'fs';

/* Temporary modifier for firestore */
const modifyFirestore = async () => {
  console.log('--- start modify firestore');
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

  const runsSnap = await db.collection('runs').get();

  const group = await db.collection('run-groups').add({
    runIds: runsSnap.docs.map((doc) => doc.id),
    version: '1',
    name: 'RB 2022',
    createdAt: new Date().getTime(),
  });

  for (const run of runsSnap.docs) {
    await db.collection('runs').doc(run.id).update({ groupId: group.id });
  }

  await db.collection('current').add({ currentGroupId: group.id });

  console.log('database modified');
  process.exit(0);
};

modifyFirestore();
