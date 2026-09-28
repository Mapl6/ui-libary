import { Button } from "@/components/ui/button"
import { defineShowcase } from "@/lib/registry/types"

import { Tooltip } from "./tooltip"

export default defineShowcase({
  name: "Tooltip",
  description: "A short, non-essential label shown on hover and keyboard focus, dismissible with Escape.",
  category: "feedback",
  tags: ["hint", "title", "popover", "help", "label"],
  component: Tooltip,
  args: { content: "Copy to clipboard", open: true },
  controls: { content: { control: "text" }, children: false },
  render: (args) => (
    <div className="py-10">
      <Tooltip {...args}>
        <Button variant="outline">Hover or focus me</Button>
      </Tooltip>
    </div>
  ),
  code: (args) => `import { Tooltip } from "@/components/ui/tooltip"

<Tooltip content="${String(args.content ?? "")}"${args.side && args.side !== "top" ? ` side="${args.side}"` : ""}>
  <Button variant="outline">Hover or focus me</Button>
</Tooltip>`,
})
