# SvelteBuilder UI

The core UI component library for the SvelteBuilder ecosystem — a set of universal, accessible, lightly styled components that domain modules (commerce, logistics, and others) build on.

## What this is

SvelteBuilder UI provides the foundational layer of components used across every SvelteBuilder module. Components are intentionally low-level and minimally styled: they are fully functional and visually coherent out of the box, but carry no branding. Consuming projects layer their own design and enhanced styling on top.

This library owns its component API, its styling, and its design tokens. Accessibility-critical interaction behavior (focus management, keyboard handling, ARIA wiring) is delegated to [Bits UI](https://bits-ui.com) primitives, which SvelteBuilder UI wraps behind its own consistent interface.

For the full reasoning behind building a custom library rather than adopting an existing one, see **[Why Custom UI](https://github.com/cailenfisher/SvelteBuilder/wiki/Why-a-Custom-UI-Library)**.

## Requirements

- **Svelte 5** — the library is written entirely with Svelte 5 runes.
- **Tailwind CSS** — required in the consuming project to process component classes.
- **Bits UI** — installed as a dependency of this library; no separate setup needed.

Each component's full API — props, events, and slots — is documented inline in the component source. Open the component file for authoritative, version-accurate documentation.

## Design principles

- **Shared primitives.** Components compose on shared primitives rather than duplicating logic. A core `Button`, for example, backs both an `ActionButton` (which takes a function) and a `LinkButton` (which takes an `href`) — identical in appearance and behavior, different only in what they do.
- **Semantic, idiomatic code.** Real HTML elements over generic containers; native Svelte 5 idioms throughout.
- **Minimal, overridable styling.** Just enough Tailwind for clear interactive states and visual coherence. Every component accepts a merged `class` prop, and brandable values route through design tokens so consuming projects can restyle centrally.
- **Consistent APIs.** Shared types — size scales, variant names, common prop shapes — are reused across the library so that learning one component carries over to the rest.
- **Eager, explicit error handling.** Functional code validates inputs early and reports failures with a consistent, origin-identifying format: `Component->Function: message`.

## Accessibility

Accessibility is a hard requirement for this library, not a finishing touch. Components use semantic HTML, expose visible focus states, support full keyboard operation, and associate labels with their controls. Interaction-heavy components are built on Bits UI primitives, which are designed against WAI-ARIA practices. Accessibility regressions are treated as defects.

## Scope

This library covers universal UI components — presentational elements, form controls, and overlays. It deliberately **excludes navigation** (navbars, breadcrumbs, menus, sidebars), which is handled by a sibling library, and **domain-specific components**, which belong to the relevant SvelteBuilder module.

## Components

All components accept a `class` prop that merges with their default Tailwind classes. Bindable props are marked **bindable**.

### Shared types

| Type | Values |
|------|--------|
| `Size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
| `Variant` | `default` \| `primary` \| `secondary` \| `success` \| `warning` \| `danger` \| `ghost` \| `outline` |
| `Orientation` | `horizontal` \| `vertical` |

---

### Accordion

Collapsible item list. Supports single-open or multi-open modes.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `AccordionItem[]` | — | Required. `{ value, title, content, disabled? }` |
| `type` | `'single' \| 'multiple'` | `'single'` | |
| `value` | `string \| string[]` | `''` / `[]` | **Bindable.** Type mirrors `type`. |
| `disabled` | `boolean` | `false` | Disables all items. |
| `onValueChange` | `(value) => void` | — | |

---

### Alert

Inline status message with a severity icon.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `severity` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Controls color and icon. |
| `title` | `string` | — | Optional bold heading. |
| `dismissible` | `boolean` | `false` | Shows a close button. |
| `onDismiss` | `() => void` | — | Called when the close button is clicked. |
| `children` | `Snippet` | — | Body content. |

---

### Avatar

Circular user avatar. Shows an image, initials fallback, or a generic icon.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `src` | `string` | — | Image URL. |
| `alt` | `string` | `''` | Alt text for the image. |
| `fallback` | `string` | `''` | Initials shown when no image loads. |
| `size` | `Size` | `'md'` | |

---

### Badge

Small inline status label. Pill-shaped.

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `children` | `Snippet` | — |

---

### Button

Foundational button primitive. Used internally by `ActionButton`, `IconButton`, and `LinkButton`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `Variant` | `'default'` | |
| `size` | `Size` | `'md'` | |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | |
| `loading` | `boolean` | `false` | Shows a spinner and disables interaction. |
| `disabled` | `boolean` | — | |
| `children` | `Snippet` | — | |

---

### ActionButton

`Button` that wraps an async `action`. Manages its own pending state and surfaces errors via `onerror`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `action` | `() => void \| Promise<void>` | — | Required. |
| `variant` | `Variant` | — | Forwarded to `Button`. |
| `size` | `Size` | — | Forwarded to `Button`. |
| `loading` | `boolean` | `false` | |
| `disabled` | `boolean` | — | |
| `onerror` | `(error: unknown) => void` | — | Called when `action` throws. |
| `children` | `Snippet` | — | |

---

### IconButton

Square button for icon-only actions. `aria-label` is required.

| Prop | Type | Default |
|------|------|---------|
| `aria-label` | `string` | — |
| `variant` | `Variant` | `'ghost'` |
| `size` | `Size` | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `children` | `Snippet` | — |

---

### LinkButton

Button-styled anchor (`<a>`). Full `Variant` / `Size` support.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `href` | `string` | — | Required. |
| `variant` | `Variant` | `'default'` | |
| `size` | `Size` | `'md'` | |
| `disabled` | `boolean` | `false` | Removes `href` and adds `tabindex="-1"`. |
| `children` | `Snippet` | — | |

---

### Card

Content surface with optional `header` and `footer` slots.

| Prop | Type | Notes |
|------|------|-------|
| `header` | `Snippet` | Renders above the body with a bottom border. |
| `footer` | `Snippet` | Renders below the body with a top border and muted background. |
| `children` | `Snippet` | Main body. |

---

### Checkbox

Single checkbox with optional label. Supports indeterminate state.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `checked` | `boolean` | `false` | **Bindable.** |
| `indeterminate` | `boolean` | `false` | **Bindable.** |
| `label` | `string` | — | Renders an associated `<label>`. |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `name` | `string` | — | |
| `value` | `string` | — | |
| `id` | `string` | — | Auto-derived from `label` when omitted. |
| `onCheckedChange` | `(checked: boolean) => void` | — | |

---

### Dialog

Modal dialog with accessible focus trap and overlay.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `open` | `boolean` | `false` | **Bindable.** |
| `title` | `string` | — | Rendered as an accessible dialog title. |
| `description` | `string` | — | |
| `trigger` | `Snippet` | — | Element that opens the dialog. |
| `footer` | `Snippet` | — | Renders in the footer row (right-aligned). |
| `children` | `Snippet` | — | Dialog body. |
| `onOpenChange` | `(open: boolean) => void` | — | |

---

### Divider

Horizontal or vertical separator line.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `orientation` | `Orientation` | `'horizontal'` | |
| `decorative` | `boolean` | `true` | Set `false` to expose a semantic separator role. |

---

### Field

Form field wrapper that wires a `<label>`, hint text, and error message to a control via `id`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | — | Required. |
| `id` | `string` | — | Required. Must match the inner control's `id`. |
| `hint` | `string` | — | Shown below the control when there is no error. |
| `error` | `string` | — | Overrides hint; shown in red with an alert role. |
| `required` | `boolean` | `false` | Appends a `*` to the label. |
| `disabled` | `boolean` | `false` | Dims the label. |
| `children` | `Snippet` | — | The form control. |

---

### Input

Single-line text input. Shows an inline error message when `error` is set.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string` | `''` | **Bindable.** |
| `error` | `string` | — | Inline error text; switches border to red. |
| `disabled` | `boolean` | — | |

Accepts all standard `HTMLInputAttributes`.

---

### Label

Standalone label element.

| Prop | Type | Default |
|------|------|---------|
| `for` | `string` | — |
| `required` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `children` | `Snippet` | — |

---

### Menu

Dropdown context menu.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `MenuItem[]` | — | Required. Pass `{ separator: true }` for a divider row. |
| `trigger` | `Snippet` | — | Element that opens the menu. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | |
| `sideOffset` | `number` | `6` | Gap between trigger and menu (px). |
| `open` | `boolean` | `false` | **Bindable.** |
| `onOpenChange` | `(open: boolean) => void` | — | |

---

### Pagination

Page navigation control.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `count` | `number` | — | Required. Total item count. |
| `perPage` | `number` | `10` | Items per page. |
| `siblingCount` | `number` | `1` | Pages shown on each side of the current page. |
| `page` | `number` | `1` | **Bindable.** |
| `onPageChange` | `(page: number) => void` | — | |

---

### Popover

Floating content panel anchored to a trigger.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `open` | `boolean` | `false` | **Bindable.** |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | |
| `sideOffset` | `number` | `8` | Gap between trigger and panel (px). |
| `trigger` | `Snippet` | — | Element that opens the popover. |
| `children` | `Snippet` | — | Popover body. |
| `onOpenChange` | `(open: boolean) => void` | — | |

---

### ProgressBar

Determinate or indeterminate progress indicator.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| null` | `0` | `null` shows an indeterminate pulse. |
| `max` | `number` | `100` | |
| `min` | `number` | `0` | |
| `label` | `string` | — | Displays above the bar with a percentage. |

---

### RadioGroup

A group of mutually exclusive radio buttons.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `RadioOption[]` | — | Required. `{ value, label, disabled? }` |
| `value` | `string` | `''` | **Bindable.** |
| `name` | `string` | — | |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `orientation` | `Orientation` | `'vertical'` | |
| `onValueChange` | `(value: string) => void` | — | |

---

### Select

Single-value dropdown select.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `SelectOption[]` | — | Required. `{ value, label, disabled? }` |
| `value` | `string` | `''` | **Bindable.** |
| `placeholder` | `string` | `'Select an option'` | |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `name` | `string` | — | |
| `onValueChange` | `(value: string) => void` | — | |

---

### Skeleton

Loading placeholder with a pulse animation.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `width` | `string` | `'100%'` | CSS width value. |
| `height` | `string` | `'1rem'` | CSS height value. |
| `rounded` | `boolean \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border-radius scale. |

---

### Spinner

Animated SVG loading indicator.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `size` | `Size` | `'md'` | |
| `label` | `string` | `'Loading'` | Accessible `aria-label`. |

---

### Switch

Toggle switch with optional label.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `checked` | `boolean` | `false` | **Bindable.** |
| `disabled` | `boolean` | `false` | |
| `required` | `boolean` | `false` | |
| `label` | `string` | — | Renders an associated `<label>`. |
| `name` | `string` | — | |
| `value` | `string` | — | |
| `id` | `string` | — | Auto-derived from `label` when omitted. |
| `onCheckedChange` | `(checked: boolean) => void` | — | |

---

### Table

Data table with typed columns and rows. Generic over the row type `T`.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `columns` | `TableColumn<T>[]` | — | Required. `{ key, label, align? }` |
| `rows` | `T[]` | — | Required. `T extends Record<string, unknown>`. |
| `caption` | `string` | — | Screen-reader caption (visually hidden). |
| `striped` | `boolean` | `false` | Alternates row background. |

---

### Tabs

Tab strip with associated content panels.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `TabItem[]` | — | Required. `{ value, label, content, disabled? }` |
| `value` | `string` | first item | **Bindable.** |
| `onValueChange` | `(value: string) => void` | — | |

---

### Tag

Compact label chip. Optionally dismissible.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `dismissible` | `boolean` | `false` | Shows an × button. |
| `onDismiss` | `() => void` | — | Called when the × is clicked. |
| `children` | `Snippet` | — | Tag text or content. |

---

### Textarea

Multi-line text input. Shows an inline error message when `error` is set.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string` | `''` | **Bindable.** |
| `error` | `string` | — | Inline error text; switches border to red. |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | CSS resize behavior. |
| `disabled` | `boolean` | — | |

Accepts all standard `HTMLTextareaAttributes`.

---

### Tooltip

Short tooltip shown on hover or focus.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `content` | `string` | — | Required. Tooltip text. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | |
| `sideOffset` | `number` | `6` | Gap between trigger and tooltip (px). |
| `delay` | `number` | `500` | Show delay in ms. |
| `disabled` | `boolean` | `false` | |
| `children` | `Snippet` | — | The element the tooltip attaches to. |

---

## Conventions

This project follows strict naming and structural conventions. Contributors should review them before submitting changes: see **[Naming Conventions](https://github.com/cailenfisher/SvelteBuilder/wiki/Naming-Conventions)**.

## Contributing

Contributions, issue reports, and feedback are welcome. Please review the naming conventions linked above and keep changes consistent with the design principles in this document. Accessibility and API consistency are reviewed on every contribution.

## License

TBD
