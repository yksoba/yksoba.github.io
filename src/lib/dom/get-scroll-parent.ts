/**
 * Finds the first scrollable parent element or body if no parent element is scrollable.
 * Source: https://stackoverflow.com/a/42543908
 * @param element 
 * @param includeHidden 
 * @returns 
 */
export function getScrollParent(element: HTMLElement, includeHidden = false) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === "absolute";
  var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === "fixed") return document.body;
  for (var parent: HTMLElement | null = element; (parent = parent.parentElement);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  }

  return document.body;
}