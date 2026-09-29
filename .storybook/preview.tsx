import type { Decorator, Preview } from "@storybook/nextjs-vite"
import { type ReactNode, useEffect } from "react"

import { themes } from "../src/tokens/themes"

import "../src/app/globals.css"

type Direction = "ltr" | "rtl"

/** Applies the toolbar's theme and direction to <html>, the same way the showcase does. */
function PreferencesRoot({
  theme,
  dir,
  children,
}: {
  theme: string
  dir: Direction
  children: ReactNode
}) {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dir = dir
    root.lang = dir === "rtl" ? "fa" : "en"
  }, [theme, dir])

  return children
}

const withPreferences: Decorator = (Story, context) => {
  const { theme, dir } = context.globals as { theme: string; dir: Direction }
  return (
    <PreferencesRoot theme={theme} dir={dir}>
      <Story />
    </PreferencesRoot>
  )
}

const preview: Preview = {
  decorators: [withPreferences],
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: themes.map((t) => ({ value: t.id, title: t.label })),
        dynamicTitle: true,
      },
    },
    dir: {
      description: "Writing direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "Left to right" },
          { value: "rtl", title: "Right to left" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: themes[0].id, dir: "ltr" },
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' shows violations in the test UI only; 'error' would fail the test run.
      test: "todo",
    },
  },
}

export default preview
