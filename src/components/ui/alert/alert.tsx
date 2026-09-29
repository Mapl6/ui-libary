import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react"
import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export type AlertTone = "neutral" | "info" | "success" | "warning" | "danger"

export type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  /**
   * Semantic tone. `warning` and `danger` are announced immediately (`role="alert"`).
   * @default "info"
   */
  tone?: AlertTone
  /** Bold first line. */
  title?: ReactNode
  /** Supporting text. */
  children?: ReactNode
  /** Replaces the tone's default icon. Pass `false` to hide it. */
  icon?: ReactNode | false
  /** Actions such as buttons or links, below the text. */
  actions?: ReactNode
  /** Shows a close button and calls this when pressed. */
  onDismiss?: () => void
  /**
   * Accessible label for the close button.
   * @default "Dismiss"
   */
  dismissLabel?: string
}

const tones: Record<AlertTone, string> = {
  neutral: "bg-surface-muted text-foreground [--alert-icon:var(--ui-foreground-muted)]",
  info: "border-info/25 bg-info-subtle text-info-subtle-foreground [--alert-icon:var(--ui-info)]",
  success:
    "border-success/25 bg-success-subtle text-success-subtle-foreground [--alert-icon:var(--ui-success)]",
  warning:
    "border-warning/35 bg-warning-subtle text-warning-subtle-foreground [--alert-icon:var(--ui-warning)]",
  danger:
    "border-danger/25 bg-danger-subtle text-danger-subtle-foreground [--alert-icon:var(--ui-danger)]",
}

const icons: Record<AlertTone, ReactNode> = {
  neutral: <Info />,
  info: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  danger: <CircleAlert />,
}

/** An inline message that communicates status or important context. */
export function Alert({
  tone = "info",
  title,
  children,
  icon,
  actions,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  role,
  ...props
}: AlertProps) {
  const urgent = tone === "warning" || tone === "danger"
  const shownIcon = icon === false ? null : (icon ?? icons[tone])

  return (
    <div
      role={role ?? (urgent ? "alert" : "status")}
      className={cn(
        "relative flex gap-3 rounded-lg border p-3 text-base",
        tones[tone],
        className
      )}
      {...props}
    >
      {shownIcon && (
        <span
          aria-hidden
          className="mt-0.5 flex shrink-0 text-(--alert-icon) [&_svg]:size-4"
        >
          {shownIcon}
        </span>
      )}
      <div className={cn("flex min-w-0 flex-1 flex-col gap-1", onDismiss && "pe-6")}>
        {title && <p className="leading-5 font-medium">{title}</p>}
        {children && <div className="text-sm leading-5 opacity-90">{children}</div>}
        {actions && <div className="mt-2 flex flex-wrap gap-2">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="absolute end-2 top-2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 [&_svg]:size-4"
        >
          <X />
        </button>
      )}
    </div>
  )
}
