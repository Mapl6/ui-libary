import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, waitFor } from "storybook/test"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import RowActionsExample from "./examples/row-actions"

const onRename = fn()

const meta = {
  title: "Actions/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <DropdownMenuTrigger>
          <Button variant="outline">Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onRename}>Rename</DropdownMenuItem>
          <DropdownMenuItem disabled>Share</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
  decorators: [(Story) => <div className="min-h-64">{Story()}</div>],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const RowActions: Story = { render: () => <RowActionsExample /> }

export const KeyboardInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Options" })
    trigger.focus()
    await userEvent.keyboard("{ArrowDown}")
    await waitFor(() =>
      expect(canvas.getByRole("menuitem", { name: "Rename" })).toHaveFocus()
    )
    // Disabled items are skipped.
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus()
    // Typeahead.
    await userEvent.keyboard("d")
    await expect(canvas.getByRole("menuitem", { name: "Delete" })).toHaveFocus()
    await userEvent.keyboard("{Escape}")
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument()
    await expect(trigger).toHaveFocus()
    // Enter selects and closes.
    await userEvent.keyboard("{ArrowDown}{Enter}")
    await expect(onRename).toHaveBeenCalled()
  },
}
