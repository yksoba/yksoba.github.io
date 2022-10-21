/**
 *  Partitions array in-place and returns the
 *  new pivot index
 */
export const partition = <T>(
  arr: T[],
  pivotIndex: number,
  {
    lo = 0,
    hi = arr.length - 1,
    compare = (a: T, b: T): number => (a < b ? -1 : 1),
  } = {}
) => {
  const pivotValue = arr[pivotIndex];
  let j = lo;

  [arr[pivotIndex], arr[hi]] = [arr[hi], arr[pivotIndex]];
  for (let i = lo; i < hi + 1; i++) {
    if (compare(arr[i], pivotValue) < 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
  }
  [arr[j], arr[hi]] = [arr[hi], arr[j]];

  return j;
};

/**
 * Partially sort and select k-th smallest item from array
 */
export const select = <T>(
  arr: T[],
  k: number,
  {
    compare,
  }: {
    compare?: (a: T, b: T) => number;
  } = {}
) => {
  let lo = 0;
  let hi = arr.length - 1;

  while (true) {
    let pivotIndex = Math.floor(Math.random() * (hi - lo)) + lo;

    pivotIndex = partition(arr, pivotIndex, { lo, hi, compare });

    if (pivotIndex === k) {
      return arr[pivotIndex];
    } else if (k < pivotIndex) {
      hi = pivotIndex - 1;
    } else {
      lo = pivotIndex + 1;
    }
  }
};
