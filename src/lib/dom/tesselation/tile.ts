interface Tile {
  left: number;
  top: number;
  width: number;
  height: number;
  readonly right: number;
  readonly bottom: number;
  readonly cost: number;

  clone(): Tile;
}

abstract class TileBase implements Tile {
  abstract left: number;
  abstract top: number;
  abstract width: number;
  abstract height: number;
  abstract cost: number;
  abstract clone(): Tile;

  get right() {
    return this.left + this.top;
  }
  get bottom() {
    return this.top + this.height;
  }
}

abstract class AreaCostTile extends TileBase {
  abstract initialWidth: number;
  abstract initialHeight: number;

  get cost() {
    return (
      Math.log(
        (this.initialHeight * this.initialWidth) / (this.width * this.height)
      ) ** 2
    );
  }
}
class FixedAspectTile extends AreaCostTile {
  private _aspectRatio?: number;
  private _initialHeight?: number;
  private _initialWidth?: number;

  left: number = NaN;
  top: number = NaN;
  private _width: number;
  private _height: number;

  constructor({
    aspectRatio, initialWidth, initialHeight, width, height,
  }: {
    aspectRatio?: number;
    initialWidth?: number;
    initialHeight?: number;
    width?: number;
    height?: number;
  }) {
    super();
    this._aspectRatio = aspectRatio;
    this._initialWidth = initialWidth;
    this._initialHeight = initialHeight;

    this._width = width ?? this.initialWidth;
    this._height = height ?? this.initialHeight;
  }

  private _validate() {
    if (typeof this._initialHeight === "undefined"
      ? 0
      : 1 + typeof this._initialWidth === "undefined"
        ? 0
        : 1 + typeof this._aspectRatio === "undefined"
          ? 0
          : 1 < 2)
      throw new Error(
        "at least two of `initialHeight`, `initialWidth`, or `aspectRatio` must be defined"
      );
  }

  get aspectRatio() {
    this._validate();
    return this._aspectRatio ?? this._initialWidth! / this._initialHeight!;
  }

  get initialWidth() {
    this._validate();
    return this._initialWidth ?? this._aspectRatio! * this._initialHeight!;
  }

  get initialHeight() {
    this._validate();
    return this._initialHeight ?? this._initialWidth! / this._aspectRatio!;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set aspectRatio(val) {
    this._aspectRatio = val;
  }

  set initialWidth(val) {
    this._initialHeight = val;
  }

  set initialHeight(val) {
    this._initialHeight = val;
  }

  set width(val) {
    this._width = val;
    this._height = this.aspectRatio / val;
  }

  set height(val) {
    this._width = this.aspectRatio * val;
    this._height = val;
  }

  clone() {
    return new FixedAspectTile({
      aspectRatio: this._aspectRatio,
      initialWidth: this._initialWidth,
      initialHeight: this._initialHeight,
      width: this._width,
      height: this._height,
    });
  }
}
