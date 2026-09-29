## Usage

```tsx
import { Input } from "@/components/ui/input"

;<Input
  label="Email"
  type="email"
  name="email"
  description="We'll never share your email."
  error={errors.email}
/>
```

`Input` spreads every native `<input>` attribute onto the element, so it works with uncontrolled
forms, Server Actions and form libraries such as React Hook Form (`{...register("email")}`).

## Accessibility

- The label is a real `<label for>`, so clicking it focuses the input.
- `description` and `error` are linked with `aria-describedby`, and `error` sets `aria-invalid`.
- Without a visible `label`, pass an `aria-label`.
- Don't use placeholders as labels: they disappear on input and often fail contrast.
- Addons are positioned with logical `start`/`end` and flip in RTL.
