import React from "react";
import { Flex } from "./flex";
import { theme, SM, LG } from "./theme";

/**
 * Shared component across all pages.
 *
 * Details:
 * - Loads Metropolis font family
 * - Applies custom theme
 */
export const Footer = () => (
  <Flex
    sx={{
      opacity: "50%",
      m: 0.25,
      
      [theme.breakpoints.up(SM)]: {
        alignSelf: "center",
      },
      [theme.breakpoints.up(LG)]: {
        alignSelf: "start",
        position: "absolute",
        bottom: 0,
      },
    }}
  >
    © 2022
  </Flex>
);
