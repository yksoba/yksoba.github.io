import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `yksoba homepage`,
    siteUrl: `https://yksoba.art/`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-transition-link",
    },
  ],
};

export default config;
