import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Tag from "../../src/components/Tag.astro";

test("renders a #-prefixed, base-aware tag link", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Tag, {
		props: { name: "物体検出" },
	});

	expect(html).toContain("#物体検出");
	// Links into the tag route (encoded), under the configured base.
	expect(html).toContain("tags/");
});
