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
- `.agents/knowledge/SPEC.md` — content model, routing, and the spec for not-yet-built
  features (RSS, llms.txt, Pagefind UI, charts). Read before implementing any of those.
- `.agents/skills/` — workflow skills (`new-article`, `new-component`) plus generic
  methodology skills. Skills are auto-discovered; no manual registration needed.
- `DESIGN.md` — visual/design spec (repo root). Consult before changing visual styling.
- `justfile` — every project command. Use it; do not reinvent commands.

## Content structure

- Articles live in `src/content/blog/<slug>/index.mdx` — one folder per article, with
  `index.mdx` as the entry. The folder name is the URL slug (`/blog/<slug>/`).
- Co-locate **one-off** components and images inside the article folder.
- Only **frequently-reused or style-critical** components belong in `src/components/`.
- Schema lives in `src/content.config.ts`. Frontmatter: `title`, `description`, `tags`
  (string[]), `pubDate` (date), `draft` (bool).
- `draft: true` hides an article from list pages but keeps it reachable by direct URL.

## Conventions

- **Base path:** the site is served under `/blog/`. Never hardcode `/blog/`; build
  internal links and asset paths from `import.meta.env.BASE_URL`.
- **Commits:** Conventional Commits, **no scope** (use the `conventional-commits` skill).
  Changes under `src/content/**/*.mdx` are `feat`/`fix`, **never `docs`** — article content
  renders directly to the published pages.
- **Commands:** see `justfile` (`just --list`). Run `just verify` before pushing. When
  running the dev server in an agent session, prefer `astro dev --background` (manage with
  `astro dev stop` / `status` / `logs`).
- **Tests:** vitest unit tests for shared `src/components/` (Astro Container API);
  Playwright E2E in `tests/e2e/`. Details in QUALITY.md.

## Keep in sync

| When this changes | Update |
| --- | --- |
| Frontmatter / content schema | `src/content.config.ts` + this file §Content structure + SPEC.md |
| Directory or component-placement rules | this file §Content structure |
| A SPEC feature gets implemented | move it out of SPEC.md §Deferred; update REFERENCES if a dep was added |
| Commands / scripts | `justfile` (+ `.github/workflows/` if a CI gate changes) |
| Quality or lint rules | `biome.json` + QUALITY.md |
