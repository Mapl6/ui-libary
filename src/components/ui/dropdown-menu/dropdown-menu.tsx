"use client"

import {
  type ComponentProps,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  createContext,
  use,
  useEffect,
  useId,
  useRef,
} from "react"

import { useControllableState } from "@/lib/hooks/use-controllable-state"
import { cn } from "@/lib/utils/cn"
import { Slot } from "@/lib/utils/slot"

type FocusIntent = "first" | "last"

type MenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
  rootRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLElement | null>
  focusIntent: RefObject<FocusIntent>
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenu(component: string) {
  const context = use(MenuContext)
  if (!context) throw new Error(`<${component}> must be used inside <DropdownMenu>`)
  return context
}

const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])'

export type DropdownMenuProps = {
  /** Controlled open state. */
  open?: boolean
  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** DropdownMenuTrigger and DropdownMenuContent. */
  children: ReactNode
  /** Class name for the positioning wrapper. */
  className?: string
}

/** A menu of actions opened from a button, following the WAI-ARIA menu button pattern. */
export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children, className }: DropdownMenuProps) {
  const [isOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const focusIntent = useRef<FocusIntent>("first")

  // Close on outside pointer down.
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [isOpen, setOpen])

  return (
    <MenuContext
      value={{
        open: isOpen,
        setOpen,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
        rootRef,
        triggerRef,
        focusIntent,
      }}
    >
      <div ref={rootRef} className={cn("relative inline-flex", className)}>
        {children}
      </div>
    </MenuContext>
  )
}

export type DropdownMenuTriggerProps = {
  /** A single button element. */
  children: ReactElement
}

/** Opens the menu on click, Enter, Space, ArrowDown (first item) or ArrowUp (last item). */
export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerId, contentId, triggerRef, focusIntent } = useMenu("DropdownMenuTrigger")

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      focusIntent.current = event.key === "ArrowDown" ? "first" : "last"
      setOpen(true)
    }
  }

  return (
    <Slot
      ref={triggerRef}
      id={triggerId}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      onClick={() => {
        focusIntent.current = "first"
        setOpen(!open)
      }}
      onKeyDown={onKeyDown}
    >
      {children}
    </Slot>
  )
}

export type DropdownMenuContentProps = ComponentProps<"div"> & {
  /**
   * Horizontal alignment relative to the trigger (logical, flips in RTL).
   * @default "start"
   */
  align?: "start" | "end"
  /**
   * Opens below or above the trigger.
   * @default "bottom"
   */
  side?: "bottom" | "top"
}

/** The menu surface. Renders only while open. */
export function DropdownMenuContent({ align = "start", side = "bottom", className, children, ...props }: DropdownMenuContentProps) {
  const { open, setOpen, triggerId, contentId, triggerRef, focusIntent } = useMenu("DropdownMenuContent")
  const ref = useRef<HTMLDivElement>(null)
  const typeahead = useRef({ query: "", timer: undefined as ReturnType<typeof setTimeout> | undefined })

  useEffect(() => {
    if (!open) return
    const items = ref.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR)
    const target = focusIntent.current === "last" ? items?.[items.length - 1] : items?.[0]
    target?.focus()
  }, [open, focusIntent])

  if (!open) return null

  const close = (restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
    const index = items.indexOf(document.activeElement as HTMLElement)
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus()

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        focusAt(index + 1)
        break
      case "ArrowUp":
        event.preventDefault()
        focusAt(index - 1)
        break
      case "Home":
        event.preventDefault()
        focusAt(0)
        break
      case "End":
        event.preventDefault()
        focusAt(items.length - 1)
        break
      case "Escape":
        event.preventDefault()
        close(true)
        break
      case "Tab":
        close(false)
        break
      default:
        // Typeahead: focus the next item starting with the typed characters.
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
          const state = typeahead.current
          clearTimeout(state.timer)
          state.query += event.key.toLowerCase()
          state.timer = setTimeout(() => (state.query = ""), 500)
          const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)]
          ordered.find((item) => item.textContent?.trim().toLowerCase().startsWith(state.query))?.focus()
        }
    }
  }

  return (
    <div
      ref={ref}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      aria-orientation="vertical"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={cn(
        "absolute z-dropdown flex min-w-44 flex-col rounded-lg border bg-surface-raised p-1 text-foreground shadow-lg",
        "transition-[opacity,translate] duration-fast starting:opacity-0",
        side === "bottom" ? "top-full mt-1 starting:-translate-y-1" : "bottom-full mb-1 starting:translate-y-1",
        align === "start" ? "start-0" : "end-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type DropdownMenuItemProps = Omit<ComponentProps<"div">, "onSelect"> & {
  /** Called when the item is chosen by click, Enter or Space. The menu then closes. */
  onSelect?: () => void
  /**
   * Prevents selecting the item. It stays visible but is skipped by keyboard navigation.
   * @default false
   */
  disabled?: boolean
  /**
   * Visual tone; use `danger` for destructive actions.
   * @default "default"
   */
  tone?: "default" | "danger"
  /** Leading icon. */
  icon?: ReactNode
  /** Keyboard shortcut hint shown at the end. Display only. */
  shortcut?: string
}

/** An action in the menu. */
export function DropdownMenuItem({
  onSelect,
  disabled = false,
  tone = "default",
  icon,
  shortcut,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen, triggerRef } = useMenu("DropdownMenuItem")

  const select = () => {
    if (disabled) return
    onSelect?.()
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      onClick={select}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          select()
        }
      }}
      onPointerMove={(event) => !disabled && event.currentTarget.focus()}
      className={cn(
        "flex h-8 cursor-default items-center gap-2 rounded-md px-2 text-base outline-none select-none",
        "focus:bg-neutral-subtle aria-disabled:opacity-40 [&_svg]:size-4 [&_svg]:text-foreground-subtle",
        tone === "danger" && "text-danger focus:bg-danger-subtle [&_svg]:text-danger",
        className
      )}
      {...props}
    >
      {icon}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <kbd className="ms-4 font-sans text-xs text-foreground-subtle">{shortcut}</kbd>}
    </div>
  )
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-2 pt-1.5 pb-1 text-xs font-medium text-foreground-subtle", className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<"div">) {
  return <div role="separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}
