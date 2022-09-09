import * as dotenv from 'dotenv';

dotenv.config();

import admin from 'firebase-admin';

import { readFileSync } from 'fs';

/* Temporary modifier for firestore */
const modifyFirestore = async () => {
  console.log('--- start modify firestore');
  const prod = process.argv[2];
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  console.log('Modify DB for project', projectId);
  // Initialize firebase instance & firestore
  if (!prod) {
    const dbHost = process.argv[3];
    process.env.FIRESTORE_EMULATOR_HOST = `${dbHost || 'localhost'}:8080`;
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
  const runGroupsSnap = await db.collection('run-groups').get();
  const users = await db.collection('users').get();

  for (const user of users.docs) {
    for (const group of runGroupsSnap.docs) {
      const runGroupQuery = db
        .collection('users')
        .doc(user.id)
        .collection('run-groups')
        .doc(group.data().id);
      await runGroupQuery.set({ id: group.data().id });
      for (const run of runsSnap.docs) {
        await runGroupQuery
          .collection('runs')
          .doc(run.data().id)
          .set({
            id: run.data().id,
            pokemon:
              run?.data()?.players?.find((player) => player.id === user.id)
                ?.pokemon || [],
          });
      }
    }
  }

  for (const run of runsSnap.docs) {
    await db
      .collection('runs')
      .doc(run.id)
      .update({
        ...run.data(),
        players: run.data().players.map((player) => ({
          ...player,
          name: '',
          pokemon: [],
        })),
      });
  }

  console.log('database modified');
  process.exit(0);
};

modifyFirestore();
