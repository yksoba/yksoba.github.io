import React from "react";
import { Flex } from "../flex";
import { useClientDims } from "../../lib/use-client-dims";

export const MiniGallery = ({ imgsrcs }: { imgsrcs: string[]; }) => {
  const [ref, dims] = useClientDims();
  const size = dims.clientWidth / 2 - 8;

  return (
    <Flex width="100%" flexWrap="wrap" gap={1} ref={ref}>
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
          }} />
      ))}
    </Flex>
  );
};
