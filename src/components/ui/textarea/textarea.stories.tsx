import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import StatesExample from "./examples/states"
import { Textarea } from "./textarea"

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { label: "Feedback", placeholder: "What could we improve?" },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { render: () => <StatesExample /> }

export const CountsCharacters: Story = {
  args: { maxLength: 20, showCount: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Feedback"), "Hello")
    await expect(canvas.getByText("5/20")).toBeInTheDocument()
  },
}
