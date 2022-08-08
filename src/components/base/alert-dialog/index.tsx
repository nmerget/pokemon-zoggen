import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AlertDialogType } from "./data";
import DialogContentText from "@mui/material/DialogContentText";

const AlertDialog = ({
  title,
  message,
  open,
  handleClose,
}: AlertDialogType) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Abbrechen
        </Button>
        <Button
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
};

export default AlertDialog;
