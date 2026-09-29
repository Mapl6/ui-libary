import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export type CardVariant = "outline" | "elevated" | "muted"

export type CardProps = ComponentProps<"div"> & {
  /**
   * Surface treatment.
   * @default "outline"
   */
  variant?: CardVariant
  /**
   * Adds hover styles for cards that act as a single link or button.
   * Put the actual `<a>`/`<button>` inside.
   * @default false
   */
  interactive?: boolean
  /** Card content, usually CardHeader, CardContent and CardFooter. */
  children?: ReactNode
}

export type CardHeaderProps = ComponentProps<"div"> & {
  /** Content aligned to the end of the header, such as a menu or badge. */
  action?: ReactNode
}

export type CardTitleProps = ComponentProps<"h3"> & {
  /**
   * Heading element, to fit the document outline.
   * @default "h3"
   */
  as?: "h2" | "h3" | "h4"
}

const variants: Record<CardVariant, string> = {
  outline: "border bg-surface",
  elevated: "border bg-surface-raised shadow-md",
  muted: "border border-transparent bg-surface-muted",
}

/** A container that groups related content and actions. */
export function Card({
  variant = "outline",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg text-foreground",
        variants[variant],
        interactive &&
          "transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ action, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start gap-3 p-4 pb-0", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardTitle({ as: Heading = "h3", className, ...props }: CardTitleProps) {
  return (
    <Heading
      className={cn("text-md leading-6 font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-foreground-muted", className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-4", className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2 border-t px-4 py-3", className)}
      {...props}
    />
  )
}
