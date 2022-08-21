import { Box } from "@mui/material";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getGlobalStatsString } from "../../app/utils";
import React from "react";
import {FIREBASE_COLLECTION_RUNS} from "../../app/constants";

const Footer = () => {
  useFirestoreConnect([{ collection: FIREBASE_COLLECTION_RUNS, orderBy: ["createdAt", "asc"] }]);

  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;
  const firestoreSelector = useSelector(
    (state: RootState) => state.firestore
  ) as any;

  return (
    <Box
      sx={{ backgroundColor: "primary.main" }}
      className="flex-grow-0 flex-shrink-0 w-full h-16"
    >
      {firebaseSelector?.profile?.isEmpty === false && (
        <div className="max-w-screen-xl h-full flex mx-auto">
          <p className="text-sm font-medium text-white text-center m-auto">
            {getGlobalStatsString(firestoreSelector?.ordered?.runs)}
          </p>
        </div>
      )}
    </Box>
  );
};

export default Footer;
