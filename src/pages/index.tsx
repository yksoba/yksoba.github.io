import React from "react";
import { Layout } from "../components/common/layout";
import { graphql, PageProps } from "gatsby";
import { Gallery } from "../components/content/gallery";
import { FullDivider } from "../components/common/misc";

import { Expander } from "../components/containers/expander";
import { Comms } from "../components/content/comms";
import { Section } from "../components/styled";
import { Link } from "@mui/material";
import { Contact } from "../components/content/contact";
import { getScrollParent } from "../lib/dom/get-scroll-parent";

const Home = () => {
  return (
    <Layout>
      <FullDivider id="gallery" />
      <Expander initialHeight="100vh">
        <Gallery />
      </Expander>
      <FullDivider id="commissions" />
      <Section sx={{ bgcolor: "rgba(0,0,0,0.5)" }}>
        <BackToTopLink />
        <Comms />
      </Section>
      <FullDivider id="contact" />
      <Section>
        <BackToTopLink />
        <Contact />
      </Section>
    </Layout>
  );
};

export const BackToTopLink = () => (
  <Link
    href="#"
    mt={1}
    onClick={(event) => {
      getScrollParent(event.currentTarget).scroll({ top: 0 });
    }}
  >
    Back to top ↑
  </Link>
);

export default Home;
