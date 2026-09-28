/**
 * Showcase categories, in sidebar order. Components reference a category by id
 * from their `<slug>.meta.tsx`; empty categories are hidden automatically.
 */
export const categories = [
  { id: "foundations", label: "Foundations", description: "Design tokens: color, type, space, radius, elevation, motion and icons." },
  { id: "layout", label: "Layout", description: "Primitives for arranging content." },
  { id: "actions", label: "Actions", description: "Buttons and menus that trigger behavior." },
  { id: "forms", label: "Forms", description: "Inputs and controls for collecting data." },
  { id: "navigation", label: "Navigation", description: "Moving between views and sections." },
  { id: "feedback", label: "Feedback", description: "Status, alerts, overlays and loading indicators." },
  { id: "data-display", label: "Data Display", description: "Presenting information and metadata." },
  { id: "utilities", label: "Utilities", description: "Placeholders, empty and loading states." },
] as const

export type Category = (typeof categories)[number]
export type CategoryId = Category["id"]

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}
