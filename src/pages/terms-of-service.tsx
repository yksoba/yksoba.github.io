import { PageProps } from "gatsby";
import React from "react";
import { Header } from "../components/common/header";
import { Layout } from "../components/common/layout";
import { FullDivider } from "../components/common/misc";

const Page = (props: PageProps) => {
  return (
    <Layout pageProps={props}>
      <Header />
      <FullDivider />
    </Layout>
  );
};

export default Page;
