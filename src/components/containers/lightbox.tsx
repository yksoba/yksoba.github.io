import React, {
  PropsWithChildren,
  Ref,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import {
  Backdrop,
  Box,
  ButtonBase,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BehaviorSubject,
  Observable,
  Subject,
  first,
  firstValueFrom,
  takeWhile,
  timeout,
} from "rxjs";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWindowSize } from "react-use";

interface ImageData {
  alt?: string;
  modifiedTime?: string;
  previewImage?: IGatsbyImageData;
  highResImage?: IGatsbyImageData;
}

interface LightboxContext {
  images: ImageData[];
  isOpen: boolean;
  currentIndex: number;
  nextIndex: number;

  sliderRef: Ref<Slider>;
  afterChange(index: number): void;
  beforeChange(oldindex: number, newIndex: number): void;

  open(index?: number): void;
  close(): void;
}

const LightboxContext = createContext<LightboxContext>({
  images: [],
  isOpen: false,
  currentIndex: 0,
  nextIndex: 0,

  sliderRef() {},
  afterChange() {},
  beforeChange() {},

  open() {},
  close() {},
});

const useLightboxProviderContext = (images: ImageData[]) => {
  const [isOpen, _setIsOpen] = useState(false);
  const [currentIndex, _setCurrentIndex] = useState(0);
  const [nextIndex, _setNextIndex] = useState(0);
  const _sliderObs = useMemo(
    () => new BehaviorSubject<Slider | null>(null),
    []
  );
  const _nextSlider = () =>
    _sliderObs.pipe(first((value) => !!value)) as Observable<Slider>;

  const _onPopState = useCallback(() => {
    window.history.pushState(null, "", window.location.href);
    close();
  }, []);

  const open = useCallback((index?: number) => {
    if (typeof index === "number")
      _nextSlider().subscribe((slider) => slider?.slickGoTo(index, true));

    _setIsOpen((isOpen) => {
      if (!isOpen) {
        window.addEventListener("popstate", _onPopState);
        window.history.pushState(null, "", window.location.href);
      }
      return true;
    });
  }, []);

  const close = useCallback(() => {
    _setIsOpen((isOpen) => {
      if (isOpen) {
        window.removeEventListener("popstate", _onPopState);
        window.history.back();
      }
      return false;
    });
  }, []);

  const sliderRef = useCallback((slider: Slider | null) => {
    _sliderObs.next(slider);
  }, []);
  const afterChange = useCallback((index: number) => {
    _setCurrentIndex(index);
  }, []);
  const beforeChange = useCallback((oldIndex: number, newIndex: number) => {
    _setCurrentIndex(oldIndex);
    _setNextIndex(newIndex);
  }, []);

  const context: LightboxContext = {
    images,
    isOpen,
    currentIndex,
    nextIndex,
    sliderRef,
    beforeChange,
    afterChange,
    open,
    close,
  };

  return context;
};

const useLightboxContext = () => useContext(LightboxContext);

const LightboxImageWrapper: React.FC<{
  image: ImageData;
  isCurrent: boolean;
}> = ({ image, isCurrent }) => {
  const context = useLightboxContext();

  const windowSize = useWindowSize();
  const windowAspectRatio = windowSize.width / windowSize.height;
  const imageAspectRatio =
    image.highResImage!.width / image.highResImage!.height;

  const pillarBoxed = imageAspectRatio < windowAspectRatio;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onClick={(e) => e.target === e.currentTarget && context.close()}
    >
      <Box
        sx={[
          {
            mx: 1,
            bgcolor: "black",
            aspectRatio: `${image.highResImage!.width} / ${
              image.highResImage!.height
            }`,
          },
          pillarBoxed
            ? { width: "auto", height: "100vh" }
            : {
                height: "auto",
                width: "100vw",
              },
        ]}
      >
        <GatsbyImage
          alt={image.alt ?? "image"}
          image={image.highResImage!}
          style={{ transition: "opacity .2s", opacity: isCurrent ? 1 : 0.75 }}
        />
      </Box>
    </Box>
  );
};

const Lightbox = () => {
  const context = useLightboxContext();
  const currentImage = context.images[context.currentIndex];
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={context.isOpen}
      onClose={context.close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={context.isOpen}>
        <Box
          sx={{ width: "100vw", height: "100vh" }}
          onClick={(e) => e.target === e.currentTarget && context.close()}
        >
          <Slider
            ref={context.sliderRef}
            afterChange={context.afterChange}
            beforeChange={context.beforeChange}
            centerMode
            variableWidth
            infinite={false}
          >
            {context.images.map(
              (image, index) =>
                image?.highResImage && (
                  <LightboxImageWrapper
                    image={image}
                    isCurrent={context.nextIndex == index}
                  />
                )
            )}
          </Slider>
          <IconButton
            color="primary"
            onClick={context.close}
            sx={{
              position: "fixed",
              right: "0",
              top: "0",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              position: "fixed",
              left: 0,
              top: 0,
              ml: 2,
              mt: 2,
              px: 1,
              bgcolor: "rgba(0,0,0,0.25)",
            }}
          >
            <Typography variant="h6">
              {currentImage.modifiedTime?.slice(0, 10) +
                (currentImage.alt ? ` (${currentImage.alt})` : "")}
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export const LightboxProvider = ({
  images,
  children,
}: PropsWithChildren<{
  images: ImageData[];
}>) => {
  const context = useLightboxProviderContext(images);
  return (
    <LightboxContext.Provider value={context}>
      <Lightbox />
      {children}
    </LightboxContext.Provider>
  );
};

export const LightboxPreview = ({ index }: { index: number }) => {
  const context = useLightboxContext();
  const image = context.images[index];

  return image.previewImage ? (
    <ButtonBase
      sx={{
        aspectRatio: `${image.previewImage.width} / ${image.previewImage.height}`,
      }}
      onClick={() => context.open(index)}
    >
      <GatsbyImage alt={image.alt ?? "image"} image={image.previewImage} />
    </ButtonBase>
  ) : null;
};
