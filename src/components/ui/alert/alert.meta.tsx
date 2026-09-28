import { defineShowcase } from "@/lib/registry/types"

import { Alert } from "./alert"

export default defineShowcase({
  name: "Alert",
  description: "An inline message for status and important context, with tone-aware ARIA roles and optional actions.",
  category: "feedback",
  tags: ["callout", "banner", "notice", "message", "error", "warning"],
  component: Alert,
  args: {
    tone: "warning",
    title: "Your trial ends in 3 days",
    children: "Add a payment method to keep your projects running.",
  },
  controls: {
    title: { control: "text" },
    children: { control: "textarea", label: "message" },
    icon: false,
    actions: false,
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <Alert {...args} />
    </div>
  ),
})
