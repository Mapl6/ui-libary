import { type ReactElement, type Ref, cloneElement, isValidElement } from "react"

import { cn } from "./cn"
import { mergeRefs } from "./compose"

type AnyProps = Record<string, unknown>

/**
 * Merges `slotProps` into a single child element (like Radix's `asChild`).
 * Event handlers are chained (child first), class names joined, refs merged.
 */
export function Slot({ children, ...slotProps }: AnyProps & { children: ReactElement }) {
  if (!isValidElement<AnyProps>(children)) return null
  const childProps = children.props
  const merged: AnyProps = { ...slotProps, ...childProps }

  for (const key of Object.keys(slotProps)) {
    const ours = slotProps[key]
    const theirs = childProps[key]
    if (/^on[A-Z]/.test(key) && typeof ours === "function" && typeof theirs === "function") {
      merged[key] = (...args: unknown[]) => {
        theirs(...args)
        const event = args[0] as { defaultPrevented?: boolean } | undefined
        if (!event?.defaultPrevented) ours(...args)
      }
    } else if (key === "className") {
      merged.className = cn(ours as string, theirs as string)
    } else if (key === "ref") {
      merged.ref = mergeRefs(ours as Ref<unknown>, theirs as Ref<unknown>)
    } else if (key.startsWith("aria-") || key === "id") {
      // Accessibility wiring from the component wins over the child's.
      merged[key] = ours ?? theirs
    }
  }

  return cloneElement(children, merged)
}
