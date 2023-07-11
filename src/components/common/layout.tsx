import React from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { FlexCol } from "../styled";
import { theme } from "./theme";
import { Footer } from "./footer";
import { PageProps } from "gatsby";

const LayoutContext = createContext<{
  pageProps: PageProps;
  currentSection?: string;
}>(undefined as any);
export const useLayoutContext = () => useContext(LayoutContext);

export const Layout = ({
  children,
  pageProps,
  currentSection,
}: PropsWithChildren<{ pageProps: PageProps; currentSection?: string }>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="100vw" sx={{ overflowX: "auto" }}>
        <FlexCol
          id="scroll-container"
          height="100vh"
          minWidth="450px"
          sx={{
            bgcolor: "#FF3CAC",
            backgroundImage:
              "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
            backgroundAttachment: "fixed",

            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <LayoutContext.Provider value={{ pageProps, currentSection }}>
            {children}
            <Footer />
          </LayoutContext.Provider>
        </FlexCol>
      </Box>
    </ThemeProvider>
  );
};
