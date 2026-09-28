/** Typed readers for playground args, whose values are `unknown` at the registry level. */
export function argString<T extends string = string>(value: unknown, fallback: T): T {
  return typeof value === "string" ? (value as T) : fallback
}

export function argNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

export function argBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback
}
