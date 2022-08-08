export type AlertDialogType = {
  open: boolean;
  handleClose: (okay: boolean) => void;
  title: string;
  message: string;
};
