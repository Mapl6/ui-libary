import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import SettingsExample from "./examples/settings"
import { Switch } from "./switch"

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Wi-Fi" },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SettingsList: Story = { render: () => <SettingsExample /> }

export const ExposesSwitchRole: Story = {
  play: async ({ canvas, userEvent }) => {
    const control = canvas.getByRole("switch", { name: "Wi-Fi" })
    await expect(control).not.toBeChecked()
    await userEvent.click(control)
    await expect(control).toBeChecked()
  },
}
