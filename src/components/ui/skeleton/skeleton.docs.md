## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div aria-busy="true">
  <Skeleton shape="circle" width={40} />
  <Skeleton shape="text" lines={2} />
</div>
```

Match the skeleton to the final layout's dimensions to avoid layout shift. For short, unknown-shape
waits use **Spinner** instead.

## Accessibility

- Skeletons are `aria-hidden`. Put `aria-busy="true"` on the region being loaded, and a polite live region
  if the loaded content should be announced.
- The pulse animation stops under `prefers-reduced-motion`.
