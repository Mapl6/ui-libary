import { defineShowcase } from "@/lib/registry/types"

import { Input } from "./input"

export default defineShowcase({
  name: "Input",
  description:
    "A single-line text field with label, help text, validation state and start/end addons.",
  category: "forms",
  tags: ["text field", "form", "textbox", "email", "search"],
  component: Input,
  args: {
    label: "Email",
    placeholder: "you@example.com",
    description: "We'll never share your email.",
  },
  controls: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    startAddon: false,
    endAddon: false,
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Input {...args} />
    </div>
  ),
})
