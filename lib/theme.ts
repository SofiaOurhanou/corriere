import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff2e93",
    },
    secondary: {
      main: "#ff66b3",
    },
    background: {
      default: "#0d0d0d",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Arial Black, Helvetica, sans-serif",
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "3px solid #ff2e93",
          fontWeight: "900",
          textTransform: "uppercase",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "2px solid white",
          boxShadow: "none",
        },
      },
    },
  },
});