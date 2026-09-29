"use client"

/** An icon-only overflow menu aligned to the end of a list row, reporting the chosen action. */
import { Archive, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuRowActions() {
  const [last, setLast] = useState("—")

  return (
    <div className="flex min-h-56 w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg border px-3 py-2">
        <div>
          <p className="font-medium">quarterly-report.pdf</p>
          <p className="text-sm text-foreground-muted">2.4 MB · Edited 3h ago</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              iconOnly
              aria-label="More actions for quarterly-report.pdf"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem icon={<Pencil />} onSelect={() => setLast("Rename")}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Archive />} onSelect={() => setLast("Archive")}>
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              icon={<Trash2 />}
              tone="danger"
              onSelect={() => setLast("Delete")}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-foreground-muted" aria-live="polite">
        Last action: {last}
      </p>
    </div>
  )
}
