import { useForkRef } from "@mui/material";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { useMeasure } from "react-use";
import { Flex, FlexCol } from "../styled";
import { createImmerMethodsContext } from "../hooks/create-immer-context-methods";

type AutoHeightColumnState = {
  aspectRatio?: number;
};

const autoHeightContextInitialState = {
  children: new Map<HTMLDivElement, AutoHeightColumnState>(),
  targetWidths: undefined as Map<HTMLDivElement, number> | undefined,
};

const [useAutoHeightContext, AutoHeightContextProvider] =
  createImmerMethodsContext(
    {
      upsertChild(
        state,
        key: HTMLDivElement,
        child: AutoHeightColumnState = {}
      ) {
        const _child = state.children.get(key) ?? {};
        if (
          typeof _child.aspectRatio !== "number" ||
          isNaN(_child.aspectRatio) ||
          (typeof child.aspectRatio === "number" &&
            !isNaN(child.aspectRatio) &&
            Math.abs(_child.aspectRatio - child.aspectRatio) > 0.001)
        ) {
          _child!.aspectRatio = child.aspectRatio;
          state.targetWidths = undefined;
        }
        state.children.set(key, _child);
      },
      removeChild(state, key: HTMLDivElement) {
        state.children.delete(key);
        state.targetWidths = undefined;
      },
      computeWidths(state) {
        // Avoid redundant computation
        if (state.targetWidths) return;

        // Compute total width
        let totalWidth = 0;
        for (let item of state.children.values()) {
          if (typeof item.aspectRatio !== "number") {
            // Escape if not all children have sizes yet
            return;
          }
          totalWidth += item.aspectRatio!;
        }

        // Escape if sizes are NaN
        if (isNaN(1 / totalWidth)) return;

        // Compute percentage widths
        state.targetWidths = new Map<HTMLDivElement, number>();
        for (let [key, item] of state.children) {
          state.targetWidths.set(key, (100 * item.aspectRatio!) / totalWidth);
        }
      },
    },
    autoHeightContextInitialState
  );

export const AutoHeightGrid = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AutoHeightContextProvider>
      <Flex alignItems="center">{children}</Flex>
    </AutoHeightContextProvider>
  );
};

export const AutoHeightColumn = ({ children }: PropsWithChildren<{}>) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const [contextState, contextMethods] = useAutoHeightContext();

  const [measureRef, { width, height }] = useMeasure();

  const ref = useForkRef(contextRef, measureRef);

  // Register item with context
  const key = contextRef.current;
  useEffect(() => {
    if (key) {
      contextMethods.upsertChild(key);
      return () => contextMethods.removeChild(key);
    }
  }, [key]);

  // Update dimensions
  useEffect(() => {
    if (key) {
      contextMethods.upsertChild(key, { aspectRatio: width / height });
    }
  }, [key, width, height]);

  // Compute target width
  const targetWidth = key && contextState.targetWidths?.get(key);
  useEffect(() => {
    if (key && !targetWidth) contextMethods.computeWidths();
  });

  return (
    <FlexCol
      ref={ref}
      sx={{
        width: targetWidth && `${targetWidth}%`,
      }}
    >
      {children}
    </FlexCol>
  );
};
