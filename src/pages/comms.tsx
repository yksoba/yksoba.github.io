import React from "react";
import { PropsWithChildren, ReactNode } from "react";
import { Layout } from "../components/layout";
import { Flex, FlexCol } from "../components/flex";
import icon1 from "../images/comms/icon-1.png";
import halfbody from "../images/comms/half-body.png";
import full1 from "../images/comms/full-1.png";
import { Typography } from "@mui/material";
import { Link } from "gatsby";

const Commissions = () => {
  return (
    <Layout>
      <title>yksoba - Commissions</title>

      <Flex
        width="0"
        height="fit-content"
        position="sticky"
        zIndex={1}
        left="0"
      >
        <FlexCol
          py={1.5}
          px={2}
          ml={2}
          mt={2}
          color="white"
          bgcolor="rgba(0,0,0,0.5)"
        >
          <Typography component="h1" variant="h3">
            Commissions
          </Typography>
          <Typography variant="subtitle1" mt={1} fontStyle="italic">
            Read the{" "}
            <Link to="" style={{ color: "white" }}>
              terms of service
            </Link>
            <br />
            All prices in USD
          </Typography>
        </FlexCol>
      </Flex>

      <Flex width="100%" gap={1} bgcolor="black">
        <Panel
          imgsrc={icon1}
          bgpos="65%"
          cover={<Cover name="Icon" price="10" />}
        />
        <Panel
          imgsrc={halfbody}
          bgpos="50%"
          cover={<Cover name="Half-Body" price="20" />}
        />
        <Panel
          imgsrc={full1}
          bgpos="70%"
          cover={<Cover name="Full-Body" price="30" />}
        />
      </Flex>
    </Layout>
  );
};

const Cover = ({ name, price }: { name: string; price: string }) => {
  return (
    <FlexCol justifyContent="end" p={3}>
      <Flex px={1.5} bgcolor="rgba(0,0,0,0.5)" color="white" fontSize="2em">
        {name} ${price}
      </Flex>
    </FlexCol>
  );
};

const Panel = ({
  children,
  cover,
  imgsrc,
  bgpos = "50%",
}: PropsWithChildren<{
  cover?: ReactNode;
  imgsrc: string;
  bgpos?: string;
}>) => {
  return (
    <FlexCol
      flexGrow={1}
      minWidth={250}
      overflow="clip"
      width="100%"
      height="100%"
      position="relative"
      sx={{
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",

          background: `url("${imgsrc}")`,
          backgroundSize: "cover",
          backgroundPosition: `${bgpos} 50%`,

          transition: "transform 0.2s, filter 0.2s",
        },

        "&:hover::before": {
          transform: "scale(110%)",
          filter: "brightness(0.5)",
        },
      }}
    >
      <Flex position="relative" width="100%" height="100%">
        {cover}
      </Flex>
    </FlexCol>
  );
};

export default Commissions;
