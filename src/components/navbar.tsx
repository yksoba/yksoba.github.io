import React, { PropsWithChildren } from "react";
import { Flex, FlexCol, Img } from "./flex";
import title from "../images/title.png";
import { StyledTransitionLink } from "./styled";

export const Navbar = () => {
  return (
    <FlexCol
      flexShrink={0}
      justifyContent="center"
      bgcolor="black"
      position="relative"
      mt={3}
      mb={1}
      sx={{ width: ["100%", "100%", 250] }}
    >
      <FlexCol alignItems="end" pr={1.5}>
        <Img src={title} sx={{ mb: 2, width: [225, 225, 175] }} />
        {/* <StyledLink to="/">Home</StyledLink> */}
        {/* <StyledLink to="/gallery">Gallery</StyledLink> */}
        <NavLink to="/comms">Commissions</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </FlexCol>
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
