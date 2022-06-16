import React from "react";
import { Flex } from "../flex";
import { useClientDims } from "../../lib/use-client-dims";

export const MiniGallery = ({
  imgsrcs,
  freeHeight = false,
  columns = 2,
}: {
  imgsrcs: string[];
  freeHeight?: boolean;
  columns?: 1 | 2;
}) => {
  const [ref, dims] = useClientDims();
  let size = columns === 1 ? dims.clientWidth : dims.clientWidth / 2 - 8;
  if (!freeHeight) {
    const rows = Math.ceil(imgsrcs.length / columns);
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
      {imgsrcs.map((imgsrc, i) => (
        <Flex
          key={i}
          width={size}
          height={size}
          border={6}
          borderRadius={1}
          borderColor="white"
          sx={{
            background: `url("${imgsrc}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </Flex>
  );
};
