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

## Conventions

This project follows strict naming and structural conventions. Contributors should review them before submitting changes: see **[Naming Conventions](https://github.com/cailenfisher/SvelteBuilder/wiki/Naming-Conventions)**.

## Contributing

Contributions, issue reports, and feedback are welcome. Please review the naming conventions linked above and keep changes consistent with the design principles in this document. Accessibility and API consistency are reviewed on every contribution.

## License

TBD
