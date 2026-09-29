## Switch or checkbox?

- **Switch**: the change applies immediately (like a light switch), e.g. "Dark mode".
- **Checkbox**: the choice is submitted later with a form, e.g. "Accept terms".

## Usage

```tsx
import { Switch } from "@/components/ui/switch"

;<Switch
  label="Notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
```

## Accessibility

- A native `<input type="checkbox" role="switch">`, announced as "switch, on/off" and toggled with Space.
- The thumb direction flips in RTL.
