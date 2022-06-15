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
        position="sticky"
        zIndex={1}
        left="0"
      >
        <FlexCol
          py={1.5}
          px={2}
          ml={2}
          mt={2}
          color="white"
          bgcolor="rgba(0,0,0,0.5)"
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

      <Flex width="100%" gap={1} bgcolor="black">
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
      </Flex>
    </Layout>
  );
};

const StyledList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Typography variant="body1" color="white">
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
    <FlexCol justifyContent="center" width="100%" px={6}>
      <MiniGallery imgsrcs={imgsrcs} />
      {caption}
    </FlexCol>
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
