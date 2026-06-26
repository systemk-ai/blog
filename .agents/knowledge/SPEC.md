# SPEC

Feature architecture for the blog. **Implemented** describes what exists today; **Deferred**
specifies designed-but-unbuilt features. When you ship a deferred feature, move it up to
Implemented in the same commit (the `sync-spec` skill covers this) and update REFERENCES.md
if it adds a dependency.

## Goals

A calm, fast, static research blog (SystemK AI). No client JS except where a feature needs it
(charts, search). Deployed to GitHub Pages at `/blog/`. Authoring is MDX with co-located
components/assets. Japanese-primary content (see DESIGN.md §Voice & language).

## Implemented

### Content model

- Collections in `src/content.config.ts`:
  - `blog` — glob `src/content/blog/<slug>/index.mdx` (folder-per-article). The id is the
    folder name (loader strips trailing `/index`). Use `entry.id` (Astro 7 has no `slug`).
  - `authors` — glob `src/content/authors/<id>/index.mdx` (folder-per-author, so bios can
    embed components/assets). Body is the bio.
  - `tags` — `file()` loader on `src/content/tags.json`; optional `{ description }` per tag,
    keyed by tag name. Tags used by articles but absent here have **no** description (the tag
    page omits the description line).
- Article frontmatter (zod): `title`, `description`, `summary?`, `type` (`research`|`case`),
  `tags` (string[]), `source?`, `authors` (`z.array(reference("authors"))`), `pubDate`,
  `draft` (default `false`). Author schema: `nameJa`, `nameEn`, `role`, `affiliation?`, `links`.
- **Two streams:** `type: research`（研究・論文）and `type: case`（導入事例）drive the home
  sections and the list pages.
- **Drafts:** excluded from all list pages (`!data.draft` filter); `getStaticPaths` still
  enumerates every entry, so a draft is built and reachable at its direct URL.

### Routing (under base `/blog/`)

- `index.astro` — home: hero + latest + Research + Cases sections.
- `research.astro`, `cases.astro` — type-filtered list pages.
- `[...slug].astro` — article (rest param; renders via `render(post)`; resolves `authors`
  with `getEntries`; reading-time estimate; TOC + scroll-spy from `headings`). Body wrapped
  in `<article data-pagefind-body>`.
- `tags/[tag].astro`, `authors/[id].astro` — tag and author index pages.
- `search.astro` — Pagefind UI page. `rss.xml.ts` — RSS feed endpoint.
- `[slug].md.ts` — plain-markdown twin of each article at `/blog/<slug>.md` (frontmatter +
  authored body; single-segment param — a rest param `[...slug].md` 404s in `astro dev`). The
  article header's `ArticleActions` control copies it, opens it in a new tab, or opens the
  GitHub source.
- `llms.txt.ts`, `llms-full.txt.ts` — LLM index (links to the `.md` twins, grouped by stream)
  and full-corpus endpoints at `/blog/llms.txt` and `/blog/llms-full.txt`.
- **Base awareness:** all internal links/assets from `import.meta.env.BASE_URL` (= `/blog/`).
  Config: `base: "/blog/"` (keep the trailing slash so `BASE_URL` keeps it — `base: "/blog"`
  would make `${BASE_URL}path` resolve to `/blogpath`) + `trailingSlash: "ignore"` (so the
  parameterised `.md` endpoint serves at `/blog/<slug>.md` in `astro dev`; a trailing-slash
  config 404s it). Page links still use an explicit trailing slash.

### Rendering & styling

- Markdown/MDX via `markdown.processor: unified({...})` from `@astrojs/markdown-remark`.
  Math: `remark-math` + `rehype-katex`. Code: **astro-expressive-code** (dark theme + copy /
  filename frames / line-word highlight / soft-wrap, configured in `ec.config.mjs`; integration
  ordered before `mdx()`). Headings: `rehype-slug` then
  `rehype-autolink-headings`.
- **Styling:** Tailwind v4 utilities from the `@theme` block in the single stylesheet
  `src/styles/global.css`; `.sk-prose` styles rendered MDX. See DESIGN.md / AGENTS.md.
- **Components** (`src/components/`): `SiteHeader`, `SiteFooter`, `BaseLayout`, `ArticleRow`,
  `ArticleList`, `KindBadge`, `Tag`, `PostMeta`, `AuthorCard`, `Icon` (inline Lucide), and
  the `EChart.tsx` React island.

### Search (Pagefind)

- **astro-pagefind** integration: indexes the built HTML on `astro build` (→ `/blog/pagefind/`,
  works with `withastro/action`) and serves that index during `astro dev` — **after one build**
  (Pagefind can't live-index in dev; search is empty in dev until you've built once).
- Header **type-ahead** (`SearchBox.astro`, used by `SiteHeader`): lazy-loads the Pagefind JS
  API on first focus and shows the top 5 results in a themed dropdown (`debouncedSearch` →
  `result.data()`); plain Enter submits the form to the full page; keyboard + outside-click.
- `src/pages/search.astro` is the full results view (Pagefind UI, `bundlePath` =
  `` `${BASE_URL}pagefind/` ``, reads `?q=` to auto-search).
- Article chrome (back link, badges, tags, meta, TOC, footer) is `data-pagefind-ignore`d so
  excerpts are title + abstract + prose; the `<article>` carries `data-pagefind-body`.

### RSS

- `src/pages/rss.xml.ts` via `@astrojs/rss`: non-draft items, base-aware `link`, `language` ja.
  Served at `/blog/rss.xml`; linked from the header, footer, and `<head>`.

### Charts (ECharts)

- `src/components/EChart.tsx` — React island, `echarts` lazy-loaded (separate chunk), SVG
  renderer, DOM-only. Use in MDX with `client:visible`; pass a JSON-serialisable `option`.

## Deferred

None — all planned features are implemented. When adding a new planned-but-unbuilt feature,
record it here with its integration point (see the `sync-spec` skill).

## Open decisions

- `site`/`base` assume **project** Pages at `/blog/`. For a custom domain, set `base: "/"`,
  update `site`, and add `public/CNAME`.
- Fonts use system stacks (no external CSS). Self-host woff2 under `public/fonts` if exact
  IBM Plex / Noto JP rendering is required.
- `tags` is `string[]`. To accept a single string, add a `z.union([...]).transform(...)`.
