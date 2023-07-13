import { debounce } from "debounce";

export type Debouncer = (callback: () => void) => void;
export const makeDebouncer = (interval: number, immediate = false) =>
  debounce((callback: () => void) => callback(), interval, immediate);
