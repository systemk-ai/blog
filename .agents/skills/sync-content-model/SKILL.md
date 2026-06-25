---
name: sync-content-model
description: Keep the documented content model in step with the schema. Use when editing src/content.config.ts, changing article or author frontmatter fields, adding a content collection, or changing draft/type/tag semantics.
---

# Sync: content model

When `src/content.config.ts` or the frontmatter shape changes, update in the same commit:

1. **AGENTS.md §Content structure** — the frontmatter field list and any placement rules.
2. **.agents/knowledge/SPEC.md §Content model** — schema description and semantics.
3. **Existing content** that the change affects (e.g. backfill a new required field across
   `src/content/blog/**` and `src/content/authors/**`).
4. If a field drives the design (e.g. a new `type` → a new badge), record it in **DESIGN.md**
   and trigger the `sync-design` skill.
