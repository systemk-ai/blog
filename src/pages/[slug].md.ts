import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute } from "astro";

// Plain-markdown twin of each article, served at /blog/<slug>.md. Emits a small
// frontmatter header + the authored body (MDX articles include their source as authored).
export async function getStaticPaths() {
	const posts = await getCollection("blog");
	return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
	const post = props.post as CollectionEntry<"blog">;
	const front = [
		"---",
		`title: ${post.data.title}`,
		`date: ${post.data.pubDate.toISOString().slice(0, 10)}`,
	];
	if (post.data.source) front.push(`source: ${post.data.source}`);
	if (post.data.tags.length) front.push(`tags: [${post.data.tags.join(", ")}]`);
	front.push("---", "");

	// Drop MDX `import` lines so the twin reads as plain markdown.
	const content = post.body.replace(/^import\s.+\r?\n/gm, "").trimStart();
	const body = `${front.join("\n")}\n${content}\n`;
	return new Response(body, {
		headers: { "Content-Type": "text/markdown; charset=utf-8" },
	});
};
