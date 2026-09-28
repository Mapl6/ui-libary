import { type ComponentProps, type CSSProperties } from "react"

import { cn } from "@/lib/utils/cn"

export type SkeletonShape = "text" | "rect" | "circle"

export type SkeletonProps = ComponentProps<"div"> & {
  /**
   * `text` renders one or more lines; `rect` and `circle` render a single block.
   * @default "rect"
   */
  shape?: SkeletonShape
  /** Width as a CSS length or pixels. */
  width?: string | number
  /** Height as a CSS length or pixels. Ignored for `text`. */
  height?: string | number
  /**
   * Number of lines for `shape="text"`. The last line is shorter.
   * @default 1
   */
  lines?: number
  /**
   * Pulse animation. Disabled automatically under reduced motion.
   * @default true
   */
  animated?: boolean
}

const toLength = (value: string | number | undefined) => (typeof value === "number" ? `${value}px` : value)

/** A placeholder with the shape of content that is still loading. */
export function Skeleton({
  shape = "rect",
  width,
  height,
  lines = 1,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const base = cn("bg-neutral-subtle", animated && "animate-pulse")

  if (shape === "text") {
    return (
      <div aria-hidden className={cn("flex flex-col gap-2", className)} style={{ width: toLength(width), ...style }} {...props}>
        {Array.from({ length: Math.max(1, lines) }, (_, i) => (
          <div key={i} className={cn(base, "h-3 rounded-sm", lines > 1 && i === lines - 1 && "w-3/5")} />
        ))}
      </div>
    )
  }

  const size: CSSProperties = { width: toLength(width), height: toLength(height ?? (shape === "circle" ? width : undefined)) }

  return (
    <div
      aria-hidden
      className={cn(base, shape === "circle" ? "size-10 rounded-full" : "h-16 w-full rounded-md", className)}
      style={{ ...size, ...style }}
      {...props}
    />
  )
}
