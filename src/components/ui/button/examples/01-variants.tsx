/** Use one primary button per view. Secondary and outline for alternatives, ghost for low-emphasis actions. */
import { Button } from "@/components/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="link">Learn more</Button>
    </div>
  )
}
