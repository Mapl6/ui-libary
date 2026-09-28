import { Plus } from "lucide-react"

import { defineShowcase } from "@/lib/registry/types"

import { Button } from "./button"

export default defineShowcase({
  name: "Button",
  description:
    "Triggers an action. Six variants, three sizes, icons, and loading and disabled states that keep the layout stable.",
  category: "actions",
  tags: ["action", "cta", "submit", "icon button", "click"],
  component: Button,
  args: { children: "Continue" },
  controls: { children: { label: "label" } },
  render: (args) =>
    args.iconOnly ? (
      <Button {...args} aria-label={String(args.children ?? "Add")}>
        <Plus />
      </Button>
    ) : (
      <Button {...args} />
    ),
})
