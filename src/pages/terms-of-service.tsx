import { PageProps } from "gatsby";
import React from "react";
import { Header } from "../components/common/header";
import { Layout } from "../components/common/layout";
import { FullDivider } from "../components/common/misc";
import { Container, Link, Typography, Box } from "@mui/material";
import { useEffectOnce } from "react-use";

const Page = (props: PageProps) => {
  useEffectOnce(() => {
    if (typeof window !== "undefined") {
      window.location.href =
        "https://docs.google.com/document/d/e/2PACX-1vTimCN2_ovUX2HI7RiQk21wpcz8yfg9qjMAMZh3zrWF0DuZ2xovh3aImOUHte0D9e8zBhh-I9Wj-VUN/pub";
    }
  });
  return (
    <Layout pageProps={props}>
      <Header />
      <FullDivider />
      <Box bgcolor="rgba(0,0,0,0.5)">
        <Container
          sx={{
            py: 4,
            a: {
              color: "#AFF",
            },
            h3: {
              mt: 3,
            },
          }}
          fixed
        >
          This page has been temporarily moved. If you are not redirected
          automatically, click
          <a href="https://docs.google.com/document/d/e/2PACX-1vTimCN2_ovUX2HI7RiQk21wpcz8yfg9qjMAMZh3zrWF0DuZ2xovh3aImOUHte0D9e8zBhh-I9Wj-VUN/pub">
            here
          </a>
          .
        </Container>
      </Box>
    </Layout>
  );
};

export default Page;
