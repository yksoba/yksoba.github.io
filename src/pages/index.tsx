import React from "react";
import { Layout } from "../components/common/layout";
import { Link as GatsbyLink, PageProps } from "gatsby";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Link,
  ButtonProps,
} from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import {
  BSKY,
  COMMISSIONS_FORM_URL,
  EMAIL,
  FURAFFINITY,
  INSTAGRAM,
  TELEGRAM,
  TWITTER,
} from "../constants";
import { Email, Instagram, Send, Twitter } from "@mui/icons-material";
import Icon from "@mdi/react";
import { mdiPaw, mdiSquareRounded } from "@mdi/js";

const Banner: React.FC = () => (
  <StaticImage
    alt="YKSOBA banner"
    src="../images/banner.png"
    loading="eager"
    placeholder="none"
  />
);

const Socials: React.FC = () => (
  <Box display="flex" flexDirection="column" alignItems="start">
    <Button
      startIcon={<Icon path={mdiSquareRounded} size={1} />}
      href={`https://bsky.app/profile/${BSKY}`}
    >
      BlueSky ({BSKY})
    </Button>
    <Button startIcon={<Twitter />} href={`https://twitter.com/${TWITTER}`}>
      Twitter ({TWITTER})
    </Button>
    <Button
      startIcon={<Icon path={mdiPaw} size={1} />}
      href={`https://www.furaffinity.net/user/${FURAFFINITY}`}
    >
      FurAffinity ({FURAFFINITY})
    </Button>
    <Button
      startIcon={<Instagram />}
      href={`https://www.instagram.com/${INSTAGRAM}`}
    >
      Instagram ({INSTAGRAM})
    </Button>
  </Box>
);

const Divider2 = ({ children }: React.PropsWithChildren<{}>) =>
  children ? (
    <Divider
      flexItem
      orientation="horizontal"
      sx={{
        color: "primary.light",
        "&::before, &::after": {
          borderColor: "primary.light",
        },
      }}
    >
      <Typography variant="overline">{children}</Typography>
    </Divider>
  ) : (
    <Divider
      flexItem
      orientation="horizontal"
      sx={{ bgcolor: "primary.light" }}
    />
  );

const GatsbyLinkButton = ({ to, ...props }: ButtonProps & { to: string }) => (
  //@ts-ignore
  <Button {...props} LinkComponent={GatsbyLink} to={to} />
);

const Content: React.FC = () => (
  <Container
    maxWidth="sm"
    sx={{ mt: 3, bgcolor: "rgba(0,0,0,0.2)", p: 3, pt: 1 }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Divider2>Commissions</Divider2>
      <Button variant="outlined" href={COMMISSIONS_FORM_URL}>
        Request a Commission
      </Button>
      <Link component={GatsbyLink} to="/comms">
        More Info
      </Link>
      <Divider2>Socials</Divider2>
      <Socials />
      <Divider2>Contact</Divider2>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Button startIcon={<Email />} href={`mailto:${EMAIL}`}>
          Email ({EMAIL})
        </Button>
        <Button startIcon={<Send />} href={`https://t.me/${TELEGRAM}`}>
          Telegram ({TELEGRAM})
        </Button>
      </Box>
    </Box>
  </Container>
);

const Header: React.FC = () => (
  <Container maxWidth="sm">
    <Banner />
    <Box display="flex" flexDirection="row" justifyContent="center">
      <GatsbyLinkButton to="/">Home</GatsbyLinkButton>
      <GatsbyLinkButton to="/gallery">Gallery</GatsbyLinkButton>
      <GatsbyLinkButton to="/comms">Comms</GatsbyLinkButton>
      <GatsbyLinkButton to="/contact">Contact</GatsbyLinkButton>
    </Box>
  </Container>
);

const Home = (props: PageProps) => {
  return (
    <Layout pageProps={props}>
      <Header />
      <Divider2 />
      <Content />
    </Layout>
  );
};
export default Home;
