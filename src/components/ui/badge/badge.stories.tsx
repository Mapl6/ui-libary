import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Badge } from "./badge"
import TonesExample from "./examples/tones"

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Active", tone: "success", dot: true },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const TonesAndAppearances: Story = { render: () => <TonesExample /> }
