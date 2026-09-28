import { defineShowcase } from "@/lib/registry/types"

import { Skeleton } from "./skeleton"

export default defineShowcase({
  name: "Skeleton",
  description: "Placeholder shapes that mirror content while it loads, reducing layout shift.",
  category: "utilities",
  tags: ["loading", "placeholder", "shimmer", "ghost"],
  component: Skeleton,
  args: { shape: "text", lines: 3, width: 280 },
  controls: {
    width: { control: "number", min: 20, max: 600, step: 10 },
    height: { control: "number", min: 8, max: 400, step: 4 },
    lines: { min: 1, max: 8 },
  },
})
