import React from "react";
import {Flex, FlexCol} from "../../components/styled";
import {Box} from "@mui/material";
import {StaticImage} from "gatsby-plugin-image";

const Page = () => {
  return (
    <Flex
      col
      bgcolor="rgba(0,0,0,0.5)"
      gap={1}
      sx={{
        py: 4,
        px: 2,
        a: {
          color: "#AFF",
        },
        h3: {
          mt: 3,
        },
        maxWidth: "800px",
        width: "100%",
      }}
    >
      <h1>Previous Table Setups</h1>

      <h3>AC '26</h3>
      <Flex>
        <StaticImage
          src="../../static/conventions/portfolio/ac-2026.jpg"
          alt="Example of an 8ft table. From Anthrocon 2026."
        />
      </Flex>
      <h3>TFF '26</h3>

      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/tff-2026-1.jpg"
          alt="My table at TFF '26"
        />
      </Flex>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/tff-2026-2.jpg"
          alt="Lower angle view of my table"
        />
      </Flex>

      <h3>FurSquared '26</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/20260206_114921.jpg"
          alt="Rye (my partner) behind the table at FurSqared '26"
        />
      </Flex>

      <h3>Further Confusion '26</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/20260118_180019.jpg"
          alt="Rye (my partner) behind the table at FurtherConfusion '26"
        />
      </Flex>

      <h3>IndyFurCon '25</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/yksoba_16.jpg"
          alt="Soba (me) in fursuit behind the table at IndyFurCon '25"
        />
      </Flex>

      <h3>Anthrocon '25</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/table-ac-25.jpg"
          alt="Soba (me) and Rye (my partner) behind the table at Anthrocon '25"
        />
      </Flex>

      <h3>FurSquared '25</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/FurSquared 2025.JPG"
          alt="Soba (me) in fursuit behind the table at FurSquared '25"
        />
      </Flex>

      <h3>Further Confusion '25</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/FC 2025.jpg"
          alt="Soba (me) behind the table at Further Confusion '25"
        />
      </Flex>

      <h3>Anthrocon '24</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/image1.jpg"
          alt="Soba (me) behind the table at Anthrocon '24"
        />
        <StaticImage
          src="../../static/conventions/portfolio/image7.jpg"
          alt="Higher angle view of my table"
        />
      </Flex>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/image6.jpg"
          alt="Lower angle view of my table"
        />
      </Flex>

      <h3>MFF '23</h3>
      <Flex gap={1}>
        <StaticImage
          src="../../static/conventions/portfolio/image8.jpg"
          alt="My table at MFF '23"
        />
      </Flex>
    </Flex>
  );
};

export default Page;
