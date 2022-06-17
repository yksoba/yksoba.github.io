import React from "react";
import { Flex, FlexCol, Img } from "./flex";
import { styled } from "@mui/material/styles";
import title from "../images/title.png";
import { StyledLink } from "./styled";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { SM, LG } from "./theme";

export const Navbar = () => {
  return (
    <FlexCol
      flexShrink={0}
      justifyContent="center"
      bgcolor="black"
      position="relative"
      mt={3}
      mb={1}
      sx={{ width: { [SM]: "100%", [LG]: 250 } }}
    >
      <FlexCol alignItems="end" pr={1.5}>
        <Img src={title} sx={{ mb: 2, width: [225, 225, 200] }} />
        {/* <StyledLink to="/">Home</StyledLink> */}
        {/* <StyledLink to="/gallery">Gallery</StyledLink> */}
        <NavLink to="/comms">Commissions</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Flex gap={1} mt={1}>
          <Link href="https://twitter.com/yk_soba" target="_blank">
            <TwitterIcon />
          </Link>
          <Link href="mailto:the.yk.soba@gmail.com" target="_blank">
            <EmailIcon />
          </Link>
        </Flex>
      </FlexCol>
    </FlexCol>
  );
};

const NavLink = styled(StyledLink)({
  textTransform: "uppercase",
  color: "white",
  fontSize: "1.2em",
  fontWeight: "300",
  opacity: "95%",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});
