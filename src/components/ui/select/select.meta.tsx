import { defineShowcase } from "@/lib/registry/types"

import { Select } from "./select"

export default defineShowcase({
  name: "Select",
  description:
    "A styled native select with label, placeholder and validation. Uses the platform picker on mobile.",
  category: "forms",
  tags: ["dropdown", "picker", "choice", "combobox", "form"],
  component: Select,
  args: {
    label: "Country",
    placeholder: "Choose a country",
    options: [
      { value: "ir", label: "Iran" },
      { value: "de", label: "Germany" },
      { value: "jp", label: "Japan" },
      { value: "br", label: "Brazil", disabled: true },
    ],
  },
  controls: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
  },
  render: (args) => (
    <div className="w-full max-w-xs">
      <Select {...args} />
    </div>
  ),
})
