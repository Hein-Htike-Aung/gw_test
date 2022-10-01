import { createTheme } from "@mui/material";

const Colors = {
  primary: "#008080",
  layout: "#1c292f",
  secondary: "#1d5e7c",
  success: "#75b575",
  lightblue: "#096fa2",
  info: "#00a2ff",
  warn: "#fc0000ba",
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default theme;
