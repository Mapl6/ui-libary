/** Default, with help text, error, disabled and required. */
import { Input } from "@/components/ui/input"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Input label="Full name" placeholder="Jane Cooper" />
      <Input
        label="Username"
        description="Letters, numbers and dashes."
        defaultValue="jane-c"
      />
      <Input label="Email" defaultValue="jane@" error="Enter a valid email address." />
      <Input label="Company" placeholder="Acme Inc." disabled />
      <Input label="Password" type="password" required />
      <Input aria-label="Search" placeholder="Input without a visible label" size="sm" />
    </div>
  )
}
