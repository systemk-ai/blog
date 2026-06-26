import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const base = import.meta.env.BASE_URL;
	const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: "SystemK AI",
		description:
			"株式会社システムケイ AI研究開発部門 — 視覚AIと生成AIの研究記録と導入事例。",
		site: context.site ?? "https://systemk-ai.github.io",
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.summary ?? post.data.description,
			pubDate: post.data.pubDate,
			link: `${base}${post.id}/`,
			categories: post.data.tags,
		})),
		customData: "<language>ja</language>",
	});
}
