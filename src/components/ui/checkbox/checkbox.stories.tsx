import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Checkbox } from "./checkbox"
import SelectAllExample from "./examples/select-all"
import StatesExample from "./examples/states"

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Accept terms" },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { render: () => <StatesExample /> }

export const SelectAll: Story = { render: () => <SelectAllExample /> }

export const TogglesWithLabel: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Accept terms" })
    await userEvent.click(canvas.getByText("Accept terms"))
    await expect(checkbox).toBeChecked()
    await userEvent.keyboard(" ")
    await expect(checkbox).not.toBeChecked()
  },
}
