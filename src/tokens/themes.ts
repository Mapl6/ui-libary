import { palette, type SemanticColorRole } from "./colors.ts"

const { gray, blue, green, amber, red } = palette

export type ThemeDefinition = {
  id: string
  label: string
  /** Used for the `color-scheme` CSS property (native form controls, scrollbars). */
  scheme: "light" | "dark"
  colors: Record<SemanticColorRole, string>
}

/**
 * Themes are applied through `data-theme` on the root element.
 * The first theme is the default. Add a new entry to create a new theme;
 * the generator emits its CSS and the theme switcher picks it up.
 */
export const themes = [
  {
    id: "light",
    label: "Light",
    scheme: "light",
    colors: {
      background: gray[0],
      surface: gray[0],
      "surface-muted": gray[50],
      "surface-raised": gray[0],
      foreground: gray[950],
      "foreground-muted": gray[600],
      "foreground-subtle": gray[500],
      border: gray[200],
      "border-strong": gray[300],
      ring: blue[500],
      overlay: "oklch(0.155 0.01 264 / 0.45)",
      primary: blue[600],
      "primary-hover": blue[700],
      "primary-foreground": gray[0],
      "primary-subtle": blue[50],
      "primary-subtle-foreground": blue[800],
      "neutral-subtle": gray[100],
      "neutral-subtle-foreground": gray[700],
      success: green[700],
      "success-foreground": gray[0],
      "success-subtle": green[50],
      "success-subtle-foreground": green[800],
      warning: amber[500],
      "warning-foreground": amber[950],
      "warning-subtle": amber[50],
      "warning-subtle-foreground": amber[800],
      danger: red[600],
      "danger-hover": red[700],
      "danger-foreground": gray[0],
      "danger-subtle": red[50],
      "danger-subtle-foreground": red[800],
      info: blue[600],
      "info-foreground": gray[0],
      "info-subtle": blue[50],
      "info-subtle-foreground": blue[800],
    },
  },
  {
    id: "dark",
    label: "Dark",
    scheme: "dark",
    colors: {
      background: gray[1000],
      surface: gray[950],
      "surface-muted": gray[900],
      "surface-raised": gray[900],
      foreground: gray[50],
      "foreground-muted": gray[400],
      "foreground-subtle": gray[500],
      border: gray[850],
      "border-strong": gray[700],
      ring: blue[400],
      overlay: "oklch(0 0 0 / 0.6)",
      primary: blue[500],
      "primary-hover": blue[400],
      "primary-foreground": gray[0],
      "primary-subtle": "oklch(0.623 0.188 262 / 0.16)",
      "primary-subtle-foreground": blue[300],
      "neutral-subtle": gray[850],
      "neutral-subtle-foreground": gray[300],
      success: green[500],
      "success-foreground": green[950],
      "success-subtle": "oklch(0.723 0.192 149 / 0.14)",
      "success-subtle-foreground": green[300],
      warning: amber[400],
      "warning-foreground": amber[950],
      "warning-subtle": "oklch(0.828 0.189 84 / 0.14)",
      "warning-subtle-foreground": amber[300],
      danger: red[500],
      "danger-hover": red[400],
      "danger-foreground": gray[0],
      "danger-subtle": "oklch(0.637 0.237 25 / 0.16)",
      "danger-subtle-foreground": red[300],
      info: blue[500],
      "info-foreground": gray[0],
      "info-subtle": "oklch(0.623 0.188 262 / 0.16)",
      "info-subtle-foreground": blue[300],
    },
  },
] as const satisfies readonly ThemeDefinition[]

export type ThemeId = (typeof themes)[number]["id"]
