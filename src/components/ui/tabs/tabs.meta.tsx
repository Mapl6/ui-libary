import { defineShowcase } from "@/lib/registry/types"

import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs"

const tabs = [
  {
    value: "overview",
    label: "Overview",
    body: "Project health, recent activity and key metrics.",
  },
  {
    value: "activity",
    label: "Activity",
    body: "A timeline of deployments, comments and changes.",
  },
  {
    value: "settings",
    label: "Settings",
    body: "Name, visibility, integrations and danger zone.",
  },
]

export default defineShowcase({
  name: "Tabs",
  description:
    "Organizes related content into panels, with keyboard navigation that follows the WAI-ARIA tabs pattern.",
  category: "navigation",
  tags: ["tab", "segmented control", "switcher", "panels"],
  component: Tabs,
  args: { value: "overview" },
  controls: {
    value: { control: "radio", options: tabs.map((t) => t.value) },
    defaultValue: false,
    children: false,
  },
  render: (args, update) => (
    <Tabs
      {...args}
      onValueChange={(value) => update({ value })}
      className="w-full max-w-lg"
    >
      <TabsList aria-label="Project">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value} className="text-foreground-muted">
          {tab.body}
        </TabsPanel>
      ))}
    </Tabs>
  ),
  code: (
    args
  ) => `import { Tabs, TabsList, TabsPanel, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="${String(args.value ?? "overview")}"${args.variant && args.variant !== "underline" ? ` variant="${args.variant}"` : ""}${args.orientation === "vertical" ? ' orientation="vertical"' : ""}>
  <TabsList aria-label="Project">
${tabs.map((t) => `    <TabsTrigger value="${t.value}">${t.label}</TabsTrigger>`).join("\n")}
  </TabsList>
${tabs.map((t) => `  <TabsPanel value="${t.value}">…</TabsPanel>`).join("\n")}
</Tabs>`,
})
