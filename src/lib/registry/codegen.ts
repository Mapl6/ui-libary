import { parseDefault } from "./controls"
import type { PropDoc } from "./types"

/**
 * Generates a JSX usage snippet from playground args.
 * Adapted from the food project's showcase code generator.
 */

const INDENT = "  "

function quote(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

function isIdentifier(key: string) {
  return /^[A-Za-z_$][\w$]*$/.test(key)
}

function indent(text: string, depth = 1) {
  const pad = INDENT.repeat(depth)
  return text
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n")
}

export function toLiteral(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (typeof value === "string") return quote(value)
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    const items = value.map(toLiteral)
    const inline = `[${items.join(", ")}]`
    return inline.length <= 60 ? inline : `[\n${items.map((i) => indent(i)).join(",\n")},\n]`
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined)
    if (entries.length === 0) return "{}"
    const parts = entries.map(([k, v]) => `${isIdentifier(k) ? k : quote(k)}: ${toLiteral(v)}`)
    const inline = `{ ${parts.join(", ")} }`
    return inline.length <= 60 ? inline : `{\n${parts.map((p) => indent(p)).join(",\n")},\n}`
  }
  return "undefined"
}

function formatProp(name: string, value: unknown): string | null {
  if (value === undefined || value === null || value === "" || value === false) return null
  if (value === true) return name
  if (typeof value === "string" && !/["\\\n{}]/.test(value)) return `${name}=${quote(value)}`
  return `${name}={${toLiteral(value)}}`
}

type JsxOptions = {
  component: string
  importPath: string
  args: Record<string, unknown>
  props: PropDoc[]
}

/** `<Button variant="secondary">Continue</Button>`, omitting props equal to their defaults. */
export function generateJsx({ component, importPath, args, props }: JsxOptions) {
  const known = new Map(props.map((p) => [p.name, p]))
  const { children, ...rest } = args

  const attributes = Object.entries(rest)
    .filter(([name, value]) => {
      const prop = known.get(name)
      if (!prop || prop.kind === "function") return false
      return JSON.stringify(parseDefault(prop.defaultValue)) !== JSON.stringify(value)
    })
    .map(([name, value]) => formatProp(name, value))
    .filter((line): line is string => line !== null)

  const multiline = attributes.some((a) => a.includes("\n")) || attributes.join(" ").length + component.length > 56
  const attrs = multiline ? `\n${attributes.map((a) => indent(a)).join("\n")}\n` : attributes.length ? ` ${attributes.join(" ")}` : ""
  const text = typeof children === "string" || typeof children === "number" ? String(children) : ""

  const element = text
    ? `<${component}${attrs}>\n${indent(text)}\n</${component}>`
    : `<${component}${attrs}${multiline ? "" : " "}/>`

  return `import { ${component} } from "${importPath}"\n\n${element}`
}
