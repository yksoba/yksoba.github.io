import { Theme, useMediaQuery } from "@mui/material";

export const useMobileQuery = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.only("mobile"));
};
