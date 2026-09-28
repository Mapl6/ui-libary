## Anatomy

```tsx
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>File</DropdownMenuLabel>
    <DropdownMenuItem onSelect={rename}>Rename</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem tone="danger" onSelect={remove}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Menus are for **actions**. For choosing a value in a form, use **Select**. For navigation, use links.

## Keyboard

| Key | Action |
| --- | --- |
| Enter / Space / ↓ | Open and focus the first item |
| ↑ | Open and focus the last item |
| ↑ / ↓ | Move between items (wraps, skips disabled) |
| Home / End | First / last item |
| A–Z | Typeahead to the matching item |
| Enter / Space | Select the item and close |
| Escape | Close and return focus to the trigger |
| Tab | Close and continue in the page |

## Accessibility

- `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` on the trigger; `role="menu"` labelled by the trigger.
- Items are `role="menuitem"` with roving focus. Disabled items use `aria-disabled`, so they stay discoverable.
- Positioning is logical (`align="start" | "end"`) and flips in RTL.
- Known limitation: there's no collision detection yet. Keep menus away from viewport edges, or add a positioning engine later.
