import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "../components/layout";
import { FlexCol } from "../components/flex";

const Contact = () => {
  return (
    <Layout>
      <title>yksoba - Contact</title>
      <FlexCol justifyContent="center">
        <Typography variant="body1" ml={1}>
          Nothing here yet... check back soon!
        </Typography>
      </FlexCol>
    </Layout>
  );
};

export default Contact;
