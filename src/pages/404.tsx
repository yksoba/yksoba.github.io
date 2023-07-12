import { Container, Typography } from "@mui/material";
import React from "react";
import { Layout } from "../components/common/layout";
import { PageProps } from "gatsby";
import { Header } from "../components/common/header";
import { FullDivider } from "../components/common/misc";

const Page = (props: PageProps) => (
  <Layout pageProps={props}>
    <Header />
    <FullDivider />
    <Container fixed sx={{ pt: 4 }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">
        Sorry, but it looks like we can't find the page you're looking for.
      </Typography>
    </Container>
  </Layout>
);

export default Page;
