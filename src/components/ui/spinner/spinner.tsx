import { type ComponentProps } from "react"

import { cn } from "@/lib/utils/cn"

export type SpinnerSize = "xs" | "sm" | "md" | "lg"

export type SpinnerProps = Omit<ComponentProps<"span">, "children"> & {
  /**
   * Diameter of the spinner.
   * @default "md"
   */
  size?: SpinnerSize
  /**
   * Text announced to screen readers.
   * @default "Loading"
   */
  label?: string
  /**
   * Hides the spinner from assistive technology, for when the surrounding element
   * already communicates the loading state (e.g. `aria-busy` on a button).
   * @default false
   */
  decorative?: boolean
}

const sizes: Record<SpinnerSize, string> = {
  xs: "size-3 border-[1.5px]",
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-8 border-[3px]",
}

/** An indeterminate loading indicator. */
export function Spinner({
  size = "md",
  label = "Loading",
  decorative = false,
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-current border-e-transparent opacity-80 [animation-duration:700ms]",
          sizes[size]
        )}
      />
      {!decorative && <span className="sr-only">{label}</span>}
    </span>
  )
}
