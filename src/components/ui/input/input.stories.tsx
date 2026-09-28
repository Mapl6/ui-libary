import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import AddonsExample from "./examples/02-addons"
import StatesExample from "./examples/01-states"
import { Input } from "./input"

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  args: { label: "Email", placeholder: "you@example.com" },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { render: () => <StatesExample /> }

export const Addons: Story = { render: () => <AddonsExample /> }

export const LabelAndErrorAreLinked: Story = {
  args: { error: "Enter a valid email address" },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText("Email")
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(input).toHaveAccessibleDescription("Enter a valid email address")
    await userEvent.type(input, "hello")
    await expect(input).toHaveValue("hello")
  },
}
