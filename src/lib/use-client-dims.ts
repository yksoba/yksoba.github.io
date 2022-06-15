import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useClientDims = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const [clientDims, setClientDims] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      setClientDims({
        clientHeight: ref.current.clientHeight,
        clientWidth: ref.current.clientWidth,
      });
    }
  }, [ref.current?.clientHeight, ref.current?.clientWidth]);

  useEffect(() => {
    const listener = () => {
      if (ref.current) {
        setClientDims({
          clientHeight: ref.current.clientHeight,
          clientWidth: ref.current.clientWidth,
        });
      }
    };

    window?.addEventListener("resize", listener);
    return () => {
      window?.removeEventListener("resize", listener);
    };
  });

  return [ref, clientDims] as const;
};
