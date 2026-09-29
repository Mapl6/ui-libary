import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google"

import { preferencesScript } from "@/lib/preferences/script"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const vazirmatn = Vazirmatn({ variable: "--font-vazirmatn", subsets: ["arabic"] })

export const metadata: Metadata = {
  title: { default: "UI Library", template: "%s · UI Library" },
  description:
    "Component library, interactive playground and design-system documentation.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script sets theme/dir/lang before paint, so these attributes differ from the server HTML.
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
