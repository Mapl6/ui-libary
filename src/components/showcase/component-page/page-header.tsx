import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumb?: { href: string; label: string }
  badges?: ReactNode
  actions?: ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  badges,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      {breadcrumb && (
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-foreground-subtle">
            <li>
              <Link href={breadcrumb.href} className="hover:text-foreground">
                {breadcrumb.label}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 rtl:rotate-180" />
            </li>
            <li aria-current="page" className="text-foreground-muted">
              {title}
            </li>
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {badges}
          </div>
          {description && (
            <p className="max-w-3xl text-md text-foreground-muted">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  )
}
