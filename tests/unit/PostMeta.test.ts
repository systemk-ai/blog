import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostMeta from "../../src/components/PostMeta.astro";

// Reference unit-test pattern for shared `.astro` components: render with the
// Astro Container API (no extra deps) and assert on the produced HTML string.

test("renders the ISO date and tags, no draft badge by default", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(PostMeta, {
		props: {
			pubDate: new Date("2026-06-25T00:00:00Z"),
			tags: ["intro", "meta"],
		},
	});

	expect(html).toContain("2026-06-25");
	expect(html).toContain("intro");
	expect(html).toContain("meta");
	expect(html).not.toContain("Draft");
});

test("shows the draft badge when draft is true", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(PostMeta, {
		props: { pubDate: new Date("2026-06-26T00:00:00Z"), draft: true },
	});

	expect(html).toContain("Draft");
});
