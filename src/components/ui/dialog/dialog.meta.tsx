import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { argString } from "@/lib/registry/args"
import { defineShowcase } from "@/lib/registry/types"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  type DialogPlacement,
  type DialogSize,
  DialogTrigger,
} from "./dialog"

export default defineShowcase({
  name: "Dialog",
  description:
    "A modal dialog and side/bottom sheet built on the native <dialog> element: focus containment, Escape, backdrop and exit animations.",
  category: "feedback",
  tags: ["modal", "drawer", "sheet", "overlay", "popup", "confirm"],
  component: Dialog,
  args: { open: false, title: "Rename project", placement: "center", size: "md" },
  controls: {
    children: false,
    defaultOpen: false,
    // DialogContent props, forwarded by the render function below.
    title: { control: "text" },
    placement: { control: "radio", options: ["center", "start", "end", "bottom"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  render: (args, update) => {
    const title = argString(args.title, "Rename project")
    const placement = argString<DialogPlacement>(args.placement, "center")
    const size = argString<DialogSize>(args.size, "md")
    return (
      <Dialog open={args.open} onOpenChange={(open) => update({ open })}>
        <DialogTrigger>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent title={title} description="Project names appear in URLs and invitations." placement={placement} size={size}>
          <Input label="Name" defaultValue="Aurora" autoFocus />
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  code: (args) => {
    const placement = argString(args.placement, "center")
    const size = argString(args.size, "md")
    const props = [
      `title="${argString(args.title, "Rename project")}"`,
      placement !== "center" ? `placement="${placement}"` : null,
      size !== "md" ? `size="${size}"` : null,
    ].filter(Boolean)
    return `import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent ${props.join(" ")}>
    <Input label="Name" defaultValue="Aurora" autoFocus />
    <DialogFooter>
      <DialogClose>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button onClick={save}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
  },
})
