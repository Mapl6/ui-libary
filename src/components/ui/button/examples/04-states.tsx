"use client"

/** Loading keeps the button's width and focus. Hover and tab through to inspect the hover and focus rings. */
import { useState } from "react"

import { Button } from "@/components/ui/button"

export default function ButtonStates() {
  const [saving, setSaving] = useState(false)

  const save = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline">Default</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button loading>Saving</Button>
      <Button onClick={save} loading={saving}>
        {saving ? "Saving…" : "Click to save"}
      </Button>
    </div>
  )
}
