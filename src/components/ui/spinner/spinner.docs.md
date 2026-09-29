## Usage

Use a spinner for short, indeterminate waits (under ~3 seconds) where the layout of the
result is unknown. For content with a known shape, prefer **Skeleton**.

```tsx
import { Spinner } from "@/components/ui/spinner"

;<Spinner label="Loading orders" />
```

## Accessibility

- Renders `role="status"` with a visually hidden label, so screen readers announce it.
- Set `decorative` when a parent already exposes the busy state (the Button does this with `aria-busy`).
- The rotation is disabled under `prefers-reduced-motion`.
