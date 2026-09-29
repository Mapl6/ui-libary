import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info"
export type BadgeAppearance = "soft" | "solid" | "outline"
export type BadgeSize = "sm" | "md"

export type BadgeProps = ComponentProps<"span"> & {
  /**
   * Semantic color.
   * @default "neutral"
   */
  tone?: BadgeTone
  /**
   * Fill style. `soft` works for most cases; `solid` for high emphasis.
   * @default "soft"
   */
  appearance?: BadgeAppearance
  /**
   * @default "md"
   */
  size?: BadgeSize
  /**
   * Shows a status dot before the label.
   * @default false
   */
  dot?: boolean
  /** Badge label. */
  children?: ReactNode
}

const soft: Record<BadgeTone, string> = {
  neutral: "bg-neutral-subtle text-neutral-subtle-foreground",
  primary: "bg-primary-subtle text-primary-subtle-foreground",
  success: "bg-success-subtle text-success-subtle-foreground",
  warning: "bg-warning-subtle text-warning-subtle-foreground",
  danger: "bg-danger-subtle text-danger-subtle-foreground",
  info: "bg-info-subtle text-info-subtle-foreground",
}

const solid: Record<BadgeTone, string> = {
  neutral: "bg-foreground text-background",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  info: "bg-info text-info-foreground",
}

const outline: Record<BadgeTone, string> = {
  neutral: "border-border-strong text-foreground-muted",
  primary: "border-primary/40 text-primary-subtle-foreground",
  success: "border-success/40 text-success-subtle-foreground",
  warning: "border-warning/50 text-warning-subtle-foreground",
  danger: "border-danger/40 text-danger-subtle-foreground",
  info: "border-info/40 text-info-subtle-foreground",
}

const dots: Record<BadgeTone, string> = {
  neutral: "bg-foreground-subtle",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
}

const sizes: Record<BadgeSize, string> = {
  sm: "h-4.5 gap-1 px-1.5 text-2xs",
  md: "h-5.5 gap-1.5 px-2 text-xs",
}

/** A compact label for status, counts and metadata. */
export function Badge({
  tone = "neutral",
  appearance = "soft",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-transparent font-medium whitespace-nowrap",
        appearance === "soft" && soft[tone],
        appearance === "solid" && solid[tone],
        appearance === "outline" && outline[tone],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            appearance === "solid" ? "bg-current" : dots[tone]
          )}
        />
      )}
      {children}
    </span>
  )
}
