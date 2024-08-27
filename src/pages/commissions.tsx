import { Button, Link, Theme, Typography, useMediaQuery } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import { FlexCol, Flex, Divider2 } from "../components/styled";
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
import { Link as InternalLink } from "gatsby";

const Commissions = () => {
  const data: Queries.CommsQuery = useStaticQuery(graphql`
    query Comms {
      allFile(
        filter: {
          name: {
            in: [
              "542"
              "404-n"
              "593"
              "453"
              "575-2"
              "500"
              "507"
              "584-line"
              "521"
              "498"
              "471"
              "sessy"
              "597"
              "611.1-p"
              "600-a"
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
        Prices below are estimates for one character. For more options and
        multiple characters, please <Link href={"/contact"}>contact me</Link>
        {/* see the{" "}
        <Link href={PRICING_SHEET_DOC} target="_blank">
          full pricing sheet
        </Link> */}
        . All prices in USD.
      </Typography>

      <FlexCol gap={2} mt={1} alignItems="center">
        <Divider2 />
        <Link href={COMMS_TRELLO} target="_blank">
          Commissions Trello Board
        </Link>
        <Link href={INFO_SHEET_DOC} target="_blank">
          Commissions Info Sheet
        </Link>
        {/* <Link href={PRICING_SHEET_DOC} target="_blank">
          Pricing Sheet
        </Link> */}
        <Link href={TERMS_OF_SERVICE_DOC} target="_blank">
          Terms of Service
        </Link>
        <SubmitRequestButton />
        <Divider2 />
      </FlexCol>

      <Option>
        <InfoCol>
          <Typography variant="h2">Full-Body</Typography>
          <Typography variant="h3">200-300 USD</Typography>
          {/* <Typography variant="h3">Flat Style&nbsp;|&nbsp;120</Typography>
          <Typography variant="h3">Rendered Style&nbsp;|&nbsp;150</Typography>
          <Typography variant="h3">
            Rendered+Detailed Background&nbsp;|&nbsp;200
          </Typography> */}
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[images["600-a"], images["404-n"], images["593"]].map(
              unpackImageData
            )}
          >
            <AspectRow>
              <AspectColumn>
                <LightboxPreview index={0} />
                <LightboxPreview index={1} />
              </AspectColumn>
              <AspectColumn>
                <LightboxPreview index={2} />
              </AspectColumn>
            </AspectRow>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <Option>
        <InfoCol>
          <Typography variant="h2">Half-Body</Typography>
          <Typography variant="h3">150-200 USD</Typography>
          {/* <Typography variant="h3">Flat Style | 80</Typography> */}
          {/* <Typography variant="h3">Rendered Style | 100</Typography> */}
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[images["611.1-p"], images["453"]].map(unpackImageData)}
          >
            <AspectRow>
              <AspectColumn>
                <LightboxPreview index={0} />
              </AspectColumn>
              <AspectColumn>
                <LightboxPreview index={1} />
              </AspectColumn>
            </AspectRow>
          </LightboxProvider>
        </PreviewCol>
      </Option>
      <Divider2 />

      <Option>
        <InfoCol>
          <Typography variant="h2">
            Bust-Up / <br />
            Headshot
          </Typography>
          <Typography variant="h3">50-100 USD</Typography>
          {/* <Typography variant="h3">Flat Style | 50</Typography> */}
          {/* <Typography variant="h3">Rendered Style | 60</Typography> */}
        </InfoCol>
        <PreviewCol>
          <LightboxProvider
            images={[
              images["500"],
              images["507"],
              images["521"],
              images["498"],
            ].map(unpackImageData)}
          >
            <AspectColumn>
              <AspectRow>
                <AspectColumn>
                  <LightboxPreview index={0} />
                </AspectColumn>
                <AspectColumn>
                  <LightboxPreview index={1} />
                </AspectColumn>
              </AspectRow>
              <AspectRow>
                <AspectColumn>
                  <LightboxPreview index={2} />
                </AspectColumn>
                <AspectColumn>
                  <LightboxPreview index={3} />
                </AspectColumn>
              </AspectRow>
            </AspectColumn>
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
      <FlexCol alignItems="center" my={4}>
        <SubmitRequestButton />
      </FlexCol>
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
  <FlexCol className="preview-col">{children}</FlexCol>
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
