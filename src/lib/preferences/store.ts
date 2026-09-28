import { defaultLocale, localeInfo, locales, type Locale } from "@/i18n/config"
import { themes, type ThemeId } from "@/tokens/themes"

export type ThemePreference = ThemeId | "system"
export type Direction = "ltr" | "rtl"

export type Preferences = {
  theme: ThemePreference
  dir: Direction
  locale: Locale
}

export const STORAGE_KEY = "ui-library:preferences"
export const defaultPreferences: Preferences = { theme: "system", dir: "ltr", locale: defaultLocale }

const themeIds = new Set<string>(themes.map((t) => t.id))

function sanitize(value: unknown): Preferences {
  const input = (typeof value === "object" && value !== null ? value : {}) as Partial<Record<keyof Preferences, unknown>>
  const locale = locales.includes(input.locale as Locale) ? (input.locale as Locale) : defaultPreferences.locale
  return {
    theme:
      input.theme === "system" || themeIds.has(String(input.theme))
        ? (input.theme as ThemePreference)
        : defaultPreferences.theme,
    dir: input.dir === "rtl" || input.dir === "ltr" ? input.dir : localeInfo[locale].dir,
    locale,
  }
}

function read(): Preferences {
  try {
    return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"))
  } catch {
    return defaultPreferences
  }
}

let current: Preferences | null = null
const listeners = new Set<() => void>()

export function getPreferences(): Preferences {
  current ??= read()
  return current
}

export function getServerPreferences(): Preferences {
  return defaultPreferences
}

export function resolveTheme(theme: ThemePreference): ThemeId {
  if (theme !== "system") return theme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function applyPreferences(prefs: Preferences, root: HTMLElement = document.documentElement) {
  root.dataset.theme = resolveTheme(prefs.theme)
  root.dir = prefs.dir
  root.lang = prefs.locale
}

export function setPreferences(patch: Partial<Preferences>) {
  const next = { ...getPreferences(), ...patch }
  // Switching language also switches to its natural direction; users can still override it.
  if (patch.locale && !patch.dir) next.dir = localeInfo[patch.locale].dir
  current = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage may be unavailable (private mode); preferences then last for the session.
  }
  applyPreferences(next)
  listeners.forEach((listener) => listener())
}

let listening = false

export function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!listening && typeof window !== "undefined") {
    listening = true
    // Other documents (preview iframes, other tabs) share the same origin storage.
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) return
      current = read()
      applyPreferences(current)
      listeners.forEach((l) => l())
    })
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (getPreferences().theme === "system") applyPreferences(getPreferences())
      listeners.forEach((l) => l())
    })
  }
  return () => listeners.delete(listener)
}
