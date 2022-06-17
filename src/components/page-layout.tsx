import React, { PropsWithChildren } from "react";
import { Layout } from "./layout";
import { FlexCol } from "./flex";

export const PageLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Layout>
      <main>
        <FlexCol
          mt="2in"
          mb="1in"
          mx={2}
          maxWidth="7in"
          sx={{ "& p": { my: 1 } }}
        >
          {children}
        </FlexCol>
      </main>
    </Layout>
  );
};

