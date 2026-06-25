import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute } from "astro";

// llms.txt — an index for LLMs: title + summary + a link to each article's plain
// markdown twin (.md), grouped by stream. https://llmstxt.org/. Served at /blog/llms.txt.
export const GET: APIRoute = async ({ site }) => {
	const base = import.meta.env.BASE_URL;
	const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const mdUrl = (p: CollectionEntry<"blog">) =>
		new URL(`${base}${p.id}.md`, site).href;

	const section = (type: "research" | "case", label: string) => {
		const items = posts.filter((p) => p.data.type === type);
		if (!items.length) return "";
		const lines = items.map(
			(p) =>
				`- [${p.data.title}](${mdUrl(p)}): ${p.data.summary ?? p.data.description}`,
		);
		return `## ${label}\n\n${lines.join("\n")}\n`;
	};

	const body = [
		"# SystemK AI",
		"",
		"> 株式会社システムケイ AI研究開発部門 — 視覚AIと生成AIの研究記録と導入事例。",
		"",
		section("research", "研究・論文"),
		section("case", "導入事例"),
	]
		.filter(Boolean)
		.join("\n");

	return new Response(`${body}\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
