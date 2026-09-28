/** Four sizes. Spinners inherit `currentColor`, so color them with text utilities. */
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6 text-primary">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}
