import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "../components/layout";
import { FlexCol, Flex } from "../components/flex";
import { Box } from "@mui/system";

const Contact = () => {
  return (
    <Layout>
      <title>yksoba - Contact</title>
      <FlexCol justifyContent="center" mx={2}>
        <Typography component="h1" variant="h3">
          Contact
        </Typography>
        <Typography variant="body1" ml={1} mb={1}>
          If you have any questions, please feel free to contact me via one of
          the methods below:
        </Typography>

        <FlexCol>
          <Flex>
            <Box width={100} textAlign="right" mr={1.5}>
              Email
            </Box>
            <Box>the.yk.soba@gmail.com</Box>
          </Flex>
          <Flex>
            <Box width={100} textAlign="right" mr={1.5}>
              Twitter DM
            </Box>
            <Box>@yk_soba</Box>
          </Flex>
        </FlexCol>
      </FlexCol>
    </Layout>
  );
};

export default Contact;
