import { sum } from "./array";
const assertClose = (expected: number, actual: number) => {
  if (Math.abs(expected - actual) > 0.001)
    throw new Error(
      `Failed Assertion: |${expected} - ${actual}| = ${Math.abs(
        expected - actual
      )} > EPS `
    );
};

export interface Cell {
  left: number;
  top: number;
  width: number;
  readonly height: number;
}
export interface LayoutOptions {
  left?: number;
  top?: number;
  width?: number;
  jagged?: boolean;
  gap?: number;
  mode?: "row" | "col";

  /* If true, ensures that final width matches width specified in
   * layout options. Only applies if mode is unset or jagged is true
   */
  fit?: boolean;
}
export class CellContainer implements Cell {
  private _cells: Cell[];
  private _layout: LayoutOptions;
  constructor(cells: Cell[], layout: LayoutOptions = {}) {
    this._cells = cells;
    this._layout = layout;
    this.pack();
  }

  get cells() {
    return this._cells as readonly Cell[];
  }

  push(cell: Cell) {
    this._cells.push(cell);
    this.pack();
  }

  get layout() {
    return { ...this._layout } as const;
  }

  /**
   * Set layout options and recompute layout
   */
  setLayout(options: LayoutOptions) {
    this._layout = { ...this._layout, ...options };
    this.pack();
  }

  /**
   * Computes and updates the sizes and positions of cells according to this
   * instances layout options. You usually do not need to call this manually
   * unless the cells' layout has been modified externally
   */
  pack(overrides?: LayoutOptions) {
    const {
      left = this.left,
      top = this.top,
      width = this.width,
      fit,
      jagged,
      gap: _gap,
      mode,
    } = { ...this._layout, ...overrides };
    const gap = _gap as number; // TypeScript workaround
    const cells = this._cells;

    // Validate arguments
    if (mode && mode !== "col" && mode !== "row")
      throw new Error(`Invalid layout mode \`${mode}\``);
    if (mode && typeof gap === "undefined")
      throw new Error(`Gap must be defined in ${mode} mode`);

    // Free layout mode
    if (!mode) {
      if (fit) {
        // Resize/move all items to fit within width
        const scale = width / this.width;
        if (scale !== 1)
          cells.forEach((cell) => {
            cell.top = top + scale * (cell.top - top);
            cell.left = left + scale * (cell.left - left);
            cell.width *= scale;
          });
      }
    } else if (mode === "row") {
      // Total width without gaps -- widths of cells should sum to this
      const usableWidth = width - gap * (cells.length - 1);

      if (!jagged) {
        // Resize cells to have the same height and align top
        const aspectRatios = cells.map((cell) => cell.width / cell.height);
        const norm = sum(aspectRatios);
        const widths = aspectRatios.map((r) => (usableWidth * r) / norm);
        cells.forEach((cell, i) => {
          cell.top = top;
          cell.width = widths[i];
        });
      } else if (fit) {
        // Resize cells to fill up width
        const currentWidth = sum(cells.map((cell) => cell.width));
        const scale = usableWidth / currentWidth;
        if (scale !== 1) cells.forEach((cell) => (cell.width *= scale));
      }

      // Arrange items horizontally
      let x = left;
      cells.forEach((cell) => {
        cell.left = x;
        x += cell.width + gap;
      });
    } else {
      if (!jagged) {
        // Resize cells to have the same width and align left
        cells.forEach((cell) => {
          cell.left = left;
          cell.width = width;
        });
      } else if (fit) {
        // Resize cells to fill up width
        const scale = width / this.width;
        if (scale !== 1) cells.forEach((cell) => (cell.width *= scale));
      }

      // Arrange items vertically
      let y = top;
      cells.forEach((cell) => {
        cell.top = y;
        y += cell.height + gap;
      });
    }
  }

  get left() {
    if (this._cells.length === 0) return this._layout.left ?? NaN;
    return Math.min(...this._cells.map((cell) => cell.left));
  }

  get top() {
    if (this._cells.length === 0) return this._layout.top ?? NaN;
    return Math.min(...this._cells.map((cell) => cell.top));
  }

  get width() {
    if (this._cells.length === 0) return 0;
    return (
      Math.max(...this._cells.map((cell) => cell.left + cell.width)) - this.left
    );
  }

  get height() {
    if (this._cells.length === 0) return 0;
    return (
      Math.max(...this._cells.map((cell) => cell.top + cell.height)) - this.top
    );
  }

  set left(val) {
    const offset = val - this.left;
    this._layout.left = val;
    this._cells.map((cell) => (cell.left += offset));
  }

  set top(val) {
    const offset = val - this.top;
    this._layout.top = val;
    this._cells.map((cell) => (cell.top += offset));
  }

  set width(val) {
    this._layout.width = val;
    this.pack({ fit: true });

    // Check for debugging packing
    assertClose(val, this.width);
  }
}
