import React from "react";
import {Typography} from "@mui/material";
import {FlexCol} from "../styled";

export const Footer = () => (
  <FlexCol
    sx={{
      alignItems: "center",
      justifyContent: "end",
    }}
  >
    <Typography variant="body2" sx={{opacity: 0.7, cursor: "default"}}>
      © 2026 YKSOBA
    </Typography>
  </FlexCol>
);
