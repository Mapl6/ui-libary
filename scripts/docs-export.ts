/**
 * Exports the library's documentation as Markdown for import into Docmost.
 *
 *   node scripts/docs-export.ts
 *
 * Output (git-ignored):
 *   docmost/export/Guides/<title>.md
 *   docmost/export/Components/<category>/<name>.md
 *   docmost/export/ui-library-docs.zip     the same tree, for Docmost's zip import
 *
 * Component pages combine the meta (name, description, status), the written docs,
 * every example's code and the props tables generated from TypeScript.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"
import { crc32 } from "node:zlib"
import ts from "typescript"

import { getGuides, stripLeadingDocComment } from "../src/lib/content.ts"
import type { PropGroup } from "../src/lib/registry/types.ts"
import { categories } from "../src/registry/categories.ts"
import { createProgram, discoverComponents, extractProps } from "./generate.ts"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "docmost/export")

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

type MetaLiterals = Partial<
  Record<"name" | "description" | "category" | "status" | "importPath", string>
>

/** Reads the string-literal fields of `export default defineShowcase({ … })` without running it. */
function readMetaLiterals(file: string): MetaLiterals {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true
  )
  const result: MetaLiterals = {}
  const fields = new Set(["name", "description", "category", "status", "importPath"])

  source.forEachChild((node) => {
    if (!ts.isExportAssignment(node) || !ts.isCallExpression(node.expression)) return
    const [config] = node.expression.arguments
    if (!config || !ts.isObjectLiteralExpression(config)) return
    for (const prop of config.properties) {
      if (
        !ts.isPropertyAssignment(prop) ||
        !ts.isIdentifier(prop.name) ||
        !fields.has(prop.name.text)
      )
        continue
      if (ts.isStringLiteralLike(prop.initializer)) {
        result[prop.name.text as keyof MetaLiterals] = prop.initializer.text
      }
    }
  })
  return result
}

/* -------------------------------------------------------------------------- */
/*  Markdown                                                                  */
/* -------------------------------------------------------------------------- */

const cell = (value: string) => value.replace(/\|/g, "\\|").replace(/\n/g, " ")

function propsTable({ component, props }: PropGroup) {
  if (props.length === 0) return ""
  const rows = props.map(
    (p) =>
      `| \`${cell(p.name)}\`${p.required ? " *" : ""} | \`${cell(p.type)}\` | ${
        p.defaultValue ? `\`${cell(p.defaultValue)}\`` : "—"
      } | ${cell(p.description ?? "")} |`
  )
  return [
    `### ${component}`,
    "",
    "| Prop | Type | Default | Description |",
    "| --- | --- | --- | --- |",
    ...rows,
  ].join("\n")
}

/** Component docs start at `##`; nothing to shift, but drop a stray top-level title. */
const withoutTitle = (markdown: string) => markdown.replace(/^#\s+.+\n+/, "").trim()

function fileName(title: string) {
  return title.replace(/[/\\?%*:|"<>]/g, "-").trim() + ".md"
}

/* -------------------------------------------------------------------------- */
/*  Zip (stored, no compression — Markdown is small)                          */
/* -------------------------------------------------------------------------- */

function zip(entries: { name: string; data: Buffer }[]) {
  const local: Buffer[] = []
  const central: Buffer[] = []
  let offset = 0

  for (const { name, data } of entries) {
    const nameBytes = Buffer.from(name, "utf8")
    const checksum = crc32(data)

    const header = Buffer.alloc(30)
    header.writeUInt32LE(0x04034b50, 0) // local file header signature
    header.writeUInt16LE(20, 4) // version needed
    header.writeUInt16LE(0x0800, 6) // UTF-8 file names
    header.writeUInt16LE(0, 8) // stored
    header.writeUInt32LE(0, 10) // time + date
    header.writeUInt32LE(checksum, 14)
    header.writeUInt32LE(data.length, 18)
    header.writeUInt32LE(data.length, 22)
    header.writeUInt16LE(nameBytes.length, 26)
    header.writeUInt16LE(0, 28)
    local.push(header, nameBytes, data)

    const entry = Buffer.alloc(46)
    entry.writeUInt32LE(0x02014b50, 0) // central directory signature
    entry.writeUInt16LE(20, 4) // version made by
    entry.writeUInt16LE(20, 6) // version needed
    entry.writeUInt16LE(0x0800, 8)
    entry.writeUInt16LE(0, 10)
    entry.writeUInt32LE(0, 12)
    entry.writeUInt32LE(checksum, 16)
    entry.writeUInt32LE(data.length, 20)
    entry.writeUInt32LE(data.length, 24)
    entry.writeUInt16LE(nameBytes.length, 28)
    entry.writeUInt32LE(offset, 42) // local header offset (other fields stay 0)
    central.push(entry, nameBytes)

    offset += header.length + nameBytes.length + data.length
  }

  const centralSize = central.reduce((n, b) => n + b.length, 0)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0) // end of central directory signature
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralSize, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...local, ...central, end])
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

const files = new Map<string, string>()

for (const guide of await getGuides()) {
  files.set(
    `Guides/${fileName(guide.title)}`,
    readFileSync(path.join(root, guide.file), "utf8").trim() + "\n"
  )
}

const components = discoverComponents()
const program = createProgram(components.flatMap((c) => c.sourceFiles))

for (const component of components) {
  const meta = readMetaLiterals(component.metaFile)
  const name = meta.name ?? component.slug
  const category = categories.find((c) => c.id === meta.category)
  const importPath = meta.importPath ?? `@/components/ui/${component.slug}`
  const props = component.sourceFiles.flatMap((f) => extractProps(program, f))

  const sections = [
    `# ${name}`,
    meta.description,
    [
      `**Status:** ${meta.status ?? "stable"}`,
      category && `**Category:** ${category.label}`,
      `**Import:** \`${importPath}\``,
    ]
      .filter(Boolean)
      .join(" · "),
    component.docsFile && withoutTitle(readFileSync(component.docsFile, "utf8")),
    component.examples.length > 0 &&
      [
        "## Examples",
        ...component.examples.map((ex) =>
          [
            `### ${ex.title}`,
            ex.description,
            "```tsx\n" +
              stripLeadingDocComment(readFileSync(ex.file, "utf8")).trim() +
              "\n```",
          ]
            .filter(Boolean)
            .join("\n\n")
        ),
      ].join("\n\n"),
    props.some((g) => g.props.length > 0) &&
      [
        "## Props",
        "Props marked * are required. Other props are forwarded to the underlying element.",
        ...props.map(propsTable),
      ]
        .filter(Boolean)
        .join("\n\n"),
  ]

  const folder = category?.label ?? "Other"
  files.set(
    `Components/${folder}/${fileName(name)}`,
    sections.filter(Boolean).join("\n\n") + "\n"
  )
}

rmSync(outDir, { recursive: true, force: true })
for (const [name, content] of files) {
  const target = path.join(outDir, name)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, content)
}

const archive = zip(
  [...files].map(([name, content]) => ({ name, data: Buffer.from(content, "utf8") }))
)
writeFileSync(path.join(outDir, "ui-library-docs.zip"), archive)

console.log(
  `[docs-export] ${files.size} pages → ${path.relative(root, outDir)}/ (and ui-library-docs.zip for Docmost's import)`
)
