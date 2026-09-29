"use client"

/** The parent box is indeterminate while only some children are selected. */
import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"

const items = ["Invoices", "Receipts", "Contracts"]

export default function CheckboxSelectAll() {
  const [selected, setSelected] = useState<string[]>(["Invoices"])
  const all = selected.length === items.length
  const some = selected.length > 0 && !all

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">Documents to export</legend>
      <Checkbox
        label="All documents"
        checked={all}
        indeterminate={some}
        onChange={() => setSelected(all ? [] : items)}
      />
      <div className="flex flex-col gap-3 ps-6">
        {items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selected.includes(item)}
            onChange={(event) =>
              setSelected((prev) =>
                event.target.checked ? [...prev, item] : prev.filter((i) => i !== item)
              )
            }
          />
        ))}
      </div>
    </fieldset>
  )
}
