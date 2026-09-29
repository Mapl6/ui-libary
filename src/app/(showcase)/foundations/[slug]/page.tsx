import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageHeader } from "@/components/showcase/component-page/page-header"
import { foundations, getFoundation } from "@/registry/foundations"

export const dynamicParams = false

export function generateStaticParams() {
  return foundations.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/foundations/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const foundation = getFoundation(slug)
  return foundation ? { title: foundation.name, description: foundation.description } : {}
}

export default async function FoundationPage({
  params,
}: PageProps<"/foundations/[slug]">) {
  const { slug } = await params
  const foundation = getFoundation(slug)
  if (!foundation) notFound()
  const { Page } = foundation

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <PageHeader
        title={foundation.name}
        description={foundation.description}
        breadcrumb={{ href: "/categories/foundations", label: "Foundations" }}
      />
      <Page />
    </div>
  )
}
