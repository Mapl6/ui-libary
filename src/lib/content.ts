import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

/**
 * Server-only helpers that read repository files at build time: component source,
 * example code, component docs and guides. Paths come from the generated registry
 * or the docs folder, never from user input.
 */

const root = process.cwd()
const allowedRoots = [path.join(root, "src/components/ui"), path.join(root, "docs")]

export async function readRepoFile(relativePath: string) {
  // Allowed roots are listed in next.config.ts `outputFileTracingIncludes`; don't trace the whole repo.
  const absolute = path.resolve(/* turbopackIgnore: true */ root, relativePath)
  if (!allowedRoots.some((allowed) => absolute.startsWith(allowed + path.sep))) {
    throw new Error(`Refusing to read ${relativePath}: outside of allowed content roots`)
  }
  return readFile(absolute, "utf8")
}

/** Example source without the leading doc comment (shown separately as description). */
export function stripLeadingDocComment(source: string) {
  return source.replace(
    /^(["']use client["'];?\s*\n)?\s*\/\*\*[\s\S]*?\*\/\s*\n/,
    (_, directive: string | undefined) => directive ?? ""
  )
}

export type Guide = {
  slug: string
  title: string
  description?: string
  file: string
  order: number
}

/** Guides are markdown files in /docs, ordered by an optional numeric prefix. */
export async function getGuides(): Promise<Guide[]> {
  const dir = path.join(root, "docs")
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort()
  return Promise.all(
    files.map(async (file, index) => {
      const content = await readFile(path.join(dir, file), "utf8")
      const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? file
      const description = content
        .replace(/^#.*$/m, "")
        .trim()
        .split(/\n\s*\n/)[0]
        ?.replace(/\s+/g, " ")
      return {
        slug: file.replace(/^\d+[-_]/, "").replace(/\.md$/, ""),
        title,
        description,
        file: `docs/${file}`,
        order: index,
      }
    })
  )
}

export async function getGuide(slug: string) {
  const guides = await getGuides()
  return guides.find((g) => g.slug === slug)
}
