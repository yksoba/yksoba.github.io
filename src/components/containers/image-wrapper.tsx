import React, { useState } from "react";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  Box,
  ButtonBase,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Flex } from "../styled";
import { graphql } from "gatsby";

export const ImageWrapper = ({
  alt,
  image,
}: {
  alt?: string;
  image:
    | {
        previewImage: IGatsbyImageData;
        highResImage: IGatsbyImageData;
      }
    | {
        name: string;
        childImageSharp: {
          previewImage: IGatsbyImageData;
          highResImage: IGatsbyImageData;
        } | null;
      }
    | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { childImageSharp, name = alt ?? "image" } =
    (image && "childImageSharp" in image
      ? image
      : { childImageSharp: image }) ?? {};

  const { previewImage = null, highResImage = null } = childImageSharp ?? {};

  return (
    previewImage &&
    highResImage && (
      <>
        <ButtonBase
          sx={{
            aspectRatio: `${previewImage.width}/${previewImage.height}`,
            boxShadow: 2,
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <GatsbyImage alt={name} image={previewImage} />
        </ButtonBase>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={isModalOpen}>
            <Flex
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                alignItems: "start",
              }}
            >
              <Box
                sx={{
                  aspectRatio: `${previewImage.width}/${previewImage.height}`,
                  maxHeight: "100vh",
                  boxShadow: 24,
                }}
              >
                <GatsbyImage alt={name} image={getImage(highResImage)!} />
              </Box>
              <IconButton color="primary" onClick={() => setIsModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Flex>
          </Fade>
        </Modal>
      </>
    )
  );
};

export const query = graphql`
  fragment ImageData on ImageSharp {
    previewImage: gatsbyImageData(width: 800, placeholder: DOMINANT_COLOR)
    highResImage: gatsbyImageData(placeholder: BLURRED)
  }
  fragment ImageDataFromFile on File {
    name
    childImageSharp {
      ...ImageData
    }
  }
`;
