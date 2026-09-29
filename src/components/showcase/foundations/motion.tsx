"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { duration, easing } from "@/tokens/motion"

import { FoundationSection, TokenName } from "./section"

export function MotionFoundation() {
  const [moved, setMoved] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="Durations & easing"
        description="Motion is short and functional. Every animation is disabled under prefers-reduced-motion (and the preview's Reduce motion toggle)."
      >
        <Button
          variant="outline"
          onClick={() => setMoved((m) => !m)}
          className="self-start"
        >
          Play
        </Button>
        <div className="divide-y rounded-lg border">
          {Object.entries(duration).flatMap(([dName, dValue]) =>
            Object.entries(easing).map(([eName, eValue]) => (
              <div
                key={`${dName}-${eName}`}
                className="grid grid-cols-[1fr_2fr] items-center gap-4 px-4 py-2.5 sm:grid-cols-[14rem_1fr]"
              >
                <div className="flex flex-col">
                  <TokenName>
                    duration-{dName} ease-{eName}
                  </TokenName>
                  <span dir="ltr" className="font-mono text-2xs text-foreground-subtle">
                    {dValue} · {eValue}
                  </span>
                </div>
                <div className="relative h-6 rounded-full bg-neutral-subtle">
                  <div
                    className="absolute start-1 top-1 size-4 rounded-full bg-primary transition-[inset-inline-start]"
                    style={{
                      insetInlineStart: moved ? "calc(100% - 1.25rem)" : "0.25rem",
                      transitionDuration: dValue,
                      transitionTimingFunction: eValue,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </FoundationSection>
    </div>
  )
}
