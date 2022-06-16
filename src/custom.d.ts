import { Component, ReactNode } from "react";

declare module "*.jpg" {
  const uri: string;
  export = uri;
}

declare module "*.png" {
  const uri: string;
  export = uri;
}

declare module "gatsby-plugin-transition-link" {
  const TransitionLink: any;
  export = TransitionLink;

  export const TransitionState: Component<{
    children: (params: {
      transitionStatus: "entering" | "entered" | "exiting" | "exited";
    }) => ReactNode;
  }>;
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    desktop: true;
  }
}
