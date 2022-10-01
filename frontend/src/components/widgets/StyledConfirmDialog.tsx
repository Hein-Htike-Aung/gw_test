import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
  } from "@mui/material";
  import React from "react";
  
  const StyledConfirmDialog: React.FC<{
    open: boolean;
    onClose: () => void;
    message: string;
    children: React.ReactNode;
  }> = ({ open, onClose, message, children }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { position: "fixed", top: 10 } }}
      >
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          {children}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default StyledConfirmDialog;
  