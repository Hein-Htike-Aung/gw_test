import { Button } from "@mui/material";
import React from "react";

const StyledButton: React.FC<{
  onClick: (e: any) => void;
  type?: "contained" | "text" | "outlined";
  children: React.ReactNode;
  disabled?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  width?: number;
}> = ({
  onClick,
  color = "primary",
  disabled = false,
  type = "contained",
  children,
  width,
}) => {
  return (
    <Button
      variant={type}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={{
        display: "flex",
        gap: "5px",
        aligntItem: "center",
        justifyContent: "center",
        height: "40px",
        width: `${width}rem`,
      }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
