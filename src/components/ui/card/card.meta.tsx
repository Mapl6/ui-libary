import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { defineShowcase } from "@/lib/registry/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

export default defineShowcase({
  name: "Card",
  description:
    "A composable container with header, content and footer slots, in three surface treatments.",
  category: "data-display",
  tags: ["panel", "surface", "container", "tile"],
  component: Card,
  controls: { children: false },
  render: (args) => (
    <Card {...args} className="w-full max-w-sm">
      <CardHeader action={<Badge tone="success">Paid</Badge>}>
        <CardTitle>Invoice #1042</CardTitle>
        <CardDescription>Issued Sep 12 · Due Oct 12</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums">$2,480.00</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm">
          Download
        </Button>
        <Button size="sm">View</Button>
      </CardFooter>
    </Card>
  ),
  code: (
    args
  ) => `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card${args.variant && args.variant !== "outline" ? ` variant="${args.variant}"` : ""}${args.interactive ? " interactive" : ""}>
  <CardHeader action={<Badge tone="success">Paid</Badge>}>
    <CardTitle>Invoice #1042</CardTitle>
    <CardDescription>Issued Sep 12 · Due Oct 12</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`,
})
