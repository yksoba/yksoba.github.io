import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  Box,
  ButtonBase,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Flex } from "../styled";
import { graphql } from "gatsby";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

//// COMPONENTS ////

const ImageViewerContext = createContext<{
  openModal?(i: number): void;
  closeModal?(): void;
  images: readonly ImageData[];
}>({ images: [] });

export const ImageViewerProvider = ({
  children,
  images,
}: PropsWithChildren<{ images: readonly ImageData[] }>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [openModal, closeModal] = useMemo(() => {
    let isModalOpen = false;
    const listener = () => {
      window.history.pushState(null, "", window.location.href);
      closeModal();
    };
    const closeModal = () => {
      if (isModalOpen) {
        window.removeEventListener("popstate", listener);
        window.history.back();
        isModalOpen = false;
      }
      setIsModalOpen(false);
    };
    const openModal = (i: number) => {
      if (!isModalOpen) {
        window.addEventListener("popstate", listener);
        window.history.pushState(null, "", window.location.href);
        isModalOpen = true;
      }
      setIsModalOpen(true);
      setIndex(i);
    };
    return [openModal, closeModal];
  }, []);

  return (
    <ImageViewerContext.Provider value={{ openModal, closeModal, images }}>
      {children}
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
            <Flex position="absolute">
              <VirtualizeSwipeableViews
                index={index}
                onChangeIndex={setIndex}
                slideCount={images.length}
                slideRenderer={({ key, index }) => (
                  <FullScreenViewer key={key} index={index} />
                )}
              />
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
              <Typography variant="h6">
                {unpackImageData(images[index]).modifiedTime}
              </Typography>
            </Box>
            <NavButton
              sx={{
                left: "0",
              }}
              disabled={index - 1 < 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ArrowBackIosNew />
            </NavButton>
            <NavButton
              sx={{
                right: "0",
              }}
              disabled={index + 1 >= images.length}
              onClick={() => setIndex((i) => i + 1)}
            >
              <ArrowForwardIos />
            </NavButton>
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
    </ImageViewerContext.Provider>
  );
};

export const ImageViewerThumbnail = ({ index }: { index: number }) => {
  const { openModal, images } = useContext(ImageViewerContext);
  const { alt, previewImage, highResImage } = unpackImageData(images[index]);

  return (
    previewImage && (
      <ButtonBase
        sx={{
          aspectRatio: `${previewImage.width}/${previewImage.height}`,
          height: "auto",
          width: "100%",
        }}
        onClick={highResImage && openModal ? () => openModal(index) : undefined}
      >
        <GatsbyImage alt={alt} image={previewImage} />
      </ButtonBase>
    )
  );
};

const FullScreenViewer = ({ index }: { index: number }) => {
  const { closeModal, images } = useContext(ImageViewerContext);
  const { highResImage, alt } = unpackImageData(images[index]);

  const imageAspectRatio = highResImage!.width / highResImage!.height;
  const windowAspectRatio =
    typeof window === "undefined" ? 1 : window.innerWidth / window.innerHeight;

  return (
    highResImage && (
      <Flex
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        onClick={closeModal}
      >
        <Box
          sx={[
            {
              aspectRatio: `${highResImage.width}/${highResImage.height}`,
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
          <GatsbyImage alt={alt} image={highResImage} />
        </Box>
      </Flex>
    )
  );
};

const NavButton = styled(ButtonBase)({
  position: "fixed",

  height: "100vh",
  width: "100px",
  maxWidth: "40vw",

  transition: "color .2s",
  color: "rgba(255,255,255,.2)",
  "&:hover": {
    color: "rgba(255,255,255,1)",
  },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0)",
  },
});

//// DATA MODEL ////

export type ImageData =
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

export const unpackImageData = (image: ImageData) => {
  let {
    childImageSharp,
    name = undefined,
    modifiedTime = undefined,
  } = (image && "childImageSharp" in image
    ? image
    : { childImageSharp: image }) ?? {};

  modifiedTime = modifiedTime?.slice(0, 10);
  const alt = name && modifiedTime ? `${modifiedTime} (${name})` : "image";

  const { previewImage = null, highResImage = null } = childImageSharp ?? {};

  return { modifiedTime, alt, previewImage, highResImage };
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
