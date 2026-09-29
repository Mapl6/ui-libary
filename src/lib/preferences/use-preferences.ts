"use client"

import { useSyncExternalStore } from "react"

import { dictionaries, type MessageKey } from "@/i18n/dictionaries"

import { getPreferences, getServerPreferences, setPreferences, subscribe } from "./store"

/** Theme, direction and locale, persisted in localStorage and applied to <html>. */
export function usePreferences() {
  const preferences = useSyncExternalStore(
    subscribe,
    getPreferences,
    getServerPreferences
  )
  return [preferences, setPreferences] as const
}

/** Translation function for the current locale. */
export function useT() {
  const [{ locale }] = usePreferences()
  const dictionary = dictionaries[locale]
  return (key: MessageKey) => dictionary[key]
}
