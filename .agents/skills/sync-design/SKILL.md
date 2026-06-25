---
name: sync-design
description: Keep DESIGN.md and the runtime styling in step. Use when changing the Tailwind @theme tokens in src/styles/global.css, the .sk-prose layer, shared visual components, colours, typography, spacing, motion, or any visual rule — or when re-importing the design system.
---

# Sync: design

**DESIGN.md** is the visual spec; the Tailwind **`@theme`** block in `src/styles/global.css`
is its runtime implementation. When either changes, reconcile them in the same commit:

1. A token value changed in `@theme` → update the matching value/rule in **DESIGN.md**
   (and vice-versa). They must agree.
2. A new shared component or visual pattern → describe it in **DESIGN.md §Components**.
3. Keep DESIGN.md lint-clean: `npx -y @google/design.md lint DESIGN.md` (0 errors).
4. Styling stays **Tailwind-first**: no external CSS; hand-written CSS only for the `@theme`
   tokens and `.sk-prose`. Fonts use system stacks.

Re-importing the design system: read the source design project with the design MCP
(authenticate via `/design-login`) and reconcile token-by-token. **Do not commit the
design-source project IDs or URLs** — treat them as confidential.
