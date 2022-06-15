import React from "react";
import { ReactNode } from "react";
import { Layout } from "../components/layout";
import { FlexCol, Flex } from "../components/flex";
import icon1 from "../images/comms/icon-1.png";
import icon2 from "../images/comms/icon-2.png";
import halfbody1 from "../images/comms/half-body-1.png";
import halfbody2 from "../images/comms/half-body-2.png";
import full1 from "../images/comms/full-1.png";
import full2 from "../images/comms/full-2.png";
import { Typography } from "@mui/material";
import { Link } from "gatsby";
import { useClientDims } from "../lib/use-client-dims";

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
          content={<Content imgsrcs={[icon1, icon2]} />}
        />
        <Panel
          imgsrc={halfbody1}
          bgpos="50%"
          cover={<Cover name="Half-Body" price="20" />}
          content={<Content imgsrcs={[halfbody1, halfbody2]} />}
        />
        <Panel
          imgsrc={full1}
          bgpos="70%"
          cover={<Cover name="Full-Body" price="30" />}
          content={<Content imgsrcs={[full1, full2]} />}
        />
      </Flex>
    </Layout>
  );
};

const Content = ({ imgsrcs }: { imgsrcs: string[] }) => {
  return (
    <FlexCol justifyContent="center" width="100%" px={6}>
      <MiniGallery imgsrcs={imgsrcs} />
    </FlexCol>
  );
};

const MiniGallery = ({ imgsrcs }: { imgsrcs: string[] }) => {
  const [ref, dims] = useClientDims();
  const size = dims.clientWidth / 2 - 8;

  return (
    <Flex width="100%" flexWrap="wrap" gap={1} ref={ref}>
      {imgsrcs.map((imgsrc, i) => (
        <Flex
          key={i}
          width={size}
          height={size}
          border={6}
          borderRadius={1}
          borderColor="white"
          sx={{
            background: `url("${imgsrc}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </Flex>
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
  content,
  cover,
  imgsrc,
  bgpos = "50%",
}: {
  content?: ReactNode;
  cover?: ReactNode;
  imgsrc: string;
  bgpos?: string;
}) => {
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

        "& #content": {
          opacity: "0",
          transition: "opacity 0.3s",
        },

        "&:hover #content": {
          opacity: "1",
        },
      }}
    >
      <Flex position="absolute" width="100%" height="100%">
        {cover}
      </Flex>
      <Flex position="absolute" width="100%" height="100%" id="content">
        {content}
      </Flex>
    </FlexCol>
  );
};

export default Commissions;
