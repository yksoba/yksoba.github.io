import { PageProps } from "gatsby";
import React from "react";
import { Header } from "../components/common/header";
import { Layout } from "../components/common/layout";
import { FullDivider } from "../components/common/misc";

const Page = ({ location }: PageProps) => {
  return (
    <Layout>
      <Header location={location} />
    </Layout>
  );
};

export default Page;
