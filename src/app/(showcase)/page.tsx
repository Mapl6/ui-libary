import { ArrowRight, BookOpen, Boxes, FileText, Palette } from "lucide-react"
import Link from "next/link"

import { T } from "@/components/showcase/i18n/t"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getGuides } from "@/lib/content"
import { getAllComponents, getComponentCategories } from "@/lib/registry"
import { foundations } from "@/registry/foundations"

export default async function OverviewPage() {
  const categories = getComponentCategories()
  const components = getAllComponents()
  const guides = await getGuides()
  const stories = components.filter((c) => c.storyFile).length
  const examples = components.reduce((n, c) => n + c.examples.length, 0)

  const stats = [
    { label: "Components", value: components.length, icon: Boxes },
    { label: "Examples", value: examples, icon: FileText },
    { label: "Storybook files", value: stories, icon: BookOpen },
    { label: "Foundations", value: foundations.length, icon: Palette },
  ]

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <header className="flex flex-col gap-3 pt-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          <T k="app.name" />
        </h1>
        <p className="max-w-2xl text-lg text-foreground-muted">
          One component source of truth, with an interactive playground, Storybook, generated API docs and design-token
          documentation built on it.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link
            href="/guides/getting-started"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground shadow-xs hover:bg-primary-hover"
          >
            Get started <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
          <Link
            href="/guides/adding-a-component"
            className="inline-flex h-9 items-center rounded-md border px-4 font-medium shadow-xs hover:bg-surface-muted"
          >
            Add a component
          </Link>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 bg-surface p-4">
            <Icon aria-hidden className="size-5 text-foreground-subtle" />
            <div>
              <dt className="text-sm text-foreground-muted">{label}</dt>
              <dd className="text-2xl font-semibold tabular-nums">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-4" aria-labelledby="foundations-heading">
        <h2 id="foundations-heading" className="text-xl font-semibold tracking-tight">
          <T k="nav.foundations" />
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {foundations.map((f) => (
            <li key={f.slug}>
              <Card interactive className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle>
                    <Link href={`/foundations/${f.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {f.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {categories.map((category) => (
        <section key={category.id} className="flex flex-col gap-4" aria-labelledby={`cat-${category.id}`}>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h2 id={`cat-${category.id}`} className="text-xl font-semibold tracking-tight">
                {category.label}
              </h2>
              <p className="text-sm text-foreground-muted">{category.description}</p>
            </div>
            <Link href={`/categories/${category.id}`} className="shrink-0 text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.components.map((c) => (
              <li key={c.slug}>
                <Card interactive className="h-full">
                  <CardHeader
                    className="pb-4"
                    action={c.status !== "stable" ? <Badge size="sm" tone="warning">{c.status}</Badge> : undefined}
                  >
                    <CardTitle>
                      <Link href={c.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {c.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{c.description}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="flex flex-col gap-4" aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="text-xl font-semibold tracking-tight">
          <T k="nav.guides" />
        </h2>
        <ul className="divide-y rounded-lg border">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-surface-muted">
                <span>
                  <span className="font-medium">{g.title}</span>
                  {g.description && <span className="line-clamp-1 text-sm text-foreground-muted">{g.description}</span>}
                </span>
                <ArrowRight aria-hidden className="size-4 shrink-0 text-foreground-subtle rtl:rotate-180" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
