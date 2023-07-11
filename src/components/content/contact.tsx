import React from "react";
import { Link, Typography } from "@mui/material";
import { FlexCol } from "../styled";

export const Contact = () => (
  <FlexCol maxWidth="600px">
    <Typography
      variant="h2"
      textAlign="center"
      sx={{ mb: 2, mt: 3, textTransform: "uppercase" }}
    >
      Contact
    </Typography>
    <Typography variant="body1" mb={2}>
      To request a commission, please fill out the following form:
      <br />
      <Link href="https://forms.gle/1gBC2nXG9UuZ5RuV8">
        https://forms.gle/1gBC2nXG9UuZ5RuV8
      </Link>
    </Typography>
    <Typography variant="body1" mb={4}>
      For questions regarding commissions and other business inquiries, please
      send an email to the following address:
      <br />
      <Link href="mailto:the.yk.soba@gmail.com">the.yk.soba@gmail.com</Link>
    </Typography>
  </FlexCol>
);
