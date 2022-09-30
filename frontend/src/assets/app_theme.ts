import { createTheme } from "@mui/material";

const Colors = {
  primary: "#008080",
  layout: "#1c292f",
  secondary: "#1d5e7c",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default theme;
