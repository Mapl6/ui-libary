"use client"

import { SlidersHorizontal } from "lucide-react"
import { type ReactNode, Suspense, use, useCallback, useMemo, useState, useSyncExternalStore } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs"
import { generateJsx } from "@/lib/registry/codegen"
import { initialArgs, resolveControls } from "@/lib/registry/controls"
import type { Args, PropGroup } from "@/lib/registry/types"
import { useT } from "@/lib/preferences/use-preferences"

import { CodeBlock } from "../code/code-block"
import { ControlsPanel } from "../playground/controls-panel"
import { loadMeta } from "../playground/load-meta"
import { PreviewFrame } from "../preview/preview-frame"

const TABS = ["preview", "code", "props", "source", "docs"] as const
type TabId = (typeof TABS)[number]

type WorkbenchProps = {
  slug: string
  name: string
  exportName: string
  importPath: string
  propGroups: PropGroup[]
  /** Server-rendered tab content. */
  slots: {
    examples: ReactNode
    examplesCode: ReactNode
    props: ReactNode
    source: ReactNode
    docs: ReactNode
  }
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

const readHashTab = (): TabId => {
  const hash = window.location.hash.slice(1)
  return (TABS as readonly string[]).includes(hash) ? (hash as TabId) : "preview"
}

/** Selected tab mirrors the URL hash (#props, #source…) for deep links. */
function useHashTab(): [TabId, (tab: string) => void] {
  const tab = useSyncExternalStore(subscribeToHash, readHashTab, () => "preview" as const)

  const select = useCallback((next: string) => {
    // replaceState keeps tab switches out of the back-button history; notify subscribers manually.
    history.replaceState(null, "", next === "preview" ? window.location.pathname : `#${next}`)
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }, [])

  return [tab, select]
}

export function Workbench({ slug, name, exportName, importPath, propGroups, slots }: WorkbenchProps) {
  const t = useT()
  const [tab, setTab] = useHashTab()

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-5">
      <TabsList aria-label={name} className="sticky top-12 z-sticky -mx-4 bg-background px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {TABS.map((id) => (
          <TabsTrigger key={id} value={id}>
            {t(`tabs.${id}` as const)}
          </TabsTrigger>
        ))}
      </TabsList>

      <Suspense fallback={<PlaygroundSkeleton />}>
        <PlaygroundTabs
          slug={slug}
          name={name}
          exportName={exportName}
          importPath={importPath}
          propGroups={propGroups}
          slots={slots}
        />
      </Suspense>

      <TabsPanel value="props">{slots.props}</TabsPanel>
      <TabsPanel value="source">{slots.source}</TabsPanel>
      <TabsPanel value="docs">{slots.docs}</TabsPanel>
    </Tabs>
  )
}

/** Preview and Code tabs share the playground args, so they live under one Suspense boundary. */
function PlaygroundTabs({ slug, name, exportName, importPath, propGroups, slots }: WorkbenchProps) {
  const t = useT()
  const meta = use(loadMeta(slug))
  const primaryProps = useMemo(() => propGroups[0]?.props ?? [], [propGroups])
  const controls = useMemo(() => resolveControls(meta, primaryProps), [meta, primaryProps])
  const defaults = useMemo(() => initialArgs(meta, primaryProps), [meta, primaryProps])
  const [args, setArgs] = useState<Args>(defaults)

  const setArg = useCallback((key: string, value: unknown) => setArgs((prev) => ({ ...prev, [key]: value })), [])
  const applyPatch = useCallback((patch: Args) => setArgs((prev) => ({ ...prev, ...patch })), [])
  const reset = useCallback(() => setArgs(defaults), [defaults])

  const code = useMemo(
    () =>
      meta.code?.(args) ??
      generateJsx({ component: exportName, importPath: meta.importPath ?? importPath, args, props: primaryProps }),
    [meta, args, exportName, importPath, primaryProps]
  )

  const controlsPanel = (bare: boolean) => (
    <ControlsPanel controls={controls} args={args} onChange={setArg} onReset={reset} bare={bare} />
  )

  const mobileControls = controls.length > 0 && (
    <Dialog>
      <DialogTrigger>
        <button
          type="button"
          aria-label={t("playground.controls")}
          className="inline-flex size-7 items-center justify-center rounded-md text-foreground-muted hover:bg-neutral-subtle hover:text-foreground md:hidden [&_svg]:size-4"
        >
          <SlidersHorizontal />
        </button>
      </DialogTrigger>
      <DialogContent placement="bottom" title={t("playground.controls")}>
        {controlsPanel(true)}
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <TabsPanel value="preview" keepMounted className="flex flex-col gap-8">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]">
          <PreviewFrame slug={slug} title={name} args={args} onUpdate={applyPatch} toolbarEnd={mobileControls} />
          <div className="hidden overflow-hidden rounded-lg border bg-surface md:block xl:max-h-[36rem]">
            {controlsPanel(false)}
          </div>
        </div>
        <CodeBlock code={code} title={t("playground.usage")} collapseAfter={0} />
        {slots.examples}
      </TabsPanel>

      <TabsPanel value="code" className="flex flex-col gap-6">
        <CodeBlock code={code} title={t("playground.usage")} collapseAfter={0} />
        {slots.examplesCode}
      </TabsPanel>
    </>
  )
}

function PlaygroundSkeleton() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]" aria-busy>
      <Skeleton className="h-80 rounded-lg" />
      <Skeleton className="hidden h-80 rounded-lg md:block" />
    </div>
  )
}
