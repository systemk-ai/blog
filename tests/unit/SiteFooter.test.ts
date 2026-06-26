import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import SiteFooter from "../../src/components/SiteFooter.astro";

test("renders brand, content/source columns, RSS and the copyright", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(SiteFooter, { props: {} });
	expect(html).toContain("SystemK");
	expect(html).toContain("コンテンツ");
	expect(html).toContain("ソース");
	expect(html).toContain("研究・論文");
	expect(html).toContain("RSS");
	expect(html).toContain("GitHub");
	expect(html).toContain("System K Corp");
});
