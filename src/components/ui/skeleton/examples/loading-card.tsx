"use client"

/** A skeleton that mirrors the loaded layout exactly. The container carries aria-busy for assistive technology. */
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonLoadingCard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <Card className="w-full" aria-busy={loading} aria-live="polite">
        <CardContent className="flex items-center gap-3">
          {loading ? (
            <>
              <Skeleton shape="circle" width={40} />
              <Skeleton shape="text" lines={2} className="flex-1" />
            </>
          ) : (
            <>
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle text-sm font-semibold text-primary-subtle-foreground">
                JC
              </div>
              <div className="leading-tight">
                <p className="font-medium">Jane Cooper</p>
                <p className="text-sm text-foreground-muted">Frontend engineer</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Button size="sm" variant="outline" onClick={() => setLoading(true)} disabled={loading}>
        Reload
      </Button>
    </div>
  )
}
