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
import { Typography } from "@mui/material";
import { Link } from "gatsby";
import { Panel } from "../components/gallery/panel";
import { MiniGallery } from "../components/gallery/mini-gallery";

const Commissions = () => {
  return (
    <Layout>
      <title>yksoba - Commissions</title>

      <Flex
        width="0"
        height="fit-content"
        zIndex={1}
        left="0"
        sx={{ position: ["static", "sticky"] }}
      >
        <FlexCol
          color="white"
          bgcolor={[null, "rgba(0,0,0,0.5)"]}
          mt={[0, 0, 2]}
          ml={2}
          pt={[0.5, 0.5, 1.5]}
          pb={1.5}
          px={[0, 0, 2]}
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
        width="100%"
        gap={1}
        bgcolor="black"
        sx={{ flexDirection: ["column", "column", "row"] }}
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
    <Typography variant="body1" color="white" component="span">
      <FlexCol
        component="ul"
        sx={{
          listStyleType: "none",
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
  return (
    <Flex
      justifyContent={["end", "center"]}
      alignItems="start"
      width="100%"
      px={2}
      py={2}
      gap={1}
      sx={{ flexDirection: ["row-reverse", "row-reverse", "column"] }}
    >
      <Flex width={[125, "100%", "100%"]}>
        <MiniGallery imgsrcs={imgsrcs} />
      </Flex>
      <Flex flexGrow={[1, 1, 0]}>{caption}</Flex>
    </Flex>
  );
};

const Cover = ({ name, price }: { name: string; price: string }) => {
  return (
    <FlexCol justifyContent="end" p={3}>
      <Flex px={1.5} bgcolor="rgba(0,0,0,0.5)" color="white" fontSize="2em">
        {name} {price}
      </Flex>
    </FlexCol>
  );
};

export default Commissions;
