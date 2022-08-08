import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { LoginDialogType } from "./data";
import { useFirebase } from "react-redux-firebase";
import firebase from "firebase/compat/app";
import { StyledFirebaseAuth } from "react-firebaseui";
import React from "react";

const LoginDialog = ({ open, handleClose }: LoginDialogType) => {
  const useFire = useFirebase();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Login"}
      </DialogTitle>
      <DialogContent>
        <StyledFirebaseAuth
          className="my-8"
          uiConfig={uiConfig}
          firebaseAuth={useFire.auth()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
