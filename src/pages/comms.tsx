import React from "react";
import { Layout } from "../components/common/layout";
import { PageProps } from "gatsby";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import {
  BSKY,
  COMMISSIONS_FORM_URL,
  EMAIL,
  FURAFFINITY,
  INSTAGRAM,
  TELEGRAM,
  TWITTER,
} from "../constants";
import { Email, Instagram, Send, Twitter } from "@mui/icons-material";
import Icon from "@mdi/react";
import { mdiPaw, mdiSquareRounded } from "@mdi/js";

const Page = (props: PageProps) => {
  return (
    <Layout pageProps={props}>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Typography variant="h1">Commissions</Typography>
          <Typography variant="h2">Process</Typography>
        </Box>
      </Container>
    </Layout>
  );
};
export default Page;
