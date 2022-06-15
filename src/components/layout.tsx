import React from "react";
import { PropsWithChildren } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { Flex } from "./flex";
import { Navbar } from "./navbar";

const theme = createTheme({
  typography: { fontFamily: "Metropolis" },
});

/**
 * Shared component across all pages.
 *
 * Details:
 * - Loads Metropolis font family
 * - Applies custom theme
 */
export const Layout = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Flex height="100vh" width="100vw" bgcolor="black" color="white">
      <Navbar />
      <Flex height="100%" flexGrow={1}>
        {children}
      </Flex>
    </Flex>
  </ThemeProvider>
);
