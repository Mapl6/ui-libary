"use client"

import { Menu, Search } from "lucide-react"
import Link from "next/link"
import { type ReactNode, useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useT } from "@/lib/preferences/use-preferences"

import { SidebarNav } from "../navigation/sidebar-nav"
import { CommandPalette } from "../search/command-palette"
import { PreferenceControls } from "./preference-controls"
import type { ExternalLinks, NavSection, SearchItem } from "./types"

type AppShellProps = {
  sections: NavSection[]
  searchIndex: SearchItem[]
  links: ExternalLinks
  children: ReactNode
}

export function AppShell({ sections, searchIndex, links, children }: AppShellProps) {
  const t = useT()
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-toast focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:shadow-md"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-header flex h-12 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur-md sm:px-4">
        <Dialog open={navOpen} onOpenChange={setNavOpen}>
          <DialogTrigger>
            <Button variant="ghost" size="sm" iconOnly aria-label={t("nav.openMenu")} className="lg:hidden">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent placement="start" size="sm" title={t("app.name")} bodyClassName="px-3">
            <SidebarNav sections={sections} onNavigate={() => setNavOpen(false)} />
          </DialogContent>
        </Dialog>

        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight">
          <Logo />
          <span className="hidden sm:inline">{t("app.name")}</span>
        </Link>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label={t("search.button")}
          aria-keyshortcuts="Meta+K Control+K"
          className="ms-2 flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border bg-surface-muted px-2.5 text-sm text-foreground-subtle transition-colors hover:border-border-strong hover:text-foreground-muted sm:max-w-80 [&_svg]:size-4"
        >
          <Search className="shrink-0" />
          <span className="hidden truncate sm:inline">{t("search.placeholder")}</span>
          <kbd className="ms-auto hidden shrink-0 rounded-sm border bg-surface px-1.5 font-sans text-2xs sm:inline">⌘K</kbd>
        </button>

        <div className="ms-auto flex items-center gap-1">
          {links.storybookUrl && (
            <a
              href={links.storybookUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden h-7 items-center rounded-md px-2 text-sm text-foreground-muted hover:bg-neutral-subtle hover:text-foreground md:inline-flex"
            >
              {t("links.storybook")}
            </a>
          )}
          {links.docmostUrl && (
            <a
              href={links.docmostUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden h-7 items-center rounded-md px-2 text-sm text-foreground-muted hover:bg-neutral-subtle hover:text-foreground md:inline-flex"
            >
              {t("links.docmost")}
            </a>
          )}
          <PreferenceControls />
        </div>
      </header>

      <div className="mx-auto flex max-w-[96rem]">
        <aside className="scrollbar-thin sticky top-12 hidden h-[calc(100dvh-3rem)] w-60 shrink-0 overflow-y-auto border-e px-3 py-5 lg:block">
          <SidebarNav sections={sections} />
        </aside>
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <CommandPalette items={searchIndex} open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}

function Logo() {
  return (
    <span aria-hidden className="grid size-6 grid-cols-2 gap-0.5 rounded-md bg-foreground p-1">
      <span className="rounded-[1px] bg-background" />
      <span className="rounded-full bg-background/60" />
      <span className="rounded-full bg-background/60" />
      <span className="rounded-[1px] bg-primary" />
    </span>
  )
}
