"use client"

import { useId, useState } from "react"

import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { ResolvedControl } from "@/lib/registry/controls"
import { cn } from "@/lib/utils/cn"

type ControlFieldProps = {
  control: ResolvedControl
  value: unknown
  onChange: (value: unknown) => void
}

const labelClass = "font-mono text-xs font-medium text-foreground"

/** One playground control, rendered with the library's own form components. */
export function ControlField({ control, value, onChange }: ControlFieldProps) {
  const label = <span className={labelClass}>{control.label}</span>

  switch (control.control) {
    case "boolean":
      return (
        <Switch
          size="sm"
          labelFirst
          label={label}
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="justify-between py-1"
          title={control.description}
        />
      )
    case "select":
      return (
        <Select
          size="sm"
          label={label}
          options={(control.options ?? []).map((o) => ({ value: o, label: o }))}
          value={value === undefined ? "" : String(value)}
          placeholder={value === undefined ? "—" : undefined}
          onChange={(event) => onChange(event.target.value)}
          title={control.description}
        />
      )
    case "radio":
      return <Segmented control={control} value={value} onChange={onChange} />
    case "number":
      return (
        <Input
          size="sm"
          type="number"
          label={label}
          min={control.min}
          max={control.max}
          step={control.step}
          value={typeof value === "number" ? value : ""}
          onChange={(event) =>
            onChange(event.target.value === "" ? undefined : Number(event.target.value))
          }
          title={control.description}
        />
      )
    case "textarea":
      return (
        <Textarea
          label={label}
          rows={2}
          resize="auto"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          className="text-sm"
        />
      )
    case "color":
      return (
        <label className="flex items-center justify-between gap-3">
          {label}
          <span className="flex items-center gap-2">
            <span dir="ltr" className="font-mono text-xs text-foreground-muted">
              {String(value ?? "")}
            </span>
            <input
              type="color"
              value={typeof value === "string" ? value : "#000000"}
              onChange={(event) => onChange(event.target.value)}
              className="h-7 w-9 cursor-pointer rounded-sm border bg-surface p-0.5"
            />
          </span>
        </label>
      )
    case "json":
      return <JsonField control={control} value={value} onChange={onChange} />
    default:
      return (
        <Input
          size="sm"
          label={label}
          value={
            typeof value === "string" || typeof value === "number" ? String(value) : ""
          }
          onChange={(event) =>
            onChange(event.target.value === "" ? undefined : event.target.value)
          }
          title={control.description}
        />
      )
  }
}

function Segmented({ control, value, onChange }: ControlFieldProps) {
  const name = useId()
  return (
    <fieldset className="flex flex-col gap-1.5" title={control.description}>
      <legend className={cn(labelClass, "mb-1.5")}>{control.label}</legend>
      <div className="flex flex-wrap gap-0.5 rounded-md bg-neutral-subtle p-0.5">
        {(control.options ?? []).map((option) => (
          <label
            key={option}
            className="relative flex-1 cursor-pointer rounded-sm px-2 py-1 text-center font-mono text-xs text-foreground-muted transition-colors hover:text-foreground has-checked:bg-surface has-checked:text-foreground has-checked:shadow-xs has-focus-visible:outline-2 has-focus-visible:outline-ring"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function JsonField({ control, value, onChange }: ControlFieldProps) {
  const [draft, setDraft] = useState(() => JSON.stringify(value ?? null, null, 2))
  const [error, setError] = useState<string>()

  const commit = () => {
    try {
      onChange(JSON.parse(draft))
      setError(undefined)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
    }
  }

  return (
    <Textarea
      label={<span className={labelClass}>{control.label}</span>}
      description="JSON · applied on blur"
      error={error}
      value={draft}
      rows={4}
      resize="auto"
      spellCheck={false}
      dir="ltr"
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      className="font-mono text-xs"
    />
  )
}
