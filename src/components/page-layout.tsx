import React, { PropsWithChildren } from "react";
import { Layout } from "./layout";
import { FlexCol } from "./flex";
import { LG, theme } from "./theme";

export const PageLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Layout>
      <main>
        <FlexCol
          mx={2}
          sx={{
            "& p": { my: 1 },
            [theme.breakpoints.up(LG)]: {
              mt: "2in",
              mb: "1in",
              maxWidth: "7in",
            },
          }}
        >
          {children}
        </FlexCol>
      </main>
    </Layout>
  );
};
