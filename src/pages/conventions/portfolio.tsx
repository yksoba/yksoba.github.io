import {PageProps} from "gatsby";
import React from "react";
import {Header} from "../../components/layout/header";
import {Layout} from "../../layouts";
import {Container, Link, Typography, Box} from "@mui/material";
import {useEffectOnce} from "react-use";
import {Divider2, Flex, FlexCol} from "../../components/styled";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import {Helmet} from "react-helmet";

const Page = (props: PageProps) => {
  return (
    <>
      <Flex
        col
        bgcolor="rgba(0,0,0,0.5)"
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
        <Typography variant="h1">Conventions Portfolio</Typography>

        <p>
          I’m Soba! As a Korean-American furry artist, I specialize in cute
          concepts and bright colors, blending elements from both east-asian
          aesthetics and western furry culture!
        </p>
        <p>
          Be sure to check out my gallery at <AutoLink href="yksoba.art" />, as
          well as my socials <AutoLink href="t.me/yksobaart" /> and/or{" "}
          <AutoLink href="bsky.app/profile/yksoba.art" /> for the latest art and
          updates!
        </p>

        <Divider2 />
        <Typography variant="h2">Table Setup</Typography>
        <p>
          Here are some representative examples of my table setups for both 8ft
          and 4ft! If you'd like to see more, you can find a full archive <a href="/conventions/past-tables/">here</a>.
        </p>

        <Typography variant="subtitle1">
          8ft table example from Anthrocon 2026
        </Typography>
        <Flex width="100%" mb={2}>
          <StaticImage
            src="../../static/conventions/portfolio/ac-2026.jpg"
            alt="Example of an 8ft table. From Anthrocon 2026."
          />
        </Flex>

        <Typography variant="subtitle1">
          4ft table example from TFF 2026
        </Typography>
        <Flex width="100%" mb={2}>
          <StaticImage
            src="../../static/conventions/portfolio/tff-2026-2.jpg"
            alt="Example of an 4ft table. From TFF 2026."
          />
        </Flex>

        <Divider2 />
        <Typography variant="h2">Merch</Typography>
        <p>
          Here's a closer look at some of my merch! I primarily sell apparel and
          prints, but I also have some smaller items like stickers and
          keychains! You can find more examples at{" "}
          <AutoLink href="yksoba.bigcartel.com" />.
        </p>
        <Flex col gap={1} mb={2}>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/fox bird.png"}
                alt={"Fox & Bird Hoodie"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/stargazer.png"}
                alt={"Stargazer Hoodie"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/deer hana.png"}
                alt={"Deer & Maple Hoodie"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/fox lotus.jpg"}
                alt={"Fox & Lotus T-Shirt"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/no work.jpg"}
                alt={"No Work Only Puppy Print"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/boba prints.png"}
                alt={"Boba Prints"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <StaticImage
              src={"../../static/conventions/portfolio/image4.jpg"}
              alt={
                "Three prints (in order from left to right): fox about to bite into a watermelon; a wolf playing with a foxes ears; a fox touching the nose of another dog"
              }
            />
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/tug charms.png"}
                alt={"Tug Toy Keychains"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/rolling charms.png"}
                alt={"Rolling Around Keychains"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/marble foxes.JPG"}
                alt={"Marble Foxes stickers"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/image5.jpg"}
                alt={
                  "Two stickers of canids sitting and holding pride flags in their mouths"
                }
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider2 />
        <Typography variant="h2">Commissions</Typography>
        <p>
          I also offer sketch commissions at for at-con pickup! I like to do my
          sketch comms using brush pen on shikishi boards, which are popular in
          Japan!
        </p>
        <Flex col gap={1} mb={2}>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/sketch comm 1.jpg"}
                alt={"sketch commission"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/sketch comm 2.jpg"}
                alt={"sketch commission"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/sketch comm 3.jpg"}
                alt={"sketch commission"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/sketch comm 4.jpg"}
                alt={"sketch commission"}
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider2 />
        <Typography variant="h2">More Info</Typography>
        <p>
          Be sure to check out my gallery at <AutoLink href="yksoba.art" />, as
          well as my socials <AutoLink href="t.me/yksobaart" /> and/or{" "}
          <AutoLink href="bsky.app/profile/yksoba.art" /> for the latest art and
          updates!
        </p>
      </Flex>
    </>
  );
};

const AutoLink = ({href}: {href: string}) => (
  <a target="_blank" href={`https://${href}`}>
    {href}
  </a>
);

export default Page;
