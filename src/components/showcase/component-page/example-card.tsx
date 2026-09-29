import type { ComponentType } from "react"

import { CodeBlock } from "../code/code-block"
import { ExampleCodeToggle } from "./example-code-toggle"

type ExampleCardProps = {
  id: string
  title: string
  description?: string
  code: string
  Component: ComponentType
}

/** A live example rendered inline, with its real source file one click away. */
export function ExampleCard({
  id,
  title,
  description,
  code,
  Component,
}: ExampleCardProps) {
  return (
    <section
      aria-labelledby={`example-${id}-title`}
      className="scroll-mt-28"
      id={`example-${id}`}
    >
      <h3 id={`example-${id}-title`} className="text-md font-semibold tracking-tight">
        <a href={`#example-${id}`} className="hover:underline">
          {title}
        </a>
      </h3>
      {description && (
        <p className="mt-1 max-w-3xl text-sm text-foreground-muted">{description}</p>
      )}
      <div className="mt-3 overflow-hidden rounded-lg border">
        <div className="flex min-h-40 items-center justify-center overflow-x-auto canvas-grid p-6 sm:p-8">
          <Component />
        </div>
        <ExampleCodeToggle>
          <CodeBlock code={code} className="rounded-none border-0 border-t" />
        </ExampleCodeToggle>
      </div>
    </section>
  )
}
