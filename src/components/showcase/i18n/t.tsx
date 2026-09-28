"use client"

import type { MessageKey } from "@/i18n/dictionaries"
import { useT } from "@/lib/preferences/use-preferences"

/** Renders a translated shell string. Lets Server Components use translations. */
export function T({ k }: { k: MessageKey }) {
  const t = useT()
  return <>{t(k)}</>
}
