import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Folder-per-article: each post lives at src/content/blog/<slug>/index.mdx.
// The glob loader derives the entry id from the folder name (it strips the
// trailing `/index`), so `article-1/index.mdx` becomes id `article-1`.
const blog = defineCollection({
	loader: glob({ pattern: "**/index.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
