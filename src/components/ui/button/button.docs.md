## When to use

- **primary**: the single most important action in a view (submit, continue).
- **secondary / outline**: alternative actions next to a primary button.
- **ghost**: toolbar and low-emphasis actions.
- **danger**: destructive actions. Confirm them with a Dialog.
- **link**: navigation-like actions inside text. For real navigation, use a Next.js `<Link>`.

## Usage

```tsx
import { Button } from "@/components/ui/button"

;<Button onClick={save} loading={isSaving}>
  Save changes
</Button>
```

## Accessibility

- Renders a native `<button>`, with `type="button"` by default so it never submits a form by accident.
  Pass `type="submit"` explicitly inside forms.
- `loading` sets `aria-busy` and ignores clicks but keeps the button focusable, so keyboard users don't lose focus.
- `disabled` uses the native attribute. Prefer explaining _why_ an action is unavailable.
- Icon-only buttons (`iconOnly`) must have an `aria-label`.
- Icons placed via `startIcon`/`endIcon` follow the writing direction automatically.
