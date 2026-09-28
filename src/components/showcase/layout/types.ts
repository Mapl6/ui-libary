import type { MessageKey } from "@/i18n/dictionaries"
import type { ComponentStatus } from "@/lib/registry/types"

export type NavItem = { href: string; label: string; status?: ComponentStatus }

export type NavSection = {
  id: string
  /** A translation key for shell sections, or a literal label for content categories. */
  label: { key: MessageKey } | { text: string }
  items: NavItem[]
}

export type SearchGroup = "components" | "foundations" | "guides"

export type SearchItem = {
  href: string
  title: string
  description?: string
  group: SearchGroup
  category?: string
  keywords: string[]
}

export type ExternalLinks = {
  storybookUrl?: string
  docmostUrl?: string
}
