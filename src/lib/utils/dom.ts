/** Resolved writing direction of an element (inherits from `dir` ancestors). */
export function isRtl(element: Element | null) {
  if (!element) return false
  return getComputedStyle(element).direction === "rtl"
}

/** Moves focus within a list of elements with wrap-around. */
export function focusSibling(items: HTMLElement[], current: Element | null, step: 1 | -1) {
  if (items.length === 0) return
  const index = current ? items.indexOf(current as HTMLElement) : -1
  const next = items[(index + step + items.length) % items.length]
  next?.focus()
  return next
}
