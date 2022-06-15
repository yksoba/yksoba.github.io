import React from "react";
import { Flex, FlexCol, Img } from "./flex";
import title from "../images/title.png";
import { StyledLink } from "./styled";

export const Navbar = () => {
  return (
    <FlexCol
      width={250}
      flexShrink={0}
      justifyContent="center"
      bgcolor="black"
      position="relative"
    >
      <FlexCol alignItems="end" pr={1.5}>
        <Img width={175} src={title} sx={{ mb: 2 }} />
        {/* <StyledLink to="/">Home</StyledLink> */}
        {/* <StyledLink to="/gallery">Gallery</StyledLink> */}
        <StyledLink to="/comms">Commissions</StyledLink>
        {/* <StyledLink to="/contact">Contact</StyledLink> */}
      </FlexCol>
      <Flex
        position="absolute"
        bottom="0"
        left="0"
        color="white"
        sx={{ opacity: "50%" }}
      >
        © 2022
      </Flex>
    </FlexCol>
  );
};
