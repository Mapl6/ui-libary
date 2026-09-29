import { ChevronDown, Copy, Pencil, Share2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { defineShowcase } from "@/lib/registry/types"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export default defineShowcase({
  name: "Dropdown Menu",
  description:
    "A menu of actions opened from a button, with full keyboard support, typeahead and destructive items.",
  category: "actions",
  tags: ["menu", "actions", "context menu", "overflow", "popover", "dropdown"],
  component: DropdownMenu,
  args: { open: false, align: "start" },
  controls: {
    children: false,
    defaultOpen: false,
    className: false,
    align: { control: "radio", options: ["start", "end"] },
  },
  render: (args, update) => (
    <div className="flex min-h-64 items-start justify-center">
      <DropdownMenu open={args.open} onOpenChange={(open) => update({ open })}>
        <DropdownMenuTrigger>
          <Button variant="outline" endIcon={<ChevronDown />}>
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={args.align === "end" ? "end" : "start"}>
          <DropdownMenuLabel>Project</DropdownMenuLabel>
          <DropdownMenuItem icon={<Pencil />} shortcut="R">
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Copy />} shortcut="⌘D">
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Share2 />} disabled>
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<Trash2 />} tone="danger">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  code: (args) => `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline" endIcon={<ChevronDown />}>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent${args.align === "end" ? ' align="end"' : ""}>
    <DropdownMenuItem icon={<Pencil />} onSelect={rename}>Rename</DropdownMenuItem>
    <DropdownMenuItem icon={<Copy />} onSelect={duplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash2 />} tone="danger" onSelect={remove}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
})
