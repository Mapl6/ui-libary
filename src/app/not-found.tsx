import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="font-mono text-sm text-foreground-subtle">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-foreground-muted">This component or page doesn&apos;t exist.</p>
      <Link href="/" className="text-primary hover:underline">
        Back to the overview
      </Link>
    </main>
  )
}
