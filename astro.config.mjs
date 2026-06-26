// @ts-check

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import markdoc from "@astrojs/markdoc";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

const isDevcontainer = process.env.REMOTE_CONTAINERS === "true";
const isCodespaces = process.env.CODESPACES === "true";

// Slugs of draft articles (`draft: true`), read from frontmatter at build time. The
// sitemap, like every list/feed/llms endpoint, must not advertise unpublished posts —
// the article page still serves them at their direct URL. `@astrojs/sitemap` only sees
// final URLs, so we derive the exclusion set here rather than from collection data.
const blogDir = fileURLToPath(new URL("./src/content/blog", import.meta.url));
const draftSlugs = new Set(
	readdirSync(blogDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.filter((entry) => {
			const source = readFileSync(`${blogDir}/${entry.name}/index.mdx`, "utf8");
			const frontmatter = source.split("---")[1] ?? "";
			return /^\s*draft:\s*true\s*$/m.test(frontmatter);
		})
		.map((entry) => entry.name),
);

// https://astro.build/config
export default defineConfig({
	// Deployed to GitHub Pages at the project subpath. If a custom domain is
	// added later, update `site`/`base` and drop a `public/CNAME`. See SPEC.md.
	site: "https://systemk-ai.github.io",
	// base keeps its trailing slash so import.meta.env.BASE_URL is "/blog/" regardless
	// of trailingSlash. trailingSlash "ignore" (not "always") lets the parameterised file
	// endpoints (/blog/<slug>.md) serve at their natural URL in `astro dev`, which a
	// trailing-slash-enforcing config 404s.
	base: "/blog/",
	trailingSlash: "ignore",
	server: {
		host: isDevcontainer || isCodespaces ? true : undefined,
	},
	markdown: {
		// Astro 7: configure plugins via a `unified` processor (the top-level
		// remarkPlugins/rehypePlugins keys are deprecated). MDX inherits this
		// config, so it applies to `.mdx` too. rehypeSlug must precede autolink.
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				rehypeKatex,
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: "wrap" }],
			],
		}),
	},
	vite: {
		plugins: [tailwindcss()],
	},
	// expressiveCode() before mdx() (processes fenced code in .mdx). pagefind() is
	// astro-pagefind: indexes on `astro build`, serves the built index in `astro dev`.
	integrations: [
		expressiveCode(),
		mdx(),
		// Keep drafts and the search page out of the sitemap so crawlers only get
		// indexable, published URLs (drafts stay reachable by direct URL).
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname.replace(/\/$/, "");
				if (path.endsWith("/search")) return false;
				return !draftSlugs.has(path.split("/").pop() ?? "");
			},
		}),
		react(),
		markdoc(),
		pagefind(),
	],
});
