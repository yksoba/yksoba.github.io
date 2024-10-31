import { Button, Link, Theme, Typography, useMediaQuery } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import { FlexCol, Flex, Divider2, InternalLink } from "../components/styled";
import { LG, MD, SM } from "../theme";
import { maxWidth } from "@mui/system";
import {
  AspectColumn,
  AspectContainer,
  AspectRow,
} from "../components/containers/aspectbox";
import {
  INFO_SHEET_DOC,
  PRICING_SHEET_DOC,
  TERMS_OF_SERVICE_DOC,
  TRELLO as COMMS_TRELLO,
} from "../constants";
import {
  LightboxPreview,
  LightboxProvider,
} from "../components/containers/lightbox";
import { unpackImageData } from "../components/content/gallery";


const Commissions = () => {
  const data: Queries.CommsQuery = useStaticQuery(graphql`
    query Comms {
      allFile(
        filter: {
          name: {
            in: [
              "593"
              "717"
              "741"
              "704a"
              "702"
              "704"
              "735-3a"
            ]
          }
        }
      ) {
        nodes {
          ...ImageDataFromFile
        }
      }
    }
  `);

  const images = Object.fromEntries(
    data.allFile.nodes.map((node) => [node.name, node] as const)
  );

  return (
    <FlexCol
      width="100%"
      maxWidth="900px"
      px={[1, 4]}
      bgcolor="rgba(0,0,0,0.5)"
    >
      <Typography variant="h1">Commissions</Typography>
      <Typography variant="subtitle1">
        Prices below are estimates for one character.
        {/* For a more detailed pricing guide, please see the{" "}
        <Link href={PRICING_SHEET_DOC} target="_blank">
          full pricing sheet
        </Link>. */}{" "}
        All prices in USD.
        {/* For more detailed estimate on pricing, please don't
        hesitate to <Link>contact me</Link>. */}
        <br />
        <b><InternalLink to="/contact" sx={(theme) => ({ color: theme.palette.primary.main })}>Contact me</InternalLink> for commission inquiries!</b>
      </Typography>

      <FlexCol gap={2} mt={1} alignItems="center">
        <Divider2 />
        <Link href={COMMS_TRELLO} target="_blank">
          Commissions Trello Board
        </Link>
        {/* <Link href={INFO_SHEET_DOC} target="_blank">
          Commissions Info Sheet
        </Link> */}
        <Link href={TERMS_OF_SERVICE_DOC} target="_blank">
          Terms of Service
        </Link>
        {/* <SubmitRequestButton /> */}
        <Divider2 />
      </FlexCol>

      <Option>
        <InfoCol>
          <Typography variant="h2">Headshot / Bust-Up</Typography>
          <Typography variant="h3">50-150 USD</Typography>
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[images["741"], images["717"]].map(unpackImageData)}
          >
            <Flex>
              <LightboxPreview index={0} sx={{ width: "50%" }} />
              <LightboxPreview index={1} sx={{ width: "50%" }} />
            </Flex>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <Option>
        <InfoCol>
          <Typography variant="h2">Half-Body / Thigh-Up</Typography>
          <Typography variant="h3">100-250 USD</Typography>
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[images["702"], images["704a"]].map(unpackImageData)}
          >
            <Flex>
              <LightboxPreview index={0} sx={{ width: "43%" }} />
              <LightboxPreview index={1} sx={{ width: "57%" }} />
            </Flex>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <Option>
        <InfoCol>
          <Typography variant="h2">Full-Body</Typography>
          <Typography variant="h3">200+ USD</Typography>
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[images["735-3a"], images["593"]].map(unpackImageData)}
          >
            <Flex>
              <LightboxPreview index={0} sx={{ width: "46.4%" }} />
              <LightboxPreview index={1} sx={{ width: "53.6%" }} />
            </Flex>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <Option>
        <InfoCol>
          <Typography variant="h2">Ref Sheet</Typography>
          <Typography variant="h3">300+ USD</Typography>
        </InfoCol>
        <PreviewCol>
          <LightboxProvider images={[images["704"]].map(unpackImageData)}>
            <AspectRow>
              <AspectColumn>
                <LightboxPreview index={0} />
              </AspectColumn>
            </AspectRow>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <FlexCol px={4} alignItems="center" sx={{ textAlign: "center" }}>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          See the{" "}
          <Link href={PRICING_SHEET_DOC} target="_blank">
            full pricing sheet
          </Link>{" "}
          for more options and details!
        </Typography>
      </FlexCol>
      {/* <FlexCol alignItems="center" my={4}>
        <SubmitRequestButton />
      </FlexCol> */}
    </FlexCol>
  );
};

export default Commissions;

const Option = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    gap={2}
    width="100%"
    sx={{
      flexDirection: "column",
      px: 4,
    }}
  >
    {children}
  </Flex>
);

const InfoCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol
    className="info-col"
    alignItems="end"
    sx={{
      textAlign: "right",
    }}
  >
    {children}
  </FlexCol>
);

const PreviewCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol className="preview-col" mb={3}>
    {children}
  </FlexCol>
);

const SubmitRequestButton = ({
  href = "https://forms.gle/SuE2buZKXEZMnJvX7",
}: {
  href?: string;
}) => (
  <Button component="a" href={href} target="_blank" variant="outlined">
    Request A Slot
  </Button>
);
