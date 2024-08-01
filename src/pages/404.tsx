import { Container, Typography } from "@mui/material";
import React from "react";
import { Layout } from "../layouts";
import { PageProps } from "gatsby";
import { Header } from "../components/layout/header";

const Page = (props: PageProps) => (
  <>
    <Container fixed sx={{ pt: 4 }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">
        Sorry, but it looks like we can't find the page you're looking for.
      </Typography>
    </Container>
  </>
);

export default Page;
