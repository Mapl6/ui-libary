export const locales = ["en", "fa"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const localeInfo: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr" },
  fa: { label: "Persian", nativeLabel: "فارسی", dir: "rtl" },
}
