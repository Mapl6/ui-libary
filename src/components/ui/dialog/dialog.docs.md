## Anatomy

```tsx
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent title="Edit profile" description="Changes are visible to your team.">
    …form…
    <DialogFooter>
      <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

- Controlled: `<Dialog open={open} onOpenChange={setOpen}>`.
- Drawers: `placement="start" | "end"`. Bottom sheet: `placement="bottom"`.

## Why native `<dialog>`?

`showModal()` gives, with no extra JavaScript:

- the **top layer** (no z-index or portals),
- an **inert background**: focus can't leave the dialog, and screen readers ignore the page,
- **Escape** to close, and **focus restoration** to the trigger on close.

Open and close animations use `@starting-style` and `transition-behavior: allow-discrete`, and are
disabled under reduced motion.

## Accessibility

- `title` is required and becomes the accessible name (`aria-labelledby`). Use `hideTitle` to hide it visually.
- Focus moves to the first focusable element, or to an element with `autoFocus`. For destructive
  confirmations, autofocus the safe action.
- Page scroll is locked while a modal is open (`html:has(dialog:modal)`).
