//// UTILS ////
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const min = (arr: number[], valueIfEmpty: number = Infinity) =>
  arr.length ? Math.min(...arr) : valueIfEmpty;
const max = (arr: number[], valueIfEmpty: number = -Infinity) =>
  arr.length ? Math.max(...arr) : valueIfEmpty;
