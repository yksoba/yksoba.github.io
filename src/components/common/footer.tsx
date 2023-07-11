import React from "react";
import { Typography } from "@mui/material";
import { FlexCol } from "../styled";
import { FullDivider } from "./misc";

export const Footer = () => (
  <FlexCol
    sx={{
      alignItems: "center",
      justifyContent: "end",
      flexGrow: 1,
    }}
  >
    <FullDivider />
    <Typography variant="body2" sx={{ opacity: 0.7, cursor: "default" }}>
      © 2023 YKSOBA
    </Typography>
  </FlexCol>
);
