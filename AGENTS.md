# AGENTS.md

Minimal static blog: Astro 7 + MDX, Tailwind v4, TypeScript, pnpm. Built to static HTML
and deployed to GitHub Pages at the project subpath `/blog/` via GitHub Actions.

## Governance: Passive

Maintain this harness passively. Keep harness files in sync with code **in the same
commit** as the change that affects them. **Do not create new harness components**
(skills, knowledge-base files, hooks, MCP) unless the user explicitly asks. Flag stale or
missing harness content to the user rather than expanding the harness on your own.

## Harness map

- `.agents/knowledge/REFERENCES.md` — external doc links by topic; read before using an API.
- `.agents/knowledge/QUALITY.md` — Biome rules, how to check, test conventions, CI gate.
- `.agents/knowledge/SPEC.md` — content model, routing, and the feature architecture
  (search, RSS, `.md`/llms endpoints, charts). Read before extending features.
- `.agents/skills/` — workflow skills (`new-article`, `new-component`), consistency `sync-*`
  skills, plus generic methodology skills. Auto-discovered; no manual registration.
- `DESIGN.md` — visual/design spec (repo root). Consult before changing visual styling.
- `justfile` — every project command. Use it; do not reinvent commands.

## Content structure

- Articles live in `src/content/blog/<slug>/index.mdx` — one folder per article, with
  `index.mdx` as the entry. The folder name is the URL slug (`/blog/<slug>/`).
- Co-locate **one-off** components and images inside the article folder.
- Only **frequently-reused or style-critical** components belong in `src/components/`.
- Schema lives in `src/content.config.ts`. Article frontmatter: `title`, `description`,
  `summary?`, `type` (`research`|`case`), `tags` (string[]), `source?`, `authors` (refs),
  `pubDate` (date), `draft` (bool).
- `draft: true` hides an article from list pages but keeps it reachable by direct URL.
- Authors live in `src/content/authors/<id>/index.mdx` (folder-per-author, so bios can embed
  components/assets), referenced by articles via `authors`.

## Structure

Skeleton (major modules; not exhaustive):

- `src/content/` — `blog/<slug>/index.mdx` (articles), `authors/<id>/index.mdx`; schemas in
  `src/content.config.ts`.
- `src/pages/` — `index` (home), `research`/`cases` lists, `[...slug]` (article),
  `tags/[tag]`, `authors/[id]`, `search`, `rss.xml.ts`.
- `src/components/` — shared UI (Astro; React islands like `EChart.tsx` for interactivity).
- `src/layouts/BaseLayout.astro` — page shell (head + header + footer).
- `src/styles/global.css` — the single stylesheet (Tailwind `@theme` tokens + `.sk-prose`).
- `astro.config.mjs` — integrations, markdown pipeline, Pagefind build hook.
- `.agents/` — harness (`knowledge/`, `skills/`); `DESIGN.md` (root) — visual spec.
- `tests/{unit,e2e}/` — Vitest unit + Playwright E2E. `.github/workflows/` — `ci`, `deploy`.

## Conventions

- **Language:** harness files, code, identifiers, comments, commit messages, and code
  documentation are written in **English**. Articles and all reader-facing site copy (page
  text, UI labels, metadata shown to readers) are written in **Japanese** (本文は日本語).
  See DESIGN.md §Voice & language.
- **Base path:** the site is served under `/blog/`. Never hardcode `/blog/`; build
  internal links and asset paths from `import.meta.env.BASE_URL`.
- **Styling:** **Tailwind-first** — style with utility classes mapped from the design
  tokens via the `@theme` block in `src/styles/global.css` (the single stylesheet), e.g.
  `bg-paper`, `text-strong`, `text-2xl`, `font-serif`, `rounded-md`, `border-line-subtle`.
  Do **not** hand-write CSS or scoped `<style>` blocks when a utility exists, and do **not**
  reference external CSS (fonts use system stacks). Hand-written CSS is reserved for the
  `@theme` tokens and the rendered-MDX prose (`.sk-prose`). The visual spec is **DESIGN.md**.
- **Commits:** Conventional Commits, **no scope** (use the `conventional-commits` skill).
  Changes under `src/content/**/*.mdx` are `feat`/`fix`, **never `docs`** — article content
  renders directly to the published pages.
- **Commands:** see `justfile` (`just --list`). Run `just verify` before pushing. When
  running the dev server in an agent session, prefer `astro dev --background` (manage with
  `astro dev stop` / `status` / `logs`).
- **Tests:** vitest unit tests for shared `src/components/` (Astro Container API);
  Playwright E2E in `tests/e2e/`. Details in QUALITY.md.

## Keeping in sync

Consistency is enforced by dedicated **`sync-*` skills**, auto-loaded by their descriptions
when the relevant files change: `sync-structure`, `sync-content-model`, `sync-design`,
`sync-quality`, `sync-spec`. When you change code, update the harness files those skills name
in the **same commit**.
