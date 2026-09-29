"use client"

/** All tones, including one with actions and a dismissible alert. */
import { useState } from "react"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertTones() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert tone="neutral" title="Scheduled maintenance">
        Sunday 02:00–03:00 UTC.
      </Alert>
      <Alert tone="info" title="New version available" />
      <Alert tone="success" title="Changes saved" />
      <Alert
        tone="warning"
        title="Storage almost full"
        actions={
          <Button size="sm" variant="outline">
            Upgrade plan
          </Button>
        }
      >
        You&apos;ve used 92% of your 10 GB.
      </Alert>
      {visible ? (
        <Alert
          tone="danger"
          title="Deployment failed"
          onDismiss={() => setVisible(false)}
        >
          Build step exited with code 1.
        </Alert>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>
          Show dismissed alert
        </Button>
      )}
    </div>
  )
}
