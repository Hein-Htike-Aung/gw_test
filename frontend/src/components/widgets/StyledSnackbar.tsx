import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

const StyledSnackbar: React.FC<{
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertColor;
}> = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StyledSnackbar;
