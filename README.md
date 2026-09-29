# UI Library

A React component library with its own documentation site. Each component is written once, and its showcase page, interactive playground, props table, Storybook stories and Docmost export are built from those same files.

- **Showcase**: Next.js site with a live playground in an isolated iframe (viewport presets, reduced motion), generated usage code, examples, props tables from TypeScript, source and docs. It supports light and dark themes, RTL, English and Persian, and ⌘K search.
- **Components**: Alert, Badge, Button, Card, Checkbox, Dialog, Dropdown Menu, Input, Select, Skeleton, Spinner, Switch, Tabs, Textarea, Tooltip. They are accessible and use native elements where possible (`<dialog>`, `<select>`).
- **Design tokens**: authored in TypeScript, generated into CSS variables and a Tailwind v4 `@theme`.
- **Storybook 10**: every story runs as a test in headless Chromium through Vitest.
- **Docmost**: optional self-hosted wiki for reviewing and discussing the docs.

## Quick start

Requires Node.js 22.18 or newer.

```bash
npm install
npm run dev            # http://localhost:3000
npm run storybook      # http://localhost:6006
```

## Scripts

| Script                                        | Description                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                                 | Generator in watch mode, plus the Next.js dev server                        |
| `npm run build` / `start`                     | Production build of the showcase                                            |
| `npm run generate`                            | Regenerate token CSS and the component registry                             |
| `npm run check`                               | Generate, lint, typecheck and format check                                  |
| `npm test`                                    | Run all stories as tests (run `npx playwright install chromium` once first) |
| `npm run storybook` / `build-storybook`       | Storybook dev server / static build                                         |
| `npm run docs:up` / `docs:down` / `docs:logs` | Local Docmost with Docker                                                   |
| `npm run docs:export`                         | Export all docs as Markdown and a zip for Docmost's import                  |

## Documentation

The guides in [`docs/`](docs) are also published in the showcase under **Guides**:

1. [Getting started](docs/01-getting-started.md)
2. [Adding a component](docs/02-adding-a-component.md)
3. [Theming and tokens](docs/03-theming-and-tokens.md)
4. [Documentation workflow](docs/04-documentation-workflow.md), covering Storybook and Docmost
5. [Roadmap](docs/05-roadmap.md): what to build next, by phase and priority

## Configuration

Copy `.env.example` to `.env.local` to link the showcase to Storybook and Docmost. Both variables are optional.
