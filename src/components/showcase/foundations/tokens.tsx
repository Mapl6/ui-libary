import { breakpoints } from "@/tokens/breakpoints"
import { easing, duration } from "@/tokens/motion"
import { radius } from "@/tokens/radius"
import { shadows } from "@/tokens/shadows"
import { spacingUnit } from "@/tokens/spacing"
import { themes } from "@/tokens/themes"
import { fontSize } from "@/tokens/typography"
import { zIndex } from "@/tokens/z-index"

import { CodeBlock } from "../code/code-block"
import { FoundationSection } from "./section"

const [light] = themes

export function TokensFoundation() {
  const groups: [string, string, Record<string, string>][] = [
    [
      "Colors (per theme)",
      "--ui-*",
      Object.fromEntries(Object.entries(light.colors).map(([k, v]) => [`ui-${k}`, v])),
    ],
    [
      "Font size",
      "--text-*",
      Object.fromEntries(Object.entries(fontSize).map(([k, [s]]) => [`text-${k}`, s])),
    ],
    ["Spacing", "--spacing", { spacing: spacingUnit }],
    [
      "Radius",
      "--radius-*",
      Object.fromEntries(Object.entries(radius).map(([k, v]) => [`radius-${k}`, v])),
    ],
    [
      "Shadow",
      "--shadow-*",
      Object.fromEntries(Object.entries(shadows).map(([k, v]) => [`shadow-${k}`, v])),
    ],
    [
      "Breakpoint",
      "--breakpoint-*",
      Object.fromEntries(
        Object.entries(breakpoints).map(([k, v]) => [`breakpoint-${k}`, v])
      ),
    ],
    [
      "Z-index",
      "--z-index-*",
      Object.fromEntries(Object.entries(zIndex).map(([k, v]) => [`z-index-${k}`, v])),
    ],
    [
      "Duration",
      "--transition-duration-*",
      Object.fromEntries(
        Object.entries(duration).map(([k, v]) => [`transition-duration-${k}`, v])
      ),
    ],
    [
      "Easing",
      "--ease-*",
      Object.fromEntries(Object.entries(easing).map(([k, v]) => [`ease-${k}`, v])),
    ],
  ]

  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="How tokens flow"
        description="Tokens are authored once in TypeScript. The generator turns them into CSS variables and a Tailwind @theme, so the same values drive utilities, components, Storybook and these docs."
      >
        <CodeBlock
          language="text"
          title="pipeline"
          collapseAfter={0}
          code={`src/tokens/*.ts            ← edit here (colors, themes, typography, spacing, radius, …)
      │  npm run generate (runs automatically with dev/build/storybook)
      ▼
src/styles/tokens.css      :root / [data-theme] variables  +  Tailwind @theme
      │
      ├─▶ Tailwind utilities   bg-surface  text-foreground-muted  rounded-lg  shadow-md  z-dropdown
      ├─▶ Components           src/components/ui/**
      ├─▶ Storybook            .storybook/preview.tsx imports the same globals.css
      └─▶ Foundations pages    import src/tokens directly (these tables)`}
        />
      </FoundationSection>

      <FoundationSection
        title="All tokens"
        description="Default (light) values shown for colors. See Colors for per-theme values."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {groups.map(([title, pattern, values]) => (
            <div key={title} className="overflow-hidden rounded-lg border">
              <div className="flex items-center justify-between border-b bg-surface-muted px-3 py-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <code dir="ltr" className="font-mono text-2xs text-foreground-subtle">
                  {pattern}
                </code>
              </div>
              <dl
                dir="ltr"
                className="max-h-72 scrollbar-thin divide-y overflow-y-auto text-xs"
              >
                {Object.entries(values).map(([name, value]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-3 px-3 py-1.5"
                  >
                    <dt className="truncate font-mono">--{name}</dt>
                    <dd
                      className="truncate font-mono text-foreground-muted"
                      title={value}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </FoundationSection>
    </div>
  )
}
