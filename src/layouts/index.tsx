import React from "react";
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
import { Footer } from "../components/common/footer";
import { PageProps } from "gatsby";
import { Header } from "../components/common/header";

export const Layout = ({
  children,
  location,
}: PropsWithChildren<{}> & PageProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
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
      
      <FlexCol minHeight="100vh">
        <Header />
        {children}
        <Footer />
      </FlexCol>
    </ThemeProvider>
  );
};

export default Layout;
