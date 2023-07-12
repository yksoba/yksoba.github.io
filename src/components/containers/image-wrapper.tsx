import React, { useMemo, useState } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
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
  const [openModal, closeModal] = useMemo(() => {
    const listener = () => {
      closeModal();
    };
    const closeModal = () => {
      window.removeEventListener("popstate", listener);
      window.history.back();
      setIsModalOpen(false);
    };
    const openModal = () => {
      window.addEventListener("popstate", listener);
      window.history.pushState(null, "", window.location.href);
      setIsModalOpen(true);
    };
    return [openModal, closeModal];
  }, []);

  const { childImageSharp, name = alt ?? "image" } =
    (image && "childImageSharp" in image
      ? image
      : { childImageSharp: image }) ?? {};
  const { previewImage = null, highResImage = null } = childImageSharp ?? {};
  if (!previewImage || !highResImage) return null;

  const imageAspectRatio = previewImage.width / previewImage.height;
  const windowAspectRatio = window.innerWidth / window.innerHeight;

  return (
    <>
      <ButtonBase
        sx={{
          aspectRatio: `${previewImage.width}/${previewImage.height}`,
          height: "auto",
          width: "100%",
        }}
        onClick={openModal}
      >
        <GatsbyImage alt={name} image={previewImage} />
      </ButtonBase>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <Box>
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
                sx={[
                  {
                    aspectRatio: `${previewImage.width}/${previewImage.height}`,
                    boxShadow: 24,
                  },
                  imageAspectRatio > windowAspectRatio
                    ? {
                        height: "auto",
                        width: "100vw",
                      }
                    : {
                        height: "100vh",
                        width: "auto",
                      },
                ]}
              >
                <GatsbyImage alt={name} image={highResImage} />
              </Box>
            </Flex>

            <IconButton
              color="primary"
              onClick={closeModal}
              sx={{
                position: "fixed",
                right: "0",
                top: "0",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

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
    childImageSharp {
      ...ImageData
    }
  }
`;
