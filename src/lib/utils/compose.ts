import { type Ref, type RefCallback, type SyntheticEvent } from "react"

/** Calls the user's handler first, then ours unless the user prevented default. */
export function composeHandlers<E extends SyntheticEvent>(
  theirs: ((event: E) => void) | undefined,
  ours: (event: E) => void
) {
  return (event: E) => {
    theirs?.(event)
    if (!event.defaultPrevented) ours(event)
  }
}

/** Combines several refs into one callback ref. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    }
  }
}
