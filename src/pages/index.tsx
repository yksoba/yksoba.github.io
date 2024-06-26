import React, { useRef } from "react";
import { Layout } from "../components/common/layout";
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
  const commsRef = useRef<HTMLElement>(null);
  const { isIntersecting: isCommsXing = false } =
    useIntersection(commsRef, {
      rootMargin: "0% 0% -50% 0%",
    }) ?? {};

  const contactRef = useRef<HTMLElement>(null);
  const { isIntersecting: isContactXing = false } =
    useIntersection(contactRef, {
      threshold: 0.5,
    }) ?? {};

  const currentSection = isContactXing
    ? "contact"
    : isCommsXing
    ? "commissions"
    : "gallery";

  return (
    <Layout pageProps={props} currentSection={currentSection}>
      <FullDivider />
      <Header />
      <FullDivider id="gallery" />
      <Expander initialHeight="100vh">
        <MainGallery />
      </Expander>
      <FullDivider id="commissions" />
      <Section ref={commsRef} sx={{ bgcolor: "rgba(0,0,0,0.5)" }}>
        <Comms />
      </Section>
      <FullDivider id="contact" />
      <Section ref={contactRef}>
        <Contact />
      </Section>
    </Layout>
  );
};

export default Home;
