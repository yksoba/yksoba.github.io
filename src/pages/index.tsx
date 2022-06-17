import React, { useEffect } from "react";
import { Layout } from "../components/layout";
import { navigate } from "gatsby";

const HomePage = () => {
  useEffect(() => {
    // Redirect to comms
    if (window) navigate("/comms");
  }, []);
  return (
    <Layout>
      <title>yksoba</title>
    </Layout>
  );
};

export default HomePage;
