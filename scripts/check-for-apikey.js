import * as dotenv from "dotenv";
dotenv.config();

const checkForApikey = () => {
  if (!process.env.VITE_FIREBASE_API_KEY) {
    console.error(
      "No VITE_FIREBASE_API_KEY set, maybe you forgot your .env file"
    );
    process.exit(1);
  }
};

checkForApikey();
