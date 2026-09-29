export const fontFamily = {
  sans: "var(--font-geist-sans), var(--font-vazirmatn), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
} as const

/** [font-size, line-height] */
export const fontSize = {
  "2xs": ["0.6875rem", "1rem"],
  xs: ["0.75rem", "1rem"],
  sm: ["0.8125rem", "1.25rem"],
  base: ["0.875rem", "1.375rem"],
  md: ["0.9375rem", "1.5rem"],
  lg: ["1.0625rem", "1.625rem"],
  xl: ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.25rem"],
  "4xl": ["2.25rem", "2.5rem"],
} as const

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const

export const letterSpacing = {
  tight: "-0.015em",
  normal: "0em",
  wide: "0.04em",
} as const
