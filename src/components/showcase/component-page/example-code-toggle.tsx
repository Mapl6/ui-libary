"use client"

import { Code2 } from "lucide-react"
import { type ReactNode, useId, useState } from "react"

import { useT } from "@/lib/preferences/use-preferences"

export function ExampleCodeToggle({ children }: { children: ReactNode }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center gap-1.5 border-t bg-surface px-3 text-xs font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground [&_svg]:size-3.5"
      >
        <Code2 />
        {open ? t("code.hideCode") : t("code.showCode")}
      </button>
      <div id={id} hidden={!open}>
        {children}
      </div>
    </>
  )
}
