import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import StatesExample from "./examples/states"
import { Select } from "./select"

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Plan",
    placeholder: "Choose a plan",
    options: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "team", label: "Team" },
    ],
  },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { render: () => <StatesExample /> }

export const SelectsAnOption: Story = {
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByLabelText("Plan")
    await userEvent.selectOptions(select, "pro")
    await expect(select).toHaveValue("pro")
  },
}
