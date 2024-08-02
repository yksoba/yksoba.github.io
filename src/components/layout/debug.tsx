import { Box } from "@mui/system";
import React, { useContext } from "react";
import { LayoutContext } from "../../layouts";
import { useCurrentBreakpoint } from "../hooks/use-current-breakpoint";

export const Debug = () => {
  const currentBreakpoint = useCurrentBreakpoint();
  const layout = useContext(LayoutContext);
  return (
    <Box zIndex={10} bgcolor="#00f" position="fixed" sx={{ opacity: 0.75 }}>
      <b>Debug</b>
      <br />
      Path: {layout?.path}
      <br />
      Breakpoint: {currentBreakpoint}
    </Box>
  );
};

