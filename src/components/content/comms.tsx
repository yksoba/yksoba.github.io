import { Button, Link, Theme, Typography, useMediaQuery } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import { FlexCol, Flex, Divider2 } from "../styled";
import { LG, MD, SM } from "../common/theme";
import { FullDivider } from "../common/misc";
import { maxWidth } from "@mui/system";
import {
  AspectColumn,
  AspectContainer,
  AspectRow,
} from "../containers/aspectbox";
import {
  INFO_SHEET_DOC,
  PRICING_SHEET_DOC,
  TERMS_OF_SERVICE_DOC,
} from "../../constants";
import { LightboxPreview, LightboxProvider } from "../containers/lightbox";
import { unpackImageData } from "./gallery";

export const Comms = () => {
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

  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down(SM));

  return (
    <FlexCol
      m={[0.5, 1]}
      gap={2}
      pb={4}
      sx={(theme) => ({
        "& h2": {
          [theme.breakpoints.down(SM)]: {
            fontSize: "3rem",
          },
        },
        maxWidth: "800px",
      })}
    >
      <FlexCol mt={4} px={4} alignItems="center" sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
          Commissions
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", mt: 2 }}>
          Prices below are estimates for one character. For more options and
          multiple characters, see the{" "}
          <Link href={PRICING_SHEET_DOC} target="_blank">
            full pricing sheet
          </Link>
          . All prices in USD.
        </Typography>
      </FlexCol>

      <FlexCol gap={2} alignItems="center">
        <Divider2 />
        <Link href={INFO_SHEET_DOC} target="_blank">
          Commissions Info Sheet
        </Link>
        <Link href={PRICING_SHEET_DOC} target="_blank">
          Pricing Sheet
        </Link>
        <Link href={TERMS_OF_SERVICE_DOC} target="_blank">
          Terms of Service
        </Link>
        <SubmitRequestButton />
        <Divider2 />
      </FlexCol>

      <Option>
        <InfoCol>
          <Typography variant="h3">Full-Body</Typography>
          <Typography variant="body1">Flat Colors&nbsp;|&nbsp;120</Typography>
          <Typography variant="body1">Shaded&nbsp;|&nbsp;150</Typography>
          <Typography variant="body1">
            Shaded+Detailed Background&nbsp;|&nbsp;200
          </Typography>
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
          <Typography variant="h3">Half-Body</Typography>
          <Typography variant="body1">Flat Colors | 80</Typography>
          <Typography variant="body1">Shaded | 100</Typography>
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
          <Typography variant="h3">
            Bust-Up / <br />
            Headshot
          </Typography>
          <Typography variant="body1">Flat Colors | 50</Typography>
          <Typography variant="body1">Shaded | 60</Typography>
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
          for more options!
        </Typography>
      </FlexCol>
      <FlexCol px={4} alignItems="center" sx={{ textAlign: "center" }}>
        <SubmitRequestButton />
      </FlexCol>
    </FlexCol>
  );
};

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
      "& h3": {
        fontSize: "3rem",
      },
      "& p": {
        fontSize: "1.5rem",
      },
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
