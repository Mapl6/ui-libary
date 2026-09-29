/** Statistic cards in a responsive grid. The whole card is clickable through a stretched link. */
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  { label: "Revenue", value: "$48.2k", change: "+12%", tone: "success" as const },
  { label: "Active users", value: "3,120", change: "+4%", tone: "success" as const },
  { label: "Churn", value: "2.4%", change: "+0.3%", tone: "danger" as const },
]

export default function CardStats() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} interactive>
          <CardHeader
            action={
              <Badge tone={stat.tone} size="sm">
                {stat.change}
              </Badge>
            }
          >
            <CardDescription>
              <a
                href="#"
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {stat.label}
              </a>
            </CardDescription>
            <CardTitle as="h4" className="text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-sm text-foreground-subtle">
            vs. last 30 days
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
