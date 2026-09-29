## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"

;<Checkbox name="terms" label="I agree to the terms" required />
```

Group related checkboxes in a `<fieldset>` with a `<legend>`.

## Accessibility

- A real `<input type="checkbox">` sits on top of the visual, so it keeps native keyboard (Space),
  form submission and screen-reader semantics.
- `indeterminate` sets the DOM property, which screen readers announce as "mixed".
- The whole label is clickable.
