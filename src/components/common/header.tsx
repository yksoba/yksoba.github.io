import React, { forwardRef, useRef } from "react";
import { Flex, FlexCol } from "../styled";
import { NavBar, NavIconLink } from "./nav";
import { StaticImage } from "gatsby-plugin-image";
import { Box } from "@mui/system";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Fade, Portal, SvgIcon, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FuraffinityIcon from "../../images/svgs/furaffinity.svg";
import { useIntersection } from "react-use";
import { FullDivider } from "./misc";
import { useLayoutContext } from "./layout";

export const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting = true } = useIntersection(ref, {}) ?? {};

  return (
    <>
      <Masthead ref={ref} />
      <Portal>
        <Fade in={!isIntersecting}>
          <FlexCol
            sx={{
              position: "fixed",
              top: 0,
              zIndex: 1,

              minWidth: "450px",
              width: "100%",

              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,.8) 0,  rgba(0,0,0,.6) 50% 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Flex justifyContent={"center"} gap={1}>
              <TitleLink variant="small" />
              <NavBar floating />
            </Flex>
            <FullDivider />
          </FlexCol>
        </Fade>
      </Portal>
    </>
  );
};

export const Masthead = forwardRef<HTMLDivElement, {}>(({}, ref) => (
  <FlexCol
    ref={ref}
    sx={{
      alignItems: "center",
      justifyContent: "center",
      pt: 2,
      pb: 2,
      minHeight: 150,
    }}
  >
    <Box sx={{ px: 1.5, maxWidth: 550 }}>
      <TitleLink variant="large" />
    </Box>
    <FlexCol mt={0.5} alignItems="center" justifyContent="center">
      <NavBar />
      <Flex gap={1}>
        <NavIconLink href="https://www.furaffinity.net/user/yksoba">
          <SvgIcon
            component={FuraffinityIcon}
            sx={{ transform: "scale(0.85)" }}
          />
        </NavIconLink>
        <NavIconLink href="https://twitter.com/yk_soba">
          <TwitterIcon sx={{ color: "#FFF" }} />
        </NavIconLink>
        <NavIconLink href="https://www.instagram.com/yk_soba/">
          <InstagramIcon sx={{ color: "#FFF" }} />
        </NavIconLink>
        <NavIconLink href="mailto:the.yk.soba@gmail.com">
          <EmailIcon sx={{ color: "#FFF" }} />
        </NavIconLink>
      </Flex>
    </FlexCol>
  </FlexCol>
));

const TitleImage = ({ variant }: { variant: "large" | "small" }) =>
  variant === "large" ? (
    <StaticImage
      alt="YK_SOBA"
      src="../../images/title.png"
      width={550}
      height={131}
      loading="eager"
      placeholder="none"
    />
  ) : (
    <StaticImage
      alt="YK_SOBA"
      src="../../images/title.png"
      layout="fixed"
      width={110}
      height={26}
      loading="eager"
      placeholder="none"
    />
  );

const TitleLink = ({ variant }: { variant: "large" | "small" }) => {
  const {
    pageProps: { location },
  } = useLayoutContext();

  const isHomePage = location.pathname === "" || location.pathname === "/";

  return (
    <Link
      href={isHomePage ? "#" : "/#"}
      onClick={
        isHomePage
          ? () => {
              document.getElementById("scroll-container")?.scroll({ top: 0 });
            }
          : undefined
      }
    >
      <TitleImage variant={variant} />
    </Link>
  );
};
