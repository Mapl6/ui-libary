export const duration = {
  instant: "80ms",
  fast: "140ms",
  normal: "200ms",
  slow: "320ms",
} as const

export const easing = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const
