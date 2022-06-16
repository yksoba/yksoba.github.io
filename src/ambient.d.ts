declare module "*.png" {
  const uri: string;
  export = uri;
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
