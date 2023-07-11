import { createTheme } from "@mui/material/styles";

export const SM = "sm";
export const MD = "md";
export const LG = "lg";

export const theme = createTheme({
  typography: { fontFamily: "Metropolis, sans-serif" },
  breakpoints: {
    values: {
      [SM]: 0,
      [MD]: 600,
      [LG]: 900,
    },
  },
  palette: {
    text: { primary: "#FFF" },
    primary: {
      main: "#FAF",
    },
    background: {
      default: "#000",
    },
  },
});
