import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a lockfile in a parent directory isn't picked up.
  turbopack: { root: import.meta.dirname },
  // The showcase reads component source files and guides at build time (Source/Docs tabs).
  outputFileTracingIncludes: {
    "/components/[slug]": ["./src/components/ui/**/*"],
    "/guides/[slug]": ["./docs/**/*.md"],
  },
}

export default nextConfig
