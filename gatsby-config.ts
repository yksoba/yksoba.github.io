import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: true
  },
  siteMetadata: {
    title: "yksoba",
    siteUrl: "https://yksoba.art/",
  },
  plugins: [
    "gatsby-plugin-transition-link",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        stripMetadata: false,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "artworks",
        path: "./src/images/artworks/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "misc",
        path: "./src/images/misc/",
      },
    },
  ],
  graphqlTypegen: true,
};

export default config;
