import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

// Authors (作者). Folder-per-author: src/content/authors/<id>/index.mdx, so an
// author bio can embed custom components and co-located assets (like articles).
// The id is derived from the folder name (e.g. hayashi/index.mdx -> "hayashi").
const authors = defineCollection({
	loader: glob({ pattern: "**/index.mdx", base: "./src/content/authors" }),
	schema: z.object({
		nameJa: z.string(),
		nameEn: z.string(),
		role: z.string(),
		affiliation: z.string().optional(),
		links: z
			.array(z.object({ label: z.string(), href: z.string().url() }))
			.default([]),
	}),
});

// Folder-per-article: each post lives at src/content/blog/<slug>/index.mdx.
// The glob loader derives the entry id from the folder name (it strips the
// trailing `/index`), so `article-1/index.mdx` becomes id `article-1`.
const blog = defineCollection({
	loader: glob({ pattern: "**/index.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		// Short SEO/meta description.
		description: z.string(),
		// Longer list-card blurb; falls back to `description` when omitted.
		summary: z.string().optional(),
		// Two content streams: 研究・論文 (research) and 導入事例 (case).
		type: z.enum(["research", "case"]),
		tags: z.array(z.string()).default([]),
		// Publication venue / origin shown in meta, e.g. "CVPR 2026".
		source: z.string().optional(),
		authors: z.array(reference("authors")).default([]),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

// Optional tag descriptions, centrally defined in one JSON file keyed by tag name.
// Tags that appear in articles but are absent here simply have no description.
const tags = defineCollection({
	loader: file("src/content/tags.json"),
	schema: z.object({ description: z.string() }),
});

export const collections = { blog, authors, tags };
