import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import KindBadge from "../../src/components/KindBadge.astro";

test("research badge reads Paper", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(KindBadge, {
		props: { type: "research" },
	});
	expect(html).toContain("Paper");
});

test("case badge reads Case", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(KindBadge, {
		props: { type: "case" },
	});
	expect(html).toContain("Case");
});
