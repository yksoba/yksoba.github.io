import React, { useMemo, useState } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  Box,
  ButtonBase,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Typography,
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
        modifiedTime: string;
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
      window.history.pushState(null, "", window.location.href);
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

  let {
    childImageSharp,
    name = undefined,
    modifiedTime = undefined,
  } = (image && "childImageSharp" in image
    ? image
    : { childImageSharp: image }) ?? {};
  modifiedTime = modifiedTime?.slice(0, 10);

  const { previewImage = null, highResImage = null } = childImageSharp ?? {};
  if (!previewImage || !highResImage) return null;

  const imageAspectRatio = previewImage.width / previewImage.height;
  const windowAspectRatio =
    typeof window === "undefined" ? 1 : window.innerWidth / window.innerHeight;

  const _alt = alt
    ? alt
    : name && modifiedTime
    ? `${modifiedTime} (${name})`
    : "image";

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
        <GatsbyImage alt={_alt} image={previewImage} />
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
                <GatsbyImage alt={_alt} image={highResImage} />
              </Box>
            </Flex>
            <Box
              sx={{
                position: "fixed",
                ml: 2,
                mt: 2,
                px: 1,
                bgcolor: "rgba(0,0,0,0.25)",
              }}
            >
              <Typography variant="h6">{modifiedTime}</Typography>
            </Box>
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
    modifiedTime
    childImageSharp {
      ...ImageData
    }
  }
`;
