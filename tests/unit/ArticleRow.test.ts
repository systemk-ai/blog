import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ArticleRow from "../../src/components/ArticleRow.astro";
import { fakePost } from "./fixtures";

test("renders title, date, topic, summary, source and a slug link", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(ArticleRow, {
		props: { post: fakePost },
	});
	expect(html).toContain("デモ記事タイトル");
	expect(html).toContain("2026.06.20");
	expect(html).toContain("物体検出"); // first tag = topic + a tag pill
	expect(html).toContain("一覧カード用の要約。");
	expect(html).toContain("出典 2026");
	expect(html).toContain("demo-article/");
});

test("falls back to description when summary is absent", async () => {
	const container = await AstroContainer.create();
	const post = { ...fakePost, data: { ...fakePost.data, summary: undefined } };
	const html = await container.renderToString(ArticleRow, { props: { post } });
	expect(html).toContain("メタ用の説明文。");
});
