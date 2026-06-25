---
name: new-article
description: Create a new blog article in this Astro blog. Use when adding, drafting, or scaffolding a post under src/content/blog, or when the user says "write a new post/article", "add a blog entry", or "start a draft".
---

# New Article

Create one article as a **folder** under `src/content/blog/`. Do not put loose `.mdx`
files at the collection root — the loader only picks up `**/index.mdx`.

## Steps

1. **Pick a kebab-case slug** — it becomes the URL (`/blog/<slug>/`). Create
   `src/content/blog/<slug>/index.mdx`.
2. **Write the frontmatter** (schema enforced by `src/content.config.ts`):
   ```yaml
   ---
   title: "Human-readable title"
   description: "One sentence used for listings, <meta>, and feeds."
   tags: ["tag-a", "tag-b"]   # string[]; [] if none
   pubDate: 2026-06-25         # YYYY-MM-DD
   draft: false                # true = hidden from lists, still reachable by URL
   ---
   ```
3. **Write the body** in MDX. Available out of the box:
   - **Math:** inline `$...$`, display `$$...$$` (KaTeX).
   - **Code:** fenced blocks with a language tag (Shiki highlighting).
   - **Headings:** auto-anchored — just write `##` headings.
4. **Co-locate one-off assets** (images, single-use components) **inside the article
   folder** and import them with a relative path. Promote a component to
   `src/components/` only if it becomes frequently reused or is style-critical (then it's a
   `new-component` task).
5. **Links/assets to site paths** must be base-aware: use
   `` `${import.meta.env.BASE_URL}...` ``, never a hardcoded `/blog/`.
6. **Charts / search / feeds** are deferred features — see `.agents/knowledge/SPEC.md`
   before wiring them (e.g. `<EChart>` is not built yet).

## Verify

- `just build` succeeds.
- A non-draft article appears on the homepage list; a `draft: true` article does **not**
  appear there but its page exists at `/blog/<slug>/`.

## Commit

Conventional Commits, **no scope**. A new or edited article under `src/content/**/*.mdx`
is `feat` (new/expanded content) or `fix` (correction) — **never `docs`**, because the
content renders directly to the published site. Use the `conventional-commits` skill.
