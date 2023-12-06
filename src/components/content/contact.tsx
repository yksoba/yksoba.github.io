import React from "react";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { FlexCol } from "../styled";
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
} from "../../constants";
import { Link as GatsbyLink } from "gatsby";

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

export const Contact = () => (
  <FlexCol maxWidth="650px" px={4}>
    <Typography
      variant="h2"
      textAlign="center"
      sx={{ mb: 2, mt: 4, textTransform: "uppercase" }}
    >
      Contact
    </Typography>

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
