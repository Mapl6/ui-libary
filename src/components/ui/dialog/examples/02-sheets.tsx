/** The same component as a start/end side sheet (drawer) or a bottom sheet. Sides follow the writing direction. */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  type DialogPlacement,
} from "@/components/ui/dialog"

const placements: DialogPlacement[] = ["start", "end", "bottom"]

export default function DialogSheets() {
  return (
    <div className="flex flex-wrap gap-3">
      {placements.map((placement) => (
        <Dialog key={placement}>
          <DialogTrigger>
            <Button variant="outline">Open {placement} sheet</Button>
          </DialogTrigger>
          <DialogContent
            placement={placement}
            title={`${placement} sheet`}
            description="Press Escape or click outside to close."
          >
            <ul className="flex flex-col gap-1 text-sm">
              {["Overview", "Members", "Billing", "Settings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block rounded-md px-2 py-1.5 hover:bg-neutral-subtle"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
