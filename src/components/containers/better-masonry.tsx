import { Box, BoxProps, useForkRef } from "@mui/material";
import React, {
  PropsWithChildren,
  PropsWithoutRef,
  useEffect,
  useRef,
} from "react";
import { Flex } from "../styled";
import { useMeasure } from "react-use";
import { Provider, useModel } from "./better-masonry-model";

/// COMPONENTS ///

export const BetterMasonry = (
  props: PropsWithChildren<{}> & PropsWithoutRef<BoxProps>
) => {
  return (
    <Provider>
      <BetterMasonryContainer {...props} />
    </Provider>
  );
};

const BetterMasonryContainer = ({
  children,
  ...boxProps
}: PropsWithChildren<{}> & PropsWithoutRef<BoxProps>) => {
  const [measureRef, { top, left, width, height }] = useMeasure();

  const model = useModel();

  // Update layout info
  useEffect(() => {
    model.updateContainer({ layout: { top, left, width, height } });
  }, [top, left, width, height]);

  return (
    <Box ref={measureRef} position="relative" {...boxProps}>
      {children}
    </Box>
  );
};

export const Brick = ({
  children,
  aspectRatio: _aspectRatio,
  stamp = false,
  _debugTag,
  style,
  ...boxProps
}: PropsWithChildren<{
  aspectRatio?: number;
  stamp?: boolean;
  _debugTag?: any;
}> &
  PropsWithoutRef<BoxProps>) => {
  const model = useModel();

  // Register brick
  const containerRef = useRef<HTMLElement>(null);
  const key = containerRef.current;

  useEffect(() => {
    if (!key) return;
    model.upsertItem(key);
    return () => model.removeItem(key);
  }, [key]);

  // Register props
  useEffect(() => {
    if (!key) return;
    model.upsertItem(key, { stamp: !!stamp, _debugTag });
  }, [key, stamp, _debugTag]);

  // Update layout info
  const [measureRef, { top, left, width, height }] = useMeasure();
  const aspectRatio = _aspectRatio ?? width / height;

  useEffect(() => {
    if (!key) return;
    model.upsertItem(key, {
      aspectRatio,
      layout: {
        top,
        left,
        width,
        height,
      },
    });
  }, [key, aspectRatio, top, left, width, height]);

  // Get computed layout
  const computedLayout = model.getComputedLayout(key);

  return (
    <Flex
      ref={containerRef}
      style={{
        ...style,
        ...(computedLayout
          ? {
              position: "absolute",
              left: `${computedLayout.left}px`,
              top: `${computedLayout.top}px`,
              width: `${computedLayout.width}px`,
              height: "auto",
              aspectRatio: `${Math.round(aspectRatio * 1000)} / 1000`,
            }
          : !stamp
          ? {
              opacity: 0,
            }
          : undefined),
      }}
      {...boxProps}
    >
      <Flex ref={measureRef}>{children}</Flex>
    </Flex>
  );
};
