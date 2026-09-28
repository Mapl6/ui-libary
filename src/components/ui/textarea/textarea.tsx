"use client"

import { type ChangeEvent, type ComponentProps, useState } from "react"

import { Field, type FieldOwnProps, controlBase, useField } from "@/components/ui/field"
import { cn } from "@/lib/utils/cn"

export type TextareaResize = "none" | "vertical" | "auto"

export type TextareaProps = ComponentProps<"textarea"> &
  FieldOwnProps & {
    /**
     * `auto` grows with the content (CSS `field-sizing`) and falls back to vertical resizing.
     * @default "vertical"
     */
    resize?: TextareaResize
    /**
     * Visible rows before scrolling (or the minimum height with `resize="auto"`).
     * @default 3
     */
    rows?: number
    /**
     * Shows a character counter. Requires `maxLength`.
     * @default false
     */
    showCount?: boolean
    /** Maximum number of characters. */
    maxLength?: number
    /**
     * Marks the textarea invalid without an error message.
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
    /** Placeholder text. */
    placeholder?: string
    /** Class name for the outer field wrapper. */
    wrapperClassName?: string
  }

const resizes: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  auto: "resize-y [field-sizing:content]",
}

/** A multi-line text field with optional auto-sizing and character counter. */
export function Textarea({
  label,
  description,
  error,
  resize = "vertical",
  rows = 3,
  showCount = false,
  maxLength,
  invalid = false,
  required = false,
  disabled = false,
  id,
  className,
  wrapperClassName,
  value,
  defaultValue,
  onChange,
  "aria-describedby": describedBy,
  ...props
}: TextareaProps) {
  const field = useField({ id, description, error, invalid, describedBy })
  const [uncontrolledLength, setUncontrolledLength] = useState(() => String(defaultValue ?? "").length)
  const length = value !== undefined ? String(value).length : uncontrolledLength
  const counterId = `${field.controlId}-count`
  const withCounter = showCount && maxLength !== undefined

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUncontrolledLength(event.target.value.length)
    onChange?.(event)
  }

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
      aside={
        withCounter ? (
          <span
            id={counterId}
            className={cn("text-xs text-foreground-subtle tabular-nums", length >= maxLength && "text-danger")}
          >
            {length}/{maxLength}
          </span>
        ) : null
      }
    >
      <textarea
        {...field.controlProps}
        aria-describedby={[field.controlProps["aria-describedby"], withCounter ? counterId : null].filter(Boolean).join(" ") || undefined}
        rows={rows}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(controlBase, "min-h-16 px-2.5 py-1.5 text-base", resizes[resize], className)}
        {...props}
      />
    </Field>
  )
}
