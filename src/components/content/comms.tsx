import { Button, Link, Theme, Typography, useMediaQuery } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React, { PropsWithChildren } from "react";
import { ImageWrapper } from "../containers/image-wrapper";
import { FlexCol, Flex } from "../styled";
import { AutoHeightGrid, AutoHeightColumn } from "../containers/autosized";
import { LG, MD, SM } from "../common/theme";
import { FullDivider } from "../common/misc";
import { maxWidth } from "@mui/system";

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
              "597"
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
          <Typography variant="body1">Line Only | 30</Typography>
          <Typography variant="body1">Flat-Shaded | 50</Typography>
          <Typography variant="body1">Full-Color | 80</Typography>
          <Typography variant="body1">
            Full-Color + Background&nbsp;|&nbsp;120
          </Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Full-Body/Reference" />
        </InfoCol>
        <PreviewCol>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageWrapper image={images["542"]} />
              <ImageWrapper image={images["588"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["593"]} />
            </AutoHeightColumn>
          </AutoHeightGrid>
        </PreviewCol>
      </Option>

      <Option>
        <InfoCol>
          <Typography variant="h3">Half-Body</Typography>
          <Typography variant="body1">Line Only | 20</Typography>
          <Typography variant="body1">Flat-Shaded | 40</Typography>
          <Typography variant="body1">Full-Color | 70</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Half-Body" />
        </InfoCol>
        <PreviewCol>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageWrapper image={images["453"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["575b"]} />
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
          <Typography variant="body1">Line Only | 10</Typography>
          <Typography variant="body1">Flat-Shaded | 30</Typography>
          <Typography variant="body1">Full-Color | 60</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=Bust-Up/Headshot" />
        </InfoCol>
        <PreviewCol>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageWrapper image={images["500"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["507"]} />
            </AutoHeightColumn>
          </AutoHeightGrid>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageWrapper image={images["584-line"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["521"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["498"]} />
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
          <Typography variant="h3">YCH</Typography>
          <Typography variant="body1">
            Full-Color + Background&nbsp;|&nbsp;100
          </Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSdoLiGr_XH75ixZI-KXsjDysbm7exeGBOeNrHlFIS92h9ksLQ/viewform?usp=sf_link" />
        </InfoCol>
        <PreviewCol>
          <Flex
            sx={(theme) => ({
              [theme.breakpoints.up(MD)]: {
                maxWidth: "50vw",
              },
              [theme.breakpoints.up(LG)]: {
                maxWidth: "33vw",
              },
            })}
          >
            <ImageWrapper image={images["597"]} />
          </Flex>
        </PreviewCol>
      </Option>

      <Option>
        <InfoCol>
          <Typography variant="h3">Pet Animal Crossing OC</Typography>
          <Typography variant="body1">Flat-Shaded | 40</Typography>
          <SubmitRequestButton href="https://docs.google.com/forms/d/e/1FAIpQLSflH2ZHvjNFfAsXCJY9ddRMdJT1_cx9mck_n6teXIfifWE4iQ/viewform?usp=pp_url&entry.1764984693=(Special)+Pet+Animal+Crossing+OC&entry.2129057693=Flat-Shaded" />
        </InfoCol>
        <PreviewCol>
          <AutoHeightGrid>
            <AutoHeightColumn>
              <ImageWrapper image={images["sessy"]} />
            </AutoHeightColumn>
            <AutoHeightColumn>
              <ImageWrapper image={images["471"]} />
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
    width="100%"
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

const PreviewCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol className="preview-col" width={["100%", "60%", "66%"]}>
    {children}
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
