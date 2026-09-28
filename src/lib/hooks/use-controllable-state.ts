"use client"

import { useCallback, useState } from "react"

type Options<T> = {
  value: T | undefined
  defaultValue: T
  onChange?: (value: T) => void
}

/**
 * State that can be controlled (`value` + `onChange`) or uncontrolled (`defaultValue`),
 * the same contract as native form elements.
 */
export function useControllableState<T>({ value, defaultValue, onChange }: Options<T>) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const setValue = useCallback(
    (next: T) => {
      if (Object.is(next, current)) return
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [current, isControlled, onChange]
  )

  return [current, setValue] as const
}
