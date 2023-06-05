import { createTheme } from "@mui/material/styles";

export const SM = "sm";
export const MD = 'md'
export const LG = "lg";

export const theme = createTheme({
  typography: { fontFamily: "Metropolis" },
  breakpoints: {
    values: {
      [SM]: 0,
      [MD]: 900,
      [LG]: 1200
    },
  },
  palette: {
    text: { primary: "#FFF" },
    primary: {
      main: "#DDD",
    },
    background: {
      default: "#000",
    },
  },
});
