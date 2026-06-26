---
name: new-component
description: Add a component to this Astro blog and decide where it belongs (shared vs co-located) and how to test it. Use when creating an .astro or React component, extracting reusable UI, or asking "where should this component go" / "how do I unit-test this component".
---

# New Component

## Decide placement first

- **Co-locate** in the article folder (`src/content/blog/<slug>/`) if the component is
  **used by a single article**. This is the default — keep one-offs out of `src/components/`.
- **Promote to `src/components/`** only if the component is **frequently reused across
  articles** or is **style-critical** (shared visual identity). Shared components are the
  ones that get unit tests.

If unsure, co-locate; promote later when a second article needs it.

## Build it

- Prefer a plain `.astro` component (zero client JS). Reach for a React island (`.tsx`)
  only when client interactivity is required, and hydrate with the narrowest directive
  (`client:visible` over `client:load`). React is already wired via `@astrojs/react`.
- Make components **base-aware**: build any internal URL from `import.meta.env.BASE_URL`.
- Keep props typed (`interface Props` in `.astro`, typed props in `.tsx`).

## Test shared components (required for `src/components/`)

Add a Vitest unit test in `tests/unit/<Name>.test.ts` using the **Astro Container API** —
no extra dependencies. Reference: `tests/unit/PostMeta.test.ts`.

```ts
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import MyComponent from "../../src/components/MyComponent.astro";

test("renders expected output", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(MyComponent, { props: { /* ... */ } });
	expect(html).toContain("…");
});
```

- Unit-test the **rendered output / behavior**, not internal markup details.
- Use a Playwright E2E test in `tests/e2e/` instead (or in addition) when the behavior
  only emerges in a real browser (hydration, navigation, client interactivity).
- Co-located one-off components don't need a unit test unless they carry real logic.

## Verify & commit

- `just test` (unit) green; `just check` clean; `just build` succeeds.
- Commit with Conventional Commits, no scope: `feat` for a new component, `fix` for a
  bug fix, `refactor` for a no-behavior-change restructure. See QUALITY.md for the gate.
