import { metaLoaders } from "@/registry/generated/loaders"
import type { AnyShowcaseMeta } from "@/lib/registry/types"

const cache = new Map<string, Promise<AnyShowcaseMeta>>()

/** Loads (and caches) a component's showcase meta chunk. Use with React's `use()`. */
export function loadMeta(slug: string): Promise<AnyShowcaseMeta> {
  let promise = cache.get(slug)
  if (!promise) {
    const loader = metaLoaders[slug]
    promise = loader
      ? loader()
      : Promise.reject(new Error(`No showcase meta registered for "${slug}"`))
    cache.set(slug, promise)
  }
  return promise
}
