import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import BaseLayout from "../../src/layouts/BaseLayout.astro";

test("renders the document shell with title, lang, header, footer and slot", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(BaseLayout, {
		props: { title: "テストページ", description: "説明文" },
		slots: { default: "<p>本文コンテンツ</p>" },
	});
	expect(html).toContain("<title>テストページ｜SystemK AI</title>");
	expect(html).toContain('lang="ja"');
	expect(html).toContain('name="description"');
	expect(html).toContain("本文コンテンツ"); // slot
	expect(html).toContain("ホーム"); // header nav
	expect(html).toContain("System K Corp"); // footer
});

test("does not suffix the brand title on the home page", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(BaseLayout, {
		props: { title: "SystemK AI" },
		slots: { default: "" },
	});
	expect(html).toContain("<title>SystemK AI</title>");
});
