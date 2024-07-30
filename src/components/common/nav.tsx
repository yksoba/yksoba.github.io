import React, { CSSProperties, PropsWithChildren, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { Divider, Link, LinkProps } from "@mui/material";
import { Flex } from "../styled";
import { SxProps } from "@mui/system";
import { useLayoutContext } from "./layout";
import { SM } from "./theme";

export const NavLink = styled(
  ({ className, highlight, ...props }: LinkProps & { highlight?: boolean }) => (
    <Link
      {...props}
      className={
        (className ? className + " " : "") + (highlight ? "highlight" : "")
      }
    />
  )
)(({ theme }) => ({
  textTransform: "uppercase",
  color: "#FFF",
  fontWeight: "300",
  opacity: "95%",
  textDecoration: "none",

  [theme.breakpoints.down(SM)]: {
    fontSize: "calc(min(1.2em, 5vw))",
  },
  [theme.breakpoints.up(SM)]: {
    fontSize: "1.2em",
  },

  "&.highlight": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const NavIconLink = ({
  children,
  ...props
}: PropsWithChildren<LinkProps>) => (
  <Link target="_blank" sx={{ display: "flex" }} {...props}>
    {children}
  </Link>
);

export const NavDivider = () => (
  <Divider
    orientation="vertical"
    variant="middle"
    flexItem
    sx={{ bgcolor: "#fff", opacity: 0.7 }}
  />
);

export const NavBar = forwardRef<
  HTMLDivElement,
  {
    style?: CSSProperties;
    sx?: SxProps;
    floating?: boolean;
  }
>(({ style, sx, floating }, ref) => {
  const { currentSection } = useLayoutContext();

  return (
    <Flex ref={ref} style={style} gap={1} sx={sx}>
      <NavLink
        href="/#gallery"
        highlight={floating && currentSection === "gallery"}
      >
        Gallery
      </NavLink>
      <NavDivider />
      <NavLink
        href="/#commissions"
        highlight={floating && currentSection === "commissions"}
      >
        Commissions
      </NavLink>
      <NavDivider />
      <NavLink
        href="/#contact"
        highlight={floating && currentSection === "contact"}
      >
        Contact
      </NavLink>
      <NavDivider />
      <NavLink
        href="/conventions/portfolio"
        highlight={floating && currentSection === "contact"}
      >
        Conventions
      </NavLink>
    </Flex>
  );
});
