import type { Args } from "@/lib/registry/types"

/** Messages exchanged between the component page and its preview iframe. */
export type ParentMessage =
  | { source: "ui-library"; type: "args"; args: Args }
  | { source: "ui-library"; type: "env"; reducedMotion: boolean }

export type FrameMessage =
  | { source: "ui-library"; type: "ready" }
  | { source: "ui-library"; type: "resize"; height: number }
  | { source: "ui-library"; type: "update"; patch: Args }

export function isMessage<T extends { source: string }>(data: unknown): data is T {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { source?: unknown }).source === "ui-library"
  )
}
