import React from "react";
import { Flex } from "../flex";
import { useClientDims } from "../../lib/use-client-dims";
import { StyledA } from "../styled";

export const MiniGallery = ({
  imgs,
  freeHeight = false,
  columns = 2,
}: {
  imgs: { src: string; href: string }[];
  freeHeight?: boolean;
  columns?: 1 | 2;
}) => {
  const [ref, dims] = useClientDims();
  let size = columns === 1 ? dims.clientWidth : dims.clientWidth / 2 - 8;
  if (!freeHeight) {
    const rows = Math.ceil(imgs.length / columns);
    size = Math.min((dims.clientHeight - 8 * (rows - 1)) / rows, size);
  }

  return (
    <Flex
      width="100%"
      flexWrap="wrap"
      gap={1}
      ref={ref}
      sx={[!freeHeight && { height: "100%" }]}
    >
      {imgs.map((img, i) => (
        <StyledA
          key={i}
          sx={{
            background: `url("${img.src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: size,
            height: size,
            border: 6,
            borderRadius: 1,
            borderColor: "white",
          }}
          href={img.href}
          target="_blank"
        />
      ))}
    </Flex>
  );
};
