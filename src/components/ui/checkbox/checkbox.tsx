"use client"

import { Check, Minus } from "lucide-react"
import { type ComponentProps, type ReactNode, useEffect, useRef } from "react"

import { useField } from "@/components/ui/field"
import { cn } from "@/lib/utils/cn"
import { mergeRefs } from "@/lib/utils/compose"

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  /** Visible label, rendered as a `<label>` next to the box. */
  label?: ReactNode
  /** Secondary text under the label. */
  description?: ReactNode
  /**
   * Mixed state, e.g. for a "select all" box when only some items are selected.
   * @default false
   */
  indeterminate?: boolean
  /**
   * Marks the checkbox invalid.
   * @default false
   */
  invalid?: boolean
  /**
   * Prevents interaction.
   * @default false
   */
  disabled?: boolean
  /** Controlled checked state. */
  checked?: boolean
}

/** A native checkbox with a custom visual, label and description. */
export function Checkbox({
  label,
  description,
  indeterminate = false,
  invalid = false,
  disabled = false,
  id,
  className,
  ref,
  "aria-describedby": describedBy,
  ...props
}: CheckboxProps) {
  const field = useField({ id, description, invalid, describedBy })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <div className={cn("flex items-start gap-2.5", disabled && "opacity-50", className)}>
      <span className="relative mt-0.5 flex size-4 shrink-0">
        <input
          ref={mergeRefs(inputRef, ref)}
          type="checkbox"
          disabled={disabled}
          {...field.controlProps}
          aria-describedby={field.messageId ?? describedBy}
          className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-sm focus-visible:outline-none disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none flex size-4 items-center justify-center rounded-sm border border-border-strong bg-surface text-transparent shadow-xs transition-colors",
            "peer-hover:border-foreground-subtle",
            "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
            "peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-indeterminate:text-primary-foreground",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            "peer-aria-invalid:border-danger [&>svg]:size-3 [&>svg]:stroke-3"
          )}
        >
          {indeterminate ? <Minus /> : <Check />}
        </span>
      </span>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label htmlFor={field.controlId} className="cursor-pointer text-base leading-5 text-foreground select-none">
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
