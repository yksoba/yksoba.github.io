import React, { PropsWithoutRef } from "react";
import { styled } from "@mui/material/styles";
import { StyledLink } from "../styled";
import { Divider, Box } from "@mui/material";
import { Link } from "gatsby";

export const NavLink = styled(StyledLink)({
  textTransform: "uppercase",
  color: "#FFF",
  fontSize: "1.2em",
  fontWeight: "300",
  opacity: "95%",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});

export const NavDivider = () => (
  <Divider
    orientation="vertical"
    variant="middle"
    flexItem
    sx={{ bgcolor: "#fff", opacity: 0.7 }}
  />
);
