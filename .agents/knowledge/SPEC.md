# SPEC

Feature architecture for the blog. The **Implemented** section describes what exists
today; the **Deferred** section specifies features that are designed but not yet built.
When you implement a deferred feature, move it up to Implemented in the same commit and
update REFERENCES.md if it adds a dependency (see AGENTS.md §Keep in sync).

## Goals

Minimal, fast, static blog. No client JS except where a feature requires it (e.g. charts,
search). Deployed to GitHub Pages at `/blog/`. Authoring is plain MDX with co-located
assets.

## Implemented

### Content model

- Collection `blog` defined in `src/content.config.ts` via the **glob loader**
  (`pattern: "**/index.mdx"`, `base: "./src/content/blog"`).
- One folder per article: `src/content/blog/<slug>/index.mdx`. The loader derives the
  entry `id` from the folder, stripping the trailing `/index` — so
  `article-1/index.mdx` → id `article-1`. Use `entry.id` (Astro 7 has no `entry.slug`).
- Frontmatter schema (zod): `title` (string), `description` (string), `tags`
  (string[], default `[]`), `pubDate` (coerced date), `draft` (bool, default `false`).
- **Drafts:** excluded from list pages (`getCollection('blog', ({data}) => !data.draft)`),
  but `getStaticPaths` enumerates **all** entries, so a draft is still built and reachable
  at its direct URL.

### Routing (under base `/blog/`)

- `src/pages/index.astro` — homepage = article list (drafts filtered out, sorted by
  `pubDate` desc).
- `src/pages/[...slug].astro` — article page; rest param so nested ids resolve; renders via
  `import { render } from "astro:content"`. Body wrapped in `<article data-pagefind-body>`
  (ready for Pagefind indexing).
- **Base awareness:** internal links/assets are built from `import.meta.env.BASE_URL`
  (`/blog/`); never hardcode the prefix. `trailingSlash: "always"`.

### Rendering pipeline (`astro.config.mjs`)

- Markdown/MDX plugins are configured through `markdown.processor: unified({...})` from
  `@astrojs/markdown-remark` (Astro 7; the `remarkPlugins`/`rehypePlugins` keys are
  deprecated). MDX inherits this config.
- **Math:** `remark-math` + `rehype-katex`; KaTeX CSS imported in `src/styles/global.css`.
- **Code:** Astro's built-in Shiki highlighting (default; preserved by the unified processor).
- **Headings:** `rehype-slug` (ids) then `rehype-autolink-headings` (`behavior: "wrap"`).
- Shared metadata UI: `src/components/PostMeta.astro` (date + tags + draft badge).

## Deferred

Each item lists its integration point and approach. Do not pre-build these; implement when
requested.

### RSS feed

- **Status:** not built. Dependency `@astrojs/rss` already installed.
- **Integration point:** static endpoint `src/pages/rss.xml.ts` exporting `GET(context)`.
- **Approach:** `rss({ site: context.site, items })` where `items` come from
  `getCollection('blog', ({data}) => !data.draft)`. Each `link` must be base-aware:
  `` `${import.meta.env.BASE_URL}${post.id}/` ``. Served at `/blog/rss.xml`.
- **Ref:** REFERENCES.md → RSS guide.

### llms.txt / llms-full.txt / per-page `.md`

- **Status:** not built. No official Astro recipe — use custom static endpoints.
- **Integration points:**
  - `src/pages/llms.txt.ts` — index (title + description + URL per non-draft article).
  - `src/pages/llms-full.txt.ts` — same, concatenating full bodies (`entry.body`).
  - `src/pages/[...slug].md.ts` — `getStaticPaths` over the collection, emitting
    `entry.body` as `text/markdown` so each page has a `.md` twin.
- **Approach:** endpoints `GET` returns `new Response(text, { headers: {...} })`. Static
  endpoints run at build time and may call `getCollection`. All URLs sit under `/blog/`.
- **Ref:** REFERENCES.md → Endpoints.

### Pagefind search UI

- **Status:** not built. Index hook (`data-pagefind-body`) already present on articles.
- **Integration point:** post-build CLI `pnpm exec pagefind --site dist` (see the
  `search-index` recipe in `justfile`; add the same step to `deploy.yml`), plus a search UI
  component/island that loads the Pagefind bundle.
- **Gotcha:** under the `/blog/` base the bundle is served at `/blog/pagefind/`; configure
  the Pagefind UI `bundlePath` to `` `${import.meta.env.BASE_URL}pagefind/` `` — the default
  `/pagefind/` 404s on GitHub Pages.
- **Ref:** REFERENCES.md → Pagefind.

### Charts (ECharts)

- **Status:** not built. Dependency `echarts` + `@astrojs/react` installed.
- **Integration point:** shared React island `src/components/EChart.tsx`, imported in MDX
  and hydrated with `client:visible` (ECharts needs the DOM — never SSR; never `client:load`
  for above-the-fold-only charts use `client:visible`).
- **Ref:** REFERENCES.md → ECharts.

### Tag / archive index pages

- **Status:** not built. `tags` exist in the schema but no listing pages consume them yet.
- **Integration point:** `src/pages/tags/[tag].astro` with `getStaticPaths` building one
  page per distinct tag from `getCollection('blog')` (exclude drafts).

## Open decisions

- `site`/`base` assume **project** Pages at `/blog/`. If a custom domain is adopted, set
  `base: "/"`, update `site`, and add `public/CNAME`.
- `tags` is modeled as `string[]`. If single-string frontmatter should be accepted, add a
  `z.union([...]).transform(...)` in `src/content.config.ts` and note it here.
