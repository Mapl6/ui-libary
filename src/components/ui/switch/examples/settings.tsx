/** Label-first switches in a settings list, in two sizes, with a disabled row. */
import { Switch } from "@/components/ui/switch"

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-md divide-y rounded-lg border">
      <Switch
        className="p-3"
        labelFirst
        label="Push notifications"
        description="Mentions and direct messages."
        defaultChecked
      />
      <Switch
        className="p-3"
        labelFirst
        label="Weekly digest"
        description="A summary every Monday."
      />
      <Switch className="p-3" labelFirst size="sm" label="Compact mode" />
      <Switch
        className="p-3"
        labelFirst
        label="Beta features"
        description="Managed by your admin."
        disabled
      />
    </div>
  )
}
