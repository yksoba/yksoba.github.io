import React, { useEffect, useRef } from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { FlexCol } from "../components/styled";
import { theme } from "../theme";
import { Footer } from "../components/layout/footer";
import { PageProps } from "gatsby";
import { Header } from "../components/layout/header";
import { Transition, TransitionGroup } from "react-transition-group";
import { Debug } from "../components/layout/debug";
export const LayoutContext = createContext<{ path: string } | null>(null);

export const Layout = ({
  children,
  location,
}: PropsWithChildren<{}> & PageProps) => {
  const transitionTimeout = 200;
  const childRef = useRef<HTMLElement>(null);
  const path = location.pathname;

  return (
    <LayoutContext.Provider value={{ path }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <GlobalStyles
          styles={{
            "html, body": {
              scrollBehavior: "smooth",
            },
          }}
        />

        {/* <Debug /> */}

        <FlexCol minHeight="100vh">
          <Header />
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
              backgroundAttachment: "fixed",
              flexGrow: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            <TransitionGroup>
              <Transition
                nodeRef={childRef}
                key={path}
                timeout={transitionTimeout}
              >
                {(status) => (
                  <Box
                    ref={childRef}
                    className={status}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "&.entering": {
                        position: "absolute",
                        opacity: 0,
                      },
                      "&.entered": {
                        transition: `opacity ${transitionTimeout}ms`,
                        opacity: 1,
                      },
                      "&.exiting": {
                        transition: `opacity ${transitionTimeout}ms`,
                        opacity: 0,
                      },
                    }}
                  >
                    {children}
                  </Box>
                )}
              </Transition>
            </TransitionGroup>
          </Box>
          <Footer />
        </FlexCol>
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};

export default Layout;

export const Head = () => (
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
  </>
);
