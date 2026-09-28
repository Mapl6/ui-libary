import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import type { ComponentSummary } from "@/lib/registry/types"

import { T } from "../i18n/t"

export function SiblingNav({ previous, next }: { previous?: ComponentSummary; next?: ComponentSummary }) {
  return (
    <nav aria-label="Pagination" className="mt-16 grid gap-3 border-t pt-6 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.href} className="group flex flex-col gap-0.5 rounded-lg border px-4 py-3 hover:border-border-strong">
          <span className="flex items-center gap-1 text-xs text-foreground-subtle">
            <ArrowLeft className="size-3 rtl:rotate-180" /> <T k="page.previous" />
          </span>
          <span className="font-medium">{previous.name}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group flex flex-col items-end gap-0.5 rounded-lg border px-4 py-3 text-end hover:border-border-strong">
          <span className="flex items-center gap-1 text-xs text-foreground-subtle">
            <T k="page.next" /> <ArrowRight className="size-3 rtl:rotate-180" />
          </span>
          <span className="font-medium">{next.name}</span>
        </Link>
      )}
    </nav>
  )
}
