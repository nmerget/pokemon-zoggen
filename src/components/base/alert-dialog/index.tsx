import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { AlertDialogType } from './data';

function AlertDialog({
  title,
  message,
  open,
  handleClose,
  content,
}: AlertDialogType) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {message && (
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        )}
        {!message && content}
      </DialogContent>
      <DialogActions>
        <Button
          id="dialog-cancel"
          variant="outlined"
          onClick={() => handleClose(false)}
        >
          Abbrechen
        </Button>
        <Button
          id="dialog-continue"
          variant="contained"
          color="error"
          onClick={() => handleClose(true)}
          autoFocus
        >
          Weiter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
