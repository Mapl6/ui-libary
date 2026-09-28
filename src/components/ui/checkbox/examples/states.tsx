/** Unchecked, checked, indeterminate, invalid and disabled. */
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxStates() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Invalid" invalid description="You must accept to continue." />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  )
}
