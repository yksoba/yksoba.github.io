import { Rect, doesContain, doesOverlap } from "../../lib/dom/rects";
import { createModel } from "../hooks/create-model";

const EPS = 0.01;

type Key = HTMLElement;
type Item = {
  _debugTag?: any;
  stamp: boolean;
  aspectRatio: number;
  layout: Rect;
  computedLayout?: {
    left: number;
    top: number;
    width: number;
  };
};
type Brick = Omit<Item, "layout">;
type Stamp = Omit<Item, "aspectRatio">;

type ContainerState = {
  layout?: Rect;
};

export const [useModel, Provider] = createModel(
  // State
  {
    items: new Map<Key, Partial<Item>>(),
    container: {} as ContainerState,
    layoutParams: {
      targetArea: 100000,
    },
    isComputedLayoutValid: false,
  },

  // Methods
  {
    upsertItem(state, key: Key, item?: Partial<Item>) {
      const prev = state.items.get(key);
      const next = { ...prev, ...item };
      state.items.set(key, next);

      if (
        next.stamp === false &&
        typeof next.aspectRatio === "number" &&
        isNaN(1 / next.aspectRatio)
      ) {
        console.warn(
          "Encountered brick with 0 area, this may lead to unexpected behavior",
          key,
          JSON.parse(JSON.stringify(next))
        );
      }

      // Invalidates the computed layout if neccessary
      if (
        typeof next.stamp === "undefined" ||
        (next.stamp
          ? !prev?.layout ||
            !next?.layout ||
            Math.abs(prev.layout.left - next.layout.left) > EPS ||
            Math.abs(prev.layout.top - next.layout.top) > EPS ||
            Math.abs(prev.layout.width - next.layout.width) > EPS ||
            Math.abs(prev.layout.height - next.layout.height) > EPS
          : typeof prev?.aspectRatio !== "number" ||
            typeof next?.aspectRatio !== "number" ||
            Math.abs(prev.aspectRatio - next.aspectRatio) > EPS)
      ) {
        state.isComputedLayoutValid = false;
      }
    },
    removeItem(state, key: Key) {
      if (state.items.delete(key)) state.isComputedLayoutValid = false;
    },
    updateContainer(state, container: ContainerState) {
      const prev = state.container;
      const next = { ...state.container, ...container };

      if (
        !prev?.layout ||
        !next?.layout ||
        Math.abs(prev.layout.left - next.layout.left) > EPS ||
        Math.abs(prev.layout.top - next.layout.top) > EPS ||
        Math.abs(prev.layout.width - next.layout.width) > EPS ||
        Math.abs(prev.layout.height - next.layout.height) > EPS
      ) {
        state.isComputedLayoutValid = false;
      }

      state.container = next;
    },
    computeLayout(state) {
      ////////// PRE-PROCESSING //////////

      // Skip computation if current layout is valid
      if (state.isComputedLayoutValid) return;

      // Ensure that the container has been initialized
      if (!state.container.layout) return;

      const stamps: Stamp[] = [];
      const bricks: Brick[] = [];
      for (let item of state.items.values()) {
        // Ensure that all children have been initialized
        if (
          typeof item.stamp !== "boolean" || item.stamp
            ? !item.layout
            : typeof item.aspectRatio !== "number"
        )
          return;

        // Separate stamps and bricks
        if (item.stamp) stamps.push(item as Stamp);
        else bricks.push(item as Brick);
      }

      ////////// LAYOUT //////////

      const exclusion: Rect[] = [];

      const bounds = {
        left: state.container.layout.left,
        width: state.container.layout.width,
        top: 0,
        height: Infinity,
      };

      const checkPlacement = (query: Rect) =>
        !doesOverlap(exclusion, query) && doesContain(bounds, query);

      const anchors: [number, number][] = [[0, 0]];

      for (let brick of bricks) {
        // Compute width that gives us the desired area
        const width = Math.sqrt(
          brick.aspectRatio * state.layoutParams.targetArea
        );
        const height = width / brick.aspectRatio;

        const anchorIdx = anchors.findIndex(([left, top]) =>
          checkPlacement({ left, top, width, height })
        );
        if (anchorIdx === -1) {
          // Skip unplaceable items for now
          continue;
        }
        const [left, top] = anchors[anchorIdx];

        anchors.splice(anchorIdx, 1, [left + width, top], [left, top + height]);
        exclusion.push({ left, top, width, height });

        brick.computedLayout = { left, top, width };
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
        items: [...state.items].map(([key, value]) => [
          key,
          JSON.parse(JSON.stringify(value)),
        ]),
      };
    },
    getItemState(state, key: Key | null) {
      return key ? state.items.get(key) : undefined;
    },
  },

  // Dispatchers
  {
    getComputedLayout(key: Key | null) {
      return (model) => {
        const item = model.getItemState(key);
        if (!item || item.stamp) return undefined;
        if (!model.isComputedLayoutValid) {
          // Defer dispatch while rendering
          setTimeout(() => model.computeLayout(), 0);
        }
        return item.computedLayout;
      };
    },
  }
);
