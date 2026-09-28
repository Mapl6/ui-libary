import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageHeader } from "@/components/showcase/component-page/page-header"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getComponentsByCategory } from "@/lib/registry"
import { categories, getCategory } from "@/registry/categories"
import { foundations } from "@/registry/foundations"

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: PageProps<"/categories/[category]">): Promise<Metadata> {
  const { category } = await params
  return { title: getCategory(category)?.label }
}

export default async function CategoryPage({ params }: PageProps<"/categories/[category]">) {
  const { category: id } = await params
  const category = getCategory(id)
  if (!category) notFound()

  const items =
    id === "foundations"
      ? foundations.map((f) => ({ href: `/foundations/${f.slug}`, name: f.name, description: f.description }))
      : getComponentsByCategory(id)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <PageHeader title={category.label} description={category.description} breadcrumb={{ href: "/", label: "Overview" }} />
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-foreground-muted">
          No components in this category yet.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Card interactive className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle>
                    <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {item.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
