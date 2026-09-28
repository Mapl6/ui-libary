import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"

import { Button } from "@/components/ui/button"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./dialog"
import ConfirmExample from "./examples/01-confirm"
import SheetsExample from "./examples/02-sheets"

const meta = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent title="Dialog title" description="A short description.">
          <p>Dialog body.</p>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Confirm: Story = { render: () => <ConfirmExample /> }

export const Sheets: Story = { render: () => <SheetsExample /> }

export const OpensAndClosesWithKeyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Open" })
    await userEvent.click(trigger)
    // The dialog renders in the top layer but stays inside the story root.
    const dialog = await canvas.findByRole("dialog", { name: "Dialog title" })
    await expect(dialog).toHaveAttribute("open")
    await expect(dialog).toHaveAccessibleDescription("A short description.")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"))
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
