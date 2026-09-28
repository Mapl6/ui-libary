"use client"

import { RotateCcw } from "lucide-react"

import type { ResolvedControl } from "@/lib/registry/controls"
import type { Args } from "@/lib/registry/types"
import { useT } from "@/lib/preferences/use-preferences"
import { cn } from "@/lib/utils/cn"

import { ControlField } from "./control-field"

type ControlsPanelProps = {
  controls: ResolvedControl[]
  args: Args
  onChange: (name: string, value: unknown) => void
  onReset: () => void
  className?: string
  /** Hides the header (used inside the mobile sheet, which has its own title). */
  bare?: boolean
}

export function ControlsPanel({ controls, args, onChange, onReset, className, bare = false }: ControlsPanelProps) {
  const t = useT()

  return (
    <section aria-label={t("playground.controls")} className={cn("flex flex-col", className)}>
      {!bare && (
        <header className="flex h-10 shrink-0 items-center justify-between border-b ps-3 pe-1.5">
          <h2 className="text-sm font-medium">{t("playground.controls")}</h2>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-foreground-muted hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-3.5"
          >
            <RotateCcw />
            {t("playground.reset")}
          </button>
        </header>
      )}
      {controls.length === 0 ? (
        <p className="p-3 text-sm text-foreground-muted">{t("playground.noControls")}</p>
      ) : (
        <div className="scrollbar-thin flex flex-col gap-3.5 overflow-y-auto p-3">
          {controls.map((control) => (
            <ControlField
              key={control.name}
              control={control}
              value={args[control.name]}
              onChange={(value) => onChange(control.name, value)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
