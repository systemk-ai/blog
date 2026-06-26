import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import SiteHeader from "../../src/components/SiteHeader.astro";

test("renders the brand, nav, search box and RSS link", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(SiteHeader, { props: {} });
	expect(html).toContain("SystemK");
	expect(html).toContain("ホーム");
	expect(html).toContain("研究・論文");
	expect(html).toContain("導入事例");
	expect(html).toContain('placeholder="記事を検索"');
	expect(html).toContain("rss.xml");
});

test("marks the active nav item as strong", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(SiteHeader, {
		props: { active: "research" },
	});
	// The active item gets the strong text colour utility.
	expect(html).toContain("text-strong");
});
