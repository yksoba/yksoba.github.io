import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";

export const Flex = styled(Box)({ display: "flex" });

export const FlexCol = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const StyledLink = styled(Link)({ });

export const Section = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
