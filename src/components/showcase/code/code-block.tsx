"use client"

import { Check, ChevronDown, Copy } from "lucide-react"
import { type CSSProperties, useMemo, useState } from "react"
import { highlight } from "sugar-high"

import { useT } from "@/lib/preferences/use-preferences"
import { cn } from "@/lib/utils/cn"

type CodeBlockProps = {
  code: string
  /** Label in the header, e.g. "tsx" or a file name. */
  language?: string
  title?: string
  /** Lines shown before the "Show all" toggle. `0` disables collapsing. */
  collapseAfter?: number
  className?: string
}

const HIGHLIGHTED = new Set([
  "tsx",
  "ts",
  "jsx",
  "js",
  "typescript",
  "javascript",
  "json",
  "css",
])

/** Syntax-highlighted code with copy and expand/collapse. Always LTR. */
export function CodeBlock({
  code,
  language = "tsx",
  title,
  collapseAfter = 24,
  className,
}: CodeBlockProps) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const trimmed = code.replace(/\s+$/, "")
  const lineCount = trimmed.split("\n").length
  const collapsible = collapseAfter > 0 && lineCount > collapseAfter + 4
  const html = useMemo(
    () => (HIGHLIGHTED.has(language) ? highlight(trimmed) : escapeHtml(trimmed)),
    [trimmed, language]
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      dir="ltr"
      className={cn(
        "group/code relative overflow-hidden rounded-lg border bg-surface-muted",
        className
      )}
    >
      <div className="flex h-9 items-center justify-between gap-3 border-b ps-3 pe-1.5">
        <span className="truncate font-mono text-xs text-foreground-muted">
          {title ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-xs text-foreground-muted transition-colors hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-3.5"
        >
          {copied ? <Check /> : <Copy />}
          <span aria-live="polite">{copied ? t("code.copied") : t("code.copy")}</span>
        </button>
      </div>
      <div
        className={cn(
          "relative",
          collapsible &&
            !expanded &&
            "max-h-[calc(var(--collapsed-lines)*1.375rem+1.5rem)] overflow-hidden"
        )}
        style={
          collapsible
            ? ({ "--collapsed-lines": collapseAfter } as CSSProperties)
            : undefined
        }
      >
        <pre className="scrollbar-thin overflow-x-auto p-3 text-[0.8125rem] leading-[1.375rem]">
          <code className="code-highlight" dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
        {collapsible && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface-muted to-transparent" />
        )}
      </div>
      {collapsible && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full items-center justify-center gap-1 border-t py-1.5 text-xs font-medium text-foreground-muted hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-3.5"
        >
          <ChevronDown className={cn("transition-transform", expanded && "rotate-180")} />
          {expanded ? t("code.collapse") : `${t("code.expand")} · ${lineCount}`}
        </button>
      )}
    </div>
  )
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
