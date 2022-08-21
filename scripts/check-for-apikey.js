import * as dotenv from "dotenv";
dotenv.config();

const checkForApikey = () => {
  console.info(
    "Checking apikey for project:",
    process.env.VITE_FIREBASE_PROJECT_ID
  );
  if (!process.env.VITE_FIREBASE_API_KEY) {
    console.error(
      "No VITE_FIREBASE_API_KEY set, maybe you forgot your .env file"
    );
    process.exit(1);
  }
};

checkForApikey();
