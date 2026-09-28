/** Icons use logical start and end positions, so they flip in right-to-left layouts. Icon-only buttons need an aria-label. */
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button startIcon={<Plus />}>New project</Button>
      <Button variant="outline" endIcon={<ArrowRight className="rtl:rotate-180" />}>
        Next step
      </Button>
      <Button variant="secondary" startIcon={<Download />}>
        Export
      </Button>
      <Button variant="ghost" iconOnly aria-label="Delete item">
        <Trash2 />
      </Button>
    </div>
  )
}
