import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "yksoba",
    siteUrl: "https://yksoba.art/",
  },
  plugins: [
    "gatsby-plugin-transition-link",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "artworks",
        path: "./src/images/artworks/",
      },
    },
  ],
  graphqlTypegen: true
};

export default config;
