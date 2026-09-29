## Usage

```tsx
import { Alert } from "@/components/ui/alert"

;<Alert tone="danger" title="Payment failed" onDismiss={dismiss}>
  Your card was declined. Update your billing details.
</Alert>
```

## Accessibility

- `warning` and `danger` use `role="alert"` (assertive): screen readers interrupt to announce them.
  Other tones use `role="status"` (polite). Override with `role` if needed.
- Live regions only announce content that _changes_. Render the alert when the event happens rather
  than toggling its visibility with CSS.
- The dismiss button has an accessible label (`dismissLabel`, translatable).
