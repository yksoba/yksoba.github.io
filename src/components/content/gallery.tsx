import React, { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import { useStaticQuery, graphql } from "gatsby";
import { LightboxProvider, LightboxPreview } from "../containers/lightbox";
import { IGatsbyImageData } from "gatsby-plugin-image";
import _ from "lodash";
import { useIsSSR } from "../hooks/use-is-ssr";
import { useIntersection } from "react-use";

export const query = graphql`
  fragment ImageData on ImageSharp {
    previewImage: gatsbyImageData(
      placeholder: DOMINANT_COLOR
      layout: CONSTRAINED
    )
    highResImage: gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
  }
  fragment ImageDataFromFile on File {
    name
    modifiedTime
    childImageSharp {
      ...ImageData
    }
  }
`;

export const MainGallery = () => {
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

  const images = data.allFile.nodes.map(unpackImageData);

  const isSSR = useIsSSR();
  const columns = isSSR ? 1 : 2;

  return (
    <LightboxProvider images={images}>
      <Box
        pt={0.5}
        px={0.25}
        sx={{
          opacity: isSSR ? 0 : 1,
        }}
      >
        <Masonry columns={columns} spacing={0.5}>
          {images.map((_, i) => (
            <LightboxPreview key={i} index={i} />
          ))}
        </Masonry>
      </Box>
    </LightboxProvider>
  );
};

/////

type PackedImageData =
  | {
      previewImage: IGatsbyImageData;
      highResImage: IGatsbyImageData;
    }
  | {
      name: string;
      modifiedTime: string;
      childImageSharp: {
        previewImage: IGatsbyImageData;
        highResImage: IGatsbyImageData;
      } | null;
    }
  | null;

export const unpackImageData = (image: PackedImageData) => {
  const {
    childImageSharp,
    name = undefined,
    modifiedTime = undefined,
  } = (image && "childImageSharp" in image
    ? image
    : { childImageSharp: image }) ?? {};

  return {
    alt: name ?? "illustration",
    modifiedTime: modifiedTime?.slice(0, 10),
    previewImage: childImageSharp?.previewImage,
    highResImage: childImageSharp?.highResImage,
  };
};
