import React, {
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {Flex, FlexCol, InternalLink} from "../styled";
import {StaticImage} from "gatsby-plugin-image";
import {SxProps, useMediaQuery, type SystemStyleObject} from "@mui/system";
import {
  Portal,
  Link as ExternalLink,
  ButtonBase,
  useForkRef,
  Theme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Menu,
} from "@mui/material";
import {useIntersection, useMeasure} from "react-use";
import {TELEGRAM} from "../../constants";
import Icon from "@mdi/react";
import {
  mdiChevronDoubleDown,
  mdiChevronDoubleUp,
  mdiPaw,
  mdiStore,
  mdiTwitter,
  mdiOpenInNew,
} from "@mdi/js";
import {LayoutContext} from "../../layouts";
import {useIsSSR} from "../hooks/use-is-ssr";

export const Header = () => {
  const layout = useContext(LayoutContext);
  const fullNavXRef = useRef<HTMLElement>(null);
  const fullNavX = useIntersection(fullNavXRef, {});
  const [fullNavMeasureRef, fullNavRect] = useMeasure();
  const fullNavRef = useForkRef(fullNavXRef, fullNavMeasureRef);
  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // Adjust banner height based on size of the navigation bar
  const bannerHeight = [
    `calc(min(125vw, 80vh - ${fullNavRect.height}px))`,
    "45vw",
    "405px",
  ];

  // Only show banner on home page/gallery on xs
  const showBanner = !isXS || layout?.path === "/";

  // Only show navigation drawer if full navigation bar is out of view
  const showDrawer = !!fullNavX && !fullNavX?.isIntersecting;

  return (
    <>
      <Box>
        {/* <Banner
          bannerHeight={bannerHeight}
          isXS={isXS}
          showBanner={showBanner}
          showDrawer={showDrawer}
        /> */}

        {/* Full Navigation */}
        <Navigation title ref={fullNavRef} />
      </Box>
      {/* Navigation Drawer */}
      <Portal>
        <NavigationDrawer showDrawer={showDrawer} />
      </Portal>
    </>
  );
};

const Banner: React.FC<{
  bannerHeight: string[];
  isXS: unknown;
  showBanner: boolean;
  showDrawer: boolean;
}> = ({bannerHeight, isXS, showBanner, showDrawer}) => (
  <>
    {/* Banner Image */}
    <Box
      position="fixed"
      top={["0vw", "-15vw", "-135px"]}
      width="100vw"
      bgcolor="#000"
      display="flex"
      justifyContent="center"
    >
      <StaticImage
        src="../../static/banner.png"
        alt="banner"
        imgStyle={{willChange: "auto"}}
        style={{
          opacity: showBanner ? 1 : 0,
          transition: "opacity 500ms ease-in-out 50ms",
          maxWidth: "900px",
        }}
      />
    </Box>

    {/* Banner Overlay */}
    <Box
      sx={{
        pointerEvents: "none",
        overflow: "clip",
        position: "relative",
        height: bannerHeight,
        width: "100%",

        maxHeight: showBanner ? bannerHeight : 0,
        transition:
          !isXS || showDrawer ? undefined : "max-height 500ms ease-in-out 50ms",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          height: bannerHeight,
          width: "100%",
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 100%)",
        }}
      />
    </Box>
  </>
);

