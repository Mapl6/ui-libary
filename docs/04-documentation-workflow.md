# Documentation workflow

Documentation lives next to the code, so it's reviewed and versioned with it. Three tools read the same sources.

| Tool                 | Audience                                              | Reads                                       |
| -------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Showcase (this site) | Everyone using the library                            | meta, examples, JSDoc, `*.docs.md`, `docs/` |
| Storybook            | Component authors and tests                           | `*.stories.tsx`                             |
| Docmost              | Designers, product and reviewers who comment and edit | an export of all of the above               |

## Where to write what

- **Prop descriptions and defaults**: JSDoc on the props type. The showcase's props table and playground are generated from it.
- **When to use, usage, accessibility**: `<slug>.docs.md`, shown in the component's Docs tab.
- **Working code**: files in `examples/`. They are rendered live and their source is shown next to them.
- **Behavior tests**: `play` functions in `<slug>.stories.tsx`. `npm test` runs every story in headless Chromium, and interaction tests fail the run.
- **Cross-cutting topics**: a Markdown file in `docs/`. A numeric prefix sets the order in the sidebar. The first `#` heading is the title and the first paragraph is the description.

## Storybook

```bash
npm run storybook          # http://localhost:6006
npm test                   # all stories as tests
npm run build-storybook    # static build in storybook-static/
```

The toolbar switches theme and writing direction, using the same tokens and global CSS as the showcase. The a11y addon reports accessibility violations in the test panel.

Set `NEXT_PUBLIC_STORYBOOK_URL` to add Storybook links to the showcase header and to each component page.

## Docmost

[Docmost](https://docmost.com) is an open-source wiki. It's where non-developers read, comment on and suggest changes to the documentation.

### Run it locally

```bash
cp docmost/.env.example docmost/.env   # then set a secret and a database password
npm run docs:up                        # http://localhost:3100
npm run docs:logs                      # follow the logs
npm run docs:down                      # stop (data is kept in Docker volumes)
```

On first start, Docmost asks you to create a workspace and an admin account.

### Import the docs

```bash
npm run docs:export
```

This writes one Markdown page per guide and per component to `docmost/export/`, and zips them as `docmost/export/ui-library-docs.zip`. Component pages include the description, status, written docs, example code and the generated props tables.

In Docmost, create a space, open its settings, choose **Import**, and select the zip file. Folders become parent pages.

### Link pages back

- Set `NEXT_PUBLIC_DOCMOST_URL` to show a Docmost link in the showcase header and on guides.
- Set `docmostPath` in a component's meta to the path of its Docmost page, for example `"/s/ui/p/button-abc123"`. The component page then links straight to it.

### Keeping them in sync

The repository is the source of truth; Docmost is for discussion. When a change is agreed in Docmost, make it in the repository, then re-export and re-import. Don't edit generated content, such as props tables, in Docmost; it's overwritten on the next import.
