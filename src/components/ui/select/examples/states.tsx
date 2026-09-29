/** Placeholder, pre-selected, error, and disabled. */
import { Select } from "@/components/ui/select"

const sizes = [
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
]

export default function SelectStates() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Select label="Size" placeholder="Pick a size" options={sizes} />
      <Select
        label="Default size"
        defaultValue="m"
        options={sizes}
        description="Applied to new items."
      />
      <Select
        label="Shipping size"
        placeholder="Pick a size"
        options={sizes}
        error="Select a size to continue."
      />
      <Select label="Locked" defaultValue="l" options={sizes} disabled />
    </div>
  )
}
