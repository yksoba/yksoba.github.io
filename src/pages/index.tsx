import React, { useRef } from "react";
import { Layout } from "../components/common/layout";
import { MainGallery } from "../components/content/gallery";
import { FullDivider } from "../components/common/misc";

import { Expander } from "../components/containers/expander";
import { Comms } from "../components/content/comms";
import { FlexCol, Section } from "../components/styled";
import { Contact } from "../components/content/contact";
import { Link, PageProps } from "gatsby";
import { useIntersection } from "react-use";
import { Box } from "@mui/material";
import { Header } from "../components/common/header";
import { StaticImage } from "gatsby-plugin-image";

const Home = (props: PageProps) => {
  return (
    <Layout>
      <Box component="header" bgcolor="black" p={1}>
        <StaticImage
          alt="YK_SOBA"
          src="../images/title.png"
          width={500}
          height={131}
          loading="eager"
          placeholder="none"
        />
        <FlexCol component="nav">
          <Link to="/">Gallery</Link>
        </FlexCol>
      </Box>
      <MainGallery />
    </Layout>
  );
};

export default Home;
