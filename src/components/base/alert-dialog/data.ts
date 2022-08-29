import { ReactElement } from 'react';

export type AlertDialogType = {
  open: boolean;
  handleClose: (okay: boolean) => void;
  title: string;
  message?: string;
  content?: ReactElement;
};
