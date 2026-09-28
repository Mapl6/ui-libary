import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The showcase reads component source files at build time (Source tab).
  outputFileTracingIncludes: {
    "/components/[slug]": ["./src/components/ui/**/*"],
  },
}

export default nextConfig
