import type { ComponentType } from "react"

import { ColorsFoundation } from "@/components/showcase/foundations/colors"
import { IconsFoundation } from "@/components/showcase/foundations/icons"
import { MotionFoundation } from "@/components/showcase/foundations/motion"
import {
  RadiusFoundation,
  ShadowsFoundation,
} from "@/components/showcase/foundations/radius-shadows"
import { SpacingFoundation } from "@/components/showcase/foundations/spacing"
import { TokensFoundation } from "@/components/showcase/foundations/tokens"
import { TypographyFoundation } from "@/components/showcase/foundations/typography"

export type Foundation = {
  slug: string
  name: string
  description: string
  keywords: string[]
  Page: ComponentType
}

/** Foundation pages, in sidebar order. */
export const foundations: Foundation[] = [
  {
    slug: "colors",
    name: "Colors",
    description: "Semantic color roles, themes, palette and contrast ratios.",
    keywords: ["palette", "theme", "dark mode", "contrast", "wcag"],
    Page: ColorsFoundation,
  },
  {
    slug: "typography",
    name: "Typography",
    description: "Type scale, weights, families and Persian script support.",
    keywords: ["font", "text", "type scale", "persian", "vazirmatn"],
    Page: TypographyFoundation,
  },
  {
    slug: "spacing",
    name: "Spacing & Layout",
    description: "The spacing scale and responsive breakpoints.",
    keywords: ["margin", "padding", "gap", "breakpoints", "responsive", "grid"],
    Page: SpacingFoundation,
  },
  {
    slug: "radius",
    name: "Radius",
    description: "Corner radius tokens.",
    keywords: ["rounded", "corner", "border radius"],
    Page: RadiusFoundation,
  },
  {
    slug: "elevation",
    name: "Elevation",
    description: "Shadows and z-index layers.",
    keywords: ["shadow", "z-index", "layers", "depth"],
    Page: ShadowsFoundation,
  },
  {
    slug: "motion",
    name: "Motion",
    description: "Durations, easing curves and reduced-motion behavior.",
    keywords: ["animation", "transition", "easing", "duration", "reduced motion"],
    Page: MotionFoundation,
  },
  {
    slug: "icons",
    name: "Icons",
    description: "The lucide-react icon set, usage and RTL guidance.",
    keywords: ["icon", "lucide", "svg", "glyph"],
    Page: IconsFoundation,
  },
  {
    slug: "tokens",
    name: "Design Tokens",
    description: "How tokens flow from TypeScript to CSS, and every token value.",
    keywords: ["tokens", "css variables", "theme", "tailwind"],
    Page: TokensFoundation,
  },
]

export function getFoundation(slug: string) {
  return foundations.find((f) => f.slug === slug)
}
