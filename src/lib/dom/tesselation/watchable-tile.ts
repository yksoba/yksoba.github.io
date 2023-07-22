import { Rect, Tile, TileBase } from "./tile";

export type WatchableTileCallback = (tile: Tile, prev?: Rect) => void;

export interface WatchableTile extends Tile {
  readonly isWatchable: true;
  watch(callback: WatchableTileCallback): void;
  unwatch(callback: WatchableTileCallback): void;
}

export abstract class WatchableTileBase
  extends TileBase
  implements WatchableTile
{
  readonly isWatchable = true;

  private _callbacks = new Set<WatchableTileCallback>();
  private _prev?: Rect;
  protected _notify() {
    notify(this._callbacks, this, this._prev);
  }

  watch(callback: WatchableTileCallback): void {
    this._callbacks.add(callback);
  }

  unwatch(callback: WatchableTileCallback): void {
    this._callbacks.delete(callback);
  }
}

export const isWatchable = (
  tile: Tile | WatchableTile
): tile is WatchableTile => (tile as WatchableTile).isWatchable;

export const makeWatchableClone = (tile: Tile | WatchableTile) => {
  const clone = tile.clone();
  if (isWatchable(clone)) return clone;

  let callbacks = new Set<WatchableTileCallback>();
  let prev: Rect | undefined = undefined;

  const overrides: Partial<WatchableTile> = {
    isWatchable: true,
    watch(cb: WatchableTileCallback) {
      callbacks.add(cb);
    },
    unwatch(cb: WatchableTileCallback) {
      callbacks.delete(cb);
    },
  };

  return new Proxy(clone, {
    get(target, p, receiver) {
      return (overrides as any)[p] ?? Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      if (p === "left" || p === "top" || p === "width" || p === "height") {
        const result = Reflect.set(target, p, newValue, receiver);
        notify(callbacks, clone, prev);
        return result;
      }
      return Reflect.set(target, p, newValue, receiver);
    },
    has(target, p) {
      return p in overrides || Reflect.has(target, p);
    },
  }) as WatchableTile;
};

const notify = (
  callbacks: Iterable<WatchableTileCallback>,
  curr: Tile,
  prev?: Rect
) => {
  const fields: (keyof Rect)[] = ["left", "top", "width", "height"];
  if (fields.find((field) => curr[field] !== prev?.[field]))
    [...callbacks].forEach((cb) => cb(curr, prev));
  prev = {
    left: curr.left,
    top: curr.top,
    width: curr.width,
    height: curr.height,
  };
};
