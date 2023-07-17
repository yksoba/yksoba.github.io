import { Button, Link, Theme, Typography, useMediaQuery } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import {
  ImageData,
  ImageViewerProvider,
  ImageViewerThumbnail,
} from "../containers/image-viewer";
import { FlexCol, Flex } from "../styled";
import { AutoHeightGrid, AutoHeightColumn } from "../containers/autosized";
import { SM } from "../common/theme";
import { FullDivider } from "../common/misc";

export const Comms = () => {
  const data: Queries.CommsQuery = useStaticQuery(graphql`
    query Comms {
      allFile(
        filter: {
          name: {
            in: [
              "542"
              "588"
              "593"
              "453"
              "575b"
              "500"
              "507"
              "584-line"
              "521"
              "498"
              "471"
              "sessy"
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
      })}
      alignItems="center"
    >
      <FlexCol
        mb={2}
        mt={4}
        px={4}
        maxWidth="650px"
        alignItems="center"
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
          Commissions
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          Read the <Link href="/terms-of-service">Terms of Service</Link>.
          Prices below are estimates, final prices may differ. <br />
          All prices in USD.
        </Typography>
      </FlexCol>

      <Option>
        <InfoCol>
          <Typography variant="h3">
            Full-Body / {isXS || <br />}
            Reference
          </Typography>
          <Typography variant="body1">Line Only | 60</Typography>
          <Typography variant="body1">Flat-Shaded | 80</Typography>
          <Typography variant="body1">Full-Color | 120</Typography>
          <Typography variant="body1">
            Full-Color + Background&nbsp;|&nbsp;180
          </Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Full-Body/Reference" />
        </InfoCol>
        <PreviewCol images={[images["542"], images["588"], images["593"]]}>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={0} />
              <ImageViewerThumbnail index={1} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={2} />
            </AutoHeightColumn>
          </AutoHeightGrid>
        </PreviewCol>
      </Option>

      <Option>
        <InfoCol>
          <Typography variant="h3">Half-Body</Typography>
          <Typography variant="body1">Line Only | 50</Typography>
          <Typography variant="body1">Flat-Shaded | 70</Typography>
          <Typography variant="body1">Full-Color | 100</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Half-Body" />
        </InfoCol>
        <PreviewCol images={[images["453"], images["575b"]]}>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={0} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={1} />
            </AutoHeightColumn>
          </AutoHeightGrid>
        </PreviewCol>
      </Option>

      <Option>
        <InfoCol>
          <Typography variant="h3">
            Bust-Up / {isXS || <br />}
            Headshot
          </Typography>
          <Typography variant="body1">Line Only | 30</Typography>
          <Typography variant="body1">Flat-Shaded | 40</Typography>
          <Typography variant="body1">Full-Color | 80</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Bust-Up/Headshot" />
        </InfoCol>
        <PreviewCol
          images={[
            images["500"],
            images["507"],
            images["584-line"],
            images["521"],
            images["498"],
          ]}
        >
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={0} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={1} />
            </AutoHeightColumn>
          </AutoHeightGrid>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={2} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={3} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={4} />
            </AutoHeightColumn>
          </AutoHeightGrid>
        </PreviewCol>
      </Option>

      <FullDivider sx={{ mt: 2, width: "80%", alignSelf: "center" }} />
      <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
        Special
      </Typography>

      <Option>
        <InfoCol>
          <Typography variant="h3">Pet Animal Crossing OC</Typography>
          <Typography variant="body1">Flat-Shaded | 40</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=(Special)+Pet+Animal+Crossing+OC&entry.2129057693=Flat-Shaded" />
        </InfoCol>
        <PreviewCol images={[images["sessy"], images["471"]]}>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={0} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageViewerThumbnail index={1} />
            </AutoHeightColumn>
          </AutoHeightGrid>
        </PreviewCol>
      </Option>
    </FlexCol>
  );
};

const Option = ({ children }: PropsWithChildren<{}>) => (
  <Flex
    gap={2}
    sx={(theme) => ({
      [theme.breakpoints.down(SM)]: {
        flexDirection: "column-reverse",
        px: 4,
        pb: 4,
      },
    })}
  >
    {children}
  </Flex>
);

const InfoCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol
    className="info-col"
    width={["100%", "40%", "33%"]}
    alignItems="end"
    sx={{
      textAlign: "right",
      "& h3": {
        fontSize: ["2rem", "2.4rem", "3rem"],
      },
      "& p": {
        fontSize: [".99rem", "1.15rem", "1.3rem"],
      },
    }}
  >
    {children}
  </FlexCol>
);

const PreviewCol = ({
  children,
  images,
}: PropsWithChildren<{ images: readonly ImageData[] }>) => (
  <FlexCol className="preview-col" width={["100%", "60%", "66%"]}>
    <ImageViewerProvider images={images}>{children}</ImageViewerProvider>
  </FlexCol>
);

const SubmitRequestButton = ({ href }: { href: string }) => (
  <Button
    component="a"
    href={href}
    target="_blank"
    variant="outlined"
    sx={{
      mt: 1,
    }}
  >
    Submit Request
  </Button>
);
