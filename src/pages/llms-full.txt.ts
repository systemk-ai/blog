import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

// llms-full.txt — every non-draft article's full source concatenated, for LLMs that
// want the whole corpus in one request. Served at /blog/llms-full.txt.
export const GET: APIRoute = async () => {
	const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const body = posts
		.map(
			(p) =>
				`# ${p.data.title}\n\n${p.body.replace(/^import\s.+\r?\n/gm, "").trim()}`,
		)
		.join("\n\n---\n\n");

	return new Response(`${body}\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
