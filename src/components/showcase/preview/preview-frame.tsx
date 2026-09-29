"use client"

import {
  ExternalLink,
  Monitor,
  RotateCw,
  Smartphone,
  SlidersHorizontal,
  Tablet,
  Wind,
} from "lucide-react"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { Tooltip } from "@/components/ui/tooltip"
import type { Args } from "@/lib/registry/types"
import { useT } from "@/lib/preferences/use-preferences"
import { cn } from "@/lib/utils/cn"

import { type FrameMessage, type ParentMessage, isMessage } from "../playground/protocol"
import { type ViewportId, viewports } from "./viewports"

type PreviewFrameProps = {
  slug: string
  title: string
  args: Args
  onUpdate: (patch: Args) => void
  /** Extra toolbar content at the end (e.g. the mobile controls button). */
  toolbarEnd?: ReactNode
}

const MIN_HEIGHT = 280

/**
 * Renders the component in an isolated iframe (`/preview/[slug]`), so viewport sizes
 * trigger real media queries and page styles can't leak in.
 */
export function PreviewFrame({
  slug,
  title,
  args,
  onUpdate,
  toolbarEnd,
}: PreviewFrameProps) {
  const t = useT()
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [ready, setReady] = useState(false)
  const [contentHeight, setContentHeight] = useState(MIN_HEIGHT)
  const [viewport, setViewport] = useState<ViewportId>("desktop")
  const [custom, setCustom] = useState({ width: 480, height: 720 })
  const [rotated, setRotated] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const post = useCallback((message: ParentMessage) => {
    frameRef.current?.contentWindow?.postMessage(message, window.location.origin)
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow
      )
        return
      if (!isMessage<FrameMessage>(event.data)) return
      const message = event.data
      if (message.type === "ready") setReady(true)
      else if (message.type === "resize")
        setContentHeight(Math.max(MIN_HEIGHT, Math.ceil(message.height)))
      else if (message.type === "update") onUpdate(message.patch)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [onUpdate])

  useEffect(() => {
    if (ready) post({ source: "ui-library", type: "args", args })
  }, [ready, args, post])

  useEffect(() => {
    if (ready) post({ source: "ui-library", type: "env", reducedMotion })
  }, [ready, reducedMotion, post])

  const preset =
    viewport === "custom" ? { ...custom, id: "custom" as const } : viewports[viewport]
  const width = preset.width && preset.height && rotated ? preset.height : preset.width
  const height = preset.width && preset.height && rotated ? preset.width : preset.height
  const frameHeight = height ?? contentHeight

  const options: { id: ViewportId; label: string; icon: ReactNode }[] = [
    { id: "desktop", label: t("viewport.desktop"), icon: <Monitor /> },
    { id: "tablet", label: t("viewport.tablet"), icon: <Tablet /> },
    { id: "mobile", label: t("viewport.mobile"), icon: <Smartphone /> },
    { id: "custom", label: t("viewport.custom"), icon: <SlidersHorizontal /> },
  ]

  const openUrl = `/preview/${slug}?args=${encodeURIComponent(JSON.stringify(args))}`

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-surface">
      <div className="flex h-10 shrink-0 scrollbar-thin items-center gap-1 overflow-x-auto border-b px-1.5">
        <div
          role="radiogroup"
          aria-label="Viewport"
          className="flex shrink-0 items-center gap-0.5"
        >
          {options.map((option) => (
            <Tooltip key={option.id} content={option.label} side="bottom">
              <button
                type="button"
                role="radio"
                aria-checked={viewport === option.id}
                aria-label={option.label}
                onClick={() => setViewport(option.id)}
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-4",
                  viewport === option.id && "bg-neutral-subtle text-foreground"
                )}
              >
                {option.icon}
              </button>
            </Tooltip>
          ))}
        </div>

        <div className="mx-1 h-4 w-px shrink-0 bg-border" />

        {viewport === "custom" ? (
          <div
            dir="ltr"
            className="flex shrink-0 items-center gap-1 font-mono text-xs text-foreground-muted"
          >
            <input
              type="number"
              aria-label={t("viewport.width")}
              min={240}
              max={2560}
              value={custom.width}
              onChange={(e) =>
                setCustom((c) => ({ ...c, width: Number(e.target.value) || c.width }))
              }
              className="h-6 w-16 rounded-sm border bg-surface px-1.5 text-foreground"
            />
            ×
            <input
              type="number"
              aria-label={t("viewport.height")}
              min={200}
              max={2560}
              value={custom.height}
              onChange={(e) =>
                setCustom((c) => ({ ...c, height: Number(e.target.value) || c.height }))
              }
              className="h-6 w-16 rounded-sm border bg-surface px-1.5 text-foreground"
            />
          </div>
        ) : (
          <span
            dir="ltr"
            className="shrink-0 font-mono text-xs text-foreground-subtle tabular-nums"
          >
            {width ? `${width} × ${height}` : "100%"}
          </span>
        )}

        <div className="ms-auto flex shrink-0 items-center gap-0.5">
          {width && (
            <ToolbarButton
              label={t("viewport.rotate")}
              onClick={() => setRotated((r) => !r)}
              pressed={rotated}
            >
              <RotateCw />
            </ToolbarButton>
          )}
          <ToolbarButton
            label={t("viewport.reducedMotion")}
            onClick={() => setReducedMotion((r) => !r)}
            pressed={reducedMotion}
          >
            <Wind />
          </ToolbarButton>
          <Tooltip content={t("viewport.openNewTab")} side="bottom">
            <a
              href={openUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t("viewport.openNewTab")}
              className="inline-flex size-7 items-center justify-center rounded-md text-foreground-muted hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-4"
            >
              <ExternalLink />
            </a>
          </Tooltip>
          {toolbarEnd}
        </div>
      </div>

      <div
        className={cn(
          "relative scrollbar-thin overflow-auto canvas-grid",
          width && "p-4 sm:p-6"
        )}
      >
        <iframe
          ref={frameRef}
          src={`/preview/${slug}`}
          title={`${title} preview`}
          onLoad={() => setReady(true)}
          className={cn(
            "mx-auto block bg-transparent transition-[width,height] duration-normal",
            width && "rounded-lg border bg-background shadow-md",
            !ready && "opacity-0"
          )}
          style={{
            width: width ? `${width}px` : "100%",
            height: `${frameHeight}px`,
            maxWidth: width ? "none" : "100%",
          }}
        />
      </div>
    </div>
  )
}

function ToolbarButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string
  pressed: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Tooltip content={label} side="bottom">
      <button
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        onClick={onClick}
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-4",
          pressed && "bg-primary-subtle text-primary-subtle-foreground"
        )}
      >
        {children}
      </button>
    </Tooltip>
  )
}
