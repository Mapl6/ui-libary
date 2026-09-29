## Anatomy

```tsx
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs"

;<Tabs defaultValue="overview">
  <TabsList aria-label="Project">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
  <TabsPanel value="settings">…</TabsPanel>
</Tabs>
```

## Keyboard

| Key        | Action                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| Tab        | Moves focus into the tab list (to the selected tab), then into the panel |
| ← / →      | Previous / next tab (flipped in RTL; ↑ / ↓ when vertical)                |
| Home / End | First / last tab                                                         |

Tabs use **automatic activation**: moving focus selects the tab. Disabled tabs are skipped.

## Accessibility

- `role="tablist"`, `tab` and `tabpanel`, with `aria-selected`, `aria-controls` and `aria-labelledby` wired automatically.
- Roving `tabIndex`: only the selected tab is in the tab order.
- Give the list an `aria-label` when there's no visible heading.
- Don't use tabs for navigation between pages. Use links with `aria-current="page"` instead.
