import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const StyledDialog: React.FC<{
  dialogTitle: string;
  dialogContentText?: string;
  actionButtonText: string;
  open: boolean;
  close: (e: any) => void;
  submit: (e: any) => void;
  children: React.ReactNode;
}> = ({
  dialogTitle,
  dialogContentText,
  actionButtonText,
  open,
  close,
  children,
  submit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{ sx: { position: "fixed", top: 10, width: "500px" } }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={submit} variant="contained">
          {actionButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StyledDialog;
