import { Fragment, type ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import type { PropGroup } from "@/lib/registry/types"

/** Renders `inline code` in JSDoc descriptions. */
function formatDescription(text: string): ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded-xs bg-neutral-subtle px-1 py-px font-mono text-[0.8em]"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

type PropsTableProps = {
  groups: PropGroup[]
  /** Link to the native element whose attributes are also accepted. */
  footnote?: ReactNode
}

/** API reference generated from the component's TypeScript props and JSDoc. */
export function PropsTable({ groups, footnote }: PropsTableProps) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.component} aria-labelledby={`props-${group.component}`}>
          {groups.length > 1 && (
            <h3
              id={`props-${group.component}`}
              className="mb-2 font-mono text-sm font-semibold"
            >
              {`<${group.component}>`}
            </h3>
          )}
          {group.props.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              No own props. Accepts the attributes of its underlying element.
            </p>
          ) : (
            <div className="scrollbar-thin overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[40rem] border-collapse text-start text-sm">
                <thead className="bg-surface-muted text-xs text-foreground-muted">
                  <tr>
                    <th scope="col" className="w-40 px-3 py-2 text-start font-medium">
                      Prop
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      Type
                    </th>
                    <th scope="col" className="w-28 px-3 py-2 text-start font-medium">
                      Default
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.props.map((prop) => (
                    <tr key={prop.name} className="border-t align-top">
                      <th scope="row" className="px-3 py-2.5 text-start font-normal">
                        <span
                          dir="ltr"
                          className="inline-flex items-center gap-1.5 font-mono text-[0.8125rem] font-medium text-foreground"
                        >
                          {prop.name}
                          {prop.required && (
                            <Badge size="sm" tone="danger" appearance="outline">
                              required
                            </Badge>
                          )}
                        </span>
                      </th>
                      <td className="px-3 py-2.5">
                        <code
                          dir="ltr"
                          className="font-mono text-[0.8125rem] break-words text-primary-subtle-foreground"
                        >
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-3 py-2.5">
                        {prop.defaultValue ? (
                          <code
                            dir="ltr"
                            className="font-mono text-[0.8125rem] text-foreground-muted"
                          >
                            {prop.defaultValue}
                          </code>
                        ) : (
                          <span className="text-foreground-subtle">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-foreground-muted">
                        {prop.description ? formatDescription(prop.description) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      {footnote && <p className="text-sm text-foreground-muted">{footnote}</p>}
    </div>
  )
}
