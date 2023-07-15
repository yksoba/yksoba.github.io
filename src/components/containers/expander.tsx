import React, {
  ReactNode,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Box, SystemCssProperties } from "@mui/system";
import { useMeasure } from "react-use";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Flex } from "../styled";
import { ButtonBase, Typography } from "@mui/material";
import { getScrollParent } from "../../lib/dom/get-scroll-parent";

export const Expander = ({
  children,
  initialHeight,
  control = ExpanderControl,
}: PropsWithChildren<{
  initialHeight: SystemCssProperties["height"];
  control?: (props: {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
}>) => {
  const [innerRef, { height: innerHeight }] = useMeasure();
  const [controlRef, { height: controlHeight }] = useMeasure();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box position="relative">
      <Box
        sx={{
          height: innerHeight + controlHeight,
          minHeight: initialHeight,
          maxHeight: isExpanded ? innerHeight + controlHeight : initialHeight,
          overflowY: "hidden",
          transition: "max-height 1s ease",
        }}
      >
        <Box ref={innerRef}>{children}</Box>
      </Box>
      <Flex
        ref={controlRef}
        justifyContent="center"
        width="100%"
        height="fit-content"
        position="absolute"
        bottom="0px"
      >
        {control({ isExpanded, setIsExpanded })}
      </Flex>
    </Box>
  );
};

const ExpanderControl = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) => (
  <ButtonBase
    sx={{
      display: "flex",
      flexGrow: 1,
      height: "80px",
      backgroundImage:
        "linear-gradient(0deg, rgba(0,0,0,.7) 0,  rgba(0,0,0,0) 50% 100%)",
      backgroundSize: "100% 200%",
      backgroundPosition: isExpanded ? "0 0" : "0 -80px",
      transition: "background-position 300ms ease",
    }}
    onClick={() => {
      if (isExpanded) window.scroll({ top: 0 });
      setIsExpanded((state) => !state);
    }}
  >
    <Typography variant="button">
      {isExpanded ? "Collapse" : "Show All"}
    </Typography>
    {isExpanded ? (
      <ExpandLessIcon sx={{ fontSize: "60px" }} />
    ) : (
      <ExpandMoreIcon sx={{ fontSize: "60px" }} />
    )}
  </ButtonBase>
);
