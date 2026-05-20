# CLAUDE.md

Project-wide naming conventions. These are **mandatory**. Apply them to every file you create or edit. When existing code violates them, follow the conventions in new code and flag the inconsistency rather than copying it.

Stack: SvelteKit, TypeScript, JavaScript, SQL (PostgreSQL), HTML, CSS.

## Core principles

1. **Singular by default.** Names describe one of a thing. Use the singular form everywhere it is technically possible. The _only_ exception is REST endpoint paths.
2. **No abbreviations.** Spell every word out. The single allowed exception is `ID`. Universal tokens (`url`, `http`, `api`) are acceptable. Never invent shortenings (`cfg`, `usr`, `calc`, `btn`).
3. **No type-style prefixes.** No `is_`/`has_`/`should` on booleans. No `I` on interfaces. No `T` on types or generics.
4. **One concept, one name.** Use the same noun for an entity across the table, type, component, route, and UI label.

## SQL / PostgreSQL

- Tables: **singular**, `snake_case` — `user_account`, `event_session`.
- Avoid reserved words as bare table names — use `user_account`, never `users`.
- Columns: `snake_case`, singular unless the column holds a collection.
- Booleans: name the state directly — `active`, `email_verified`. Never `is_active`.
- Timestamps: keep the `_at` suffix — `created_at`, `published_at`, `deleted_at`.
- Primary key: always `id`.
- Foreign key: singular referenced table + `_id` — `user_account_id`.
- Junction tables: both singular entities, alphabetical — `event_session_attendee`.
- Indexes/constraints: descriptive, prefixed — `idx_user_account_email_address`, `fk_event_session_user_account_id`, `uq_user_account_email_address`.

## REST API

- Endpoint paths: **plural** (the only plural exception), lowercase, `kebab-case` — `/user-accounts`, `/user-accounts/42/event-sessions`.
- No verbs in paths; the HTTP method is the verb.
- JSON keys: `camelCase`, singular unless the value is a collection — `emailAddress`, `createdAt`, `eventSessions`.
- Convert `snake_case` (DB) to `camelCase` (wire) at the serialization boundary, in one place.
- Query parameters: `camelCase` — `?pageSize=20&sortBy=createdAt`.

## TypeScript / JavaScript

- Variables, functions, methods: `camelCase`.
- Classes: `PascalCase`.
- Types, interfaces, enums: `PascalCase`, **singular**, no prefix — `UserAccount`, `Locale`, `LocalText`.
- Enum members: `PascalCase` — `SessionStatus.Active`.
- True constants: `SCREAMING_SNAKE_CASE` — `MAX_RETRY_COUNT`. Use this only for genuine never-changing constants; a value that merely isn't reassigned stays `camelCase`.
- Generic parameters: single capital (`T`, `K`, `V`) or a plain `PascalCase` word (`Data`). **Never** a `T`-prefixed hybrid like `TData`.
- Booleans: name the state — `active`, `menuOpen`. Never `isActive`. Boolean-returning functions read as a predicate without a type prefix — `canEditSession()`, `sessionHasEnded()`.
- Collections: the type stays singular; pluralize the variable — `const userAccounts: UserAccount[]`.
- Acronyms: treat as a normal word, capitalize first letter only (Google JS Style Guide) — `getHttpUrl`, `HtmlParser`, not `getHTTPURL`.

## Svelte

- Components: `PascalCase.svelte`, filename matches the component — `UserCard.svelte`, `EventSessionList.svelte`. Entity part stays singular; a `List`/`Grid` noun carries plurality.
- Route directories: `kebab-case`, singular resource segments — `src/routes/user-account/[id]/`.
- `+page`, `+layout`, `+server`, `+error` and their `.server`/`.ts` variants are framework-mandated — do not rename.
- Props and `$state`/`$derived`: `camelCase`. Boolean props follow the no-prefix rule — `open`, not `isOpen`.
- Dispatched event names: `camelCase` — `sessionSelect`.
- Non-component modules: `kebab-case.ts` — `format-date.ts`, `get-content-by-slug.ts`. A module exporting a single dominant class/type may be `PascalCase.ts`.

## HTML

- Attributes, including `data-*` and `aria-*`: `kebab-case` — `data-user-account-id`, `aria-label`.
- `data-*` is `kebab-case` in markup, read as `camelCase` via `dataset` (`data-user-account-id` → `dataset.userAccountId`).
- `id` and `name` values: `kebab-case`, singular, descriptive.
- Test hooks: use `data-testid` with a `kebab-case` value — `data-testid="user-account-card"`.

## CSS

- Class names: `kebab-case`, BEM for structured components — `event-session-card__title--highlighted`.
- Block name is singular and matches the component/entity — `EventSessionCard.svelte` → `.event-session-card` → `event_session`.
- Custom properties: `--kebab-case`, namespaced by category — `--color-primary`, `--space-medium`, `--font-size-body`.
- Svelte scopes styles automatically; use plain semantic `kebab-case` for simple components and reserve full BEM for components where the structure genuinely aids readability.

## Before adding a new noun

Check whether the concept already has a name elsewhere in the stack. Reuse it. One concept, one name, every layer.
