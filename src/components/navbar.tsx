import React, { PropsWithChildren } from "react";
import { Flex, FlexCol, Img } from "./flex";
import title from "../images/title.png";
import { StyledTransitionLink } from "./styled";

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
        <NavLink to="/comms">Commissions</NavLink>
        <NavLink to="/contact">Contact</NavLink>
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

const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  return (
    <StyledTransitionLink to={to} exit={{ length: 0.2 }} entry={{ delay: 0.2 }}>
      {children}
    </StyledTransitionLink>
  );
};
