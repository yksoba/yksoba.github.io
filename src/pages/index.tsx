import React, {ReactNode} from "react";
import {MainGallery} from "../components/content/gallery";
import {Divider2, Flex, FlexCol} from "../components/styled";
import {Box, Link, Theme, Typography, useMediaQuery} from "@mui/material";
import {StaticImage} from "gatsby-plugin-image";

const Home = () => {
  const isXS = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <FlexCol sx={{alignItems: "center", gap: 1}}>
      {/* {isXS && (
        <StaticImage
          src="../static/conventions/ac26-promo-4x3.jpg"
          alt="map showing yksoba at table g6 at anthrocon 2026"
        />
      )}
      {!isXS && (
        <Flex bgcolor="rgba(0,0,0,0.5)" width="100%" justifyContent="center">
          <Flex maxWidth="1200px">
            <StaticImage
              src="../static/conventions/ac26-promo-wide.jpg"
              alt="map showing yksoba at table g6 at anthrocon 2026"
            />
          </Flex>
        </Flex>
      )} */}
      <Typography variant="h3">FEATURED MERCH</Typography>
      <Flex>
        <ProductPreview
          href="https://yksoba.bigcartel.com/product/stargazer-zip-hoodie"
          title="Stargazer・💫 | Full-Zip Hoodie"
          image={
            <StaticImage
              src="../static/products/836f.png"
              alt="stargazer hoodie preview"
            />
          }
        />
        <ProductPreview
          href="https://yksoba.bigcartel.com/product/fox-bird-zip-hoodie"
          title="Fox & Bird・🦊🐦 | Full-Zip Hoodie"
          image={
            <StaticImage
              src="../static/products/799i.png"
              alt="fox & bird hoodie preview"
            />
          }
        />
      </Flex>
      <Divider2 />
      <Typography variant="h3">GALLERY</Typography>
      <MainGallery />
    </FlexCol>
  );
};

export default Home;

export const ProductPreview = ({
  title,
  image,
  href,
}: {
  title: ReactNode;
  image: ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    target="_blank"
    sx={{
      width: "50%",
      maxWidth: "500px",
      p: 0.5,
      fontSize: "1.2em",
      textTransform: "uppercase",
      color: "#FFF",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    {image}
    <Box
      sx={{
        mt: 1,
        width: "100%",
        textAlign: "center",
      }}
    >
      {title}
    </Box>
  </Link>
);
