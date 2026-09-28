import { defineShowcase } from "@/lib/registry/types"

import { Spinner } from "./spinner"

export default defineShowcase({
  name: "Spinner",
  description: "An indeterminate loading indicator with an accessible status label.",
  category: "feedback",
  tags: ["loading", "progress", "indicator", "busy"],
  component: Spinner,
  render: (args) => (
    <span className="text-primary">
      <Spinner {...args} />
    </span>
  ),
})
