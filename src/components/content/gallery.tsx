import React from "react";
import { BetterMasonry, Brick } from "../containers/better-masonry";
import { Box } from "@mui/material";
import { Header } from "../common/header";
import { MD } from "../common/theme";
import { ImageWrapper } from "../containers/image-wrapper";
import { useStaticQuery, graphql } from "gatsby";

export const Gallery = () => {
  const data: Queries.GalleryQuery = useStaticQuery(graphql`
    query Gallery {
      allFile(
        filter: { sourceInstanceName: { eq: "artworks" } }
        sort: { modifiedTime: DESC }
      ) {
        nodes {
          ...ImageDataFromFile
        }
      }
    }
  `);

  const imageNodes = data.allFile.nodes;
  return (
    <Box pt={8} px={0.25}>
      <BetterMasonry /* columns={[2, 3, 4]} gutter={4} stamp=".stamp" */>
        <Brick
          _debugTag="stamp"
          stamp
          sx={(theme) => ({
            position: "absolute",
            top: -64,
            [theme.breakpoints.down(MD)]: {
              left: 0,
              width: "100%",
            },
            [theme.breakpoints.up(MD)]: {
              left: "calc(25% + 2px)",
              width: "calc(50% - 4px)",
            },
          })}
        >
          <Header />
        </Brick>
        {imageNodes.map((node) => {
          const image = node.childImageSharp?.previewImage;
          const aspectRatio = image ? image.width / image.height : 1;

          return (
            <Brick
              aspectRatio={aspectRatio}
              _debugTag={node.name}
              key={node.name}
            >
              <ImageWrapper image={node} />
            </Brick>
          );
        })}
      </BetterMasonry>
    </Box>
  );
};
