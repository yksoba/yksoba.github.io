import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import MasonryLayout from "masonry-layout";
import { SxProps } from "@mui/system";
import { Box } from "@mui/material";

// Helper functions for computing layout values

const computeWidth = (columns: number, gutter: number, colSpan: number) =>
  `calc(${(colSpan * 100) / columns}% - ${
    gutter * (1 - colSpan / (columns + 1))
  }px)`;

const computeWidth2 = (
  columns: number | number[] | undefined,
  gutter: number,
  colSpan: number = 1
) =>
  typeof columns === "number"
    ? computeWidth(columns, gutter, colSpan)
    : Array.isArray(columns)
    ? columns.map((c) => computeWidth(c, gutter, colSpan))
    : undefined;

// Component
const MasonryContext = createContext<{
  columns?: number | number[];
  gutter: number;
}>({ gutter: 0 });

/**
 * Simple wrapper around masonry-layout that assumes the layout is static
 */
export const Masonry = ({
  children,
  columns,
  sx,
  onLayoutComplete,
  itemSelector = ".grid-item",
  gutter = 0,
  percentPosition = !!columns,
  ...layoutOptions
}: PropsWithChildren<
  MasonryLayout.Options & {
    gutter?: number;
    columns?: number | number[];
    sx?: SxProps;
    onLayoutComplete?: (laidOutItems: any[]) => void;
  }
>) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<MasonryLayout>();

  // Initialize Masonry
  useEffect(() => {
    if (gridRef.current) {
      layoutRef.current = new MasonryLayout(gridRef.current, {
        itemSelector,
        gutter,
        percentPosition,
        ...layoutOptions,
      });
    }
  }, [gridRef.current]);

  // Register Event Listeners
  useEffect(() => {
    if (layoutRef.current && onLayoutComplete) {
      layoutRef.current.on?.("layoutComplete", onLayoutComplete);
    }
  }, [layoutRef.current, onLayoutComplete]);

  // Update layout on parameter change
  useEffect(() => {
    layoutRef.current?.layout?.();
  }, [JSON.stringify(columns)]);

  // Calculate layout parameters
  const sizerWidth = computeWidth2(columns, gutter);

  return (
    <MasonryContext.Provider value={{ columns, gutter }}>
      <Box ref={gridRef} position="relative" sx={sx}>
        {sizerWidth && (
          <Box className="grid-sizer" sx={{ width: sizerWidth }} />
        )}
        {children}
      </Box>
    </MasonryContext.Provider>
  );
};

export const Brick = ({
  children,
  className = "grid-item",
  colSpan = 1,
}: React.PropsWithChildren<{
  className?: string;
  colSpan?: number;
}>) => {
  const { columns, gutter } = useContext(MasonryContext);

  // Calculate layout parameters
  const width = computeWidth2(columns, gutter, colSpan);

  return (
    <Box className={className} sx={{ width, mb: `${gutter}px` }}>
      {children}
    </Box>
  );
};
