## Usage

```tsx
import { Tooltip } from "@/components/ui/tooltip"

<Tooltip content="Archive · E">
  <Button iconOnly aria-label="Archive"><Archive /></Button>
</Tooltip>
```

## Guidelines

- Tooltips are **supplementary**. Touch users can't hover, so never hide essential information in them.
- The trigger must be focusable. To explain a disabled button, wrap it in a focusable element, or better, explain it inline.
- An icon button's accessible **name** comes from `aria-label`; the tooltip adds a **description**.

## Accessibility

- Shown on mouse hover (after `delay`) and immediately on keyboard focus (`:focus-visible`).
- `role="tooltip"`, linked with `aria-describedby` while visible.
- Dismissible with Escape without moving focus (WCAG 1.4.13), and hoverable: moving the pointer onto the tooltip keeps it open.