const Navigation = forwardRef(({title}: {title?: boolean}, ref) => (
  <FlexCol
    component="nav"
    sx={{
      position: "relative",
      zIndex: 1,
      py: 2,
      bgcolor: "#000",
      gap: 2,
    }}
    ref={ref}
  >
    {title && (
      <InternalLink
        to="/"
        sx={{display: "flex", justifyContent: "center", px: 2}}
      >
        <TitleImage />
      </InternalLink>
    )}
    <Flex
      sx={(theme) => ({
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,

        [theme.breakpoints.up("sm")]: {
          flexDirection: "row",
          gap: 2,
        },
      })}
    >
      <InternalNavLink to="/">Gallery</InternalNavLink>
      <InternalNavLink to="/commissions/">Commissions</InternalNavLink>
      <InternalNavLink to="/contact/">Contact</InternalNavLink>
      <InternalNavLink to="/conventions/portfolio/">
        Conventions
      </InternalNavLink>
      <MerchMenu />
    </Flex>
    <Flex gap={1} justifyContent="center" alignItems="center">
      <ExternalNavIconLink
        href="https://bsky.app/profile/yksoba.art"
        path={bskySvgPath}
      />
      <ExternalNavIconLink
        href="https://twitter.com/yk_soba"
        path={mdiTwitter}
      />
      <ExternalNavIconLink
        href="https://www.furaffinity.net/user/yksoba"
        path={mdiPaw}
      />
      <ExternalNavIconLink
        href={`https://t.me/${TELEGRAM}`}
        path={telegramSvgPath}
      />
      {/* <ExternalNavIconLink href={`https://www.etsy.com/shop/YKSOBA`} path={mdiStore} /> */}
    </Flex>
  </FlexCol>
));

const MerchMenu = () => {
  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isXS ? (
        <Accordion disableGutters elevation={0} sx={[{bgcolor: "unset"}]}>
          <AccordionSummary
            sx={{
              px: 0,
              minHeight: "unset",
              "& .MuiAccordionSummary-content": {my: 0},
            }}
          >
            <Box sx={navLinkSX}>Shop</Box>
          </AccordionSummary>
          <AccordionDetails sx={{p: 1, bgcolor: "rgba(255,255,255,0.25)"}}>
            <FlexCol gap={1}>
              <ExternalNavLink href="//shop.yksoba.art">Merch</ExternalNavLink>
              <ExternalNavLink href="//yksoba.bigcartel.com">
                Apparel
              </ExternalNavLink>
            </FlexCol>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <ButtonBase
            sx={[{fontFamily: "Metropolis, sans-serif"}, navLinkSX]}
            onClick={handleClick}
            disableRipple
          >
            Shop
          </ButtonBase>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            transformOrigin={{vertical: "top", horizontal: "right"}}
            sx={{
              "& .MuiList-root": {
                p: 1,
                bgcolor: "#444",
              },
            }}
          >
            <FlexCol gap={1}>
              <ExternalNavLink href="//shop.yksoba.art">Merch</ExternalNavLink>
              <ExternalNavLink href="//yksoba.bigcartel.com">
                Apparel
              </ExternalNavLink>
            </FlexCol>
          </Menu>
        </>
      )}
    </>
  );
};

const NavigationDrawer: React.FC<{
  showDrawer: boolean;
}> = ({showDrawer}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!showDrawer) setOpen(false);
  }, [showDrawer]);

  return (
    <Box
      position="fixed"
      width="100vw"
      zIndex={1}
      top={0}
      className={showDrawer ? "show" : "hide"}
      sx={{
        transition: "opacity 200ms",
        "&.hide": {opacity: 0, pointerEvents: "none"},
        "&.show": {opacity: 1},
      }}
    >
      {/* Expander */}
      <ButtonBase
        sx={{
          width: "100%",
          display: "flex",
          bgcolor: "#000",
          alignItems: "center",
          p: 1.5,
          gap: 1,
          height: "80px",
          zIndex: 2,
        }}
        onClick={() => setOpen((open) => !open)}
      >
        <TitleImage sx={{height: "100%", width: "auto"}} />
        <Box flexGrow={1} />
        <Icon
          path={open ? mdiChevronDoubleUp : mdiChevronDoubleDown}
          size={1.5}
        />
      </ButtonBase>

      {/* Dimmer */}
      <Box
        className={open ? "open" : "closed"}
        sx={{
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "100vh",
          transition: "opacity 200ms",
          bgcolor: "rgba(0,0,0,0.5)",
          "&.open": {
            opacity: 1,
          },
          "&.closed": {
            opacity: 0,
            pointerEvents: "none",
          },
        }}
        onMouseDown={() => setOpen(false)}
        onWheel={() => setOpen(false)}
      />

      {/* Contents */}
      <Box
        className={open ? "open" : "closed"}
        sx={{
          transition: "transform 200ms",
          "&.open": {
            transform: "translateY(0)",
          },
          "&.closed": {
            transform: "translateY(-100%)",
          },
        }}
      >
        <Navigation />
      </Box>
    </Box>
  );
};

