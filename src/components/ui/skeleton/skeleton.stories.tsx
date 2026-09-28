import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import LoadingCardExample from "./examples/loading-card"
import { Skeleton } from "./skeleton"

const meta = {
  title: "Utilities/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: { shape: "text", lines: 3, width: 280 },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const LoadingCard: Story = { render: () => <LoadingCardExample /> }
