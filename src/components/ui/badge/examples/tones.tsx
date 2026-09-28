/** Every tone in each appearance. Color is never the only signal: the label carries the meaning. */
import { Badge, type BadgeAppearance, type BadgeTone } from "@/components/ui/badge"

const tones: BadgeTone[] = ["neutral", "primary", "success", "warning", "danger", "info"]
const appearances: BadgeAppearance[] = ["soft", "solid", "outline"]

export default function BadgeTones() {
  return (
    <div className="flex flex-col gap-3">
      {appearances.map((appearance) => (
        <div key={appearance} className="flex flex-wrap items-center gap-2">
          {tones.map((tone) => (
            <Badge key={tone} tone={tone} appearance={appearance}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="success" dot>
          Operational
        </Badge>
        <Badge tone="warning" dot>
          Degraded
        </Badge>
        <Badge tone="danger" dot size="sm">
          Outage
        </Badge>
      </div>
    </div>
  )
}
