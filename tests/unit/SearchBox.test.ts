import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import SearchBox from "../../src/components/SearchBox.astro";

test("renders the search form, query input and the dropdown container", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(SearchBox, { props: {} });

	expect(html).toMatch(/action="[^"]*\/search\/"/); // submits to the full search page
	expect(html).toContain('name="q"');
	expect(html).toContain('placeholder="記事を検索"');
	expect(html).toContain("data-searchbox");
	expect(html).toContain("data-search-input");
	expect(html).toContain("data-search-dropdown");
});
