import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Markdown } from "@/components/showcase/docs/markdown"
import { getGuide, getGuides, readRepoFile } from "@/lib/content"

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  return guide ? { title: guide.title, description: guide.description } : {}
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) notFound()
  const source = await readRepoFile(guide.file)
  const docmostUrl = process.env.NEXT_PUBLIC_DOCMOST_URL

  return (
    <article className="mx-auto max-w-3xl">
      <Markdown source={source} />
      <footer className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-sm text-foreground-subtle">
        <span>
          Source: <code className="font-mono">{guide.file}</code>
        </span>
        {docmostUrl && (
          <a href={docmostUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Discuss in Docmost →
          </a>
        )}
      </footer>
    </article>
  )
}
