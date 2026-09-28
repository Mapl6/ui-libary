import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn } from "storybook/test"

import { Button } from "./button"
import IconsExample from "./examples/03-icons"
import StatesExample from "./examples/04-states"
import VariantsExample from "./examples/01-variants"

const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Continue", onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = { render: () => <VariantsExample /> }

export const WithIcons: Story = { render: () => <IconsExample /> }

export const States: Story = { render: () => <StatesExample /> }

export const CallsOnClick: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const LoadingIgnoresClicks: Story = {
  args: { loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button")
    await expect(button).toHaveAttribute("aria-busy", "true")
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
