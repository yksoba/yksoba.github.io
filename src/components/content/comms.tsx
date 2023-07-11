import { Button, Link, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { PropsWithChildren } from "react";
import { ImageWrapper } from "../containers/image-wrapper";
import { FlexCol, Flex } from "../styled";
import { AutoHeightGrid, AutoHeightColumn } from "../containers/autosized";

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
    <FlexCol m={[0.5, 1]} gap={2}>
      <FlexCol mb={2} mt={4} sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
          Commissions
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          Read the <Link href="/terms-of-service">Terms of Service</Link>.
          Estimated prices below, final prices may differ. <br />
          All prices in USD.
        </Typography>
      </FlexCol>

      <Flex gap={2}>
        <InfoCol>
          <Typography variant="h3">Full-Body / Reference</Typography>
          <Typography variant="body1">Line Only | 60</Typography>
          <Typography variant="body1">Flat-Shaded | 80</Typography>
          <Typography variant="body1">Full-Color | 120</Typography>
          <Typography variant="body1">
            Full-Color + Background&nbsp;|&nbsp;180
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
      </Flex>

      <Flex gap={2}>
        <InfoCol>
          <Typography variant="h3">Half-Body</Typography>
          <Typography variant="body1">Line Only | 50</Typography>
          <Typography variant="body1">Flat-Shaded | 70</Typography>
          <Typography variant="body1">Full-Color | 100</Typography>
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
      </Flex>

      <Flex gap={2} mb={4}>
        <InfoCol>
          <Typography variant="h3">Bust-Up / Headshot</Typography>
          <Typography variant="body1">Line Only | 30</Typography>
          <Typography variant="body1">Flat-Shaded | 40</Typography>
          <Typography variant="body1">Full-Color | 80</Typography>
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
      </Flex>
    </FlexCol>
  );
};

const InfoCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol
    width={["40%", "35%"]}
    alignItems="end"
    sx={{
      textAlign: "right",
      "& h3": {
        fontSize: ["1.7rem", "2.4rem", "3rem"],
      },
      "& p": {
        fontSize: ["1rem", "1.15rem", "1.3rem"],
      },
    }}
  >
    {children}
  </FlexCol>
);

const PreviewCol = ({ children }: PropsWithChildren<{}>) => (
  <FlexCol width={["60%", "65%"]}>{children}</FlexCol>
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
