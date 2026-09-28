import { defineShowcase } from "@/lib/registry/types"

import { Textarea } from "./textarea"

export default defineShowcase({
  name: "Textarea",
  description: "A multi-line text field with auto-sizing, a character counter and validation states.",
  category: "forms",
  tags: ["multiline", "comment", "message", "form", "text area"],
  component: Textarea,
  args: {
    label: "Feedback",
    placeholder: "What could we improve?",
    maxLength: 280,
    showCount: true,
  },
  controls: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    rows: { min: 1, max: 12 },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Textarea {...args} />
    </div>
  ),
})
