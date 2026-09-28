import { defineShowcase } from "@/lib/registry/types"

import { Badge } from "./badge"

export default defineShowcase({
  name: "Badge",
  description: "A compact label for status, counts and metadata, in six tones and three appearances.",
  category: "data-display",
  tags: ["tag", "chip", "label", "status", "pill"],
  component: Badge,
  args: { children: "Active", tone: "success", dot: true },
  controls: { children: { label: "label" } },
})
