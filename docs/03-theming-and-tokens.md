# Theming and tokens

Design tokens are written once in TypeScript in `src/tokens`. The generator turns them into CSS variables and a Tailwind `@theme` in `src/styles/tokens.css`, so the same values drive utilities, components, Storybook and the Foundations pages.

## Where things live

| File                                        | Contains                                                            |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `colors.ts`                                 | The primitive `palette` and the list of semantic color roles        |
| `themes.ts`                                 | One entry per theme, mapping every semantic role to a palette value |
| `typography.ts`                             | Font families, the type scale, weights and letter spacing           |
| `spacing.ts`, `radius.ts`, `shadows.ts`     | Layout and surface tokens                                           |
| `breakpoints.ts`, `z-index.ts`, `motion.ts` | Responsive, layering and animation tokens                           |

Never edit `src/styles/tokens.css` by hand. Run `npm run generate`, or keep `npm run dev` running.

## Semantic colors only

Components use semantic roles such as `bg-surface`, `text-foreground-muted`, `border-border-strong` and `bg-primary`. Tailwind's default palette (`bg-blue-500`) is switched off, so a component can't bypass the theme by accident.

Each role has a matching CSS variable, `--ui-<role>`, for use in plain CSS.

## Adding a color role

1. Add the role name to `semanticColorRoles` in `colors.ts`.
2. Give it a value in **every** theme in `themes.ts`. TypeScript reports any theme that's missing one.
3. Run `npm run generate`. The utility (`bg-<role>`, `text-<role>`, …) is now available.

## Adding a theme

Add an entry to `themes` in `themes.ts`:

```ts
{
  id: "high-contrast",
  label: "High contrast",
  scheme: "light",
  colors: { /* every semantic role */ },
}
```

The generator emits a `[data-theme="high-contrast"]` block, and the showcase's theme menu and Storybook's toolbar list it automatically. The first theme in the list is the default.

## Dark mode and direction

The showcase sets `data-theme`, `dir` and `lang` on `<html>` before first paint, from the saved preferences. Components should:

- rely on semantic colors, never on `dark:` overrides, so every theme works;
- use logical properties (`ms-*`, `pe-*`, `start-*`, `border-e`) instead of left and right;
- mirror directional icons with `rtl:rotate-180` or `rtl:-scale-x-100`.

Check both directions and both themes in the playground or Storybook toolbar before you ship a component.
