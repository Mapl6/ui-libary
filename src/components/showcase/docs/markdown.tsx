import { Marked, type Tokens } from "marked"
import { highlight } from "sugar-high"

import { cn } from "@/lib/utils/cn"

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }: Tokens.Code) {
      const language = (lang ?? "").split(/\s/)[0] ?? ""
      const body = ["tsx", "ts", "jsx", "js", "json", "css"].includes(language)
        ? highlight(text)
        : escape(text)
      return `<pre dir="ltr" class="md-pre"><code class="code-highlight">${body}</code></pre>`
    },
    table(token: Tokens.Table) {
      const head = token.header
        .map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`)
        .join("")
      const rows = token.rows
        .map(
          (row) =>
            `<tr>${row.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`
        )
        .join("")
      return `<div class="md-table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`
    },
  },
})

type MarkdownProps = {
  /** Trusted markdown from the repository (component docs and guides). */
  source: string
  className?: string
}

/** Renders repository markdown on the server. */
export function Markdown({ source, className }: MarkdownProps) {
  const html = marked.parse(source, { async: false })
  return (
    <div
      className={cn("prose-doc", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
