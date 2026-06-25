import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Icon from "../../src/components/Icon.astro";

test("renders an aria-hidden svg at the requested size with the named glyph", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Icon, {
		props: { name: "rss", size: 20 },
	});
	expect(html).toContain("<svg");
	expect(html).toContain('aria-hidden="true"');
	expect(html).toContain('width="20"');
	expect(html).toContain('stroke="currentColor"');
	expect(html).toContain("<path");
});

test("renders an empty svg for an unknown icon name", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Icon, {
		props: { name: "does-not-exist" },
	});
	expect(html).toContain("<svg");
	expect(html).not.toContain("<path");
});
