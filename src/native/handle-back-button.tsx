import { App, BackButtonListenerEvent } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectMenuOpen, closeMenu } from '../features/local/localSlice';
import AlertDialog from '../components/base/alert-dialog';

const HandleBackButtonDialog = () => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);
  const [eventTriggered, setEventTriggered] =
    useState<BackButtonListenerEvent>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const menuOpen = useSelector(selectMenuOpen);

  useEffect(() => {
    if (eventTriggered) {
      if (menuOpen) {
        dispatch(closeMenu());
      } else if (closeDialog) {
        setCloseDialog(false);
      } else if (
        !eventTriggered.canGoBack ||
        location.pathname === '/' ||
        location.pathname === '/home' ||
        location.pathname === '/login'
      ) {
        setCloseDialog(true);
      } else {
        navigate(-1);
      }

      setEventTriggered(undefined);
    }
  }, [eventTriggered]);

  App.addListener('backButton', (backButtonEvent) => {
    if (!eventTriggered) {
      setEventTriggered(backButtonEvent);
    }
  });

  return (
    <AlertDialog
      open={closeDialog}
      handleClose={(okay: boolean) => {
        if (okay) {
          App.exitApp();
        }
        setCloseDialog(false);
      }}
      title="App schließen?"
      message="Willst du die App wirklich schließen?"
    />
  );
};

export default HandleBackButtonDialog;
