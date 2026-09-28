"use client"

/** Start and end addons for icons, units and inline actions. The clear button is a real button with a label. */
import { Search, X } from "lucide-react"
import { useState } from "react"

import { Input } from "@/components/ui/input"

export default function InputAddons() {
  const [query, setQuery] = useState("Tooltip")

  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Input
        label="Search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        startAddon={<Search />}
        endAddon={
          query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="rounded-sm p-1 hover:bg-neutral-subtle hover:text-foreground"
            >
              <X />
            </button>
          ) : null
        }
      />
      <Input label="Weight" type="number" inputMode="decimal" defaultValue={72} endAddon={<span className="pe-1 text-sm">kg</span>} />
    </div>
  )
}
