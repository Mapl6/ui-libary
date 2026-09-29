import { defineShowcase } from "@/lib/registry/types"

import { Checkbox } from "./checkbox"

export default defineShowcase({
  name: "Checkbox",
  description:
    "A native checkbox with a custom visual, label, description and indeterminate state.",
  category: "forms",
  tags: ["check", "toggle", "boolean", "agree", "multi select"],
  component: Checkbox,
  args: {
    label: "Email me about product updates",
    description: "At most one email a month.",
    checked: true,
  },
  controls: {
    label: { control: "text" },
    description: { control: "text" },
  },
  render: (args, update) => (
    <Checkbox
      {...args}
      onChange={(event) =>
        update({ checked: event.target.checked, indeterminate: false })
      }
    />
  ),
})
