"use client"

import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils/cn"

export type FieldControlSize = "sm" | "md" | "lg"

/** Props shared by every labelled form control. */
export type FieldOwnProps = {
  /** Visible label. Omit only when an `aria-label` is provided instead. */
  label?: ReactNode
  /** Help text below the control, linked with `aria-describedby`. */
  description?: ReactNode
  /** Error message. Marks the control invalid and replaces the description. */
  error?: ReactNode
}

type UseFieldOptions = {
  id?: string
  description?: ReactNode
  error?: ReactNode
  invalid?: boolean
  describedBy?: string
}

/** Wires ids and ARIA attributes between a control, its label and its messages. */
export function useField({
  id,
  description,
  error,
  invalid,
  describedBy,
}: UseFieldOptions) {
  const generated = useId()
  const controlId = id ?? generated
  const hasError = Boolean(error)
  const messageId = hasError
    ? `${controlId}-error`
    : description
      ? `${controlId}-description`
      : undefined
  return {
    controlId,
    messageId,
    invalid: invalid || hasError,
    controlProps: {
      id: controlId,
      "aria-invalid": invalid || hasError || undefined,
      "aria-describedby": [describedBy, messageId].filter(Boolean).join(" ") || undefined,
    },
  }
}

type FieldProps = FieldOwnProps & {
  controlId: string
  messageId?: string
  required?: boolean
  disabled?: boolean
  className?: string
  children: ReactNode
  /** Extra content aligned with the label (e.g. a character counter). */
  aside?: ReactNode
}

/** Layout for label + control + message. Internal building block for form components. */
export function Field({
  label,
  description,
  error,
  controlId,
  messageId,
  required,
  disabled,
  className,
  children,
  aside,
}: FieldProps) {
  return (
    <div
      className={cn("flex w-full flex-col gap-1.5", disabled && "opacity-60", className)}
    >
      {(label || aside) && (
        <div className="flex items-baseline justify-between gap-3">
          {label && (
            <label htmlFor={controlId} className="text-sm font-medium text-foreground">
              {label}
              {required && (
                <span className="ms-0.5 text-danger" aria-hidden>
                  *
                </span>
              )}
            </label>
          )}
          {aside}
        </div>
      )}
      {children}
      {error ? (
        <p id={messageId} className="text-sm text-danger">
          {error}
        </p>
      ) : description ? (
        <p id={messageId} className="text-sm text-foreground-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}

/** Shared visual style for text-like controls. */
export const controlBase = cn(
  "w-full min-w-0 rounded-md border border-border-strong bg-surface text-foreground shadow-xs",
  "transition-[border-color,box-shadow] placeholder:text-foreground-subtle",
  "hover:border-foreground-subtle",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:hover:border-border-strong",
  "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20"
)

export const controlSizes: Record<FieldControlSize, string> = {
  sm: "h-7 px-2 text-sm",
  md: "h-8 px-2.5 text-base",
  lg: "h-10 px-3 text-md",
}
