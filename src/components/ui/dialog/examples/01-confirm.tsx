"use client"

/** A destructive confirmation. Focus starts on the safe action; the result is reported back to the page. */
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

export default function DialogConfirm() {
  const [result, setResult] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <Dialog onOpenChange={(open) => open && setResult(null)}>
        <DialogTrigger>
          <Button variant="danger">Delete workspace</Button>
        </DialogTrigger>
        <DialogContent
          size="sm"
          title="Delete workspace?"
          description="This permanently deletes 12 projects and their history. This can't be undone."
        >
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" autoFocus onClick={() => setResult("Cancelled")}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant="danger" onClick={() => setResult("Deleted")}>
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="text-sm text-foreground-muted" aria-live="polite">
        {result ?? " "}
      </p>
    </div>
  )
}
