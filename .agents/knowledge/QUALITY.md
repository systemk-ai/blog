# QUALITY

Code-quality and testing requirements. Config lives in `biome.json`,
`.pre-commit-config.yaml`, `vitest.config.ts`, and `playwright.config.ts`; this file
explains what they enforce and how to run the checks. Keep it in sync with those files.

## Linting & formatting — Biome

Single tool for both lint and format (`biome.json`, schema 2.5.1).

What is enforced:

- **Formatter:** enabled, **tab** indentation; JavaScript/TS strings use **double quotes**.
- **Linter:** the Biome **`recommended`** rule set (correctness, suspicious, a11y, style, …).
- **Import organization:** `assist.actions.source.organizeImports` is on — imports are
  sorted/grouped automatically.
- **VCS-aware:** respects `.gitignore` (`vcs.useIgnoreFile`).
- **Files:** `*.svg` is excluded (favicon assets are not source; inline SVG inside
  `.astro`/`.tsx` is still linted).
- **Framework overrides** (`.astro`, `.svelte`, `.vue`): `useConst`, `useImportType`,
  `noUnusedVariables`, `noUnusedImports` are disabled to avoid false positives from the
  compiler-managed component frontmatter.

How to check:

| Goal | Command |
| --- | --- |
| Check lint + format (no writes) | `just check` (= `pnpm check` = `biome check`) |
| Auto-fix lint + format | `just fix` (= `pnpm check:fix` = `biome check --write`) |
| CI mode (no writes, non-zero on issues) | `pnpm ci` (= `biome ci`) |

Rule reference: see REFERENCES.md → Biome. Disable a rule project-wide only via
`biome.json` (with a one-line rationale), never with scattered inline ignores.

## Pre-commit hooks

`.pre-commit-config.yaml` runs hygiene hooks (trailing whitespace, EOF, YAML/merge/large-file
checks, mixed line endings) and **gitleaks** secret scanning. Installed by the devcontainer
(`pre-commit install`). Never commit secrets; gitleaks blocks the commit if it finds one.

## Tests

Two layers, run by separate tools and kept in separate directories.

### Unit (Vitest) — shared components & utilities

- Location: `tests/unit/**/*.{test,spec}.ts`.
- Config: `vitest.config.ts` uses `getViteConfig` from `astro/config`, so tests resolve
  `astro:*` virtual modules and can render `.astro` components.
- Pattern: render shared `.astro` components with the **Astro Container API**
  (`experimental_AstroContainer`) and assert on the returned HTML string — no extra deps.
  See `tests/unit/PostMeta.test.ts` for the reference example.
- Run: `just test` (= `pnpm test` = `vitest run`); watch mode `just test-watch`.

### End-to-end (Playwright) — pages & integration

- Location: `tests/e2e/**/*.spec.ts`.
- Config: `playwright.config.ts` runs a `webServer` (`pnpm build && pnpm preview`) and sets
  `baseURL` to `http://localhost:4321/blog/`, so tests use **relative** paths
  (`page.goto("./article-1/")`) and the `/blog/` base is applied automatically.
- Run: `just test-e2e` (= `pnpm test:e2e` = `playwright test`). First run locally needs
  `pnpm exec playwright install`.

## CI gate

`.github/workflows/ci.yml` on push/PR to `main`:

1. **quality** job: install → `biome ci` → `vitest run` → `astro build`.
2. **e2e** job (after quality): install browsers → `playwright test` → upload report.

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`.

Local equivalent before pushing: **`just verify`** (check + unit + build). Run
`just test-e2e` too when changing routing, layouts, or rendering.
