import React, { PropsWithChildren } from "react";
import { ReactNode } from "react";
import { Layout } from "../components/layout";
import { FlexCol, Flex } from "../components/flex";
import icon1 from "../images/comms/icon-1.png";
import icon2 from "../images/comms/icon-2.png";
import icon3 from "../images/comms/500.png";
import halfbody1 from "../images/comms/half-body-1.png";
import halfbody2 from "../images/comms/half-body-2.png";
import halfbody3 from "../images/comms/499a.png";
import full1 from "../images/comms/full-1.png";
import full2 from "../images/comms/full-2.png";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Link } from "gatsby";
import { Panel } from "../components/gallery/panel";
import { MiniGallery } from "../components/gallery/mini-gallery";
import { theme, SM, MD, LG } from "../components/theme";

const Commissions = () => {
  return (
    <Layout>
      <title>yksoba - Commissions</title>

      <Flex
        sx={{
          [theme.breakpoints.up(LG)]: {
            // Make the title float
            position: "sticky",
            width: 0,
            height: "fit-content",
            zIndex: 1,
            left: 0,
            mt: 2,
          },
        }}
      >
        <FlexCol
          sx={{
            ml: 2,
            mb: 1.5,
            [theme.breakpoints.up(LG)]: {
              // Place title in box when floating
              bgcolor: "rgba(0,0,0,0.5)",
              py: 1.5,
              px: 2,
            },
          }}
        >
          <Typography component="h1" variant="h3">
            Furry/Anthro Commissions
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            Read the{" "}
            <Link
              to="/comms/tos"
              style={{ color: "white", fontWeight: "bold" }}
            >
              terms of service
            </Link>
            <br />
            All prices in USD
          </Typography>
        </FlexCol>
      </Flex>

      <Flex
        gap={1}
        sx={{
          [theme.breakpoints.up(SM)]: {
            flexDirection: "column",
            mb: "1in",
          },
          [theme.breakpoints.up(LG)]: {
            width: "100%",
            flexDirection: "row",
            mb: 0,
          },
        }}
      >
        <Panels />
      </Flex>
    </Layout>
  );
};

const Panels = () => (
  <>
    <Panel
      imgsrc={icon3}
      bgpos="42%"
      cover={<Cover name="Icon" price="$30" />}
      content={
        <Content
          imgs={[
            { src: icon3, href: "https://twitter.com/yk_soba" },
            {
              src: icon1,
              href: "https://twitter.com/yk_soba/status/1495083769031766016/photo/1",
            },
            // {
            //   src: icon2,
            //   href: "https://twitter.com/yk_soba/status/1530246054125490176/photo/1",
            // },
          ]}
          caption={
            <StyledList>
              <li>Neck and above</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
          link="https://docs.google.com/forms/d/e/1FAIpQLSfSEbuI3iM8kkH1alBmQe0-9TFm6Qj95wkgOvphTBcIMEsHbg/viewform?usp=pp_url&entry.1764984693=Icon+$30"
        />
      }
    />
    <Panel
      imgsrc={halfbody3}
      bgpos="50%"
      cover={<Cover name="Half-Body" price="$60" />}
      content={
        <Content
          imgs={[
            {
              src: halfbody3,
              href: "https://twitter.com/yk_soba/status/1541805809339858945/photo/1"
            },
            {
              src: halfbody1,
              href: "https://twitter.com/yk_soba/status/1537087193965027328/photo/1",
            },
            // {
            //   src: halfbody2,
            //   href: "https://twitter.com/yk_soba/status/1488187099165736962/photo/1",
            // },
          ]}
          caption={
            <StyledList>
              <li>Torso and above</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
          link="https://docs.google.com/forms/d/e/1FAIpQLSfSEbuI3iM8kkH1alBmQe0-9TFm6Qj95wkgOvphTBcIMEsHbg/viewform?usp=pp_url&entry.1764984693=Half-Body+$60"
        />
      }
    />
    <Panel
      imgsrc={full1}
      bgpos="70%"
      cover={<Cover name="Full-Body" price="$90" />}
      content={
        <Content
          imgs={[
            {
              src: full1,
              href: "https://twitter.com/yk_soba/status/1486414636715057156/photo/1",
            },
            {
              src: full2,
              href: "https://twitter.com/yk_soba/status/1523770660820258816/photo/1",
            },
          ]}
          caption={
            <StyledList>
              <li>Head to toe</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
          link="https://docs.google.com/forms/d/e/1FAIpQLSfSEbuI3iM8kkH1alBmQe0-9TFm6Qj95wkgOvphTBcIMEsHbg/viewform?usp=pp_url&entry.1764984693=Full-Body+$90"
        />
      }
    />
  </>
);

const StyledList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Typography variant="body1" component="span">
      <FlexCol
        component="ul"
        sx={{
          listStyleType: "none",
          textIndent: -30,
          "& > li::before": { content: '"– "' },
        }}
      >
        {children}
      </FlexCol>
    </Typography>
  );
};

const Content = ({
  imgs,
  caption,
  link,
}: {
  imgs: { src: string; href: string }[];
  caption?: ReactNode;
  link: string;
}) => {
  const isSm = useMediaQuery(theme.breakpoints.only(SM));
  const isLg = useMediaQuery(theme.breakpoints.up(LG));

  return (
    <Flex
      justifyContent={["end", "center"]}
      alignItems="start"
      width="100%"
      px={2}
      py={2}
      gap={1}
      sx={{
        [theme.breakpoints.up(SM)]: {
          flexDirection: "row-reverse",
        },
        [theme.breakpoints.up(LG)]: {
          flexDirection: "column",
        },
      }}
    >
      <Flex
        sx={{
          [theme.breakpoints.up(SM)]: {
            flexGrow: 1,
            alignSelf: "stretch",
          },
          [theme.breakpoints.up(LG)]: {
            flexGrow: 0,
            width: "100%",
          },
        }}
      >
        <MiniGallery imgs={imgs} freeHeight={isLg} columns={isSm ? 1 : 2} />
      </Flex>
      <FlexCol
        sx={{
          [theme.breakpoints.up(SM)]: {
            width: "100%",
            mt: -1,
          },
          [theme.breakpoints.up(MD)]: {
            width: "calc(max(250px, 100% - 500px))",
            mt: 0,
          },
          [theme.breakpoints.up(LG)]: {
            width: "100%",
          },
        }}
      >
        {caption}
        <Button
          variant="outlined"
          sx={{
            maxWidth: 200,
            alignSelf: "center",
            [theme.breakpoints.up(SM)]: { mt: -1 },
            [theme.breakpoints.up(MD)]: { mt: 0 },
          }}
          href={link}
          target="_blank"
        >
          Reserve Now
          {/* Join Waitlist */}
        </Button>
      </FlexCol>
    </Flex>
  );
};

const Cover = ({ name, price }: { name: string; price: string }) => {
  return (
    <FlexCol
      justifyContent="end"
      sx={{
        p: {
          [SM]: 1,
          [MD]: 3,
        },
      }}
    >
      <Flex
        px={1.5}
        bgcolor="rgba(0,0,0,0.5)"
        color="white"
        sx={{
          fontSize: {
            [SM]: "1.5em",
            [MD]: "2em",
          },
        }}
      >
        {name} {price}
      </Flex>
    </FlexCol>
  );
};

export default Commissions;
