/** Auto-growing, with a counter, with an error, and disabled. */
import { Textarea } from "@/components/ui/textarea"

export default function TextareaStates() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Textarea label="Auto-growing" resize="auto" rows={2} placeholder="Type several lines…" />
      <Textarea label="Bio" maxLength={160} showCount defaultValue="Design systems engineer." />
      <Textarea label="Reason" error="Please tell us why you're leaving." />
      <Textarea label="Notes" disabled defaultValue="Read only for now." />
    </div>
  )
}
