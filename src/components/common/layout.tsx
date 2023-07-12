import React from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
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
      <GlobalStyles
        styles={{
          "html, body": {
            backgroundImage:
              "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
            backgroundAttachment: "fixed",
            scrollBehavior: "smooth",
          },
        }}
      />
      <LayoutContext.Provider value={{ pageProps, currentSection }}>
        <FlexCol minHeight="100vh">
          {children}
          <Footer />
        </FlexCol>
      </LayoutContext.Provider>
    </ThemeProvider>
  );
};
