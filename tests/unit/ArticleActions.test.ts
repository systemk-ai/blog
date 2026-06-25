import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import ArticleActions from "../../src/components/ArticleActions.astro";

test("renders the copy button and a dropdown linking to the .md twin and GitHub source", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(ArticleActions, {
		props: {
			mdUrl: "/blog/demo-article.md",
			ghUrl: "https://github.com/systemk-ai/blog/blob/main/x.mdx",
		},
	});
	expect(html).toContain("コピー");
	expect(html).toContain("Markdownで開く");
	expect(html).toContain("GitHubソースを開く");
	expect(html).toContain('href="/blog/demo-article.md"');
	expect(html).toContain(
		'href="https://github.com/systemk-ai/blog/blob/main/x.mdx"',
	);
	// The copy script reads the markdown URL from this attribute.
	expect(html).toContain('data-md="/blog/demo-article.md"');
});
