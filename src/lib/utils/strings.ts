/** "button-group" → "Button group" */
export function humanize(value: string) {
  const spaced = value.replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

/** Storybook-compatible id segment: "Data Display/Button" → "data-display-button". */
export function toStoryId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
