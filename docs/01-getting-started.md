# Getting started

This repository holds the component library, and the showcase site that documents it. Every page, playground, props table and search entry is generated from the files in `src/components/ui`, so there is one source of truth for each component.

## Requirements

- Node.js **22.18 or newer**. The generator (`scripts/generate.ts`) runs TypeScript directly with Node's built-in type stripping.
- Docker, only if you want to run the Docmost wiki locally.

## Run it

```bash
npm install
npm run dev          # generator in watch mode + Next.js on http://localhost:3000
npm run storybook    # Storybook on http://localhost:6006
```

`npm run dev` keeps the registry and token CSS up to date while you edit components and tokens.

## Scripts

| Script                | What it does                                                          |
| --------------------- | --------------------------------------------------------------------- |
| `npm run generate`    | Regenerates `src/styles/tokens.css` and `src/registry/generated/*`    |
| `npm run dev`         | Generator in watch mode, plus the Next.js dev server                  |
| `npm run build`       | Generates, then builds the static showcase                            |
| `npm run check`       | Generate, lint, typecheck and format check. Run it before you commit  |
| `npm run storybook`   | Storybook with theme and direction toolbars                           |
| `npm test`            | Runs every story as a test in headless Chromium (Vitest browser mode) |
| `npm run docs:up`     | Starts a local Docmost wiki (see the Documentation workflow guide)    |
| `npm run docs:export` | Bundles all docs as Markdown for import into Docmost                  |

The first `npm test` needs a browser: run `npx playwright install chromium` once.

## Project layout

```text
src/
  components/ui/<slug>/     the library, one folder per component
  components/showcase/      the documentation site's own UI
  tokens/                   design tokens, authored in TypeScript
  registry/                 categories, foundations and generated registry
  lib/                      registry API, preferences, utilities
  app/                      Next.js routes for the showcase
docs/                       these guides
scripts/                    code generator and Docmost export
```

## Using a component

Import from the component's folder:

```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
```

Each component page in the showcase has a live playground, generated usage code, examples, a props table built from the TypeScript types, the full source, and written guidance.

## Environment variables

Both are optional. When set, the showcase links to the external tools.

| Variable                    | Example                 |
| --------------------------- | ----------------------- |
| `NEXT_PUBLIC_STORYBOOK_URL` | `http://localhost:6006` |
| `NEXT_PUBLIC_DOCMOST_URL`   | `http://localhost:3100` |

Copy `.env.example` to `.env.local` to set them.
