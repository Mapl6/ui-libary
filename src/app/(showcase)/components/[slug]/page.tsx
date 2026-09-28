import { BookOpen, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CodeBlock } from "@/components/showcase/code/code-block"
import { ExampleCard } from "@/components/showcase/component-page/example-card"
import { PageHeader } from "@/components/showcase/component-page/page-header"
import { SiblingNav } from "@/components/showcase/component-page/sibling-nav"
import { Workbench } from "@/components/showcase/component-page/workbench"
import { Markdown } from "@/components/showcase/docs/markdown"
import { T } from "@/components/showcase/i18n/t"
import { PropsTable } from "@/components/showcase/props/props-table"
import { Badge } from "@/components/ui/badge"
import { readRepoFile, stripLeadingDocComment } from "@/lib/content"
import { getAllComponents, getComponent, getSiblings } from "@/lib/registry"
import { toStoryId } from "@/lib/utils/strings"
import { getCategory } from "@/registry/categories"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllComponents().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const entry = getComponent(slug)
  return entry ? { title: entry.meta.name, description: entry.meta.description } : {}
}

const statusTone = { stable: "success", beta: "info", experimental: "warning", deprecated: "danger" } as const

const linkClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-sm text-foreground-muted shadow-xs transition-colors hover:bg-surface-muted hover:text-foreground [&_svg]:size-3.5"

export default async function ComponentPage({ params }: PageProps<"/components/[slug]">) {
  const { slug } = await params
  const entry = getComponent(slug)
  if (!entry) notFound()

  const { meta } = entry
  const category = getCategory(meta.category)
  const status = meta.status ?? "stable"
  const importPath = meta.importPath ?? `@/components/ui/${slug}`

  const [examples, sources, docs] = await Promise.all([
    Promise.all(entry.examples.map(async (ex) => ({ ...ex, code: stripLeadingDocComment(await readRepoFile(ex.file)) }))),
    Promise.all(entry.sourceFiles.map(async (file) => ({ file, code: await readRepoFile(file) }))),
    entry.docsFile ? readRepoFile(entry.docsFile) : Promise.resolve(null),
  ])

  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL
  const docmostUrl = process.env.NEXT_PUBLIC_DOCMOST_URL
  const storyLink =
    storybookUrl && entry.storyFile && category
      ? `${storybookUrl}/?path=/docs/${toStoryId(`${category.label}/${meta.name}`)}--docs`
      : null
  const docmostLink = docmostUrl ? `${docmostUrl.replace(/\/$/, "")}${meta.docmostPath ?? ""}` : null
  const { previous, next } = getSiblings(slug)

  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader
        title={meta.name}
        description={meta.description}
        breadcrumb={category ? { href: `/categories/${category.id}`, label: category.label } : undefined}
        badges={<Badge tone={statusTone[status]} dot>{status}</Badge>}
        actions={
          <>
            {storyLink && (
              <a href={storyLink} target="_blank" rel="noreferrer" className={linkClass}>
                <BookOpen /> <T k="links.storybook" />
              </a>
            )}
            {docmostLink && (
              <a href={docmostLink} target="_blank" rel="noreferrer" className={linkClass}>
                <ExternalLink /> <T k="links.docmost" />
              </a>
            )}
          </>
        }
      />

      <Workbench
        slug={slug}
        name={meta.name}
        exportName={entry.exportName}
        importPath={importPath}
        propGroups={entry.props}
        slots={{
          examples:
            examples.length > 0 ? (
              <div className="flex flex-col gap-10">
                <h2 className="text-xl font-semibold tracking-tight">
                  <T k="playground.examples" />
                </h2>
                {examples.map((ex) => (
                  <ExampleCard key={ex.id} id={ex.id} title={ex.title} description={ex.description} code={ex.code} Component={ex.Component} />
                ))}
              </div>
            ) : null,
          examplesCode: examples.map((ex) => (
            <section key={ex.id} className="flex flex-col gap-2">
              <h3 className="text-md font-semibold">{ex.title}</h3>
              <CodeBlock code={ex.code} title={ex.file} />
            </section>
          )),
          props: (
            <PropsTable
              groups={entry.props}
              footnote="Generated from the TypeScript props and JSDoc. Props not listed are forwarded to the underlying HTML element."
            />
          ),
          source: (
            <div className="flex flex-col gap-4">
              {sources.map((source) => (
                <CodeBlock key={source.file} code={source.code} title={source.file} collapseAfter={40} />
              ))}
            </div>
          ),
          docs: docs ? (
            <Markdown source={docs} />
          ) : (
            <p className="text-foreground-muted">
              No documentation yet. Add <code className="font-mono text-sm">{slug}.docs.md</code> next to the component.
            </p>
          ),
        }}
      />

      <SiblingNav previous={previous} next={next} />
    </article>
  )
}
