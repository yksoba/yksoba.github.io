import { minBy } from "../../lib/utils/array";
import { Cell, CellContainer, LayoutOptions } from "../../lib/utils/cell";
import { Debouncer } from "../../lib/utils/debouncer";
import { Rect, doesOverlapX } from "../../lib/utils/rect";
import { createModel } from "../hooks/create-model";

const EPS = 0.01;

type Key = HTMLElement;
type Item = {
  _debugTag?: any;
  key: Key;
  stamp: boolean;
  aspectRatio: number;
  layout: Rect;
  computedLayout: Rect;
};
type Brick = Omit<Item, "layout">;
type Stamp = Omit<Item, "aspectRatio" | "computedLayout">;

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
      const max = (arr: number[]) => Math.max(...arr);
      const bottom = (cell: Cell) => cell.top + cell.height;
      const right = (cell: Cell) => cell.left + cell.width;
      const makeJaggedRow = (cells: Cell[] = []) =>
        new CellContainer(cells, {
          gap,
          mode: "row",
          jagged: true,
        });
      const makeRow = (cells: Cell[], options?: LayoutOptions) =>
        new CellContainer(cells, {
          gap,
          mode: "row",
          ...options,
        });
      const makeCol = (cells: Cell[], options?: LayoutOptions) =>
        new CellContainer(cells, {
          gap,
          mode: "col",
          ...options,
        });
      const mergeCost = (
        first: Cell,
        second: Cell,
        direction: "row" | "col"
      ) => {
        let r =
          direction === "row"
            ? first.height / second.height
            : first.width / second.width;
        return Math.log(r) ** 2;
      };

      ////////// LAYOUT //////////

      const bounds = {
        width: state.container.layout.width,
      };

      // 1. Separate into layers
      const layers: CellContainer[] = [makeJaggedRow()];

      const finishLayer = (layer: CellContainer, prevLayer?: CellContainer) => {
        layer.setLayout({ width: bounds.width, fit: true });

        if (prevLayer) {
          if (layers.length < 4) {
            const stems = prevLayer.cells.map((cell, i) => [cell, i] as any);
            const leaves = layer.cells.map((cell, j) => [cell, j] as any);

            if (stems.length >= leaves.length) {
              while (leaves.length > 0) {
                // Find best column-wise merge
                const [_, i, j] = minBy(
                  leaves.flatMap(([cell], j) =>
                    stems.map(
                      ([prev], i) =>
                        [mergeCost(cell, prev, "col"), i, j] as const
                    )
                  ),
                  ([cost]) => cost
                );

                // Pop from queue
                const [[prev, prevIdx]] = stems.splice(i, 1);
                const [[cell, cellIdx]] = leaves.splice(j, 1);

                // Compute column dims
                const width = Math.sqrt(cell.width * prev.width);
                const left = prev.left;

                // Make column
                const merged = makeCol([prev, cell], { width, left });
                prevLayer.splice(prevIdx, 1, merged);
                prevLayer.pack();

                layer.splice(cellIdx, 1, {
                  left: cell.left,
                  top: cell.top,
                  width: cell.width,
                  height: cell.height,
                });
                layer.pack();
              }

              // Copy previous into new layer
              layer.splice(0, layer.cells.length, ...prevLayer.cells);
              return;
            }
          }

          // Push cells out
          layer.cells.forEach((cell) => {
            cell.top =
              gap +
              max(
                prevLayer.cells
                  .filter((ref) => doesOverlapX(ref, cell))
                  .map(bottom)
              );
          });
        }
      };

      bricks.forEach((brick) => {
        // Compute desired area for brick to cover
        const A = state.layoutParams.initialTargetArea;
        const r = brick.aspectRatio;
        const targetArea = A * (1 + 0.75 * Math.log(r) ** 2);

        // Compute dimensions of brick
        const width = Math.sqrt(brick.aspectRatio * targetArea);
        const height = width / brick.aspectRatio;
        brick.computedLayout = { left: 0, top: 0, width, height };

        // Check layer width
        const prevLayer = layers[layers.length - 2];
        const layer = layers[layers.length - 1];

        if (layer.width + width <= bounds.width) {
          // Underfull layer: add brick to layer
          layer.push(new BrickCell(brick));
        } else {
          // Handle overfull layer

          // Add to current layer or start a new layer
          if (layer.width + width - bounds.width < Math.SQRT1_2 * width) {
            layer.push(new BrickCell(brick));
            layers.push(makeJaggedRow());
          } else {
            layers.push(makeJaggedRow([new BrickCell(brick)]));
          }

          // Set y of layer
          finishLayer(layer, prevLayer);
        }
      });

      // Final layer
      finishLayer(layers[layers.length - 1], layers[layers.length - 2]);

      // // 2. Pair up elements into larger rectangles
      // let _i = 0;
      // const queue = layers.flatMap((layer) => layer.cells);
      // while (queue.length > 1) {
      //   // Find best merge
      //   const { a, b, i, j } = minBy(
      //     queue
      //       .flatMap((a, i) => queue.map((b, j) => [a, b, i, j] as const))
      //       .filter(([a, b, i, j]) => i < j)
      //       .map(([a, b, i, j]) => {
      //         const outerArea =
      //           (Math.max(right(a), right(b)) - Math.min(a.left, b.left)) *
      //           (Math.max(bottom(a), bottom(b)) - Math.min(a.top, b.top));
      //         const innerArea = a.width * a.height + b.width * b.height;
      //         return {
      //           cost: Math.max(outerArea / innerArea, innerArea / outerArea),
      //           a,
      //           b,
      //           i,
      //           j,
      //         };
      //       }),
      //     ({ cost }) => cost
      //   );

      //   queue.splice(j, 1);
      //   queue.splice(i, 1);
      //   if (doesOverlapX(a, b)) {
      //     if (a.top < b.top) {
      //       queue.push(
      //         makeCol([a, b], { width: Math.sqrt(a.width * b.width) })
      //       );
      //     } else {
      //       queue.push(
      //         makeCol([b, a], { width: Math.sqrt(a.width * b.width) })
      //       );
      //     }
      //   } else {
      //     if (a.left < b.left) {
      //       queue.push(makeRow([a, b], { width: a.width + b.width + gap }));
      //     } else {
      //       queue.push(makeRow([b, a], { width: a.width + b.width + gap }));
      //     }
      //   }

      //   if (_i++ > 10) {
      //     break;
      //   }
      // }

      // const layout = queue[0];

      // Compute final height
      state.container.computedLayout = {
        height: 10000, // bottom(layout),
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
