/** Four sides. start and end follow the writing direction. Icon buttons get their name from aria-label and their hint from the tooltip. */
import { Bold, Italic, Link2, Underline } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"

export default function TooltipSides() {
  return (
    <div className="flex items-center gap-2 py-10">
      <Tooltip content="Bold · ⌘B" side="top">
        <Button variant="ghost" iconOnly aria-label="Bold">
          <Bold />
        </Button>
      </Tooltip>
      <Tooltip content="Italic · ⌘I" side="bottom">
        <Button variant="ghost" iconOnly aria-label="Italic">
          <Italic />
        </Button>
      </Tooltip>
      <Tooltip content="Underline · ⌘U" side="start">
        <Button variant="ghost" iconOnly aria-label="Underline">
          <Underline />
        </Button>
      </Tooltip>
      <Tooltip content="Insert link · ⌘K" side="end">
        <Button variant="ghost" iconOnly aria-label="Insert link">
          <Link2 />
        </Button>
      </Tooltip>
    </div>
  )
}
