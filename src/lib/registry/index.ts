import { categories, type Category } from "@/registry/categories"
import { generatedComponents } from "@/registry/generated/components"

import type { ComponentSummary, GeneratedComponent } from "./types"

/**
 * Server-side registry API. Everything here reads the generated registry, so pages,
 * navigation and search stay in sync with the files in src/components/ui.
 */

const bySlug = new Map(generatedComponents.map((c) => [c.slug, c]))

export function getAllComponents(): GeneratedComponent[] {
  return generatedComponents
}

export function getComponent(slug: string): GeneratedComponent | undefined {
  return bySlug.get(slug)
}

export function toSummary(entry: GeneratedComponent): ComponentSummary {
  const { meta } = entry
  return {
    slug: entry.slug,
    name: meta.name,
    description: meta.description,
    category: meta.category,
    status: meta.status ?? "stable",
    tags: meta.tags ?? [],
    href: `/components/${entry.slug}`,
  }
}

export function getComponentsByCategory(categoryId: string): ComponentSummary[] {
  return generatedComponents
    .filter((c) => c.meta.category === categoryId)
    .map(toSummary)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export type CategoryWithComponents = Category & { components: ComponentSummary[] }

/** Categories that contain at least one component, in configured order. */
export function getComponentCategories(): CategoryWithComponents[] {
  return categories
    .filter((c) => c.id !== "foundations")
    .map((c) => ({ ...c, components: getComponentsByCategory(c.id) }))
    .filter((c) => c.components.length > 0)
}

/** Previous/next component in sidebar order, for page footers. */
export function getSiblings(slug: string) {
  const ordered = getComponentCategories().flatMap((c) => c.components)
  const index = ordered.findIndex((c) => c.slug === slug)
  return { previous: ordered[index - 1], next: ordered[index + 1] }
}
