import React, { useRef } from "react";
import { Layout } from "../layouts";
import { MainGallery } from "../components/content/gallery";
import { FullDivider } from "../components/common/misc";

import { Expander } from "../components/containers/expander";
import { Comms } from "../components/content/comms";
import { Section } from "../components/styled";
import { Contact } from "../components/content/contact";
import { PageProps } from "gatsby";
import { useIntersection } from "react-use";
import { Box } from "@mui/material";
import { Header } from "../components/common/header";

const Home = (props: PageProps) => {
  return (
    <>
      <FullDivider id="gallery" />
      <Expander initialHeight="100vh">
        <MainGallery />
      </Expander>
      <FullDivider id="commissions" />
      <Section sx={{ bgcolor: "rgba(0,0,0,0.5)" }}>
        <Comms />
      </Section>
      <FullDivider id="contact" />
      <Section>
        <Contact />
      </Section>
    </>
  );
};

export default Home;
