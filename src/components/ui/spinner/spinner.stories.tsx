import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import SizesExample from "./examples/sizes"
import { Spinner } from "./spinner"

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = { render: () => <SizesExample /> }

export const AnnouncesStatus: Story = {
  args: { label: "Saving changes" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent("Saving changes")
  },
}
