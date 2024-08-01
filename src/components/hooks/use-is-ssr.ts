import { useState, useEffect } from "react";

export const useIsSSR = () => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") setIsSSR(false);
  }, []);
  return isSSR;
};
