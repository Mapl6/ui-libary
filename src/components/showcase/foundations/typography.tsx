import { fontFamily, fontSize, fontWeight, letterSpacing } from "@/tokens/typography"

import { FoundationSection, TokenName } from "./section"

export function TypographyFoundation() {
  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="Type scale"
        description="Sizes are paired with line heights. Use text-sm for secondary UI text, text-base for body UI text and text-md for long-form reading."
      >
        <div className="divide-y rounded-lg border">
          {Object.entries(fontSize)
            .reverse()
            .map(([name, [size, lineHeight]]) => (
              <div key={name} className="grid gap-2 p-4 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                <div className="flex flex-col">
                  <TokenName>text-{name}</TokenName>
                  <span dir="ltr" className="font-mono text-2xs text-foreground-subtle">
                    {size} / {lineHeight}
                  </span>
                </div>
                <p className="truncate" style={{ fontSize: size, lineHeight }}>
                  Design systems scale teams
                </p>
              </div>
            ))}
        </div>
      </FoundationSection>

      <FoundationSection title="Weights">
        <div className="grid gap-3 sm:grid-cols-4">
          {Object.entries(fontWeight).map(([name, weight]) => (
            <div key={name} className="rounded-lg border p-4">
              <p className="text-2xl" style={{ fontWeight: Number(weight) }}>
                Aa
              </p>
              <TokenName>font-{name}</TokenName>
              <span className="ms-2 font-mono text-2xs text-foreground-subtle">{weight}</span>
            </div>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title="Families"
        description="Geist for Latin text, Vazirmatn as the fallback for Persian and Arabic script, and Geist Mono for code. Fonts are self-hosted by next/font."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <TokenName>font-sans</TokenName>
            <p className="mt-3 text-xl">The quick brown fox jumps over the lazy dog.</p>
            <p lang="fa" dir="rtl" className="mt-2 text-xl">
              طراحی سیستم‌ها تیم‌ها را مقیاس‌پذیر می‌کند. ۱۲۳۴۵۶۷۸۹۰
            </p>
            <p dir="ltr" className="mt-3 font-mono text-2xs break-all text-foreground-subtle">
              {fontFamily.sans}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <TokenName>font-mono</TokenName>
            <p className="mt-3 font-mono text-lg">{"const answer = 42 // 0O il1"}</p>
            <p dir="ltr" className="mt-3 font-mono text-2xs break-all text-foreground-subtle">
              {fontFamily.mono}
            </p>
          </div>
        </div>
      </FoundationSection>

      <FoundationSection title="Letter spacing">
        <div className="flex flex-wrap gap-3">
          {Object.entries(letterSpacing).map(([name, value]) => (
            <div key={name} className="rounded-lg border px-4 py-3">
              <p className="text-lg font-semibold" style={{ letterSpacing: value }}>
                Tracking
              </p>
              <TokenName>tracking-{name}</TokenName>
            </div>
          ))}
        </div>
      </FoundationSection>
    </div>
  )
}
