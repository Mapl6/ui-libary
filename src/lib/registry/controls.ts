import type { AnyShowcaseMeta, Args, ControlOverride, ControlType, PropDoc } from "./types"

export type ResolvedControl = {
  name: string
  label: string
  control: ControlType
  options?: readonly string[]
  description?: string
  min?: number
  max?: number
  step?: number
}

/** Props that are never useful as playground controls. */
const IGNORED = new Set(["className", "style", "id", "ref", "key", "wrapperClassName"])

function inferControl(prop: PropDoc): ControlType | null {
  switch (prop.kind) {
    case "boolean":
      return "boolean"
    case "enum":
      return (prop.options?.length ?? 0) <= 4 ? "radio" : "select"
    case "string":
      return "text"
    case "number":
      return "number"
    case "array":
    case "object":
      return "json"
    case "node":
      return prop.name === "children" ? "text" : null
    default:
      return null
  }
}

/**
 * Builds the playground controls from generated prop docs plus the meta's overrides.
 * Overrides for names that aren't props create "virtual" controls (e.g. DialogContent's `title`).
 */
export function resolveControls(meta: AnyShowcaseMeta, props: PropDoc[]): ResolvedControl[] {
  const overrides = meta.controls ?? {}
  const resolved: ResolvedControl[] = []
  const seen = new Set<string>()

  for (const prop of props) {
    seen.add(prop.name)
    const override = overrides[prop.name]
    if (override === false || IGNORED.has(prop.name) || prop.kind === "function") continue
    const control = override?.control ?? inferControl(prop)
    if (!control) continue
    resolved.push(build(prop.name, control, override, prop))
  }

  for (const [name, override] of Object.entries(overrides)) {
    if (seen.has(name) || !override || !override.control) continue
    resolved.push(build(name, override.control, override))
  }

  return resolved
}

function build(name: string, control: ControlType, override?: ControlOverride, prop?: PropDoc): ResolvedControl {
  return {
    name,
    label: override?.label ?? name,
    control,
    options: override?.options ?? prop?.options,
    description: prop?.description,
    min: override?.min,
    max: override?.max,
    step: override?.step,
  }
}

/** Parses a JSDoc `@default` value ("md", false, 3) into a runtime value. */
export function parseDefault(raw: string | undefined): unknown {
  if (raw === undefined) return undefined
  try {
    return JSON.parse(raw)
  } catch {
    return raw.replace(/^['"`]|['"`]$/g, "")
  }
}

/** Initial args: prop `@default`s, overridden by the meta's `args`. */
export function initialArgs(meta: AnyShowcaseMeta, props: PropDoc[]): Args {
  const defaults: Args = {}
  for (const prop of props) {
    const value = parseDefault(prop.defaultValue)
    if (value !== undefined) defaults[prop.name] = value
  }
  return { ...defaults, ...meta.args }
}
