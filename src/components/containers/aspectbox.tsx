import React, {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Box } from "@mui/material";

export const AspectContainer = ({ children }: PropsWithChildren<{}>) => {
 
  useLayoutEffect(() => {
    React.Children.forEach(children, (child) => {
      if(React.isValidElement(child)) {
        child.
      }
    })
  })

  return <Box>{children}</Box>;
};


export const AspectItem = ({children}: PropsWithChildren<{}>) => {}