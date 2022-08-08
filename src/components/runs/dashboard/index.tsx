import React, { useEffect } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import RunDashboardCard from "./card";
import { FbRun, FbUser } from "../../../services/types";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const RunsDashboard = () => {
  const firestore = useFirestore();
  useFirestoreConnect([
    { collection: "runs", orderBy: ["createdAt", "asc"] },
    { collection: "users" },
  ]);

  const firebaseSelector = useSelector(
    (state: RootState) => state.firebase
  ) as any;

  const users = useSelector(
    (state: RootState) => state.firestore.ordered?.users || []
  );

  const runs = useSelector(
    (state: RootState) => state.firestore.ordered?.runs || []
  );

  const addNewRun = () => {
    const newRun: FbRun = {
      name: "New Run",
      lvlCap: 0,
      pokAmount: 0,
      createdAt: new Date().getTime(),
      players:
        users?.map((user: FbUser) => ({
          id: user.id,
          name: user.name,
          wins: [],
        })) || [],
    };
    firestore
      .collection("runs")
      .add(newRun)
      .then(() => {
        // TODO: Show Hint
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.find(
          (user: FbUser) =>
            firebaseSelector?.auth?.uid === user.id && user.admin
        ) && (
          <Fab
            size="small"
            sx={{ position: "fixed" }}
            onClick={() => {
              addNewRun();
            }}
            color="secondary"
            aria-label="add"
            className="bottom-3 right-3"
          >
            <AddIcon />
          </Fab>
        )}
        {runs.map((run: FbRun, index: number) => (
          <RunDashboardCard key={`run-${index}`} run={run} />
        ))}
      </div>
    </div>
  );
};

export default RunsDashboard;
