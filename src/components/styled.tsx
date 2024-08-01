import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";

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

export const InternalLink = styled(Link)();

export const Divider2 = ({ children }: React.PropsWithChildren<{}>) =>
  children ? (
    <Divider
      flexItem
      orientation="horizontal"
      sx={{
        color: "primary.light",
        "&::before, &::after": {
          borderColor: "primary.light",
        },
      }}
    >
      <Typography variant="overline">{children}</Typography>
    </Divider>
  ) : (
    <Divider
      flexItem
      orientation="horizontal"
      sx={{ bgcolor: "primary.light" }}
    />
  );
