import { type ComponentProps, type MouseEvent, type ReactNode } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils/cn"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "link"
export type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = ComponentProps<"button"> & {
  /**
   * Visual style. Use one `primary` button per view for the main action.
   * @default "primary"
   */
  variant?: ButtonVariant
  /**
   * Height and padding.
   * @default "md"
   */
  size?: ButtonSize
  /**
   * Shows a spinner and ignores clicks while keeping the button focusable and its width stable.
   * @default false
   */
  loading?: boolean
  /**
   * Prevents interaction.
   * @default false
   */
  disabled?: boolean
  /**
   * Stretches the button to the width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Renders a square button for a single icon. Provide an `aria-label`.
   * @default false
   */
  iconOnly?: boolean
  /** Icon rendered before the label (on the right in RTL). */
  startIcon?: ReactNode
  /** Icon rendered after the label (on the left in RTL). */
  endIcon?: ReactNode
  /** Button label. */
  children?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover",
  secondary: "bg-neutral-subtle text-foreground hover:bg-border",
  outline: "border border-border-strong bg-surface text-foreground shadow-xs hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-neutral-subtle",
  danger: "bg-danger text-danger-foreground shadow-xs hover:bg-danger-hover",
  link: "h-auto! px-0! text-primary underline-offset-4 hover:underline",
}

const sizes: Record<ButtonSize, string> = {
  sm: "h-7 gap-1.5 rounded-sm px-2.5 text-sm [&_svg]:size-3.5",
  md: "h-8 gap-2 rounded-md px-3 text-base [&_svg]:size-4",
  lg: "h-10 gap-2 rounded-md px-4 text-md [&_svg]:size-4.5",
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "w-7 px-0",
  md: "w-8 px-0",
  lg: "w-10 px-0",
}

/** Triggers an action. Renders a native `<button>` (defaults to `type="button"`). */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  iconOnly = false,
  startIcon,
  endIcon,
  className,
  children,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
        variants[variant],
        sizes[size],
        iconOnly && iconOnlySizes[size],
        fullWidth && "w-full",
        loading && "cursor-progress",
        className
      )}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-[inherit]", loading && "invisible")}>
        {startIcon}
        {children}
        {endIcon}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={size === "lg" ? "md" : "sm"} decorative />
        </span>
      )}
    </button>
  )
}
