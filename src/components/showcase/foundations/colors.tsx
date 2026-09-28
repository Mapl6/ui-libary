import { Badge } from "@/components/ui/badge"
import { contrastRatio } from "@/lib/utils/color"
import { palette, type SemanticColorRole } from "@/tokens/colors"
import { themes } from "@/tokens/themes"

import { FoundationSection, TokenName } from "./section"

const groups: { title: string; roles: SemanticColorRole[] }[] = [
  { title: "Surfaces", roles: ["background", "surface", "surface-muted", "surface-raised", "overlay"] },
  { title: "Text", roles: ["foreground", "foreground-muted", "foreground-subtle"] },
  { title: "Borders & focus", roles: ["border", "border-strong", "ring"] },
  { title: "Primary", roles: ["primary", "primary-hover", "primary-foreground", "primary-subtle", "primary-subtle-foreground"] },
  { title: "Neutral", roles: ["neutral-subtle", "neutral-subtle-foreground"] },
  {
    title: "Status",
    roles: ["success", "success-subtle", "warning", "warning-subtle", "danger", "danger-subtle", "info", "info-subtle"],
  },
]

const pairs: [SemanticColorRole, SemanticColorRole][] = [
  ["foreground", "background"],
  ["foreground-muted", "background"],
  ["foreground-subtle", "background"],
  ["primary-foreground", "primary"],
  ["primary-subtle-foreground", "primary-subtle"],
  ["neutral-subtle-foreground", "neutral-subtle"],
  ["success-foreground", "success"],
  ["success-subtle-foreground", "success-subtle"],
  ["warning-foreground", "warning"],
  ["warning-subtle-foreground", "warning-subtle"],
  ["danger-foreground", "danger"],
  ["danger-subtle-foreground", "danger-subtle"],
]

export function ColorsFoundation() {
  return (
    <div className="flex flex-col gap-12">
      <FoundationSection
        title="Semantic colors"
        description="Components only use semantic roles. Each theme maps the roles to palette values, so swatches below follow the active theme. Tailwind utilities are generated for every role: bg-surface, text-foreground-muted, border-border-strong…"
      >
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-sm font-medium text-foreground-muted">{group.title}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {group.roles.map((role) => (
                <div key={role} className="overflow-hidden rounded-lg border">
                  <div className="h-14 border-b" style={{ background: `var(--ui-${role})` }} />
                  <div className="flex flex-col gap-0.5 p-2">
                    <TokenName>{role}</TokenName>
                    <span dir="ltr" className="truncate font-mono text-2xs text-foreground-subtle">
                      --ui-{role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FoundationSection>

      <FoundationSection
        title="Contrast"
        description="WCAG 2 contrast ratios computed from the token values at build time. Body text needs 4.5:1 (AA); large text and UI components need 3:1."
      >
        <div className="scrollbar-thin overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[36rem] text-sm">
            <thead className="bg-surface-muted text-xs text-foreground-muted">
              <tr>
                <th scope="col" className="px-3 py-2 text-start font-medium">Pair</th>
                {themes.map((theme) => (
                  <th key={theme.id} scope="col" className="px-3 py-2 text-start font-medium">
                    {theme.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pairs.map(([fg, bg]) => (
                <tr key={`${fg}-${bg}`} className="border-t">
                  <th scope="row" className="px-3 py-2 text-start font-normal">
                    <TokenName>
                      {fg} / {bg}
                    </TokenName>
                  </th>
                  {themes.map((theme) => {
                    const ratio = contrastRatio(theme.colors[fg], theme.colors[bg])
                    return (
                      <td key={theme.id} className="px-3 py-2">
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="inline-flex h-6 w-9 items-center justify-center rounded-sm border text-xs font-semibold"
                            style={{ background: theme.colors[bg], color: theme.colors[fg] }}
                          >
                            Aa
                          </span>
                          {ratio === null ? (
                            <span className="text-xs text-foreground-subtle">translucent</span>
                          ) : (
                            <>
                              <span className="font-mono text-xs tabular-nums">{ratio.toFixed(2)}:1</span>
                              <Badge size="sm" tone={ratio >= 4.5 ? "success" : ratio >= 3 ? "warning" : "danger"}>
                                {ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "fail"}
                              </Badge>
                            </>
                          )}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FoundationSection>

      <FoundationSection
        title="Palette"
        description="Primitive scales in OKLCH. They're referenced by themes (src/tokens/themes.ts) and deliberately not exposed as Tailwind utilities."
      >
        <div className="flex flex-col gap-3">
          {Object.entries(palette).map(([name, scale]) => (
            <div key={name} className="grid grid-cols-[4rem_1fr] items-center gap-3">
              <span className="font-mono text-xs text-foreground-muted">{name}</span>
              <div className="flex overflow-hidden rounded-md border">
                {Object.entries(scale).map(([step, value]) => (
                  <div key={step} className="group relative h-10 flex-1" style={{ background: value }} title={`${name}-${step}: ${value}`}>
                    <span className="sr-only">
                      {name} {step}: {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FoundationSection>
    </div>
  )
}
