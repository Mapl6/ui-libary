import { defineShowcase } from "@/lib/registry/types"

import { Switch } from "./switch"

export default defineShowcase({
  name: "Switch",
  description: "An on/off toggle for settings that apply immediately, built on a native checkbox with role=\"switch\".",
  category: "forms",
  tags: ["toggle", "setting", "boolean", "on off"],
  component: Switch,
  args: { label: "Airplane mode", checked: false },
  controls: {
    label: { control: "text" },
    description: { control: "text" },
  },
  render: (args, update) => <Switch {...args} onChange={(event) => update({ checked: event.target.checked })} />,
})
