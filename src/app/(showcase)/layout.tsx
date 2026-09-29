import { AppShell } from "@/components/showcase/layout/app-shell"
import type { NavSection, SearchItem } from "@/components/showcase/layout/types"
import { getGuides } from "@/lib/content"
import { getComponentCategories } from "@/lib/registry"
import { foundations } from "@/registry/foundations"

export default async function ShowcaseLayout({ children }: LayoutProps<"/">) {
  const categories = getComponentCategories()
  const guides = await getGuides()

  const sections: NavSection[] = [
    {
      id: "foundations",
      label: { key: "nav.foundations" },
      items: foundations.map((f) => ({ href: `/foundations/${f.slug}`, label: f.name })),
    },
    ...categories.map((category) => ({
      id: category.id,
      label: { text: category.label },
      items: category.components.map((c) => ({
        href: c.href,
        label: c.name,
        status: c.status,
      })),
    })),
    {
      id: "guides",
      label: { key: "nav.guides" },
      items: guides.map((g) => ({ href: `/guides/${g.slug}`, label: g.title })),
    },
  ]

  const searchIndex: SearchItem[] = [
    ...categories.flatMap((category) =>
      category.components.map((c) => ({
        href: c.href,
        title: c.name,
        description: c.description,
        group: "components" as const,
        category: category.label,
        keywords: [...c.tags, c.slug],
      }))
    ),
    ...foundations.map((f) => ({
      href: `/foundations/${f.slug}`,
      title: f.name,
      description: f.description,
      group: "foundations" as const,
      category: "Foundations",
      keywords: f.keywords,
    })),
    ...guides.map((g) => ({
      href: `/guides/${g.slug}`,
      title: g.title,
      description: g.description,
      group: "guides" as const,
      keywords: [g.slug],
    })),
  ]

  return (
    <AppShell
      sections={sections}
      searchIndex={searchIndex}
      links={{
        storybookUrl: process.env.NEXT_PUBLIC_STORYBOOK_URL || undefined,
        docmostUrl: process.env.NEXT_PUBLIC_DOCMOST_URL || undefined,
      }}
    >
      {children}
    </AppShell>
  )
}
