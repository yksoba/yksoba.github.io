import React from "react";
import { Flex, FlexCol } from "../styled";
import { NavDivider, NavLink } from "./nav";
import { StaticImage } from "gatsby-plugin-image";
import { Box } from "@mui/system";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, SvgIcon } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FuraffinityIcon from "../../images/svgs/furaffinity.svg";
import { WindowLocation } from "@reach/router";

export const Header = ({ location }: { location?: WindowLocation }) => {
  const isHomePage = !location?.pathname || location.pathname == "/";
  return (
    <FlexCol
      sx={{
        alignItems: "center",
        justifyContent: "center",
        pt: 2,
        pb: 2,
        minHeight: 150,
      }}
    >
      <Box sx={{ px: 1.5, maxWidth: 550 }}>
        <StaticImage
          alt="YK_SOBA"
          src="../../images/title.png"
          width={550}
          height={131}
          loading="eager"
          placeholder="none"
        />
      </Box>
      <Flex gap={1} mt={0.5} alignItems="center">
        {isHomePage || (
          <>
            <NavLink to="/">Home</NavLink>
            <NavDivider />
          </>
        )}
        <NavLink to="/#commissions">Commissions</NavLink>
        <NavDivider />
        <NavLink to="/#contact">Contact</NavLink>
        <NavDivider />
        <Link
          href="https://www.furaffinity.net/user/yksoba"
          target="_blank"
          sx={{ display: "flex" }}
        >
          <SvgIcon
            component={FuraffinityIcon}
            sx={{ transform: "scale(0.85)" }}
          />
        </Link>
        <Link
          href="https://twitter.com/yk_soba"
          target="_blank"
          sx={{ display: "flex" }}
        >
          <TwitterIcon sx={{ color: "#FFF" }} />
        </Link>
        <Link
          href="mailto:the.yk.soba@gmail.com"
          target="_blank"
          sx={{ display: "flex" }}
        >
          <EmailIcon sx={{ color: "#FFF" }} />
        </Link>
      </Flex>
    </FlexCol>
  );
};
