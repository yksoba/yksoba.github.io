import React from "react";
import { PropsWithChildren } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { Flex } from "./flex";
import { Navbar } from "./navbar";
import { TransitionState } from "gatsby-plugin-transition-link";

const theme = createTheme({
  typography: { fontFamily: "Metropolis" },
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 640,
    },
  },
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
    <Flex
      height="100vh"
      minWidth="100vw"
      bgcolor="black"
      color="white"
      sx={{ overflowX: "auto", flexDirection: ["column", "row"] }}
    >
      <Navbar />
      <TransitionState>
        {({ transitionStatus }) => (
          <Flex
            height="100%"
            flexGrow={1}
            sx={{
              opacity: transitionStatus.startsWith("enter") ? "100%" : "0",
              transition: "opacity 0.2s",
              flexDirection: ["column", "row"],
            }}
          >
            {children}
          </Flex>
        )}
      </TransitionState>
    </Flex>
  </ThemeProvider>
);
