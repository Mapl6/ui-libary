import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    // Custom font-size tokens from src/tokens/typography.ts, so they don't clash with text colors.
    theme: { text: ["2xs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl"] },
  },
})

/** Merges class names and resolves conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
