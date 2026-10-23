<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Next.js 16.4.3 App Router app in **plain JavaScript** (`.js`/`.jsx`; jsconfig paths, no TypeScript). Keep new files JS — don't add TS config. React 19 with the React Compiler enabled (`reactCompiler: true` in `next.config.mjs`).

## Commands

- `npm run dev` — dev server at `localhost:3000`.
- **`npm run build` is the primary verification step** — it runs Turbopack + React Compiler and currently passes cleanly. There is **no test suite, no CI, no typecheck script**.
- `npm run lint` runs bare `eslint` (flat config in `eslint.config.mjs`); use `npm run lint -- --fix` for fixes.
  - Known pre-existing failures (as of creation): 2 `react-hooks/set-state-in-effect` errors in vendored files `src/components/ui/carousel.jsx` and `src/hooks/use-mobile.js`. Don't expect `npm run lint` to exit 0 — instead confirm lint introduces **no new errors in the files you touched**.

## Layout

- `src/app` — only app entrypoint (routes/pages); currently just the root layout + empty home page.
- `src/components/ui` — ~60 **vendored** shadcn/ui kit components; avoid hand-editing them.
- `src/hooks`, `src/lib` — shared hooks/utils. `@/*` maps to `src/*` (jsconfig.json).

## Tailwind CSS v4

- **No `tailwind.config.*` file** — CSS-first config; design tokens and theme live in `src/app/globals.css`.
- Tailwind is wired via `next.config.mjs` `turbopack.rules` + `@tailwindcss/turbopack` (no PostCSS pipeline). Don't remove or replace that rule.

## shadcn/ui — "base-nova" style (NOT Radix)

- The kit is built on **Base UI** (`@base-ui/react`) primitives, so component/prop APIs differ from the Radix-based shadcn examples in older docs. Read the existing component in `src/components/ui` before using it.
- Compose kit components in app code; add new ones with `npx shadcn@latest add <name>` (components.json sets `tsx: false` → generates `.jsx`).
- `cn` is imported from the `cn` npm package (`src/lib/utils.js` just re-exports it).

## Next.js 16 gotchas (verified in `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`)

- Turbopack is the default for `next dev` **and** `next build`; a custom webpack config would fail the build.
- `params`/`searchParams` props and `cookies()`/`headers()`/`draftMode()` are async — **`await` them** (sync access is fully removed).
- The `middleware.*` convention is deprecated in favor of `proxy.*` (Node.js runtime only — no `edge`).
- `revalidateTag` requires a `cacheLife` profile as its second argument.

## Stale README

`README.md` is unmodified create-next-app boilerplate (wrong font, wrong file paths — app code lives in `src/app`, not `app/`; actual font is Josefin Sans per `src/app/layout.js`). Trust config and code over it.
