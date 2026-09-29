"use client"

import { X } from "lucide-react"
import {
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  createContext,
  use,
  useEffect,
  useId,
  useRef,
} from "react"

import { useControllableState } from "@/lib/hooks/use-controllable-state"
import { cn } from "@/lib/utils/cn"
import { Slot } from "@/lib/utils/slot"

export type DialogSize = "sm" | "md" | "lg" | "xl"
export type DialogPlacement = "center" | "start" | "end" | "bottom"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialog(component: string) {
  const context = use(DialogContext)
  if (!context) throw new Error(`<${component}> must be used inside <Dialog>`)
  return context
}

export type DialogProps = {
  /** Controlled open state. */
  open?: boolean
  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean
  /** Called when the dialog requests to open or close (trigger, Escape, backdrop, close button). */
  onOpenChange?: (open: boolean) => void
  /** DialogTrigger and DialogContent. */
  children: ReactNode
}

/** Root of a modal dialog. Holds the open state shared by trigger and content. */
export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const contentId = useId()
  return (
    <DialogContext value={{ open: isOpen, setOpen, contentId }}>{children}</DialogContext>
  )
}

export type DialogTriggerProps = {
  /** A single interactive element, usually a Button. */
  children: ReactElement
}

/** Opens the dialog. Merges its behavior into the child element. */
export function DialogTrigger({ children }: DialogTriggerProps) {
  const { open, setOpen, contentId } = useDialog("DialogTrigger")
  return (
    <Slot
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      onClick={() => setOpen(true)}
    >
      {children}
    </Slot>
  )
}

export type DialogCloseProps = {
  /** A single interactive element, usually a Button. */
  children: ReactElement
}

/** Closes the dialog. Merges its behavior into the child element. */
export function DialogClose({ children }: DialogCloseProps) {
  const { setOpen } = useDialog("DialogClose")
  return <Slot onClick={() => setOpen(false)}>{children}</Slot>
}

export type DialogContentProps = Omit<ComponentProps<"dialog">, "open" | "title"> & {
  /** Heading, linked with `aria-labelledby`. Required for accessibility. */
  title: ReactNode
  /** Supporting text, linked with `aria-describedby`. */
  description?: ReactNode
  /**
   * Maximum width for centered dialogs; width for side sheets.
   * @default "md"
   */
  size?: DialogSize
  /**
   * `center` is a modal; `start`/`end` are side sheets (drawers); `bottom` is a bottom sheet.
   * @default "center"
   */
  placement?: DialogPlacement
  /**
   * Hides the title visually while keeping it for screen readers.
   * @default false
   */
  hideTitle?: boolean
  /**
   * Hides the top-right close button.
   * @default false
   */
  hideClose?: boolean
  /**
   * Closes when clicking the backdrop.
   * @default true
   */
  closeOnBackdrop?: boolean
  /**
   * Accessible label of the close button.
   * @default "Close"
   */
  closeLabel?: string
  /** Class name for the scrollable body wrapper (default padding: `px-5 py-4`). */
  bodyClassName?: string
  /** Dialog body. Put actions in a DialogFooter. */
  children?: ReactNode
}

const sizes: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

const sheetSizes: Record<DialogSize, string> = {
  sm: "w-72",
  md: "w-80",
  lg: "w-96",
  xl: "w-[32rem]",
}

const placements: Record<DialogPlacement, string> = {
  center:
    "m-auto max-h-[min(85dvh,48rem)] w-[calc(100%-2rem)] rounded-xl scale-96 open:scale-100 starting:open:scale-96",
  start:
    "ms-0 me-auto h-dvh max-h-dvh max-w-[88vw] rounded-e-xl -translate-x-full rtl:translate-x-full open:translate-x-0 rtl:open:translate-x-0 starting:open:-translate-x-full rtl:starting:open:translate-x-full",
  end: "ms-auto me-0 h-dvh max-h-dvh max-w-[88vw] rounded-s-xl translate-x-full rtl:-translate-x-full open:translate-x-0 rtl:open:translate-x-0 starting:open:translate-x-full rtl:starting:open:-translate-x-full",
  bottom:
    "mx-0 mt-auto mb-0 max-h-[85dvh] w-full max-w-full rounded-t-xl translate-y-full open:translate-y-0 starting:open:translate-y-full",
}

/**
 * The dialog surface. Uses the native `<dialog>` element with `showModal()`, which provides
 * the top layer, an inert background, Escape handling and focus restoration.
 */
export function DialogContent({
  title,
  description,
  size = "md",
  placement = "center",
  hideTitle = false,
  hideClose = false,
  closeOnBackdrop = true,
  closeLabel = "Close",
  className,
  bodyClassName,
  children,
  ...props
}: DialogContentProps) {
  const { open, setOpen, contentId } = useDialog("DialogContent")
  const ref = useRef<HTMLDialogElement>(null)
  const pointerDownOnBackdrop = useRef(false)
  const titleId = `${contentId}-title`
  const descriptionId = `${contentId}-description`

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Escape fires `cancel`; route it through state so controlled dialogs stay in sync.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onCancel = (event: Event) => {
      event.preventDefault()
      setOpen(false)
    }
    const onClose = () => setOpen(false)
    dialog.addEventListener("cancel", onCancel)
    dialog.addEventListener("close", onClose)
    return () => {
      dialog.removeEventListener("cancel", onCancel)
      dialog.removeEventListener("close", onClose)
    }
  }, [setOpen])

  // A click whose target is the <dialog> itself landed on the backdrop, because the inner
  // wrapper fills the dialog box. Both pointer down and up must happen there, so a text
  // selection that ends outside doesn't close the dialog.
  const onPointerDown = (event: MouseEvent<HTMLDialogElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget
  }
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (
      closeOnBackdrop &&
      pointerDownOnBackdrop.current &&
      event.target === event.currentTarget
    )
      setOpen(false)
  }

  const sheet = placement === "start" || placement === "end"

  return (
    <dialog
      ref={ref}
      id={contentId}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={cn(
        "border bg-surface-raised p-0 text-foreground shadow-overlay",
        "opacity-0 transition-[opacity,scale,translate,overlay,display] transition-discrete duration-normal ease-standard",
        "open:opacity-100 starting:open:opacity-0",
        "backdrop:bg-overlay backdrop:opacity-0 backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-normal",
        "open:backdrop:opacity-100 starting:open:backdrop:opacity-0",
        placements[placement],
        sheet ? sheetSizes[size] : placement === "center" && sizes[size],
        className
      )}
      {...props}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header
          className={cn("flex items-start gap-3 px-5 pt-5", hideTitle && "sr-only")}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 id={titleId} className="text-lg leading-6 font-semibold tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-sm text-foreground-muted">
                {description}
              </p>
            )}
          </div>
        </header>
        {!hideClose && (
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="absolute end-3 top-3 rounded-md p-1.5 text-foreground-muted transition-colors hover:bg-neutral-subtle hover:text-foreground [&_svg]:size-4"
          >
            <X />
          </button>
        )}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5 py-4",
            sheet && "h-full",
            bodyClassName
          )}
        >
          {children}
        </div>
      </div>
    </dialog>
  )
}

/** Action row at the bottom of a dialog. */
export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "-mx-5 mt-2 -mb-4 flex flex-col-reverse gap-2 border-t px-5 py-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}
