import React, {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Box, BoxProps } from "@mui/material";

export const AspectContainer = ({
  children,
  direction,
  style,
  sx,
  ...boxProps
}: PropsWithChildren<{ direction: "row" | "column" }> & BoxProps) => {
  const ref = useRef<HTMLElement>(null);

  const [aspectRatio, setAspectRatio] = useState<string>("auto");

  const recomputeAspectRatio = useCallback(() => {
    if (!ref.current) return;

    console.info("Recomputing container aspect ratio");

    const children = ref.current.children;
    const childrenArray = new Array(children.length)
      .fill(0)
      .map((_, i) => children.item(i)!);
    const childARs = childrenArray
      .map(getAspectRatioForElement)
      .filter((ar) => ar) as (readonly [number, number])[];

    const newAR = computeContainerAspectRatio(childARs, direction);
    setAspectRatio(newAR);
  }, []);

  const mutationObserver = useMemo(() => {
    if (typeof window === "undefined") return null;

    const childMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          recomputeAspectRatio();
        }
      });
    });
    return new MutationObserver((mutations) =>
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) =>
            childMutationObserver.observe(node, { attributeFilter: ["style"] })
          );
        }
      })
    );
  }, []);

  useEffect(() => {
    if (ref.current && typeof window !== "undefined") {
      mutationObserver?.observe(ref.current, { childList: true });
      recomputeAspectRatio();
    }
  }, [ref.current]);

  return (
    <Box
      ref={ref}
      style={{ ...style, aspectRatio }}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        { display: "flex", flexDirection: direction },
      ]}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export const AspectRow = (props: BoxProps) => (
  <AspectContainer direction="row" {...props} />
);

export const AspectColumn = (props: BoxProps) => (
  <AspectContainer direction="column" {...props} />
);

/////

const parseAspectRatio = (aspectRatio: string) => {
  if (aspectRatio === "auto") {
    return null;
  }

  const parts = aspectRatio.split("/");
  if (parts.length == 1) {
    return [+parts[0], 1] as const;
  } else {
    return [+parts[0], +parts[1]] as const;
  }
};

const getAspectRatioForElement = (element: Element) => {
  const style = window.getComputedStyle(element);
  return parseAspectRatio(style.aspectRatio);
};

const computeContainerAspectRatio = (
  childAspectRatios: (readonly [number, number])[],
  direction: "row" | "column"
) => {
  if (childAspectRatios.length == 0) {
    return "auto";
  }
  if (direction == "row") {
    return `${childAspectRatios
      .map(([w, h]) => w / h)
      .reduce((a, b) => a + b, 0)}`;
  } else {
    return `${
      1 / childAspectRatios.map(([w, h]) => h / w).reduce((a, b) => a + b, 0)
    }`;
  }
};
