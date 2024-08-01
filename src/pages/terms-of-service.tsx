import { PageProps } from "gatsby";
import React from "react";
import { Header } from "../components/layout/header";
import { Layout } from "../layouts";
import { Container, Link, Typography, Box } from "@mui/material";
import { useEffectOnce } from "react-use";

const Page = (props: PageProps) => {
  return (
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
          This page has been temporarily moved.{" "}
          <a href="https://docs.google.com/document/d/e/2PACX-1vTimCN2_ovUX2HI7RiQk21wpcz8yfg9qjMAMZh3zrWF0DuZ2xovh3aImOUHte0D9e8zBhh-I9Wj-VUN/pub">
            Click here for the terms of service.
          </a>
        </Container>
      </Box>
  );
};

export default Page;
