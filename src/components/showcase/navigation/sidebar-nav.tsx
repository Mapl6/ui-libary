"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { useT } from "@/lib/preferences/use-preferences"
import { cn } from "@/lib/utils/cn"

import type { NavSection } from "../layout/types"

type SidebarNavProps = {
  sections: NavSection[]
  onNavigate?: () => void
}

export function SidebarNav({ sections, onNavigate }: SidebarNavProps) {
  const t = useT()
  const pathname = usePathname()

  return (
    <nav aria-label={t("nav.primary")} className="flex flex-col gap-5 text-base">
      <Link
        href="/"
        onClick={onNavigate}
        aria-current={pathname === "/" ? "page" : undefined}
        className={cn(
          "rounded-md px-2 py-1.5 font-medium text-foreground-muted hover:text-foreground",
          pathname === "/" && "bg-neutral-subtle text-foreground"
        )}
      >
        {t("nav.overview")}
      </Link>
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-0.5">
          <h2 className="px-2 pb-1 text-xs font-medium text-foreground-subtle">
            {"key" in section.label ? t(section.label.key) : section.label.text}
          </h2>
          <ul className="flex flex-col gap-px">
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-7 items-center justify-between gap-2 rounded-md px-2 text-foreground-muted transition-colors hover:bg-neutral-subtle/60 hover:text-foreground",
                      active && "bg-neutral-subtle font-medium text-foreground hover:bg-neutral-subtle"
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.status && item.status !== "stable" && (
                      <Badge size="sm" tone={item.status === "deprecated" ? "danger" : "warning"}>
                        {item.status}
                      </Badge>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
