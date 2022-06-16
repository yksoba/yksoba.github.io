import React, { PropsWithChildren } from "react";
import { ReactNode } from "react";
import { Layout } from "../components/layout";
import { FlexCol, Flex } from "../components/flex";
import icon1 from "../images/comms/icon-1.png";
import icon2 from "../images/comms/icon-2.png";
import halfbody1 from "../images/comms/half-body-1.png";
import halfbody2 from "../images/comms/half-body-2.png";
import full1 from "../images/comms/full-1.png";
import full2 from "../images/comms/full-2.png";
import { Typography, useMediaQuery } from "@mui/material";
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
            Commissions
          </Typography>
          <Typography variant="subtitle1" mt={1} fontStyle="italic">
            Read the{" "}
            <Link to="" style={{ color: "white" }}>
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
          },
          [theme.breakpoints.up(LG)]: {
            width: "100%",
            flexDirection: "row",
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
      imgsrc={icon1}
      bgpos="65%"
      cover={<Cover name="Icon" price="$10" />}
      content={
        <Content
          imgsrcs={[icon1, icon2]}
          caption={
            <StyledList>
              <li>Neck and above</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
        />
      }
    />
    <Panel
      imgsrc={halfbody1}
      bgpos="50%"
      cover={<Cover name="Half-Body" price="$20" />}
      content={
        <Content
          imgsrcs={[halfbody1, halfbody2]}
          caption={
            <StyledList>
              <li>Torso and above</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
        />
      }
    />
    <Panel
      imgsrc={full1}
      bgpos="70%"
      cover={<Cover name="Full-Body" price="$30" />}
      content={
        <Content
          imgsrcs={[full1, full2]}
          caption={
            <StyledList>
              <li>Head to toe</li>
              <li>Solid color or gradient background</li>
              <li>Fully colored/painted</li>
            </StyledList>
          }
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
  imgsrcs,
  caption,
}: {
  imgsrcs: string[];
  caption?: ReactNode;
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
        <MiniGallery
          imgsrcs={imgsrcs}
          freeHeight={isLg}
          columns={isSm ? 1 : 2}
        />
      </Flex>
      <Flex
        sx={{
          [theme.breakpoints.up(SM)]: {
            width: "100%",
          },
          [theme.breakpoints.up(MD)]: {
            width: "calc(max(250px, 100% - 500px))",
          },
          [theme.breakpoints.up(LG)]: {
            width: "100%",
          },
        }}
      >
        {caption}
      </Flex>
    </Flex>
  );
};

const Cover = ({ name, price }: { name: string; price: string }) => {
  return (
    <FlexCol
      justifyContent="end"
      sx={{
        p: {
          sm: 1,
          md: 3,
        },
      }}
    >
      <Flex
        px={1.5}
        bgcolor="rgba(0,0,0,0.5)"
        color="white"
        sx={{
          fontSize: {
            sm: "1.5em",
            md: "2em",
          },
        }}
      >
        {name} {price}
      </Flex>
    </FlexCol>
  );
};

export default Commissions;
