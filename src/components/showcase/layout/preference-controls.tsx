"use client"

import { Check, Languages, Monitor, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip } from "@/components/ui/tooltip"
import { localeInfo, locales } from "@/i18n/config"
import type { ThemePreference } from "@/lib/preferences/store"
import { usePreferences, useT } from "@/lib/preferences/use-preferences"
import { themes } from "@/tokens/themes"

const themeIcons: Record<string, typeof Sun> = { light: Sun, dark: Moon, system: Monitor }

export function PreferenceControls() {
  const t = useT()
  const [prefs, setPrefs] = usePreferences()
  const ThemeIcon = themeIcons[prefs.theme] ?? Sun
  const themeOptions: { id: ThemePreference; label: string }[] = [
    ...themes.map((theme) => ({
      id: theme.id,
      label: theme.id === "dark" ? t("prefs.theme.dark") : t("prefs.theme.light"),
    })),
    { id: "system", label: t("prefs.theme.system") },
  ]

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip content={`${t("prefs.direction")}: ${prefs.dir.toUpperCase()}`} side="bottom">
        <Button
          variant="ghost"
          size="sm"
          aria-label={`${t("prefs.direction")}: ${prefs.dir.toUpperCase()}`}
          onClick={() => setPrefs({ dir: prefs.dir === "ltr" ? "rtl" : "ltr" })}
          className="w-10 px-0 font-mono text-xs"
        >
          {prefs.dir.toUpperCase()}
        </Button>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm" iconOnly aria-label={t("prefs.language")}>
            <Languages />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("prefs.language")}</DropdownMenuLabel>
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              lang={locale}
              onSelect={() => setPrefs({ locale })}
              icon={<Check className={prefs.locale === locale ? "opacity-100" : "opacity-0"} />}
            >
              {localeInfo[locale].nativeLabel}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm" iconOnly aria-label={t("prefs.theme")}>
            <ThemeIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("prefs.theme")}</DropdownMenuLabel>
          {themeOptions.map((option) => {
            const Icon = themeIcons[option.id] ?? Sun
            return (
              <DropdownMenuItem key={option.id} icon={<Icon />} onSelect={() => setPrefs({ theme: option.id })}>
                <span className="flex items-center justify-between gap-4">
                  {option.label}
                  {prefs.theme === option.id && <Check className="size-3.5" />}
                </span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
