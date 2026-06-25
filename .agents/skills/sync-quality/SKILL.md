---
name: sync-quality
description: Keep QUALITY.md and the CI gate aligned with the tooling. Use when editing biome.json, justfile, package.json scripts, vitest.config.ts, playwright.config.ts, .pre-commit-config.yaml, or .github/workflows/*.
---

# Sync: quality & tooling

When quality tooling, commands, or CI change, update in the same commit:

1. **.agents/knowledge/QUALITY.md** — Biome rules, how to check, test conventions, CI gate
   order. It must describe what the config actually enforces.
2. **justfile** — if a command changed (it is the single source of commands).
3. **.github/workflows/** — if a gate (lint / unit / build / e2e / deploy) changed.
4. Keep `just verify` and the `ci.yml` gate in agreement.
