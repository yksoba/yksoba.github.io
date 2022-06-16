import TransitionLink from "gatsby-plugin-transition-link";
import { styled } from "@mui/material/styles";

export const StyledTransitionLink = styled(TransitionLink)({
  textTransform: "uppercase",
  color: "white",
  fontSize: "1.2em",
  fontWeight: "300",
  opacity: "95%",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});


