import type { ReactNode } from "react"

export function FoundationSection({
  title,
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 max-w-3xl text-sm text-foreground-muted">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export function TokenName({ children }: { children: ReactNode }) {
  return (
    <code dir="ltr" className="font-mono text-xs text-foreground">
      {children}
    </code>
  )
}
