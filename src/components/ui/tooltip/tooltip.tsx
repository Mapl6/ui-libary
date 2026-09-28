"use client"

import { type ReactElement, type ReactNode, useEffect, useId, useRef, useState } from "react"

import { cn } from "@/lib/utils/cn"
import { Slot } from "@/lib/utils/slot"

export type TooltipSide = "top" | "bottom" | "start" | "end"

export type TooltipProps = {
  /** Tooltip text. Keep it short and non-essential; it isn't reachable on touch devices. */
  content: ReactNode
  /** A single focusable element (button, link, input). */
  children: ReactElement
  /**
   * Preferred side relative to the trigger.
   * @default "top"
   */
  side?: TooltipSide
  /**
   * Delay before showing on hover, in milliseconds. Focus shows it immediately.
   * @default 400
   */
  delay?: number
  /** Forces the open state (for documentation and testing). */
  open?: boolean
  /**
   * Disables the tooltip without changing the trigger.
   * @default false
   */
  disabled?: boolean
}

const sides: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2 starting:translate-y-1",
  bottom: "top-full left-1/2 mt-1.5 -translate-x-1/2 starting:-translate-y-1",
  start: "end-full top-1/2 me-1.5 -translate-y-1/2",
  end: "start-full top-1/2 ms-1.5 -translate-y-1/2",
}

/**
 * A short label shown on hover and keyboard focus. The trigger is described by the
 * tooltip via `aria-describedby`.
 */
export function Tooltip({ content, children, side = "top", delay = 400, open, disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const id = useId()
  const shown = !disabled && (open ?? visible)

  const show = (immediate: boolean) => {
    clearTimeout(timer.current)
    if (immediate) setVisible(true)
    else timer.current = setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    clearTimeout(timer.current)
    setVisible(false)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  // WCAG 1.4.13: the tooltip must be dismissible without moving the pointer or focus.
  useEffect(() => {
    if (!shown) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [shown])

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={(event) => event.pointerType === "mouse" && show(false)}
      onPointerLeave={hide}
      onFocus={(event) => event.target.matches(":focus-visible") && show(true)}
      onBlur={hide}
    >
      <Slot aria-describedby={shown ? id : undefined}>{children}</Slot>
      {shown && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            "absolute z-tooltip w-max max-w-64 rounded-md bg-foreground px-2 py-1 text-xs leading-4 font-medium text-background shadow-md",
            "transition-[opacity,translate] duration-fast starting:opacity-0",
            sides[side]
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
