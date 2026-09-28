/** Underline for page sections, pills for compact view switchers, vertical for settings pages. */
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs"

const items = ["Account", "Security", "Billing"]

export default function TabsVariants() {
  return (
    <div className="grid w-full gap-8">
      <Tabs defaultValue="Account">
        <TabsList aria-label="Underline tabs">
          {items.map((i) => (
            <TabsTrigger key={i} value={i}>
              {i}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((i) => (
          <TabsPanel key={i} value={i} className="text-sm text-foreground-muted">
            {i} settings
          </TabsPanel>
        ))}
      </Tabs>

      <Tabs defaultValue="Week" variant="pills">
        <TabsList aria-label="Range">
          {["Day", "Week", "Month"].map((i) => (
            <TabsTrigger key={i} value={i}>
              {i}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Tabs defaultValue="Security" orientation="vertical">
        <TabsList aria-label="Vertical tabs" className="w-36">
          {items.map((i) => (
            <TabsTrigger key={i} value={i}>
              {i}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((i) => (
          <TabsPanel key={i} value={i} className="text-sm text-foreground-muted">
            {i} content. Use ↑ and ↓ to move between tabs.
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  )
}
