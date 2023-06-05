import React from "react";
import { Divider, Typography } from "@mui/material";
import { Layout } from "../components/layout";
import { Flex, FlexCol, Img } from "../components/flex";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { graphql, PageProps } from "gatsby";
import { Brick, Masonry } from "../components/masonry";
import { Box } from "@mui/system";
import { NavLink } from "../components/navbar";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Gallery = ({ data }: PageProps<Queries.GalleryPageQuery>) => {
  const imageNodes = data.allFile.nodes;
  return (
    <Layout>
      <Masonry columns={[2, 3, 4]} gutter={4} stamp=".stamp">
        <Box
          className="stamp"
          sx={{
            position: "absolute",
            left: [0, 0, "calc(25vw + 2px)"],
            width: ["100vw", "100vw", "calc(50vw - 4px)"],
            mb: "4px",
          }}
        >
          <Header />
        </Box>
        {imageNodes.map((node) => (
          <ImageWrapper node={node} key={node.name} />
        ))}
      </Masonry>
    </Layout>
  );
};

const ImageWrapper = ({
  node,
}: {
  node: Queries.GalleryPageQuery["allFile"]["nodes"][number];
}) => {
  const image = getImage(node.childImageSharp)!;
  const aspectRatio = image.width / image.height;
  const colSpan = Math.max(1, Math.round(aspectRatio));
  return (
    <Brick colSpan={colSpan}>
      <GatsbyImage alt={node.name} image={getImage(node.childImageSharp)!} />
    </Brick>
  );
};

const NavDivider = () => (
  <Divider
    orientation="vertical"
    variant="middle"
    flexItem
    sx={{ bgcolor: "secondary.light" }}
  />
);

const Header = () => (
  <FlexCol sx={{ alignItems: "center", mt: 2, mb: 2 }}>
    <Flex sx={{ px: 1.5, maxWidth: 550 }}>
      <StaticImage alt="YK_SOBA" src="../images/title.png" />
    </Flex>
    <Flex gap={1} mt={0.5} alignItems="center">
      <NavLink to="commissions">Commissions</NavLink>
      <NavDivider />
      <NavLink to="shop">Shop</NavLink>
      <NavDivider />
      <Link
        href="https://twitter.com/yk_soba"
        target="_blank"
        sx={{ display: "flex" }}
      >
        <TwitterIcon />
      </Link>
      <Link
        href="mailto:the.yk.soba@gmail.com"
        target="_blank"
        sx={{ display: "flex" }}
      >
        <EmailIcon />
      </Link>
    </Flex>
  </FlexCol>
);

export default Gallery;

export const query = graphql`
  query GalleryPage {
    allFile(
      filter: { sourceInstanceName: { eq: "artworks" } }
      sort: { modifiedTime: DESC }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: DOMINANT_COLOR)
        }
      }
    }
  }
`;
