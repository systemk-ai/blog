---
name: sync-structure
description: Keep AGENTS.md §Structure aligned with the repo's actual layout. Use when adding, removing, renaming, or moving a top-level directory or major module under src/, .agents/, tests/, or .github/, or when adding a new route group, content collection, or shared subsystem.
---

# Sync: repo structure

When the project's module layout changes, update **AGENTS.md §Structure** in the same commit.

Triggers: a new directory under `src/` (e.g. `src/lib/`), a new route group under
`src/pages/`, a new content collection, a renamed or moved layout/component directory.

Steps:

1. Edit **AGENTS.md §Structure** to reflect the change — **major modules only** (one line per
   module; do not enumerate individual files).
2. If the change adds or renames a content collection or route, also check
   **AGENTS.md §Content structure**.
3. Keep AGENTS.md ≤150 lines (target ≤100).
