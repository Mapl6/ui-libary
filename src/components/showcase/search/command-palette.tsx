"use client"

import { BookOpen, Component, CornerDownLeft, Palette, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { MessageKey } from "@/i18n/dictionaries"
import { useT } from "@/lib/preferences/use-preferences"
import { cn } from "@/lib/utils/cn"

import type { SearchGroup, SearchItem } from "../layout/types"
import { searchItems } from "./search"

const groupLabels: Record<SearchGroup, MessageKey> = {
  components: "search.group.components",
  foundations: "search.group.foundations",
  guides: "search.group.guides",
}

const groupIcons: Record<SearchGroup, typeof Component> = {
  components: Component,
  foundations: Palette,
  guides: BookOpen,
}

type CommandPaletteProps = {
  items: SearchItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** ⌘K search dialog implementing the WAI-ARIA combobox + listbox pattern. */
export function CommandPalette({ items, open, onOpenChange }: CommandPaletteProps) {
  const t = useT()
  const router = useRouter()
  const listId = useId()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(() => searchItems(items, query), [items, query])
  const grouped = useMemo(() => {
    const order: SearchGroup[] = ["components", "foundations", "guides"]
    // With a query, keep global relevance order; without one, group by type.
    return query.trim() ? results : order.flatMap((g) => results.filter((r) => r.group === g))
  }, [results, query])

  // Global shortcuts: ⌘K / Ctrl+K anywhere, "/" outside text fields.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" })
  }, [active])

  const go = (item: SearchItem | undefined) => {
    if (!item) return
    onOpenChange(false)
    router.push(item.href)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((i) => (i + 1) % Math.max(grouped.length, 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((i) => (i - 1 + grouped.length) % Math.max(grouped.length, 1))
    } else if (event.key === "Enter") {
      event.preventDefault()
      go(grouped[active])
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setQuery("")
      setActive(0)
    }
    onOpenChange(next)
  }

  let lastGroup: SearchGroup | null = null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        title={t("search.button")}
        hideTitle
        hideClose
        size="lg"
        className="mt-[12vh] mb-auto max-h-[70dvh]"
        bodyClassName="p-0"
      >
        <div className="flex items-center gap-2 border-b px-4">
          <Search aria-hidden className="size-4 shrink-0 text-foreground-subtle" />
          <input
            role="combobox"
            aria-expanded
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={grouped[active] ? `${listId}-${active}` : undefined}
            aria-label={t("search.placeholder")}
            placeholder={t("search.placeholder")}
            value={query}
            autoFocus
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            className="h-12 w-full bg-transparent text-md outline-none placeholder:text-foreground-subtle"
          />
          <kbd className="rounded-sm border px-1.5 py-0.5 font-sans text-2xs text-foreground-subtle">Esc</kbd>
        </div>

        <ul ref={listRef} id={listId} role="listbox" aria-label={t("search.button")} className="scrollbar-thin max-h-[50dvh] overflow-y-auto p-2">
          {grouped.length === 0 && (
            <li role="presentation" className="px-3 py-10 text-center text-sm text-foreground-muted">
              {t("search.empty")} “{query}”
            </li>
          )}
          {grouped.map((item, index) => {
            const showHeading = !query.trim() && item.group !== lastGroup
            lastGroup = item.group
            const Icon = groupIcons[item.group]
            const selected = index === active
            return (
              <li key={item.href} role="presentation">
                {showHeading && (
                  <div role="presentation" className="px-2 pt-3 pb-1 text-2xs font-medium tracking-wide text-foreground-subtle uppercase first:pt-1">
                    {t(groupLabels[item.group])}
                  </div>
                )}
                <div
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setActive(index)}
                  onClick={() => go(item)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2",
                    selected && "bg-neutral-subtle"
                  )}
                >
                  <Icon aria-hidden className="size-4 shrink-0 text-foreground-subtle" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="truncate font-medium">{item.title}</span>
                      {item.category && <span className="shrink-0 text-xs text-foreground-subtle">{item.category}</span>}
                    </div>
                    {item.description && <p className="truncate text-sm text-foreground-muted">{item.description}</p>}
                  </div>
                  {selected && <CornerDownLeft aria-hidden className="size-3.5 shrink-0 text-foreground-subtle" />}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-4 border-t px-4 py-2 text-xs text-foreground-subtle sm:flex">
          <span><Kbd>↑</Kbd> <Kbd>↓</Kbd> {t("search.hint.navigate")}</span>
          <span><Kbd>↵</Kbd> {t("search.hint.select")}</span>
          <span><Kbd>Esc</Kbd> {t("search.hint.close")}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Kbd({ children }: { children: string }) {
  return <kbd className="inline-flex min-w-5 justify-center rounded-sm border bg-surface px-1 font-sans text-2xs">{children}</kbd>
}
