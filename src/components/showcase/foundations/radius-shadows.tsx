import { radius } from "@/tokens/radius"
import { shadows } from "@/tokens/shadows"
import { zIndex } from "@/tokens/z-index"

import { FoundationSection, TokenName } from "./section"

export function RadiusFoundation() {
  return (
    <FoundationSection
      title="Corner radius"
      description="Small radii keep the interface dense and precise. Controls use md, cards lg, dialogs xl."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {Object.entries(radius).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className="size-20 border-2 border-primary/60 bg-primary-subtle"
              style={{ borderRadius: value }}
            />
            <TokenName>rounded-{name}</TokenName>
            <span dir="ltr" className="font-mono text-2xs text-foreground-subtle">
              {value}
            </span>
          </div>
        ))}
      </div>
    </FoundationSection>
  )
}

export function ShadowsFoundation() {
  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="Elevation"
        description="Shadows communicate layering. Most surfaces use borders instead; reserve lg and overlay for floating UI."
      >
        <div className="grid grid-cols-2 gap-6 rounded-lg bg-surface-muted p-6 sm:grid-cols-3 lg:grid-cols-5">
          {Object.entries(shadows).map(([name, value]) => (
            <div
              key={name}
              className="flex h-24 flex-col items-center justify-center gap-1 rounded-lg bg-surface-raised"
              style={{ boxShadow: value }}
            >
              <TokenName>shadow-{name}</TokenName>
            </div>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title="Z-index"
        description="Named layers for stacking. Modal dialogs use the browser's top layer and need no z-index."
      >
        <div className="divide-y rounded-lg border">
          {Object.entries(zIndex).map(([name, value]) => (
            <div key={name} className="flex items-center justify-between px-4 py-2">
              <TokenName>z-{name}</TokenName>
              <span className="font-mono text-xs text-foreground-subtle">{value}</span>
            </div>
          ))}
        </div>
      </FoundationSection>
    </div>
  )
}
