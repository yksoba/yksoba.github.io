export type Rect = { left: number; top: number; width: number; height: number };

export const doesOverlap = (ref: Rect | Rect[], query: Rect): boolean => {
  if (Array.isArray(ref)) {
    return !!ref.find((ref) => doesOverlap(ref, query));
  } else {
    return (
      Math.max(ref.left + ref.width, query.left + query.width) -
        Math.min(ref.left, query.left) <
        ref.width + query.width &&
      Math.max(ref.top + ref.height, query.top + query.height) -
        Math.min(ref.top, query.top) <
        ref.height + query.height
    );
  }
};

export const doesContain = (ref: Rect, query: Rect): boolean => {
  return (
    ref.left <= query.left &&
    query.left + query.width <= ref.left + ref.width &&
    ref.top <= query.top &&
    query.top + query.height <= ref.top + ref.height
  );
};
