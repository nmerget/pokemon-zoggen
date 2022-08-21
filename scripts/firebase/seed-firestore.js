import * as dotenv from "dotenv";
dotenv.config();

import * as collections from "./collections.js";
import admin from "firebase-admin";

import { readFileSync } from "fs";

const seedFirestore = async (seed) => {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  console.log("Generating dump for project", projectId);
  // Initialize firebase instance & firestore
  admin.initializeApp({ projectId });
  const db = admin.firestore();

  let seedJson = seed.includes("dump-")
    ? JSON.parse(readFileSync(seed).toString())
    : JSON.parse(seed);

  console.log("Using collection", collections.default.join(" & "));
  for (const collection of collections.default) {
    for (const doc of seedJson[collection]) {
      await db.collection(collection).doc(doc.id).set(doc);
    }
  }
  console.log("database seeded");
  process.exit(0);
};

export default seedFirestore;
