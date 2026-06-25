import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PostMeta from "../../src/components/PostMeta.astro";

// Reference unit-test pattern for shared `.astro` components: render with the
// Astro Container API (no extra deps) and assert on the produced HTML string.

test("renders byline, formatted date, source and reading time", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(PostMeta, {
		props: {
			authors: ["林 玲奈"],
			pubDate: new Date("2026-06-20T00:00:00Z"),
			source: "社内テックレポート",
			readingMinutes: 3,
		},
	});

	expect(html).toContain("林 玲奈");
	expect(html).toContain("2026.06.20");
	expect(html).toContain("社内テックレポート");
	expect(html).toContain("約3分");
});

test("omits the byline line when there are no authors", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(PostMeta, {
		props: { pubDate: new Date("2026-06-20T00:00:00Z") },
	});

	expect(html).toContain("2026.06.20");
	expect(html).not.toContain("約");
});
