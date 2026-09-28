import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import StatsExample from "./examples/stats"

const meta = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Supporting description.</CardDescription>
        </CardHeader>
        <CardContent>Body content goes here.</CardContent>
      </>
    ),
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Elevated: Story = { args: { variant: "elevated" } }

export const Statistics: Story = { render: () => <StatsExample /> }
