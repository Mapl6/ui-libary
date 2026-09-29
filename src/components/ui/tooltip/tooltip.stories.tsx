import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"

import { Button } from "@/components/ui/button"

import SidesExample from "./examples/sides"
import { Tooltip } from "./tooltip"

const meta = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Copy to clipboard",
    children: <Button variant="outline">Copy</Button>,
  },
  decorators: [(Story) => <div className="p-12">{Story()}</div>],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sides: Story = { render: () => <SidesExample /> }

export const ShowsOnFocusAndDismissesWithEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab()
    const tooltip = await canvas.findByRole("tooltip")
    await expect(
      canvas.getByRole("button", { name: "Copy" })
    ).toHaveAccessibleDescription("Copy to clipboard")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(tooltip).not.toBeInTheDocument())
  },
}
