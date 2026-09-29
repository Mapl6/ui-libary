# Roadmap

What to build next, in five phases, with every item tagged Must have, Should have, New feature or Good to have. Status as of 2026-09-29; the live, editable version is the [UI Library — Product Roadmap](https://claude.ai/code/artifact/0a4bf2c5-f2ac-47ea-97af-6a1c87e30504) doc.

## Overview

The library has a strong engine (token generator, registry, showcase, playground, Storybook tests) but only 16 components and no way to consume them outside this repo. This roadmap takes it from a WIP showcase to a publishable, documented, tested component library in five phases.

The stack today: Next.js 16.3, React 19.2, Tailwind CSS 4, Storybook 10 with Vitest browser tests, Lucide icons, English + Persian (RTL) localisation of the showcase, and an optional self-hosted Docmost wiki fed by a Markdown exporter. Components lean on native HTML (`<dialog>`, `<select>`) rather than a headless library.

Every item below is tagged with one of four priorities (defined in the Priority framework section) and placed in a phase. The Master backlog at the end is the single list to track progress against.

## Current state

The infrastructure is ahead of the content: the generator, showcase and playground are built, but the Layout category is empty and Navigation and Utilities hold one component each and the repo has several loose ends.

### What exists

| Area          | What is there                                                                                                                                    | Notes                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Components    | Alert, Badge, Button, Card, Checkbox, Dialog (+ sheets), Dropdown Menu, Input, Select, Skeleton, Spinner, Switch, Tabs, Textarea, Tooltip, Field | 15 have showcase meta, docs, stories and examples; Field has none                                           |
| Tokens        | Colors, themes, typography, spacing, radius, shadows, motion, z-index, breakpoints                                                               | TypeScript source of truth, generated into `tokens.css` + Tailwind `@theme`                                 |
| Themes        | Light and dark via `data-theme`                                                                                                                  | Adding a theme = one entry in `themes.ts`                                                                   |
| Generator     | `scripts/generate.ts` (447 lines), with `--watch`                                                                                                | Extracts prop docs with the TypeScript compiler API; emits registry + lazy loaders                          |
| Showcase      | Categories, component pages, foundations, guides, command palette search, sibling nav                                                            | Route group `(showcase)`                                                                                    |
| Playground    | Controls panel, isolated preview iframe, viewports, generated code                                                                               | `postMessage` protocol between page and frame                                                               |
| i18n          | English and Persian, RTL                                                                                                                         | Showcase chrome only                                                                                        |
| Testing       | Storybook play tests via Vitest browser (Playwright), a11y addon                                                                                 | Theme and direction toolbars in Storybook; coverage is thin: a few interaction tests per component          |
| Quality gates | ESLint (0 warnings), `tsc`, Prettier, `npm run check`                                                                                            | No CI runs them yet                                                                                         |
| Docs          | README, 4 guides (Getting started, Adding a component, Theming and tokens, Documentation workflow), Docmost via Docker, docs-export.ts           | Guides also render under Guides in the showcase; the repo is the source of truth, Docmost is for discussion |

### Gaps and loose ends

- **Uncommitted work:** the Docmost setup, the exporter, three new guides and a repo-wide reformat (119 files) are not committed yet.
- **Empty categories:** Layout has no components; Navigation has only Tabs and Utilities only Skeleton.
- **Not consumable:** `"private": true`, no package build, no CLI or copy-paste registry — the components only live inside this app.
- **No CI, no releases, no changelog, no license.**
- **A11y checks do not fail tests:** Storybook's `a11y.test` is still `"todo"`, so violations only show in the UI.
- **Floating UI is hand-rolled:** Tooltip and Dropdown position with CSS only, so they do not flip or shift at viewport edges.
- **Single WIP commit:** most of the work landed in one commit, so history gives no guidance on what is finished.

## Priority framework

Four tags decide what goes first; effort uses T-shirt sizes (S ≤ 1 day, M 2–4 days, L 1–2 weeks, XL 2+ weeks).

| Tag          | Meaning                                                  | Rule of thumb                         |
| ------------ | -------------------------------------------------------- | ------------------------------------- |
| Must have    | The library is broken, misleading or unusable without it | Blocks a 1.0 release                  |
| Should have  | Expected of any serious component library                | Ship before or soon after 1.0         |
| New feature  | Net-new capability that widens what the library can do   | Pick by demand once the base is solid |
| Good to have | Polish, delight, or nice-to-know                         | Only when nothing above is open       |

Phases group items by dependency, not only by priority: a phase can hold a Good to have item when it is cheap and sits next to work already in progress.

## Phase 1 — Foundation and must-haves

Goal: a clean, trustworthy repo and the core components every app needs. Exit when CI is green on every PR and the Must have components below exist with meta, docs, stories and examples.

### Repo hygiene (Must have)

- [x] Fix or remove the `docs:*` scripts that point at the missing `docmost/` folder and `scripts/docs-export.ts`
- [x] Replace the boilerplate `README.md`: what the library is, how to run it, how to add a component
- [x] Write `docs/01-getting-started.md` (currently "Placeholder.")
- [ ] Add a `LICENSE` (MIT is the common choice) and a `CONTRIBUTING.md`
- [ ] Add CI (GitHub Actions): `npm run check`, `npm test`, `npm run build`
- [ ] Add a pre-commit hook (lint-staged + Prettier) so the generated files never drift
- [ ] Give `Field` a showcase meta and docs, or mark it internal

### Must-have components

These fill the empty Layout category, round out Navigation and cover the most common form and feedback needs.

| Component           | Category     | Why it is a must                                       | Effort |
| ------------------- | ------------ | ------------------------------------------------------ | ------ |
| Label               | Forms        | Standalone label for custom controls                   | S      |
| Radio Group         | Forms        | Single choice among few options; no replacement exists | M      |
| Link                | Navigation   | Styled anchor, works with `next/link` via Slot         | S      |
| Separator           | Layout       | Divider with correct `role`                            | S      |
| Stack / Flex / Grid | Layout       | Spacing primitives on the token scale                  | M      |
| Container           | Layout       | Max-width page wrapper                                 | S      |
| Avatar              | Data Display | Image with initials fallback                           | S      |
| Toast               | Feedback     | Non-blocking notifications; a live-region queue        | L      |
| Popover             | Feedback     | Base for menus, combobox, date picker                  | L      |
| Breadcrumb          | Navigation   | Page hierarchy                                         | S      |
| Pagination          | Navigation   | Lists and tables                                       | M      |
| Table               | Data Display | Styled, accessible data table (not a data grid yet)    | M      |
| Empty State         | Utilities    | Standard "nothing here" layout                         | S      |

### Positioning engine (Must have)

- [ ] Adopt Floating UI (or the CSS Anchor Positioning API with a fallback) for Tooltip, Dropdown Menu and Popover so they flip and shift at viewport edges
- [ ] Use the native Popover API (`popover` attribute) for top-layer rendering, as Dialog already does with `<dialog>`

## Phase 2 — Quality, accessibility and testing

Goal: every component is proven to work, not just shown to work. Exit when each component has interaction and a11y tests, visual snapshots run in CI, and an accessibility statement is published.

### Testing (Must have)

- [ ] Set a per-component test bar: renders, keyboard path, controlled + uncontrolled, disabled, RTL
- [ ] Fail CI on Storybook a11y addon violations (axe), not just warn
- [ ] Visual regression: Storybook + Playwright screenshots (or Chromatic) across light, dark and RTL
- [ ] Unit tests for `scripts/generate.ts` and `src/lib/registry` (prop extraction, codegen) — a silent bug there breaks every page
- [ ] Coverage report in CI (target: 80% of component lines)

### Accessibility (Must have)

- [ ] Audit every component against the WAI-ARIA Authoring Practices pattern it implements
- [ ] Manual screen reader pass: VoiceOver (macOS/iOS) and NVDA (Windows)
- [ ] Check contrast of every semantic color pair in both themes (the Colors foundation already shows ratios; make it a test)
- [ ] Honor `prefers-reduced-motion` across all motion tokens
- [ ] Forced-colors / Windows High Contrast support for focus rings, checkbox, switch
- [ ] Publish an accessibility page per component: keyboard map, ARIA roles, known limits

### Code quality (Should have)

- [ ] Consistent API conventions doc: `size`, `variant`, `tone`, `asChild`/Slot, controlled state naming
- [ ] `forwardRef`-free ref passing (React 19 `ref` as prop) checked on every component
- [ ] Server Component compatibility: mark only interactive parts `"use client"`
- [ ] Bundle-size budget per component (size-limit) in CI
- [ ] Strict TypeScript options (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)

## Phase 3 — Docs, showcase and developer experience

Goal: someone new can find, understand and copy a component in under five minutes. Exit when every component page has usage guidance, a11y notes and do/don't examples, and the showcase is deployed publicly.

### Documentation (Must have)

- [ ] Guides still to write: Installation (for consumers), Forms, Composition (Slot), Accessibility, Contributing. Done: Getting started, Adding a component, Theming and tokens (covers dark mode and direction), Documentation workflow
- [ ] Per component: when to use / when not to, anatomy, do and don't, keyboard map, related components
- [ ] Token reference with copy buttons for CSS variable and Tailwind class names
- [ ] Changelog page rendered from `CHANGELOG.md`
- [ ] Deploy the showcase (Vercel or similar) with a preview URL on every PR

### Showcase and playground (Should have)

- [ ] Shareable playground state in the URL (props encoded in the query string)
- [ ] "Open in StackBlitz / CodeSandbox" from any example
- [ ] Theme builder: edit semantic colors live, export a new `themes.ts` entry
- [ ] Side-by-side light / dark / RTL preview toggle on each example
- [ ] Search that also indexes props and guide text, not only names and tags
- [ ] Translate component docs to Persian, not only the showcase chrome

### Developer experience (Should have)

- [ ] `npm run new:component <name>` scaffold: component, meta, docs, stories, examples, index
- [ ] Generator error messages that point at the file and line of a bad meta
- [ ] Faster watch mode: regenerate only the changed component
- [ ] VS Code snippets for meta and stories
- [ ] Replace the single WIP commit habit with Conventional Commits, so changelogs can be generated

## Phase 4 — Distribution and new features

Goal: other projects can use the library, and it covers the complex components apps actually need. Exit at a tagged 1.0 release that installs cleanly in a fresh Next.js and a fresh Vite app.

### Distribution (Must have for 1.0)

Decide the model first; the rest follows from it.

| Option                             | How it works                                                  | Pros                           | Cons                               |
| ---------------------------------- | ------------------------------------------------------------- | ------------------------------ | ---------------------------------- |
| npm package                        | Build with tsup/tsdown, publish `@scope/ui` + `@scope/tokens` | Versioned updates, one install | Harder to customise; must ship CSS |
| Copy-paste registry (shadcn-style) | CLI or `shadcn` registry JSON copies source into the app      | Full ownership, easy to tweak  | Updates are manual                 |
| Both                               | Registry for components, npm for tokens and utils             | Best of each                   | Two things to maintain             |

Recommendation: start with a shadcn-compatible registry, since the generator already knows every component's files, and publish tokens as an npm package.

- [ ] Package build (ESM, types, `"use client"` banners preserved, tree-shakeable)
- [ ] Registry JSON endpoint served by the showcase (`/r/<slug>.json`)
- [ ] Tokens exported as CSS, Tailwind preset, JSON and (later) Figma Tokens / DTCG format
- [ ] Semantic versioning with Changesets; automated release workflow
- [ ] Example apps: Next.js App Router and Vite + React

### New features — components

| Component                                   | Category     | Depends on                  | Effort                                  |
| ------------------------------------------- | ------------ | --------------------------- | --------------------------------------- |
| Combobox / Autocomplete                     | Forms        | Popover                     | L                                       |
| Multi-select                                | Forms        | Combobox                    | L                                       |
| Date Picker + Calendar                      | Forms        | Popover                     | XL                                      |
| Slider / Range                              | Forms        | —                           | M                                       |
| Number Input                                | Forms        | Field                       | M                                       |
| OTP / PIN Input                             | Forms        | Field                       | M                                       |
| File Upload / Dropzone                      | Forms        | —                           | M                                       |
| Form (validation helpers, React 19 actions) | Forms        | Field                       | L                                       |
| Accordion / Collapsible                     | Layout       | —                           | M                                       |
| Sidebar / App shell                         | Navigation   | Dialog (mobile sheet)       | L                                       |
| Navigation Menu                             | Navigation   | Popover                     | L                                       |
| Stepper                                     | Navigation   | —                           | M                                       |
| Command Palette                             | Navigation   | Dialog, Combobox            | L (showcase already has one to extract) |
| Context Menu                                | Actions      | Dropdown Menu               | M                                       |
| Toggle / Toggle Group                       | Actions      | —                           | S                                       |
| Progress (bar + circular)                   | Feedback     | —                           | S                                       |
| Hover Card                                  | Feedback     | Popover                     | M                                       |
| Data Table (sort, filter, select, paginate) | Data Display | Table, Pagination, Checkbox | XL                                      |
| Kbd, Code, Copy button                      | Data Display | —                           | S                                       |
| Carousel                                    | Data Display | —                           | L                                       |
| Scroll Area                                 | Layout       | —                           | M                                       |

### New features — platform

- [ ] Density modes (compact / comfortable) as a token layer
- [ ] Multi-brand theming: more than light/dark, e.g. a brand-color theme generated from one hue
- [ ] Persian-first typography: Vazirmatn font token, Persian digits option, Jalali calendar in Date Picker
- [ ] Component-level i18n: built-in strings ("Close", "Loading") come from a provider, not only props

## Phase 5 — Good to have and future ideas

None of these block anything; pull one in when it fits nearby work or when a real project asks for it.

### Components and patterns

- Rich Text Editor wrapper (Tiptap/Lexical) styled with tokens
- Charts kit (thin wrappers over a chart library, colored by tokens)
- Tree View, Timeline, Kanban board
- Color Picker, Rating, Tag Input
- Page templates / blocks: login, settings, dashboard, pricing, 404 — built only from library components
- Motion presets: enter/exit, stagger, layout transitions using the motion tokens

### Tooling and ecosystem

- Figma kit synced from tokens (Tokens Studio or the Figma Variables API)
- MCP server or LLM-friendly `llms.txt` so AI assistants can look up components and props from the registry
- ESLint plugin with rules for library misuse (e.g. icon-only Button without `aria-label`)
- Codemods for breaking changes between major versions
- Usage analytics in the showcase (which components and examples are viewed most)
- Playground "export as story" button

### Polish

- Showcase performance budget (Lighthouse ≥ 95) and bundle analysis
- Keyboard shortcuts cheat sheet in the command palette
- Printable / PDF version of foundations
- Animated theme transition when switching light/dark

## Master backlog

36 items: 19 Must have, 8 Should have, 5 New feature, 4 Good to have. Update Status as work lands; these two tables are the source of truth.

### Phases 1–2: foundation and quality

| #   | Item                                                 | Priority    | Phase | Effort | Status      |
| --- | ---------------------------------------------------- | ----------- | ----- | ------ | ----------- |
| 1   | Fix broken `docs:*` scripts                          | Must have   | 1     | S      | Done        |
| 2   | Real README and getting-started guide                | Must have   | 1     | S      | Done        |
| 3   | LICENSE and CONTRIBUTING                             | Must have   | 1     | S      | Not started |
| 4   | CI: check, test, build                               | Must have   | 1     | S      | Not started |
| 5   | Pre-commit hook                                      | Should have | 1     | S      | Not started |
| 6   | Field showcase meta and docs                         | Should have | 1     | S      | Not started |
| 7   | Layout primitives: Stack, Grid, Container, Separator | Must have   | 1     | M      | Not started |
| 8   | Radio Group and Label                                | Must have   | 1     | M      | Not started |
| 9   | Link, Breadcrumb, Pagination                         | Must have   | 1     | M      | Not started |
| 10  | Avatar, Table, Empty State                           | Must have   | 1     | M      | Not started |
| 11  | Toast                                                | Must have   | 1     | L      | Not started |
| 12  | Popover and positioning engine                       | Must have   | 1     | L      | Not started |
| 13  | Per-component test bar                               | Must have   | 2     | L      | Not started |
| 14  | a11y violations fail CI                              | Must have   | 2     | S      | Not started |
| 15  | Visual regression (light, dark, RTL)                 | Should have | 2     | M      | Not started |
| 16  | Generator and registry unit tests                    | Must have   | 2     | M      | Not started |
| 17  | WAI-ARIA audit and screen reader pass                | Must have   | 2     | L      | Not started |
| 18  | Reduced motion and forced colors                     | Should have | 2     | M      | Not started |
| 19  | API conventions doc                                  | Should have | 2     | S      | Not started |
| 20  | Bundle-size budget                                   | Should have | 2     | S      | Not started |

### Phases 3–5: docs, distribution and beyond

| #   | Item                                                   | Priority     | Phase | Effort | Status      |
| --- | ------------------------------------------------------ | ------------ | ----- | ------ | ----------- |
| 21  | Guides: install, theming, RTL, forms                   | Must have    | 3     | L      | In progress |
| 22  | Per-component usage and a11y docs                      | Must have    | 3     | L      | Not started |
| 23  | Deploy showcase with PR previews                       | Must have    | 3     | S      | Not started |
| 24  | Shareable playground URLs                              | Should have  | 3     | M      | Not started |
| 25  | Theme builder                                          | New feature  | 3     | L      | Not started |
| 26  | Component scaffold command                             | Should have  | 3     | M      | Not started |
| 27  | Distribution: registry and tokens package              | Must have    | 4     | L      | Not started |
| 28  | Changesets and release workflow                        | Must have    | 4     | M      | Not started |
| 29  | Advanced forms: Combobox, Date Picker, Slider and more | New feature  | 4     | XL     | Not started |
| 30  | Data Table                                             | New feature  | 4     | XL     | Not started |
| 31  | Density modes and multi-brand themes                   | New feature  | 4     | M      | Not started |
| 32  | Persian-first typography and Jalali calendar           | New feature  | 4     | L      | Not started |
| 33  | Figma kit synced from tokens                           | Good to have | 5     | L      | Not started |
| 34  | `llms.txt` / MCP server over the registry              | Good to have | 5     | M      | Not started |
| 35  | Page templates and blocks                              | Good to have | 5     | L      | Not started |
| 36  | ESLint plugin and codemods                             | Good to have | 5     | L      | Not started |

## Risks, open questions and success metrics

### Risks

| Risk                                                         | Impact                                 | Mitigation                                                                                                             |
| ------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Scope creep: Phase 4 components are endless                  | 1.0 never ships                        | Freeze the 1.0 list at the Must have rows; everything else is 1.x                                                      |
| Hand-rolled a11y for complex widgets (Combobox, Date Picker) | Subtle keyboard and screen reader bugs | Consider React Aria hooks for the hardest widgets; keep native elements where possible                                 |
| Next.js 16 and React 19 APIs keep moving                     | Breakage on upgrade                    | Pin versions, read `node_modules/next/dist/docs` before upgrades, run CI on a canary branch                            |
| Generator is a single point of failure                       | One bug breaks every page              | Unit tests (item 16) and clear error messages                                                                          |
| Solo maintainer                                              | Slow progress, bus factor of 1         | Small PRs, good CONTRIBUTING, scaffold command                                                                         |
| Docs drift between the showcase and Docmost                  | Reviewers discuss stale pages          | Keep the repo as source of truth (as the Documentation workflow guide says); re-export on every release, later from CI |

### Open questions

- Distribution model: npm package, copy-paste registry, or both?
- Is the showcase itself a product (public docs site) or only an internal tool?
- Keep native `<select>` for Select, or add a custom listbox for richer options (icons, groups, search)?
- Headless dependency (React Aria, Base UI) for the complex widgets, or stay dependency-free?
- Does Persian support stop at RTL layout, or include Jalali dates and Persian digits by default?

### Success metrics

| Metric                                              | Today                 | 1.0 target               |
| --------------------------------------------------- | --------------------- | ------------------------ |
| Components with full meta, docs, stories            | 15                    | 35+                      |
| Categories with at least one component              | 6 of 7 (Layout empty) | 7 of 7                   |
| Components with a11y tests failing CI on violations | 0                     | All                      |
| CI on every PR                                      | No                    | Yes                      |
| Installable outside this repo                       | No                    | Yes, in Next.js and Vite |
| Lighthouse accessibility score on showcase          | Not measured          | 100                      |
| Guides in docs/                                     | 4                     | 9                        |
