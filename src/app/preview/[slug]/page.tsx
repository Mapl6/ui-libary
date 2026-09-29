import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { FrameRuntime } from "@/components/showcase/preview/frame-runtime"
import { getAllComponents, getComponent } from "@/lib/registry"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllComponents().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/preview/[slug]">): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${getComponent(slug)?.meta.name ?? slug} preview`,
    robots: { index: false },
  }
}

/** Bare, isolated page rendered inside the playground iframe. */
export default async function PreviewPage({ params }: PageProps<"/preview/[slug]">) {
  const { slug } = await params
  const entry = getComponent(slug)
  if (!entry) notFound()

  return (
    <main className="min-h-dvh canvas-grid">
      <Suspense>
        <FrameRuntime slug={slug} props={entry.props[0]?.props ?? []} />
      </Suspense>
    </main>
  )
}
