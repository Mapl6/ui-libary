export type ViewportId = "desktop" | "tablet" | "mobile" | "custom"

export type Viewport = { id: ViewportId; width: number | null; height: number | null }

/** Preset device sizes for the responsive preview. `null` means "fill the container". */
export const viewports: Record<Exclude<ViewportId, "custom">, Viewport> = {
  desktop: { id: "desktop", width: null, height: null },
  tablet: { id: "tablet", width: 768, height: 1024 },
  mobile: { id: "mobile", width: 390, height: 844 },
}
