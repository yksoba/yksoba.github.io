import React from "react";
import { PropsWithChildren } from "react";
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

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="100vw" sx={{ overflowX: "auto" }}>
        <FlexCol
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
          {children}
          <Footer />
        </FlexCol>
      </Box>
    </ThemeProvider>
  );
};
