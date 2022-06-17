import React from "react";
import { PropsWithChildren } from "react";
import { CssBaseline, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { Flex, FlexCol } from "./flex";
import { Navbar } from "./navbar";
import { TransitionState } from "gatsby-plugin-transition-link";
import { theme, SM, MD, LG } from "./theme";
import { Footer } from "./footer";

export const Layout = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* <Debug /> */}
    <FlexCol height="100vh">
      <Flex
        sx={{
          flexGrow: 1,
          [theme.breakpoints.up(SM)]: {
            flexDirection: "column",
          },
          [theme.breakpoints.up(LG)]: {
            flexDirection: "row",
            overflowX: "auto",
          },
        }}
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
                flexDirection: {
                  [SM]: "column",
                  [LG]: "row",
                },
                overflowY: { [LG]: "auto" },
              }}
            >
              {children}
            </Flex>
          )}
        </TransitionState>
      </Flex>
      <Footer />
    </FlexCol>
  </ThemeProvider>
);

const Debug = () => {
  const isSm = useMediaQuery(theme.breakpoints.only(SM));
  const isMd = useMediaQuery(theme.breakpoints.only(MD));
  const isLg = useMediaQuery(theme.breakpoints.only(LG));

  return (
    <Flex
      position="fixed"
      left={4}
      top={4}
      zIndex={100}
      bgcolor="rgba(0,0,0,0.5)"
      sx={{ opacity: 0.5 }}
    >
      <TransitionState>
        {({ transitionStatus }) => (
          <Typography component="span" variant="h5">
            Breakpoint: {isLg ? LG : isMd ? MD : isSm ? SM : "n/a"}
            <br />
            Transition: {transitionStatus}
          </Typography>
        )}
      </TransitionState>
    </Flex>
  );
};
