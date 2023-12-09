import React, {
  CSSProperties,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Box, BoxProps } from "@mui/material";

type AspectRatio = readonly [number, number];

const AspectContainerContext = createContext({
  updateChild(ref: Element, aspectRatio?: AspectRatio) {},
  deleteChild(ref: Element) {},
} as const);

class AspectContainerModel {
  ref?: Element;
  children = new Map<Element, AspectRatio | undefined>();
  aspectRatio?: AspectRatio;
  direction?: "row" | "column";

  constructor(
    readonly parent: Pick<AspectContainerModel, "updateChild" | "deleteChild">,
    readonly setAspectRatio: (aspectRatio?: AspectRatio) => void
  ) {}

  registerRef(ref: Element) {
    this.ref = ref;
    this.parent.updateChild(ref, this.aspectRatio);
  }

  unregisterRef() {
    if (this.ref) this.parent.deleteChild(this.ref);
    this.ref = undefined;
  }

  updateLayout() {
    if (!this.direction) return;

    this.aspectRatio = computeContainerAspectRatio(
      [...this.children.values()].filter((x) => x) as AspectRatio[],
      this.direction
    );

    if (this.ref) this.parent.updateChild(this.ref, this.aspectRatio);
    this.setAspectRatio(this.aspectRatio);
  }

  setDirection(direction: "row" | "column") {
    this.direction = direction;
    this.updateLayout();
  }

  updateChild(ref: Element, aspectRatio?: AspectRatio) {
    this.children.set(ref, aspectRatio);
    this.updateLayout();
  }

  deleteChild(ref: Element) {
    this.children.delete(ref);
    this.updateLayout();
  }

  context = {
    updateChild: this.updateChild.bind(this),
    deleteChild: this.deleteChild.bind(this),
  };
}

const useAspectContainerContext = (direction: "row" | "column") => {
  const parent = useContext(AspectContainerContext);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio | undefined>();

  const model = useMemo(
    () => new AspectContainerModel(parent, setAspectRatio),
    []
  );

  const ref = useRef<Element>(null);
  useEffect(() => {
    if (ref.current) {
      model.registerRef(ref.current);
      return () => model.unregisterRef();
    }
  }, [ref.current]);

  useEffect(() => {
    model.setDirection(direction);
  }, [direction]);

  return [model.context, ref, aspectRatio] as const;
};

export const AspectContainer = ({
  children,
  direction,
  style,
  sx,
  ...boxProps
}: PropsWithChildren<{ direction: "row" | "column" }> & BoxProps) => {
  const [context, ref, aspectRatio] = useAspectContainerContext(direction);

  return (
    <Box
      ref={ref}
      style={{
        ...style,
        aspectRatio: aspectRatio && `${aspectRatio[0]} / ${aspectRatio[1]}`,
      }}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        { display: "flex", flexDirection: direction },
      ]}
      {...boxProps}
    >
      <AspectContainerContext.Provider value={context}>
        {children}
      </AspectContainerContext.Provider>
    </Box>
  );
};

export const AspectItem = ({
  children,
  aspectRatio,
  style,
  ...boxProps
}: PropsWithChildren<{ aspectRatio?: AspectRatio } & BoxProps>) => {
  const ref = useRef<Element>(null);
  const parent = useContext(AspectContainerContext);

  useEffect(() => {
    if (ref.current) {
      const _ref = ref.current;
      parent.updateChild(_ref, aspectRatio);
      return () => parent.deleteChild(_ref);
    }
  }, [ref.current]);

  useEffect(() => {
    if (ref.current) {
      parent.updateChild(ref.current, aspectRatio);
    }
  }, [aspectRatio]);

  return (
    <Box
      ref={ref}
      style={{
        ...style,
        aspectRatio: aspectRatio && `${aspectRatio[0]} / ${aspectRatio[1]}`,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export const AspectRow = (props: BoxProps) => (
  <AspectContainer direction="row" {...props} />
);

export const AspectColumn = (props: BoxProps) => (
  <AspectContainer direction="column" {...props} />
);

/////

const computeContainerAspectRatio = (
  childAspectRatios: AspectRatio[],
  direction: "row" | "column"
) => {
  if (childAspectRatios.length == 0) {
    return undefined;
  }
  if (direction == "row") {
    return [
      childAspectRatios.map(([w, h]) => w / h).reduce((a, b) => a + b, 0),
      1,
    ] as const;
  } else {
    return [
      1,
      childAspectRatios.map(([w, h]) => h / w).reduce((a, b) => a + b, 0),
    ] as const;
  }
};
