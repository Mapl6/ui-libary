"use client"

import {
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
  createContext,
  use,
  useId,
} from "react"

import { useControllableState } from "@/lib/hooks/use-controllable-state"
import { cn } from "@/lib/utils/cn"
import { isRtl } from "@/lib/utils/dom"

export type TabsVariant = "underline" | "pills"
export type TabsOrientation = "horizontal" | "vertical"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  baseId: string
  variant: TabsVariant
  orientation: TabsOrientation
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs(component: string) {
  const context = use(TabsContext)
  if (!context) throw new Error(`<${component}> must be used inside <Tabs>`)
  return context
}

const safeId = (value: string) => value.replace(/[^\w-]/g, "_")

export type TabsProps = Omit<ComponentProps<"div">, "defaultValue" | "onChange"> & {
  /** Controlled selected tab value. */
  value?: string
  /** Initially selected tab when uncontrolled. */
  defaultValue?: string
  /** Called when the selected tab changes. */
  onValueChange?: (value: string) => void
  /**
   * Visual style of the tab list.
   * @default "underline"
   */
  variant?: TabsVariant
  /**
   * Layout and arrow-key axis.
   * @default "horizontal"
   */
  orientation?: TabsOrientation
  /** TabsList and TabsPanel elements. */
  children?: ReactNode
}

/** Organizes content into panels shown one at a time. */
export function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  variant = "underline",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const [selected, setSelected] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const baseId = useId()

  return (
    <TabsContext
      value={{ value: selected, setValue: setSelected, baseId, variant, orientation }}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-col gap-3" : "flex-row gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext>
  )
}

export type TabsListProps = ComponentProps<"div"> & {
  /** Accessible name for the tab list when there's no visible heading. */
  "aria-label"?: string
}

/** The row (or column) of tabs. Handles arrow-key, Home and End navigation. */
export function TabsList({ className, onKeyDown, ...props }: TabsListProps) {
  const { variant, orientation } = useTabs("TabsList")

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)'
      )
    )
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (index === -1) return

    const rtl = isRtl(event.currentTarget)
    const horizontal = orientation === "horizontal"
    const next = horizontal ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown"
    const prev = horizontal ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp"

    let target: HTMLButtonElement | undefined
    if (event.key === next) target = tabs[(index + 1) % tabs.length]
    else if (event.key === prev) target = tabs[(index - 1 + tabs.length) % tabs.length]
    else if (event.key === "Home") target = tabs[0]
    else if (event.key === "End") target = tabs.at(-1)
    if (!target) return

    event.preventDefault()
    target.focus()
    target.click() // automatic activation
  }

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex shrink-0",
        orientation === "horizontal"
          ? "scrollbar-thin items-center overflow-x-auto"
          : "flex-col items-stretch",
        variant === "underline" && orientation === "horizontal" && "gap-4 border-b",
        variant === "underline" && orientation === "vertical" && "gap-0.5 border-e pe-2",
        variant === "pills" && "gap-1 self-start rounded-lg bg-neutral-subtle p-1",
        className
      )}
      {...props}
    />
  )
}

export type TabsTriggerProps = Omit<ComponentProps<"button">, "value"> & {
  /** Value that identifies the tab and its panel. */
  value: string
  /**
   * Prevents selecting the tab. It's skipped by arrow-key navigation.
   * @default false
   */
  disabled?: boolean
}

/** A single tab. */
export function TabsTrigger({
  value,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const {
    value: selectedValue,
    setValue,
    baseId,
    variant,
    orientation,
  } = useTabs("TabsTrigger")
  const selected = selectedValue === value
  const id = safeId(value)

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-controls={`${baseId}-panel-${id}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? "active" : "inactive"}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setValue(value)
      }}
      className={cn(
        "relative inline-flex shrink-0 items-center gap-1.5 text-base font-medium whitespace-nowrap text-foreground-muted transition-colors",
        "hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        variant === "underline" &&
          orientation === "horizontal" &&
          "-mb-px h-9 border-b-2 border-transparent px-0.5 data-[state=active]:border-foreground data-[state=active]:text-foreground",
        variant === "underline" &&
          orientation === "vertical" &&
          "h-8 rounded-md px-2.5 data-[state=active]:bg-neutral-subtle data-[state=active]:text-foreground",
        variant === "pills" &&
          "h-7 rounded-md px-3 text-sm data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export type TabsPanelProps = ComponentProps<"div"> & {
  /** Value of the tab that shows this panel. */
  value: string
  /**
   * Keeps the panel mounted (but hidden) when inactive, preserving its state.
   * @default false
   */
  keepMounted?: boolean
}

/** Content for one tab. */
export function TabsPanel({
  value,
  keepMounted = false,
  className,
  children,
  ...props
}: TabsPanelProps) {
  const { value: selectedValue, baseId } = useTabs("TabsPanel")
  const selected = selectedValue === value
  const id = safeId(value)
  if (!selected && !keepMounted) return null

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      hidden={!selected}
      tabIndex={0}
      className={cn("min-w-0 flex-1 focus-visible:outline-offset-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}
