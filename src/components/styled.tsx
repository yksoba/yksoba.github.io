import { Link } from "gatsby";
import { styled } from "@mui/material/styles";

export const StyledLink = styled(Link)({
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
