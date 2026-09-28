/** Stacking order. Native <dialog> uses the top layer and needs no z-index. */
export const zIndex = {
  base: "0",
  raised: "10",
  sticky: "30",
  header: "40",
  dropdown: "50",
  popover: "60",
  tooltip: "70",
  toast: "80",
} as const
