declare module "*.png" {
  const uri: string;
  export = uri;
}

declare module "*.svg" {
  const content: any;
  export = content;
}

declare module "gatsby-plugin-transition-link" {
  const TransitionLink: any;
  export = TransitionLink;

  export const TransitionState: (props: {
    children: (params: {
      transitionStatus: "entering" | "entered" | "exiting" | "exited";
    }) => any;
  }) => any;
}
