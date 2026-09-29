import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import VariantsExample from "./examples/variants"
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs"

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "one",
    children: (
      <>
        <TabsList aria-label="Example">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
          <TabsTrigger value="three" disabled>
            Three
          </TabsTrigger>
          <TabsTrigger value="four">Four</TabsTrigger>
        </TabsList>
        <TabsPanel value="one">Panel one</TabsPanel>
        <TabsPanel value="two">Panel two</TabsPanel>
        <TabsPanel value="four">Panel four</TabsPanel>
      </>
    ),
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = { render: () => <VariantsExample /> }

export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent }) => {
    const one = canvas.getByRole("tab", { name: "One" })
    await userEvent.click(one)
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    // Disabled tabs are skipped.
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("tab", { name: "Four" })).toHaveFocus()
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Panel four")
    await userEvent.keyboard("{Home}")
    await expect(one).toHaveFocus()
  },
}
