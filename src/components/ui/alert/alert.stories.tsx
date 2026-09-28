import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { Alert } from "./alert"
import TonesExample from "./examples/tones"

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { title: "Heads up", children: "Something you should know about." },
  decorators: [(Story) => <div className="max-w-lg">{Story()}</div>],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = { render: () => <TonesExample /> }

export const Dismissible: Story = {
  args: { onDismiss: fn(), tone: "danger", title: "Payment failed" },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("alert")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }))
    await expect(args.onDismiss).toHaveBeenCalledOnce()
  },
}
