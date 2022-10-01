import { TextField } from "@mui/material";
import React from "react";

const StyledTextField: React.FC<{
  name: string;
  type: string;
  label: string;
  variant: "standard" | "filled" | "outlined";
  errorMessage: string;
  hasError: boolean;
  onChange: (e: any) => void;
  validation: (e: any) => void;
  value: string;
  sx?: any;
  disabled?: boolean;
  row?: number;
}> = ({
  name,
  type,
  label,
  variant = "standard",
  errorMessage,
  hasError,
  onChange,
  validation,
  value,
  sx,
  disabled = false,
  row = 1,
}) => {
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      disabled={disabled}
      variant={variant}
      helperText={hasError ? errorMessage : "\xa0"}
      fullWidth
      error={hasError}
      multiline
      minRows={row}
      maxRows={row}
      onBlur={validation}
      onChange={onChange}
      size="small"
      value={value}
      sx={sx}
    />
  );
};

export default StyledTextField;
