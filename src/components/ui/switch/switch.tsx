"use client"

import { type ComponentProps, type ReactNode } from "react"

import { useField } from "@/components/ui/field"
import { cn } from "@/lib/utils/cn"

export type SwitchSize = "sm" | "md"

export type SwitchProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  /** Visible label. */
  label?: ReactNode
  /** Secondary text under the label. */
  description?: ReactNode
  /**
   * Track size.
   * @default "md"
   */
  size?: SwitchSize
  /**
   * Places the label before the switch, as in settings lists.
   * @default false
   */
  labelFirst?: boolean
  /**
   * Prevents interaction.
   * @default false
   */
  disabled?: boolean
  /** Controlled on/off state. */
  checked?: boolean
}

const tracks: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
}

const thumbs: Record<SwitchSize, string> = {
  sm: "size-3 peer-checked:translate-x-3 rtl:peer-checked:-translate-x-3",
  md: "size-4 peer-checked:translate-x-4 rtl:peer-checked:-translate-x-4",
}

/** An on/off toggle for settings that take effect immediately. */
export function Switch({
  label,
  description,
  size = "md",
  labelFirst = false,
  disabled = false,
  id,
  className,
  "aria-describedby": describedBy,
  ...props
}: SwitchProps) {
  const field = useField({ id, description, describedBy })

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        labelFirst && "flex-row-reverse justify-between",
        disabled && "opacity-50",
        className
      )}
    >
      <span
        className={cn("relative mt-0.5 inline-flex shrink-0 items-center", tracks[size])}
      >
        <input
          type="checkbox"
          role="switch"
          disabled={disabled}
          {...field.controlProps}
          className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-full focus-visible:outline-none disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-border-strong transition-colors",
            "peer-checked:bg-primary peer-hover:not-peer-checked:bg-foreground-subtle",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none relative ms-0.5 rounded-full bg-primary-foreground shadow-sm transition-transform duration-normal",
            thumbs[size]
          )}
        />
      </span>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={field.controlId}
              className="cursor-pointer text-base leading-5 text-foreground select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <p id={field.messageId} className="text-sm text-foreground-muted">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
