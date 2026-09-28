import { localeInfo } from "@/i18n/config"

import { STORAGE_KEY, defaultPreferences } from "./store"

/**
 * Inline script that applies stored preferences before first paint, avoiding a flash of
 * the wrong theme or direction. Mirrors `applyPreferences` in store.ts.
 */
export const preferencesScript = `(() => {
  try {
    var d = ${JSON.stringify(defaultPreferences)};
    var dirs = ${JSON.stringify(Object.fromEntries(Object.entries(localeInfo).map(([k, v]) => [k, v.dir])))};
    var p = JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || "null") || {};
    var locale = dirs[p.locale] ? p.locale : d.locale;
    var theme = p.theme || d.theme;
    if (theme === "system") theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.dir = p.dir === "rtl" || p.dir === "ltr" ? p.dir : dirs[locale];
    root.lang = locale;
  } catch (e) {}
})()`
