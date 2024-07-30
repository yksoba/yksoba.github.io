import React from "react";
import { PropsWithChildren } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { FlexCol } from "../styled";
import { theme } from "./theme";
import { Footer } from "./footer";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
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
        {children}
        <Footer />
      </FlexCol>
    </ThemeProvider>
  );
};
