import { createModel } from "../hooks/create-model";

const EPS = 0.01;

type BrickKey = HTMLElement;
type BrickState = {
  _debugTag?: any;
  layout?: {
    stamp: boolean;
    aspectRatio: number;
    top: number;
    left: number;
    width: number;
    height: number;
  };
  computedLayout?: {
    left: number;
    top: number;
    width: number;
  };
};

type ContainerState = {
  layout?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export const [useModel, Provider] = createModel(
  // State
  {
    bricks: new Map<BrickKey, BrickState>(),
    container: {} as ContainerState,
    layoutParams: {
      targetArea: 200000,
    },
    isComputedLayoutValid: false,
  },

  // Methods
  {
    upsertBrick(state, key: BrickKey, brick?: BrickState) {
      const prev = state.bricks.get(key);
      const next = { ...prev, ...brick };
      state.bricks.set(key, next);

      if (
        !next.layout?.stamp &&
        typeof brick?.layout?.aspectRatio === "number" &&
        isNaN(1 / brick.layout.aspectRatio)
      ) {
        console.warn(
          "Encountered brick with 0 area, this may lead to unexpected behavior"
        );
      }

      // Invalidates the computed layout if neccessary
      if (
        !prev?.layout ||
        !next?.layout ||
        prev.layout.stamp != next.layout.stamp ||
        (next.layout.stamp
          ? Math.abs(prev.layout.left - next.layout.left) > EPS ||
            Math.abs(prev.layout.top - next.layout.top) > EPS ||
            Math.abs(prev.layout.width - next.layout.width) > EPS ||
            Math.abs(prev.layout.height - next.layout.height) > EPS
          : Math.abs(prev.layout.aspectRatio - next.layout.aspectRatio) > EPS)
      ) {
        state.isComputedLayoutValid = false;
      }
    },
    removeBrick(state, key: BrickKey) {
      state.bricks.delete(key);
      state.isComputedLayoutValid = false;
    },
    updateContainer(state, container: ContainerState) {
      state.container = { ...state.container, ...container };
    },
    computeLayout(state) {
      // Skip computation if current layout is valid
      if (state.isComputedLayoutValid) return;

      for (const brick of state.bricks.values()) {
        // Ensure that all children have updated layout values
        if (!brick.layout) return;

        // Skip stamps for now
        if (brick.layout.stamp) continue;

        // Compute width that gives us the desired area
        const width = Math.sqrt(
          brick.layout.aspectRatio * state.layoutParams.targetArea
        );
        brick.computedLayout = { left: 0, top: 0, width };
      }

      state.isComputedLayoutValid = true;
    },
  },

  // Accessors
  {
    debug(state) {
      return {
        ...state,
        layoutParams: JSON.parse(JSON.stringify(state.layoutParams)),
        container: JSON.parse(JSON.stringify(state.container)),
        bricks: [...state.bricks].map(([key, value]) => [
          key,
          JSON.parse(JSON.stringify(value)),
        ]),
      };
    },
    getBrickState(state, key: BrickKey | null) {
      return key ? state.bricks.get(key) : undefined;
    },
  },

  // Dispatchers
  {
    getComputedLayout(key: BrickKey | null) {
      return (model) => {
        const brick = model.getBrickState(key);
        if (!brick) return undefined;
        if (!model.isComputedLayoutValid) {
          // Defer dispatch while rendering
          setTimeout(() => model.computeLayout(), 0);
        } else if (
          brick.layout &&
          !brick.layout.stamp &&
          !brick.computedLayout
        ) {
          console.error(
            "internal consistency error: brick does not have a computed layout",
            JSON.parse(JSON.stringify(brick)),
            model.debug()
          );
          throw new Error();
        }
        return brick.computedLayout;
      };
    },
  }
);
