import { createTheme } from "@mui/material/styles";
import { CSSProperties } from "react";

export const XS = "xs";
export const SM = "sm";
export const MD = "md";
export const LG = "lg";
export const XL = "xl";

export const theme = createTheme({
  typography: {
    fontFamily: "Metropolis, sans-serif",
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

Object.assign(theme.typography.h1, {
  textTransform: "uppercase",
  fontSize: "3rem",
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { fontSize: "4.5rem" },
} as CSSProperties);

Object.assign(theme.typography.h2, {
  fontSize: "2rem",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("sm")]: { fontSize: "3rem" },
} as CSSProperties);

Object.assign(theme.typography.h3, {
  fontSize: "1.3rem",
  marginTop: theme.spacing(1),
  [theme.breakpoints.up("sm")]: { fontSize: "1.6rem" },
} as CSSProperties);

Object.assign(theme.typography.subtitle1, {
  fontStyle: "italic",
  textAlign: "center",
  marginTop: theme.spacing(1),
} as CSSProperties);

Object.assign(theme.typography.body1, {
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: { fontSize: "1rem" },
} as CSSProperties);
