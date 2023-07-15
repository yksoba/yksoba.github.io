type TileProxy = Tile & {
  readonly isProxy: true;
  watch(callback: TileProxyCallback): void;
  unwatch(callback: TileProxyCallback): void;
};
type TileProxyCallback = (
  tile: Tile,
  property: "left" | "top" | "width" | "height",
  newValue: number
) => void;
const isTileProxy = (tile: Tile | TileProxy): tile is TileProxy =>
  (tile as TileProxy).isProxy;
const makeTileProxy = (tile: Tile | TileProxy) => {
  let callbacks = new Set<TileProxyCallback>();
  const extension: any = {
    isProxy: true,
    watch(cb: TileProxyCallback) {
      callbacks.add(cb);
    },
    unwatch(cb: TileProxyCallback) {
      callbacks.delete(cb);
    },
  };

  return new Proxy(tile.clone(), {
    get(target, p, receiver) {
      return extension[p] ?? Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      const result = Reflect.set(target, p, newValue, receiver);
      if (
        (p === "left" || p === "top" || p === "width" || p === "height") &&
        target[p] !== newValue
      )
        [...callbacks].forEach((cb) => cb(target, p, newValue));
      return result;
    },
    has(target, p) {
      return p in extension || Reflect.has(target, p);
    },
  }) as TileProxy;
};
