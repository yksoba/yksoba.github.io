import React from "react";
import { Brick, Masonry } from "../containers/masonry";
import { Box, Theme, useMediaQuery } from "@mui/material";
import { Header } from "../common/header";
import { SM, MD } from "../common/theme";
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
  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down(SM));

  return (
    <Box pt={0.5} px={0.25}>
      <Masonry columns={[2, 3, 4]} gutter={4} stamp=".stamp">
        {/* <Box
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
        </Box> */}
        {imageNodes.map((node) => {
          const image = node.childImageSharp?.previewImage;
          const aspectRatio = image ? image.width / image.height : 1;
          let colSpan = Math.max(1, Math.round(aspectRatio));
          if (isXS) colSpan = Math.min(2, colSpan);

          return (
            <Brick colSpan={colSpan} key={node.name}>
              <ImageWrapper image={node} />
            </Brick>
          );
        })}
      </Masonry>
    </Box>
  );
};
