import React from "react";
import { ReactNode } from "react";
import { FlexCol, Flex } from "../flex";
import { flyIn, flyOut } from "../styled";
import { TransitionState } from "gatsby-plugin-transition-link";

export const Panel = ({
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
    <TransitionState>
      {({ transitionStatus }: any) => (
        <FlexCol
          flexGrow={1}
          minWidth={250}
          overflow="clip"
          width="100%"
          height="100%"
          position="relative"
          sx={{
            animation: transitionStatus.startsWith("enter")
              ? `${flyIn} 0.2s ease-out`
              : `${flyOut} 0.2s ease-out`,
            animationFillMode: "forwards",

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
              filter: "brightness(0.4)",
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
      )}
    </TransitionState>
  );
};