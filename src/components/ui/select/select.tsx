"use client"

import { ChevronDown } from "lucide-react"
import { type ComponentProps } from "react"

import { Field, type FieldControlSize, type FieldOwnProps, controlBase, controlSizes, useField } from "@/components/ui/field"
import { cn } from "@/lib/utils/cn"

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectProps = Omit<ComponentProps<"select">, "size" | "children"> &
  FieldOwnProps & {
    /** The options to choose from. */
    options: SelectOption[]
    /** Text for an empty, non-selectable first option. */
    placeholder?: string
    /**
     * Control height and text size.
     * @default "md"
     */
    size?: FieldControlSize
    /**
     * Marks the select invalid without an error message.
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
    /** Class name for the outer field wrapper. */
    wrapperClassName?: string
  }

/**
 * A styled native `<select>`. Native selects get platform pickers on mobile,
 * full keyboard support and form integration for free.
 */
export function Select({
  label,
  description,
  error,
  options,
  placeholder,
  size = "md",
  invalid = false,
  required = false,
  disabled = false,
  id,
  className,
  wrapperClassName,
  defaultValue,
  value,
  "aria-describedby": describedBy,
  ...props
}: SelectProps) {
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
        <select
          {...field.controlProps}
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? (defaultValue ?? (placeholder ? "" : undefined)) : undefined}
          className={cn(
            controlBase,
            controlSizes[size],
            "cursor-pointer appearance-none pe-8 has-[option[value='']:checked]:text-foreground-subtle",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute end-2.5 size-4 text-foreground-subtle"
        />
      </div>
    </Field>
  )
}
