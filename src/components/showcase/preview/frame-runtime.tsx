"use client"

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { initialArgs } from "@/lib/registry/controls"
import type { Args, PropDoc } from "@/lib/registry/types"
import { usePreferences } from "@/lib/preferences/use-preferences"

import { loadMeta } from "../playground/load-meta"
import { type FrameMessage, type ParentMessage, isMessage } from "../playground/protocol"

type FrameRuntimeProps = {
  slug: string
  props: PropDoc[]
}

function postToParent(message: FrameMessage) {
  if (window.parent !== window) window.parent.postMessage(message, window.location.origin)
}

function readUrlArgs(): Args | null {
  try {
    const raw = new URLSearchParams(window.location.search).get("args")
    return raw ? (JSON.parse(raw) as Args) : null
  } catch {
    return null
  }
}

/** Runs inside the preview iframe: renders the component with args sent by the parent page. */
export function FrameRuntime({ slug, props }: FrameRuntimeProps) {
  usePreferences() // subscribes to theme/direction changes made in the parent document
  const meta = use(loadMeta(slug))
  const [args, setArgs] = useState<Args>(() => initialArgs(meta, props))
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromUrl = readUrlArgs()
    // Standalone tab opened via "Open in new tab": restore the args from the URL.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after hydration
    if (fromUrl) setArgs(fromUrl)

    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        !isMessage<ParentMessage>(event.data)
      )
        return
      const message = event.data
      if (message.type === "args") setArgs(message.args)
      if (message.type === "env")
        document.documentElement.toggleAttribute(
          "data-reduced-motion",
          message.reducedMotion
        )
    }
    window.addEventListener("message", onMessage)
    postToParent({ source: "ui-library", type: "ready" })
    return () => window.removeEventListener("message", onMessage)
  }, [])

  useEffect(() => {
    const node = contentRef.current
    if (!node) return
    const observer = new ResizeObserver(() => {
      postToParent({
        source: "ui-library",
        type: "resize",
        height: node.getBoundingClientRect().height,
      })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const update = useCallback((patch: Args) => {
    setArgs((prev) => ({ ...prev, ...patch }))
    postToParent({ source: "ui-library", type: "update", patch })
  }, [])

  const Target = meta.component

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div
        ref={contentRef}
        className="flex w-full items-center justify-center p-8 sm:p-10"
      >
        <PreviewErrorBoundary resetKey={JSON.stringify(args)}>
          {meta.render ? meta.render(args, update) : <Target {...args} />}
        </PreviewErrorBoundary>
      </div>
    </div>
  )
}

type BoundaryProps = { children: ReactNode; resetKey: string }
type BoundaryState = { error: Error | null; resetKey: string }

/** Shows render errors inline (e.g. invalid JSON args) instead of blanking the preview. */
class PreviewErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  override state: BoundaryState = { error: null, resetKey: this.props.resetKey }

  static getDerivedStateFromError(error: Error): Partial<BoundaryState> {
    return { error }
  }

  static getDerivedStateFromProps(
    props: BoundaryProps,
    state: BoundaryState
  ): Partial<BoundaryState> | null {
    return props.resetKey !== state.resetKey
      ? { error: null, resetKey: props.resetKey }
      : null
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[preview] render error", error, info.componentStack)
  }

  override render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="max-w-md rounded-lg border border-danger/30 bg-danger-subtle p-3 text-sm text-danger-subtle-foreground"
        >
          <p className="font-medium">This combination of props failed to render.</p>
          <pre dir="ltr" className="mt-1 font-mono text-xs whitespace-pre-wrap">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
