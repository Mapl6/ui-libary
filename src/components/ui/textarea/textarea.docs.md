## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"

;<Textarea label="Message" name="message" resize="auto" maxLength={500} showCount />
```

- `resize="auto"` uses CSS `field-sizing: content` to grow with the text. Browsers without support fall back to manual vertical resizing.
- The counter works for both controlled (`value`) and uncontrolled (`defaultValue`) usage.

## Accessibility

- The counter is linked with `aria-describedby`, so screen readers announce the limit.
- `maxLength` stops input at the limit natively. For a soft limit, validate instead and show an `error`.
