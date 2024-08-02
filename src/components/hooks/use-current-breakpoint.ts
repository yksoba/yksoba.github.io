import { Breakpoint, useMediaQuery } from "@mui/system";
import { theme } from "../../theme";
import _ from "lodash";

export const useCurrentBreakpoint = () => {
  const breakpoints = ["xs", "sm", "md", "lg", "xl"] as Breakpoint[];
  return _.last(
    breakpoints.filter((breakpoint) =>
      useMediaQuery(theme.breakpoints.up(breakpoint))
    )
  );
};
