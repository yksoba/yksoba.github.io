import TransitionLink from "gatsby-plugin-transition-link";
import { styled, keyframes } from "@mui/material/styles";

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

export const flyIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const flyOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;