const TitleImage = ({sx}: {sx?: SxProps}) => (
  <Box sx={[{aspectRatio: "500/131", height: "auto"}, (sx as any) ?? {}]}>
    <StaticImage
      alt="YKSOBA"
      src="../../static/title.png"
      width={500}
      height={131}
      loading="eager"
      placeholder="none"
    />
  </Box>
);

const navLinkSX: (theme: Theme) => SystemStyleObject<Theme> = (theme) => ({
  textTransform: "uppercase",
  color: "#FFF",
  fontWeight: "300",
  opacity: "95%",
  textDecoration: "none",
  width: "100%",
  textAlign: "center",

  fontSize: "1.2em",

  "&:hover": {
    textDecoration: "underline",
  },

  "&.current": {
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.up("sm")]: {
    width: "fit-content",
  },
});

const InternalNavLink = ({to, children}: PropsWithChildren<{to: string}>) => {
  const layout = useContext(LayoutContext);
  const currentPath = layout?.path === to;
  return (
    <InternalLink
      to={to}
      className={currentPath ? "current" : ""}
      sx={navLinkSX}
    >
      {children}
    </InternalLink>
  );
};

export const ExternalNavLink = ({
  href,
  children,
}: PropsWithChildren<{href: string}>) => (
  <ExternalLink target="_blank" sx={navLinkSX} href={href}>
    <Flex justifyContent="center">
      <Box>{children}</Box>
      <Icon path={mdiOpenInNew} size={0.6} />
    </Flex>
  </ExternalLink>
);

const ExternalNavIconLink = ({
  href,
  path,
  title,
}: {
  href: string;
  path: string;
  title?: string;
}) => (
  <ExternalLink target="_blank" sx={{display: "flex"}} href={href}>
    <Icon path={path} title={title} color="#FFF" size="30px" />
  </ExternalLink>
);

const bskySvgPath =
  "M5.4288 3.24458C8.08864 5.22259 10.9496 9.23315 12 11.3855C13.0505 9.23331 15.9113 5.22255 18.5712 3.24458C20.4904 1.81734 23.6 0.713015 23.6 4.22703C23.6 4.92882 23.1938 10.1225 22.9556 10.9657C22.1274 13.8971 19.1098 14.6448 16.4256 14.1922C21.1176 14.9833 22.3112 17.6034 19.7334 20.2236C14.8378 25.1998 12.697 18.9751 12.1482 17.38C12.0477 17.0876 12.0006 16.9508 11.9999 17.0672C11.9992 16.9508 11.9522 17.0876 11.8516 17.38C11.3031 18.9751 9.1623 25.2 4.26642 20.2236C1.68866 17.6034 2.88222 14.9831 7.5743 14.1922C4.88998 14.6448 1.8723 13.8971 1.0443 10.9657C0.806056 10.1224 0.399864 4.92875 0.399864 4.22703C0.399864 0.713015 3.50954 1.81734 5.42866 3.24458H5.4288Z";

const telegramSvgPath =
  "M20.7096 3.6545C20.7096 3.6545 22.6523 2.897 22.4904 4.73664C22.4364 5.49415 21.9508 8.1454 21.573 11.0131L20.2779 19.5079C20.2779 19.5079 20.17 20.7524 19.1987 20.9688C18.2273 21.1852 16.7704 20.2113 16.5005 19.9949C16.2847 19.8326 12.4534 17.3977 11.1043 16.2074C10.7265 15.8827 10.2948 15.2334 11.1582 14.4759L16.8243 9.06525C17.4719 8.41595 18.1194 6.90095 15.4213 8.7406L7.86655 13.8808C7.86655 13.8808 7.00315 14.4218 5.3843 13.9349L1.87671 12.8527C1.87671 12.8527 0.581605 12.0411 2.79408 11.2295C8.19035 8.68645 14.8277 6.0893 20.7096 3.6545Z";
