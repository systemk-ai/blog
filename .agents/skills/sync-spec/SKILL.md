---
name: sync-spec
description: Keep SPEC.md current as deferred features ship. Use when implementing a feature listed in SPEC.md §Deferred (e.g. llms.txt / per-page .md, tag index), or when adding a new planned-but-unbuilt feature to the project.
---

# Sync: SPEC / features

`.agents/knowledge/SPEC.md` separates **Implemented** from **Deferred**. When a deferred
feature ships:

1. Move its entry from **§Deferred** to **§Implemented**, describing the real implementation
   (files, integration point) rather than the plan.
2. If it added a dependency or external doc, update **REFERENCES.md**.
3. If it added routes, collections, or shared components, also trigger the `sync-structure`
   and `sync-content-model` skills.

When adding a new planned feature, record it under **§Deferred** with its integration point
so a later agent can implement it without re-deriving the approach.
