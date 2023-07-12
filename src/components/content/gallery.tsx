import React from "react";
import { Brick, Masonry } from "../containers/masonry";
import { Box } from "@mui/material";
import { Header } from "../common/header";
import { MD } from "../common/theme";
import { ImageWrapper } from "../containers/image-wrapper";
import { getImage } from "gatsby-plugin-image";
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
      <Masonry columns={[2, 3, 4]} gutter={4} stamp=".stamp">
        <Box
          className="stamp"
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
        </Box>
        {imageNodes.map((node) => {
          const image = node.childImageSharp?.previewImage;
          const aspectRatio = image ? image.width / image.height : 1;
          const colSpan = Math.max(1, Math.round(aspectRatio));

          return (
            <Brick colSpan={colSpan} key={node.name}>
              <ImageWrapper alt={node.name} image={node.childImageSharp} />
            </Brick>
          );
        })}
      </Masonry>
    </Box>
  );
};
