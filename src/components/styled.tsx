import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Flex = styled(Box)({ display: "flex" });

export const FlexCol = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const Section = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
