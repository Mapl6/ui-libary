"use client"

import { type ComponentProps, type ReactNode } from "react"

import { Field, type FieldControlSize, type FieldOwnProps, controlBase, controlSizes, useField } from "@/components/ui/field"
import { cn } from "@/lib/utils/cn"

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  FieldOwnProps & {
    /**
     * Control height and text size.
     * @default "md"
     */
    size?: FieldControlSize
    /**
     * Marks the input invalid without an error message (e.g. when the error is shown elsewhere).
     * @default false
     */
    invalid?: boolean
    /**
     * Shows a required indicator and sets the native `required` attribute.
     * @default false
     */
    required?: boolean
    /**
     * Prevents interaction.
     * @default false
     */
    disabled?: boolean
    /** Placeholder text. Don't use it as a replacement for a label. */
    placeholder?: string
    /** Content at the start of the input, such as an icon. Decorative. */
    startAddon?: ReactNode
    /** Content at the end of the input, such as a unit or a clear button. */
    endAddon?: ReactNode
    /** Class name for the outer field wrapper. */
    wrapperClassName?: string
  }

/** A single-line text field with an optional label, description and error message. */
export function Input({
  label,
  description,
  error,
  size = "md",
  invalid = false,
  required = false,
  disabled = false,
  startAddon,
  endAddon,
  id,
  className,
  wrapperClassName,
  "aria-describedby": describedBy,
  ...props
}: InputProps) {
  const field = useField({ id, description, error, invalid, describedBy })

  return (
    <Field
      label={label}
      description={description}
      error={error}
      controlId={field.controlId}
      messageId={field.messageId}
      required={required}
      disabled={disabled}
      className={wrapperClassName}
    >
      <div className="relative flex items-center">
        {startAddon && (
          <span className="pointer-events-none absolute start-2.5 flex text-foreground-subtle [&_svg]:size-4">
            {startAddon}
          </span>
        )}
        <input
          {...field.controlProps}
          required={required}
          disabled={disabled}
          className={cn(controlBase, controlSizes[size], startAddon && "ps-8", endAddon && "pe-9", className)}
          {...props}
        />
        {endAddon && (
          <span className="absolute end-1.5 flex items-center text-foreground-subtle [&_svg]:size-4">{endAddon}</span>
        )}
      </div>
    </Field>
  )
}
