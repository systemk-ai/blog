---
name: new-article
description: Create a new blog article in this Astro blog. Use when adding, drafting, or scaffolding a post under src/content/blog, or when the user says "write a new post/article", "add a blog entry", or "start a draft".
---

# New Article

Create one article as a **folder** under `src/content/blog/`. The loader only picks up
`**/index.mdx`. Article copy is **Japanese** (see DESIGN.md §Voice & language).

## Steps

1. **Pick a kebab-case slug** — it becomes the URL (`/blog/<slug>/`). Create
   `src/content/blog/<slug>/index.mdx`.
2. **Write the frontmatter** (schema enforced by `src/content.config.ts`):
   ```yaml
   ---
   title: "記事タイトル"
   description: "一覧・<meta>・フィードで使う一文。"
   summary: "一覧カード用の少し長い説明（任意。省略時は description を使用）。"
   type: research          # research（研究・論文）| case（導入事例）
   tags: ["物体検出"]       # string[]; [] if none
   source: "CVPR 2026"     # optional — publication / venue
   authors: ["hayashi"]    # references src/content/authors/<id>
   pubDate: 2026-06-25     # YYYY-MM-DD
   draft: false            # true = hidden from lists, still reachable by URL
   ---
   ```
3. **Write the body** in MDX. Available out of the box:
   - **Math:** inline `$...$`, display `$$...$$` (KaTeX).
   - **Code:** fenced blocks via Expressive Code — the meta string adds features, e.g.
     ` ```py title="train.py" {2} ` gives a filename tab, copy button and a highlighted
     line; long lines soft-wrap by default (`wrap=false` to opt out).
   - **Headings:** `##` headings are auto-anchored and populate the article TOC.
4. **Custom components in MDX** — import and render them:
   - One-off, co-located: `import Note from "./Note.astro"` then `<Note .../>`. Keep
     single-use components and images **inside the article folder**.
   - Shared (e.g. charts): `import EChart from "../../../components/EChart.tsx"` then
     `<EChart client:visible option={chartOption} height={260} />` (charts are DOM-only —
     always a client directive). Promote a component to `src/components/` only when it is
     frequently reused or style-critical (then it's a `new-component` task).
   - See `src/content/blog/object-detection-pretraining/index.mdx` for a worked example.
5. **Base-aware paths:** build any site path from `` `${import.meta.env.BASE_URL}...` ``,
   never a hardcoded `/blog/`.
6. **Authors & tags:** each `authors` id must have `src/content/authors/<id>/index.mdx`. To
   give a tag a shared description on its tag page, add it to `src/content/tags.json`
   (optional — tags without an entry show no description).

The article is automatically indexed for **search** (Pagefind) and included in the **RSS**
feed; no extra wiring is needed.

## Verify

- `just build` succeeds; the article appears under its `type` on the home page and the
  `research`/`cases` list. A `draft: true` article is absent from lists but reachable at
  `/blog/<slug>/`.

## Commit

Conventional Commits, **no scope**. A new or edited article under `src/content/**/*.mdx` is
`feat` (new/expanded content) or `fix` (correction) — **never `docs`**, because the content
renders directly to the published site. Use the `conventional-commits` skill.
