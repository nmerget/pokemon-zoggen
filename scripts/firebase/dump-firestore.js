import * as dotenv from "dotenv";
dotenv.config();

import * as collections from "./collections.js";
import admin from "firebase-admin";

import { writeFileSync } from "fs";

const dumpFirestore = async () => {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  console.log("Generating dump for project", projectId);
  // Initialize firebase instance & firestore
  admin.initializeApp({ projectId });
  const db = admin.firestore();

  console.log("Using collection", collections.default.join(" & "));
  const dump = {};
  for (const collection of collections.default) {
    const querySnapshot = await db.collection(collection).get();
    dump[collection] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  writeFileSync(`./dumps/dump-${new Date().getTime()}`, JSON.stringify(dump));
  console.log("Generated dump:", dump);
  process.exit(0);
};

dumpFirestore();
