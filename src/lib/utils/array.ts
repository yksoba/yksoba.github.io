const DEFAULT = Symbol();

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const minBy2 =
  <T>(key: (item: T) => any) =>
  (a: T, b: T) =>
    key(b) < key(a) ? b : a;

export const minBy = <T>(
  arr: T[],
  key: (item: T) => any,
  initialValue: T = DEFAULT as any
) =>
  initialValue === DEFAULT
    ? arr.reduce(minBy2(key))
    : arr.reduce(minBy2(key), initialValue);
