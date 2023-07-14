import { minBy } from "../../lib/utils/array";
import { Cell, CellContainer } from "../../lib/utils/cell";
import { Debouncer } from "../../lib/utils/debouncer";
import { Rect } from "../../lib/utils/rect";
import { createModel } from "../hooks/create-model";

const EPS = 0.01;

type Key = HTMLElement;
type Item = {
  _debugTag?: any;
  key: Key;
  stamp: boolean;
  aspectRatio: number;
  layout: Rect;
  targetArea: number;
  computedLayout: Rect;
};
type Brick = Omit<Item, "layout">;
type Stamp = Omit<Item, "aspectRatio" | "targetArea" | "computedLayout">;

type Container = {
  layout?: Rect;
  computedLayout?: { height: number };
};

export const [useModel, Provider] = createModel(
  // State
  {
    _invalidateDebouncer: ((cb) => cb()) as Debouncer,

    items: new Map<Key, Partial<Item>>(),
    container: {} as Container,
    layoutParams: {
      initialTargetArea: 160000,
      gap: 4,
    },
    isComputedLayoutValid: false,
  },

  // Methods
  {
    setInvalidateDebouncer(state, debouncer: Debouncer) {
      state._invalidateDebouncer = debouncer;
    },

    _setItem(state, key: Key, item: Partial<Item>) {
      state.items.set(key, item);
    },
    _deleteItem(state, key: Key) {
      state.items.delete(key);
    },
    _setContainer(state, container: Container) {
      state.container = container;
    },
    _invalidate(state) {
      state.isComputedLayoutValid = false;
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

      ////////// HELPERS //////////

      const gap = state.layoutParams.gap;
      const max = Math.max;
      const bottom = (cell: Cell) => cell.top + cell.height;
      const pairwise = <T>(arr: readonly T[]) =>
        arr.map((_, i) => [arr[i], arr[i + 1]] as const);

      ////////// LAYOUT //////////

      const bounds = {
        width: state.container.layout.width,
      };

      const placeLayer = (layout: CellContainer, layer: CellContainer) => {
        // Scale up bricks to fill width
        layer.width = bounds.width;

        // Base case
        if (layout.cells.length === 0) return layout.push(layer);

        // Get last layer
        const lastLayer = layout.cells[layout.cells.length - 1];
        if (
          !(lastLayer instanceof CellContainer) ||
          lastLayer.layout.mode !== "row" ||
          !lastLayer.layout.jagged
        )
          throw new Error("Assertion Error");

        // Place bricks from new layer
        const queue = [...layer.cells];
        while (queue.length > 0) {
          // Find least-cost action

          const bestAction = minBy(
            [
              // Flatten last layer and start new layer
              {
                type: "newlayer",
                cost: 0,
              } as const,
            ],
            ({ cost }) => cost
          );

          break;
        }

        layout.push(layer);
      };

      let layout: CellContainer = new CellContainer([], {
        gap,
        mode: "col",
        jagged: true,
      });
      let layer = new CellContainer([], { gap, mode: "row", jagged: true });

      bricks.forEach((brick) => {
        // Compute desired area for brick to cover
        const A = state.layoutParams.initialTargetArea;
        const r = brick.aspectRatio;
        brick.targetArea = A * (1 + 0.75 * Math.log(r) ** 2);

        // Compute dimensions of brick
        const width = Math.sqrt(brick.aspectRatio * brick.targetArea);
        const height = width / brick.aspectRatio;
        brick.computedLayout = { left: 0, top: 0, width, height };

        // Check layer width
        if (layer.width + width <= bounds.width) {
          // Underfull layer: add brick to layer
          layer.push(new BrickCell(brick));
        } else {
          // Handle overfull layer

          // Add to current layer or start a new layer
          let nextLayer: CellContainer;
          if (layer.width + width - bounds.width < Math.SQRT1_2 * width) {
            layer.push(new BrickCell(brick));
            nextLayer = new CellContainer([], {
              gap,
              mode: "row",
              jagged: true,
            });
          } else {
            nextLayer = new CellContainer([new BrickCell(brick)], {
              gap,
              mode: "row",
              jagged: true,
            });
          }

          // Finalize layer placements
          placeLayer(layout, layer);
          layer = nextLayer;
        }
      });

      // Final layer
      if (layer.cells.length) placeLayer(layout, layer);

      // Compute final height
      state.container.computedLayout = {
        height: max(0, bottom(layout)),
      };

      // Mark layout computation as complete
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
    upsertItem(model, key: Key, item?: Partial<Item>) {
      const prev = model.items.get(key);
      const next = { key, ...prev, ...item };

      // Validate args
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
        (model as any).invalidate();
      }

      model._setItem(key, next);
    },
    removeItem(model, key: Key) {
      if (model.items.has(key)) (model as any).invalidate();
      model._deleteItem(key);
    },
    invalidate(model) {
      model._invalidateDebouncer(() => model._invalidate());
    },
    updateContainer(model, container: Container) {
      const prev = model.container;
      const next = { ...prev, ...container };

      if (
        !prev?.layout ||
        !next?.layout ||
        Math.abs(prev.layout.left - next.layout.left) > EPS ||
        Math.abs(prev.layout.top - next.layout.top) > EPS ||
        Math.abs(prev.layout.width - next.layout.width) > EPS ||
        Math.abs(prev.layout.height - next.layout.height) > EPS
      ) {
        (model as any).invalidate();
      }

      model._setContainer(next);
    },
    getComputedLayout(model, key: Key | null) {
      const item = model.getItemState(key);
      if (!item || item.stamp) return undefined;
      if (!model.isComputedLayoutValid) {
        // Avoids setState while rendering another component error
        setTimeout(() => model.computeLayout(), 0);
      }
      return item.computedLayout;
    },
  }
);

//////// LAYOUT HELPER ////////

class BrickCell implements Cell {
  constructor(private _brick: Brick) {}
  get left() {
    return this._brick.computedLayout.left;
  }
  get top() {
    return this._brick.computedLayout.top;
  }
  get width() {
    return this._brick.computedLayout.width;
  }
  get height() {
    return this._brick.computedLayout.height;
  }

  set left(val) {
    this._brick.computedLayout.left = val;
  }
  set top(val) {
    this._brick.computedLayout.top = val;
  }
  set width(val) {
    const scaleFactor = val / this._brick.computedLayout.width;
    this._brick.computedLayout.width = val;
    this._brick.computedLayout.height *= scaleFactor;
  }
}
