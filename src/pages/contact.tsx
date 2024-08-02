import React from "react";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { FlexCol } from "../components/styled";
import { Icon } from "@mdi/react";
import { mdiSquareRounded, mdiPaw } from "@mdi/js";
import { Twitter, Instagram, Email, Send } from "@mui/icons-material";
import {
  BSKY,
  TWITTER,
  FURAFFINITY,
  INSTAGRAM,
  COMMISSIONS_FORM_URL,
  EMAIL,
  TELEGRAM,
} from "../constants";
import { Link as GatsbyLink } from "gatsby";
import { Divider2 } from "../components/styled";

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

const Contact = () => (
  <FlexCol
    width="100%"
    height="100%"
    maxWidth="600px"
    px={4}
    bgcolor="rgba(0,0,0,0.5)"
  >
    <Typography variant="h1">Contact</Typography>

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      mb={2}
    >
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
  </FlexCol>
);

export default Contact;
