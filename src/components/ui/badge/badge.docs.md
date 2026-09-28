## Usage

```tsx
import { Badge } from "@/components/ui/badge"

<Badge tone="warning" dot>Pending review</Badge>
```

- Badges are static labels. For removable filters or selectable chips, use a Button (a Chip component is planned).
- Keep labels short (one or two words).

## Accessibility

- Don't rely on color alone: the text must carry the meaning.
- The dot is decorative (`aria-hidden`).
- Tone colors meet WCAG AA contrast in both themes. See **Foundations → Colors**.
