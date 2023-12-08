import { BreakpointOverrides } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs:false;
    sm: true;
    md: true;
    lg:true;
    xl: false;
  }
}
