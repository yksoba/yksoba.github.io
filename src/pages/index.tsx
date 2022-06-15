import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "../components/layout";
import { FlexCol } from "../components/flex";

const HomePage = () => {
  return (
    <Layout>
      <title>yksoba</title>
      <FlexCol justifyContent="center">
        <Typography variant="body1" ml={1}>
          Nothing here yet... check back soon!
        </Typography>
      </FlexCol>
    </Layout>
  );
};

export default HomePage;
