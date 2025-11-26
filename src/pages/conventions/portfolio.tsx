import {PageProps} from "gatsby";
import React from "react";
import {Header} from "../../components/layout/header";
import {Layout} from "../../layouts";
import {Container, Link, Typography, Box} from "@mui/material";
import {useEffectOnce} from "react-use";
import {Flex, FlexCol} from "../../components/styled";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";
import {Helmet} from "react-helmet";

const Page = (props: PageProps) => {
  return (
    <>
      <Helmet>
        <script async src="https://platform.twitter.com/widgets.js" />
      </Helmet>
      <Box
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
        <h1>Conventions Portfolio</h1>
        <p>
          Hi! I’m Soba! I am a digital and traditional artist, and I do a little
          bit of everything from apparel, to prints, stickers, charms, and
          traditional art commissions!
        </p>
        <p>
          Be sure to check out my gallery at{" "}
          <AutoLink href="yksoba.art" />, as well as my socials{" "}
          <AutoLink href="t.me/yksobaart" /> and/or{" "}
          <AutoLink href="bsky.app/profile/yksoba.art" /> for the latest
          art and updates!
        </p>

        <h2>Merch</h2>
        <p>Here are some examples of my most popular merch:</p>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/799f.png"}
                alt={"Fox & Bird Hoodie"}
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/836h.png"}
                alt={"Stargazer Hoodie"}
              />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/20250709_101051-1.jpg"}
                alt={
                  "Print of a traditional drawing featuring a hypnotized puppy"
                }
              />
            </Flex>
            <Flex width="50%">
              <StaticImage
                src={"../../static/conventions/portfolio/P1190969-1.JPG"}
                alt={
                  "Print of a white anthro dog standing in water, having just transformed under the moon"
                }
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
            <StaticImage
              src={"../../static/conventions/portfolio/image2.jpg"}
              alt={
                "Four acrylic charms of various canids (and a red fox) dangling from rope toys"
              }
            />
          </Flex>
          <Flex gap={1}>
            <StaticImage
              src={"../../static/conventions/portfolio/image3.jpg"}
              alt={
                "Two stickers of a neapolitan ice cream themed fox character"
              }
            />
            <StaticImage
              src={"../../static/conventions/portfolio/image5.jpg"}
              alt={
                "Two stickers of canids sitting and holding pride flags in their mouths"
              }
            />
          </Flex>
        </FlexCol>
        <p>
          You can find photos of my previous table setups below, which will have
          the most comprehensive representation of the kind of merch I plan to
          sell. You can also find some examples at my online stores:
          <br />
          <AutoLink href="etsy.com/shop/YKSOBA" />
          <br />
          <AutoLink href="yksoba.bigcartel.com" />
        </p>

        {/* <h2>At-Con Commissions</h2>
        <p>Here are some of the at-con sketch commissions I've done:</p>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/GSDc_yNXYAA5Bvj.jpg"
              alt="one sketch commission"
            />
            <StaticImage
              src="../../static/conventions/portfolio/GSDc_ymXMAEGujZ.jpg"
              alt="one sketch commission"
            />
          </Flex>
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/GRxAekGa4AALyH9.jpg"
              alt="several sketch commissions"
            />
          </Flex>
        </FlexCol> */}
        {/* <p>
          You can also see some of my previous at-con sketch comms which ppl
          have brought home! (May take a moment to load)
        </p>
        <Flex gap={1}>
          <FlexCol width="100%">
            <TweetCard
              html={`
                <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr"><a href="https://twitter.com/yk_soba?ref_src=twsrc%5Etfw">@yk_soba</a> actually has some of the cutest pieces I&#39;ve ever seen. Please go check them out! <a href="https://t.co/rDrYcFS3GC">https://t.co/rDrYcFS3GC</a> <a href="https://t.co/R63gqhguIY">pic.twitter.com/R63gqhguIY</a></p>&mdash; 🌸 Wren 🌸 (@Wrenosaur_) <a href="https://twitter.com/Wrenosaur_/status/1809657975675711657?ref_src=twsrc%5Etfw">July 6, 2024</a></blockquote>
                `}
            />
            <TweetCard
              html={`
                <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Shoutout to <a href="https://twitter.com/yk_soba?ref_src=twsrc%5Etfw">@yk_soba</a><br>This is so awesome omfg 💙 <a href="https://t.co/6DYHbbuXIj">pic.twitter.com/6DYHbbuXIj</a></p>&mdash; Vink (@Vink3r) <a href="https://twitter.com/Vink3r/status/1810022116156215705?ref_src=twsrc%5Etfw">July 7, 2024</a></blockquote>
                `}
            />
          </FlexCol>
          <FlexCol width="100%">
            <TweetCard
              html={`
                <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">RealSol :3<br>Cute art by <a href="https://twitter.com/yk_soba?ref_src=twsrc%5Etfw">@yk_soba</a> <a href="https://t.co/NAcKGFWh0j">pic.twitter.com/NAcKGFWh0j</a></p>&mdash; BluSol 🔜 MFF (@BluieBloo) <a href="https://twitter.com/BluieBloo/status/1812984474323546280?ref_src=twsrc%5Etfw">July 15, 2024</a></blockquote>
                `}
            />
            <TweetCard
              html={`
                <blockquote class="twitter-tweet" data-conversation="none" data-theme="dark"><p lang="en" dir="ltr">And finally this SUPER CUTE little draw of Cezary by <a href="https://twitter.com/yk_soba?ref_src=twsrc%5Etfw">@yk_soba</a>!! It’s SO pretty I love itttt <a href="https://t.co/xy4t8ZmkWu">pic.twitter.com/xy4t8ZmkWu</a></p>&mdash; frostyketchup 💚✨ (@frostyketchup) <a href="https://twitter.com/frostyketchup/status/1811289520484352133?ref_src=twsrc%5Etfw">July 11, 2024</a></blockquote> 
                `}
            />
            <TweetCard
              html={`
                <blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">thingie i got from <a href="https://twitter.com/yk_soba?ref_src=twsrc%5Etfw">@yk_soba</a> @ Anthrocon :3!!! tysm <a href="https://t.co/YyImJdJuLZ">pic.twitter.com/YyImJdJuLZ</a></p>&mdash; Lime ✨ (@Limeflareon) <a href="https://twitter.com/Limeflareon/status/1813005643592114292?ref_src=twsrc%5Etfw">July 16, 2024</a></blockquote> 
                `}
            />
          </FlexCol>
        </Flex> */}

        <h2>Previous Table Setups</h2>

        <h3>IndyFurCon '25</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/yksoba_16.jpg"
              alt="Soba (me) in fursuit behind the table at IndyFurCon '25"
            />
          </Flex>
        </FlexCol>

        <h3>Anthrocon '25</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/table-ac-25.jpg"
              alt="Soba (me) and Rye (my partner) behind the table at Anthrocon '25"
            />
          </Flex>
        </FlexCol>

        <h3>FurSquared '25</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/FurSquared 2025.JPG"
              alt="Soba (me) in fursuit behind the table at FurSquared '25"
            />
          </Flex>
        </FlexCol>

        <h3>Further Confusion '25</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/FC 2025.jpg"
              alt="Soba (me) behind the table at Further Confusion '25"
            />
          </Flex>
        </FlexCol>

        <h3>Anthrocon '24</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
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
        </FlexCol>

        <h3>MFF '23</h3>
        <FlexCol gap={1} maxWidth="600px" margin="0 auto">
          <Flex gap={1}>
            <StaticImage
              src="../../static/conventions/portfolio/image8.jpg"
              alt="My table at MFF '23"
            />
          </Flex>
        </FlexCol>

        <h2>Upcoming Conventions</h2>

        <ul>
          <li>
            MFF '25 Dealers Den (with{" "}
            <a href="https://supykun.com/" target="_blank">
              SUPYKUN
            </a>
            )
          </li>
          <li>Further Confusion '26 Dealers Den</li>
          <li>FurSquared '26 Dealers Den</li>
        </ul>

        <h2>More Info</h2>
        <p>
          Be sure to check out my gallery at{" "}
          <AutoLink href="yksoba.art" />, as well as my socials{" "}
          <AutoLink href="t.me/yksobaart" /> and/or{" "}
          <AutoLink href="bsky.app/profile/yksoba.art" /> for the latest
          art and updates!
        </p>
      </Box>
    </>
  );
};

const AutoLink = ({href}: {href: string}) => (
  <a target="_blank" href={`https://${href}`}>
    {href}
  </a>
);

const TweetCard = ({html}: {html: string}) => (
  <Box>
    <div dangerouslySetInnerHTML={{__html: html}} />
  </Box>
);

export default Page;
