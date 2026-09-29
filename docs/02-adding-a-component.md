# Adding a component

A component becomes part of the showcase as soon as its folder has a `<slug>.meta.tsx` file. The generator finds it and extracts its props from TypeScript. Navigation, search, the playground and Storybook links all update without any other change.

## Folder structure

```text
src/components/ui/avatar/
  avatar.tsx            the component (required)
  index.ts              export * from "./avatar"
  avatar.meta.tsx       showcase metadata (required to appear in the showcase)
  avatar.docs.md        written guidance, shown in the Docs tab
  avatar.stories.tsx    Storybook stories and interaction tests
  examples/
    01-sizes.tsx        one example per file, shown on the component page
    02-fallback.tsx
```

Folders without a meta file, such as `field`, are internal building blocks. They can be imported by other components but are not listed in the showcase.

## 1. Write the component

Document props with JSDoc. The generator reads it for the props table and the playground:

```tsx
export type AvatarProps = ComponentProps<"span"> & {
  /**
   * Diameter.
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /** Image URL. Falls back to initials when missing or broken. */
  src?: string
}
```

- Every exported `…Props` type in the component's files is documented. The one named after the folder (`AvatarProps` for `avatar`) drives the playground.
- `@default` values become the playground's initial values. Write them as JSON: `"md"`, `false`, `400`.
- Props inherited from React or DOM types are left out of the table. Tag a prop with `@internal` to hide it.
- Add `"use client"` if the component uses state, effects or its own event handlers.
- Use semantic token utilities (`bg-surface`, `text-foreground-muted`, `border-border-strong`). The palette utilities such as `bg-blue-500` are disabled on purpose.
- Use logical properties (`ms-2`, `ps-3`, `start-0`) so the component works right to left.

## 2. Describe it for the showcase

```tsx
import { defineShowcase } from "@/lib/registry/types"

import { Avatar } from "./avatar"

export default defineShowcase({
  name: "Avatar",
  description: "A person's picture, with initials as a fallback.",
  category: "data-display",
  tags: ["user", "profile", "picture"],
  component: Avatar,
  args: { size: "md", children: "MA" },
})
```

Useful optional fields:

| Field         | Use it to                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------- |
| `status`      | Mark a component as `beta`, `experimental` or `deprecated`                                   |
| `controls`    | Hide a control (`false`), or change it (`{ control: "select", options: [...] }`)             |
| `render`      | Render compound or controlled components in the playground. The second argument updates args |
| `code`        | Replace the generated usage snippet                                                          |
| `docmostPath` | Link the page to its Docmost page                                                            |

Categories live in `src/registry/categories.ts`.

## 3. Add examples

Each file in `examples/` default-exports a component. The file name gives the title (a numeric prefix sets the order and is dropped), and the first `/** … */` comment becomes the description:

```tsx
/** Three sizes, for lists, comments and profile headers. */
import { Avatar } from "@/components/ui/avatar"

export default function AvatarSizes() {
  return <div className="flex items-center gap-3">…</div>
}
```

Put `"use client"` on the first line of any example that uses state or event handlers.

## 4. Write the docs and stories

- `avatar.docs.md`: when to use it, usage, accessibility. Start with a `##` heading; the page already shows the title.
- `avatar.stories.tsx`: title it `<Category label>/<Name>`, for example `"Data Display/Avatar"`. The showcase's Storybook link depends on this. Reuse the examples as stories and add `play` functions for behavior.

## 5. Check

```bash
npm run check   # regenerates the registry, then lint, typecheck and format check
npm test        # runs the stories
```

Commit the regenerated files in `src/registry/generated`.
