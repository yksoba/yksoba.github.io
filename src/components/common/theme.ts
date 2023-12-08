import { createTheme } from "@mui/material/styles";

export const XS = "xs";
export const SM = "sm";
export const MD = "md";
export const LG = "lg";
export const XL = "xl";

export const theme = createTheme({
  typography: { fontFamily: "Metropolis, sans-serif" },
  breakpoints: {
    values: {
      [SM]: 600,
      [MD]: 900,
      [LG]: 1200,
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
