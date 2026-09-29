## Anatomy

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

;<Card>
  <CardHeader action={<Badge>New</Badge>}>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

## Clickable cards

Don't wrap a card in a `<button>` or `<a>`: that breaks nested interactive content. Instead set
`interactive` and stretch one real link over the card with `after:absolute after:inset-0`
(see the _Stats_ example). The focus ring is drawn on the card via `:has(:focus-visible)`.

## Accessibility

- Use `CardTitle as` to keep a correct heading hierarchy.
