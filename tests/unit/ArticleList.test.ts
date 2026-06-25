import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ArticleList from "../../src/components/ArticleList.astro";
import { fakePost } from "./fixtures";

test("renders eyebrow, title, count and the intro when provided", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(ArticleList, {
		props: {
			items: [fakePost],
			eyebrow: "Research ・ Papers",
			title: "研究・論文",
			intro: "視覚AIに関する記録の一覧です。",
		},
	});
	expect(html).toContain("研究・論文");
	expect(html).toContain("Research ・ Papers");
	expect(html).toContain("視覚AIに関する記録の一覧です。");
	expect(html).toContain("1 件");
	expect(html).toContain("デモ記事タイトル");
});

test("omits the description line when no intro is given", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(ArticleList, {
		props: { items: [fakePost], eyebrow: "Tag", title: "#物体検出" },
	});
	expect(html).not.toContain("視覚AIに関する記録の一覧です。");
	expect(html).toContain("1 件");
});

test("shows an empty state when there are no items", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(ArticleList, {
		props: { items: [], eyebrow: "Tag", title: "#なし" },
	});
	expect(html).toContain("記事はまだありません");
	expect(html).toContain("0 件");
});
