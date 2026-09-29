"use client"

import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  Filter,
  Folder,
  Globe,
  Heart,
  HelpCircle,
  Home,
  Image,
  Info,
  Languages,
  Layers,
  Link2,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Smartphone,
  Star,
  Sun,
  Tablet,
  Terminal,
  Trash2,
  TriangleAlert,
  Unlock,
  Upload,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"

import { FoundationSection } from "./section"

/** Curated set shown in the catalog. Any lucide-react icon can be used. */
const ICONS: Record<string, LucideIcon> = {
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Search,
  Filter,
  Settings,
  SlidersHorizontal,
  MoreHorizontal,
  Menu,
  Home,
  User,
  Users,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  Heart,
  Bookmark,
  Share2,
  Link2,
  Copy,
  Pencil,
  Trash2,
  Archive,
  Download,
  Upload,
  File,
  Folder,
  Image,
  Paperclip,
  Info,
  CircleAlert,
  TriangleAlert,
  CircleCheck,
  HelpCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Languages,
  Code2,
  Terminal,
  Layers,
}

const NAMES = Object.keys(ICONS)

export function IconsFoundation() {
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const shown = useMemo(
    () => NAMES.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(`import { ${name} } from "lucide-react"`)
      setCopied(name)
      setTimeout(() => setCopied(null), 1400)
    } catch {
      setCopied(null)
    }
  }

  return (
    <FoundationSection
      title="Icons"
      description="The library uses lucide-react: consistent 24px outline icons at stroke 2, sized with size-4 in controls. Icons inside buttons are decorative; give icon-only buttons an aria-label. Directional icons (arrows, chevrons) should flip in RTL with rtl:rotate-180. Click an icon to copy its import."
    >
      <Input
        aria-label="Filter icons"
        placeholder="Filter icons…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        wrapperClassName="max-w-xs"
        startAddon={<Search />}
      />
      <p className="sr-only" aria-live="polite">
        {copied ? `Copied import for ${copied}` : ""}
      </p>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
        {shown.map((name) => {
          const Icon = ICONS[name]
          if (!Icon) return null
          return (
            <li key={name}>
              <button
                type="button"
                onClick={() => copy(name)}
                className="flex h-20 w-full flex-col items-center justify-center gap-2 rounded-lg border text-foreground-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-foreground"
              >
                <Icon aria-hidden className="size-5" />
                <span className="max-w-full truncate px-1 text-2xs">
                  {copied === name ? "Copied!" : name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </FoundationSection>
  )
}
