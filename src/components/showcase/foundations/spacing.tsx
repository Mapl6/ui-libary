import { breakpoints } from "@/tokens/breakpoints"
import { spacingScale, spacingUnit } from "@/tokens/spacing"

import { FoundationSection, TokenName } from "./section"

export function SpacingFoundation() {
  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="Spacing scale"
        description={`Every spacing utility is a multiple of the base unit (${spacingUnit}). p-4 = 1rem. Prefer steps from this scale over arbitrary values.`}
      >
        <div className="divide-y rounded-lg border">
          {spacingScale.map((step) => (
            <div
              key={step}
              className="grid grid-cols-[5rem_5rem_1fr] items-center gap-3 px-4 py-2"
            >
              <TokenName>{step}</TokenName>
              <span
                dir="ltr"
                className="font-mono text-xs text-foreground-subtle tabular-nums"
              >
                {step * 4}px
              </span>
              <div
                className="h-3 rounded-xs bg-primary"
                style={{ width: `calc(var(--spacing) * ${step})` }}
              />
            </div>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title="Breakpoints"
        description="Mobile-first min-width breakpoints, used as sm:, md:, lg:… prefixes. The responsive preview presets sit on either side of these."
      >
        <div className="divide-y rounded-lg border">
          {Object.entries(breakpoints).map(([name, value]) => (
            <div
              key={name}
              className="grid grid-cols-[5rem_1fr_6rem] items-center gap-3 px-4 py-2 text-sm"
            >
              <TokenName>{name}</TokenName>
              <div className="h-2 rounded-full bg-neutral-subtle">
                <div
                  className="h-2 rounded-full bg-primary/60"
                  style={{ width: `${(parseFloat(value) / 96) * 100}%` }}
                />
              </div>
              <span
                dir="ltr"
                className="text-end font-mono text-xs text-foreground-subtle"
              >
                {value} · {parseFloat(value) * 16}px
              </span>
            </div>
          ))}
        </div>
      </FoundationSection>
    </div>
  )
}
