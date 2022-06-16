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
  export default TransitionLink;
  export const TransitionState: Component<{
    children: (params: {
      transitionStatus: "entering" | "entered" | "exiting" | "exited";
    }) => ReactNode;
  }>;
}
