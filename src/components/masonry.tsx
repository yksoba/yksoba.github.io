import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import MasonryLayout from "masonry-layout";
import _Packery, { PackeryOptions, Packery as PackeryType } from "packery";
import { Box } from "@mui/system";

const Packery = _Packery as unknown as new (
  element: Element,
  options?: PackeryOptions
) => PackeryType;

// Helper functions for computing layout values

const computeWidth = (columns: number, gutter: number, colSpan: number) =>
  `calc(${(colSpan * 100) / columns}% - ${
    (gutter * (columns - 1)) / columns
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
  itemSelector = ".grid-item",
  gutter = 0,
  percentPosition = !!columns,
  ...layoutOptions
}: PropsWithChildren<
  MasonryLayout.Options & {
    gutter?: number;
    columns?: number | number[];
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

  // Update layout on parameter change
  useEffect(() => {
    layoutRef.current?.layout?.();
  }, [JSON.stringify(columns)]);

  // Calculate layout parameters
  const sizerWidth = computeWidth2(columns, gutter);

  return (
    <MasonryContext.Provider value={{ columns, gutter }}>
      <div ref={gridRef}>
        {sizerWidth && (
          <Box className="grid-sizer" sx={{ width: sizerWidth }} />
        )}
        {children}
      </div>
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
