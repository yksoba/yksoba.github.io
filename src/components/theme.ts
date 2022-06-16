import { createTheme } from "@mui/material/styles";

export const SM = "sm";
export const MD = "md";
export const LG = "lg";

export const theme = createTheme({
  typography: { fontFamily: "Metropolis" },
  breakpoints: {
    values: {
      [SM]: 0,
      [MD]: 480,
      [LG]: 960,
    },
  },
  palette: {
    text: { primary: "#FFF" },
    background: {
      default: "#000",
    },
  },
});
