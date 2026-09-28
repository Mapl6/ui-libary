import type { SearchItem } from "../layout/types"

/**
 * Small ranked search over names, categories, tags and descriptions.
 * Good enough for hundreds of entries; swap in a fuzzy library if the catalog grows large.
 */
export function searchItems(items: SearchItem[], query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items
  const terms = q.split(/\s+/)

  const scored = items.flatMap((item) => {
    const title = item.title.toLowerCase()
    const category = item.category?.toLowerCase() ?? ""
    const keywords = item.keywords.map((k) => k.toLowerCase())
    const description = item.description?.toLowerCase() ?? ""

    let score = 0
    for (const term of terms) {
      if (title === term) score += 100
      else if (title.startsWith(term)) score += 60
      else if (title.includes(term)) score += 40
      else if (keywords.some((k) => k.startsWith(term))) score += 25
      else if (category.includes(term)) score += 15
      else if (keywords.some((k) => k.includes(term))) score += 10
      else if (description.includes(term)) score += 5
      else return [] // every term must match somewhere
    }
    return [{ item, score }]
  })

  return scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).map((s) => s.item)
}
