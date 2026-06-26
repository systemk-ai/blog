# REFERENCES

External documentation, grouped by topic. Read the relevant entry before using an
unfamiliar API rather than relying on memory. All links verified reachable on
2026-06-25; if one 404s, find the current page and update it here in the same commit.

## Astro (framework)

- Configuration reference — https://docs.astro.build/en/reference/configuration-reference/
- Content collections — https://docs.astro.build/en/guides/content-collections/
- Markdown content & plugins — https://docs.astro.build/en/guides/markdown-content/
- MDX integration — https://docs.astro.build/en/guides/integrations-guide/mdx/
- Endpoints (static files, `.txt`/`.md`/`.xml`) — https://docs.astro.build/en/guides/endpoints/
- Images & assets — https://docs.astro.build/en/guides/images/
- Styling & Tailwind — https://docs.astro.build/en/guides/styling/
- Container API (unit-testing components) — https://docs.astro.build/en/reference/container-reference/
- Testing overview — https://docs.astro.build/en/guides/testing/
- Deploy to GitHub Pages — https://docs.astro.build/en/guides/deploy/github/
- Upgrade roadmap / breaking changes — https://github.com/withastro/roadmap

## Content features

- RSS guide — https://docs.astro.build/en/guides/rss/ (recipe: https://docs.astro.build/en/recipes/rss/)
- remark-math — https://github.com/remarkjs/remark-math
- rehype-katex — https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
- rehype-slug — https://github.com/rehypejs/rehype-slug
- rehype-autolink-headings — https://github.com/rehypejs/rehype-autolink-headings
- KaTeX supported functions — https://katex.org/docs/supported.html
- ECharts (charts) — https://echarts.apache.org/en/index.html
- Expressive Code (code blocks: copy, frames, highlight, wrap) — https://expressive-code.com/
- MDX language — https://mdxjs.com/
- Tailwind CSS — https://tailwindcss.com/docs

## Search

- Pagefind — https://pagefind.app/ (repo: https://github.com/CloudCannon/pagefind)
- Pagefind JS API (powers the header type-ahead) — https://pagefind.app/docs/api/
- astro-pagefind (build index + serve in dev) — https://github.com/shishkin/astro-pagefind

## Quality & testing

- Biome — getting started: https://biomejs.dev/guides/getting-started/
- Biome — configuration: https://biomejs.dev/reference/configuration/
- Biome — linter & rules: https://biomejs.dev/linter/ (JS rules: https://biomejs.dev/linter/javascript/rules/)
- Biome — formatter: https://biomejs.dev/formatter/
- Vitest — https://vitest.dev/guide/
- Playwright — https://playwright.dev/docs/intro

## CI/CD & tooling

- GitHub Actions — https://docs.github.com/en/actions (llms.txt: https://docs.github.com/llms.txt)
- GitHub Pages — https://docs.github.com/en/pages
- **Astro → GitHub Pages static deploy (the flow `deploy.yml` follows)** —
  https://docs.astro.build/en/guides/deploy/github/
- withastro/action (installs, builds, uploads the Pages artifact) — https://github.com/withastro/action
- actions/deploy-pages — https://github.com/actions/deploy-pages
- pnpm/action-setup (used by `ci.yml`) — https://github.com/pnpm/action-setup
- Just (command runner) — https://just.systems/man/en/

## Conventions

- Conventional Commits 1.0.0 — https://www.conventionalcommits.org/en/v1.0.0/
