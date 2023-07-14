export type Rect = { left: number; top: number; width: number; height: number };
type RectX = Rect | Pick<Rect, "left" | "width">;
type RectY = Rect | Pick<Rect, "top" | "height">;

export const doesOverlapX = (ref: RectX, query: RectX) =>
  Math.max(ref.left + ref.width, query.left + query.width) -
    Math.min(ref.left, query.left) <
  ref.width + query.width;

export const doesOverlapY = (ref: RectY, query: RectY) =>
  Math.max(ref.top + ref.height, query.top + query.height) -
    Math.min(ref.top, query.top) <
  ref.height + query.height;

export const doesOverlap = (ref: Rect, query: Rect) =>
  doesOverlapX(ref, query) && doesOverlapY(ref, query);

export const doesContainX = (ref: RectX, query: RectX) =>
  ref.left <= query.left && query.left + query.width <= ref.left + ref.width;

export const doesContainY = (ref: RectY, query: RectY) =>
  ref.top <= query.top && query.top + query.height <= ref.top + ref.height;

export const doesContain = (ref: Rect, query: Rect) =>
  doesContainX(ref, query) && doesContainY(ref, query);
