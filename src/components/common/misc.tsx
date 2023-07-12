import React from "react";
import { Divider, DividerProps } from "@mui/material";

export const FullDivider = (props: DividerProps) => (
  <Divider
    flexItem
    sx={{
      bgcolor: "#FFF",
      opacity: 0.7,
    }}
    {...props}
  />
);
