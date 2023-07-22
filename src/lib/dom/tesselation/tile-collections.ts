import { Tile, TileConstraints } from "./tile";
import {
  WatchableTile,
  WatchableTileBase,
  WatchableTileCallback,
  makeWatchableClone,
} from "./watchable-tile";

export abstract class CollectionTileBase extends WatchableTileBase {
  constructor(protected _tiles: WatchableTile[]) {
    super();
    this._tiles.forEach((tile) => tile.watch(this._callback));
  }

  get cost() {
    return sum(this.tiles.map((tile) => tile.cost));
  }

  get tiles() {
    return this._tiles as readonly Tile[];
  }

  splice(start: number, deleteCount: number, ...tiles: readonly Tile[]) {
    const newTiles = tiles.map(makeWatchableClone);
    newTiles.forEach((tile) => tile.watch(this._callback));

    const removedTiles = this._tiles.splice(start, deleteCount, ...newTiles);
    removedTiles.forEach((tile) => tile.unwatch(this._callback));
    this.pack();
  }

  protected _lock = false;
  protected readonly _callback: WatchableTileCallback = () => {
    if (!this._lock) this.pack();
  };

  abstract pack(): void;
}

export class RowTile extends CollectionTileBase {
  private _gap: number;
  private _left: number;
  private _top: number;
  private _height: number;

  constructor(
    tiles: readonly Tile[],
    {
      gap,
      left,
      top,
      height,
    }: { gap: number; left: number; top: number; height: number },
    pack = true
  ) {
    super(
      tiles
        .flatMap((tile) =>
          tile instanceof RowTile && tile._gap === gap ? tile.tiles : [tile]
        )
        .map(makeWatchableClone)
    );
    this._gap = gap;
    this._left = left;
    this._top = top;
    this._height = height;

    this._notify();
    if (pack) this.pack();
  }

  get left() {
    return this._left;
  }

  get top() {
    return this._top;
  }

  get right() {
    return this.tiles[this.tiles.length - 1].right;
  }

  get width() {
    return this.right - this.left;
  }

  get height() {
    return this._height;
  }

  get constraints() {
    return {
      scaling: {
        type: "proportional",
        paddingX: this._gap * (this.tiles.length - 1),
        paddingY: 0,
      },
    } as TileConstraints;
  }

  set left(newValue) {
    this._left = newValue;
    this.pack();
  }

  set top(newValue) {
    this._top = newValue;
    this.pack();
  }

  set width(newValue) {
    let totalWidth = newValue - this._gap * (this.tiles.length - 1);
    let totalAR = 0;

    this.tiles.forEach((tile) => {
      const scaling = tile.constraints.scaling;
      if (scaling.type === "free") {
        totalWidth -= tile.width;
      } else if (scaling.type === "proportional") {
        const ar =
          (tile.width - scaling.paddingX) / (tile.height - scaling.paddingY);
        totalWidth += ar * scaling.paddingY - scaling.paddingX;
        totalAR += ar;
      } else {
        throw new Error(
          `unsupported scaling constraint type \`${(scaling as any).type}\``
        );
      }
    });

    this._height = totalWidth / totalAR;
    this.pack();
  }

  set height(newValue) {
    this._height = newValue;
    this.pack();
  }

  clone() {
    return new RowTile(
      this.tiles,
      {
        gap: this._gap,
        left: this._left,
        top: this._top,
        height: this._height,
      },
      false
    );
  }

  pack() {
    this._lock = true;

    let left = this._left;
    this.tiles.forEach((tile) => {
      tile.height = this._height;

      tile.top = this._top;
      tile.left = left;

      left += tile.width + this._gap;
    });

    this._lock = false;
    this._notify();
  }
}

export class ColTile extends CollectionTileBase {
  private _gap: number;
  private _left: number;
  private _top: number;
  private _width: number;

  constructor(
    tiles: readonly Tile[],
    {
      gap,
      left,
      top,
      width,
    }: { gap: number; left: number; top: number; width: number },
    pack = true
  ) {
    super(
      tiles
        .flatMap((tile) =>
          tile instanceof ColTile && tile._gap === gap ? tile.tiles : [tile]
        )
        .map((tile) => makeWatchableClone(tile))
    );
    this._gap = gap;
    this._left = left;
    this._top = top;
    this._width = width;

    this._notify();
    if (pack) this.pack();
  }

  get left() {
    return this._left;
  }

  get top() {
    return this._top;
  }

  get bottom() {
    return this.tiles[this.tiles.length - 1].bottom;
  }

  get height() {
    return this.bottom - this.top;
  }

  get width() {
    return this._width;
  }

  get constraints() {
    return {
      scaling: {
        type: "proportional",
        paddingX: 0,
        paddingY: this._gap * (this.tiles.length - 1),
      },
    } as TileConstraints;
  }

  set left(newValue) {
    this._left = newValue;
    this.pack();
  }

  set top(newValue) {
    this._top = newValue;
    this.pack();
  }

  set height(newValue) {
    let totalHeight = newValue - this._gap * (this.tiles.length - 1);
    let totalAR = 0;

    this.tiles.forEach((tile) => {
      const scaling = tile.constraints.scaling;
      if (scaling.type === "free") {
        totalHeight -= tile.height;
      } else if (scaling.type === "proportional") {
        const ar =
          (tile.width - scaling.paddingX) / (tile.height - scaling.paddingY);
        totalHeight += scaling.paddingX / ar - scaling.paddingY;
        totalAR += 1 / ar;
      } else {
        throw new Error(
          `unsupported scaling constraint type \`${(scaling as any).type}\``
        );
      }
    });

    this._width = totalHeight / totalAR;
    this.pack();
  }

  set width(newValue) {
    this._width = newValue;
    this.pack();
  }

  clone() {
    return new RowTile(
      this.tiles,
      {
        gap: this._gap,
        left: this._left,
        top: this._top,
        height: this._width,
      },
      false
    );
  }

  pack() {
    this._lock = true;

    let top = this._top;
    this.tiles.forEach((tile) => {
      tile.width = this._width;

      tile.left = this._left;
      tile.top = top;

      top += tile.height + this._gap;
    });

    this._lock = false;
    this._notify();
  }
}
