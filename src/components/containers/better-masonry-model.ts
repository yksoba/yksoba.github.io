import { Rect, doesOverlapX } from "../../lib/utils/rects";
import { createModel } from "../hooks/create-model";
import { Debouncer } from "../../lib/utils/debouncer";

const EPS = 0.01;

type Key = HTMLElement;
type Item = {
  _debugTag?: any;
  key: Key;
  stamp: boolean;
  aspectRatio: number;
  layout: Rect;
  computedLayout?: Rect;
};
type Brick = Omit<Item, "layout">;
type Stamp = Omit<Item, "aspectRatio">;

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

      const computeBottom = (bricks?: Brick[]) =>
        Math.max(
          ...(bricks?.map(
            (brick) => brick.computedLayout!.top + brick.computedLayout!.height
          ) ?? []),
          0
        );
      const adjustTop = (brick: Brick, prevLayer?: Brick[]) => {
        brick.computedLayout!.top = computeBottom(
          prevLayer?.filter((refbrick) =>
            doesOverlapX(refbrick.computedLayout!, brick.computedLayout!)
          )
        );
      };

      const finishLayer = (
        layer: Brick[],
        prevLayer: Brick[] | undefined,
        layerWidth: number = layer
          .map((brick) => brick.computedLayout!.width)
          .reduce((a, b) => a + b, 0)
      ) => {
        // Scale up bricks to fill width
        const scaleFactor = bounds.width / layerWidth;
        layer.forEach((brick) => {
          brick.computedLayout!.width *= scaleFactor;
          brick.computedLayout!.height *= scaleFactor;
        });

        // Place bricks into layer
        const baseline = prevLayer
          ? Math.min(
              ...prevLayer.map(
                (brick) =>
                  brick.computedLayout!.top + brick.computedLayout!.height
              )
            )
          : 0;
        let left = 0;
        layer.forEach((brick) => {
          brick.computedLayout!.top = baseline;
          brick.computedLayout!.left = left;
          left += brick.computedLayout!.width;
        });

        // Adjust brick top
        layer.forEach((brick) => adjustTop(brick, prevLayer));
      };

      ////////// LAYOUT //////////

      const bounds = {
        width: state.container.layout.width,
      };

      const layers: Brick[][] = [[]];

      bricks.forEach((brick) => {
        // Compute desired area for brick to cover
        const A = state.layoutParams.initialTargetArea;
        const r = brick.aspectRatio;
        const targetArea = A * (1 + 0.75 * Math.log(r) ** 2);

        // Compute dimensions of brick
        const width = Math.sqrt(brick.aspectRatio * targetArea);
        const height = width / brick.aspectRatio;
        brick.computedLayout = { left: 0, top: 0, width, height };

        // Compute layer width
        const layer = layers[layers.length - 1];
        let layerWidth = layer
          .map((brick) => brick.computedLayout!.width)
          .reduce((a, b) => a + b, 0);

        if (layerWidth + width < bounds.width) {
          // Add to layer
          layer.push(brick);
        } else {
          // Handle overfull layer
          const prevLayer = layers[layers.length - 2];

          // Add to current layer or start a new layer
          if (layerWidth + width - bounds.width < Math.SQRT1_2 * width) {
            layer.push(brick);
            layerWidth += width;
          } else {
            layers.push([brick]);
          }

          finishLayer(layer, prevLayer, layerWidth);
        }
      });

      // Adjust final layer
      finishLayer(layers[layers.length - 1], layers[layers.length - 2]);

      // Compute final height
      state.container.computedLayout = {
        height: computeBottom(layers[layers.length - 1]),
      };

      // Mark layout computation as complete
      state.isComputedLayoutValid = true;

      // console.log(
      //   JSON.parse(
      //     JSON.stringify(
      //       layers.map((layer) =>
      //         layer.map((brick) => ({ ...brick, key: null }))
      //       )
      //     )
      //   )
      // );
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
