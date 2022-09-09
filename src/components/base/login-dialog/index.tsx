import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useFirebase } from 'react-redux-firebase';
import React, { useState } from 'react';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { GoogleAuthProvider } from 'firebase/auth';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import { LoginDialogType } from './data';
import './index.css';

function LoginDialog({ open, handleClose }: LoginDialogType) {
  const useFire = useFirebase();

  const [emailFlowShow, setEmailFlowShow] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();

  const [password, setPassword] = useState<string>();

  const signInWithGoogle = async () => {
    try {
      // 1. Create credentials on the native layer
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result?.credential) {
        // 2. Sign in on the web layer using the id token
        const credential = GoogleAuthProvider.credential(
          result.credential?.idToken,
        );
        const auth = useFire.auth();
        await auth.signInWithCredential(credential);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Login</DialogTitle>
      <DialogContent>
        <div className="flex flex-col p-2 gap-2">
          {emailFlowShow ? (
            <>
              <TextField
                label="E-Mail"
                type="email"
                required
                variant="outlined"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                label="Passwort"
                type="password"
                required
                variant="outlined"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Button
                variant="contained"
                disabled={
                  !email ||
                  !password ||
                  (email?.length < 1 && password?.length < 6)
                }
                onClick={() => {
                  useFire
                    .auth()
                    .signInWithEmailAndPassword(email || '', password || '');
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                className="google-login h-12 w-48 mx-auto"
                onClick={() => signInWithGoogle()}
              />
              <Button
                variant="outlined"
                startIcon={<MailIcon />}
                onClick={() => {
                  setEmailFlowShow(true);
                }}
              >
                Sign in with Email
              </Button>
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
