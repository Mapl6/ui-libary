## Usage

```tsx
import { Select } from "@/components/ui/select"

<Select
  label="Country"
  name="country"
  placeholder="Choose a country"
  options={[
    { value: "ir", label: "Iran" },
    { value: "de", label: "Germany" },
  ]}
/>
```

## Why native?

A native `<select>` gives platform pickers on iOS and Android, type-to-select, full keyboard and
screen-reader support, and form/Server Action integration, with no JavaScript cost. Build a custom
listbox (combobox) only when you need search, rich option content or multi-select chips.

## Accessibility

- The label, description and error are wired like `Input`.
- The placeholder option is `disabled`, so it can't be re-selected once a value is chosen.
