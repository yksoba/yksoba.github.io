import React from "react";
import { Typography } from "@mui/material";
import { FlexCol, Flex } from "../components/flex";
import { Box } from "@mui/system";
import { PageLayout } from "../components/page-layout";

const Contact = () => {
  return (
    <PageLayout>
      <title>yksoba - Contact</title>
      <Typography component="h1" variant="h3">
        Contact
      </Typography>
      <Typography variant="body1" ml={1}>
        If you have any questions, please feel free to contact me via one of the
        methods below:
      </Typography>
      <FlexCol my={1}>
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
      To maximize the chances that I see and reply to your message/email, be
      direct and be sure to indicate that you have an inquiry about my
      commissions/art.
    </PageLayout>
  );
};

export default Contact;
