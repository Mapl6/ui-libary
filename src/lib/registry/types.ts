import type { ComponentType, ReactNode } from "react"

import type { CategoryId } from "@/registry/categories"

export type ComponentStatus = "stable" | "beta" | "experimental" | "deprecated"

/* -------------------------------------------------------------------------- */
/*  Prop documentation — produced by scripts/generate.ts from TypeScript      */
/* -------------------------------------------------------------------------- */

export type PropKind =
  | "boolean"
  | "string"
  | "number"
  | "enum"
  | "node"
  | "function"
  | "array"
  | "object"
  | "unknown"

export type PropDoc = {
  name: string
  /** Human-readable type, e.g. `"sm" | "md" | "lg"` or `ReactNode`. */
  type: string
  kind: PropKind
  required: boolean
  /** Raw `@default` JSDoc value, e.g. `"md"` or `false`. */
  defaultValue?: string
  description?: string
  /** Literal members for `enum` kinds. */
  options?: string[]
}

export type PropGroup = {
  /** Component the props belong to, e.g. `Tabs` or `TabsTrigger`. */
  component: string
  props: PropDoc[]
}

/* -------------------------------------------------------------------------- */
/*  Showcase metadata — authored per component in `<slug>.meta.tsx`           */
/* -------------------------------------------------------------------------- */

export type ControlType =
  "boolean" | "text" | "textarea" | "number" | "select" | "radio" | "color" | "json"

export type ControlOverride = {
  control?: ControlType
  options?: readonly string[]
  label?: string
  min?: number
  max?: number
  step?: number
}

export type Args = Record<string, unknown>

export type ShowcaseMeta<P extends object = Args> = {
  name: string
  description: string
  category: CategoryId
  status?: ComponentStatus
  tags?: string[]
  /** The component rendered by the playground (unless `render` is given). */
  component: ComponentType<P>
  /**
   * Initial playground args, merged over the `@default` values of the props.
   * Extra keys are allowed for "virtual" controls consumed by a custom `render`.
   */
  args?: Partial<P> & Args
  /**
   * Which props become controls. By default every prop of the primary props type
   * with a controllable type is included. Use `false` to hide one, or an object to
   * change its control.
   */
  controls?: { [K in keyof P]?: ControlOverride | false } & Record<
    string,
    ControlOverride | false | undefined
  >
  /** Custom playground render, for compound components or controlled state. */
  render?: (args: P & Args, update: (patch: Partial<P> & Args) => void) => ReactNode
  /** Custom code snippet for the playground when the default JSX output isn't right. */
  code?: (args: P & Args) => string
  /** Import path shown in generated code. Defaults to `@/components/ui/<slug>`. */
  importPath?: string
  /** Path of this component's page inside the Docmost space (optional). */
  docmostPath?: string
}

/** Identity helper that gives `ShowcaseMeta` full type inference from the component. */
export function defineShowcase<P extends object>(meta: ShowcaseMeta<P>): ShowcaseMeta<P> {
  return meta
}

/** A meta with its props type erased, so heterogeneous metas can live in one list. */
export type AnyShowcaseMeta = ShowcaseMeta<Args>

/**
 * Erases the props type of a meta. The playground only ever passes args built from
 * that component's own prop docs, so the widening is safe at runtime.
 */
export function eraseMeta<P extends object>(meta: ShowcaseMeta<P>): AnyShowcaseMeta {
  return meta as unknown as AnyShowcaseMeta
}

/* -------------------------------------------------------------------------- */
/*  Generated entries                                                         */
/* -------------------------------------------------------------------------- */

export type GeneratedExample = {
  id: string
  title: string
  description?: string
  /** Repo-relative path of the example file. */
  file: string
  Component: ComponentType
}

export type GeneratedComponent = {
  slug: string
  meta: AnyShowcaseMeta
  /** Name of the primary component export, e.g. `Button`. */
  exportName: string
  props: PropGroup[]
  sourceFiles: string[]
  docsFile?: string
  storyFile?: string
  examples: GeneratedExample[]
}

/** Serializable subset of a component entry, safe to pass to client components. */
export type ComponentSummary = {
  slug: string
  name: string
  description: string
  category: CategoryId
  status: ComponentStatus
  tags: string[]
  href: string
}
