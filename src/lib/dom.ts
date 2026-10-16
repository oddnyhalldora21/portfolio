type Attrs = Record<string, string | boolean | undefined>;
type Child = Node | string | null | undefined | false;

/**
 * Tiny element helper. Text children are inserted as text nodes, so
 * content from data files is never interpreted as HTML.
 */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    el.setAttribute(key, value === true ? "" : value);
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child);
  }
  return el;
}
