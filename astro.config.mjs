// @ts-check

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import markdoc from "@astrojs/markdoc";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

// Run Pagefind after the static build so full-text search works with any deploy
// flow (including withastro/action). Indexes the [data-pagefind-body] regions.
/** @returns {import("astro").AstroIntegration} */
function pagefind() {
	return {
		name: "pagefind",
		hooks: {
			"astro:build:done": ({ dir }) => {
				execFileSync("pagefind", ["--site", fileURLToPath(dir)], {
					stdio: "inherit",
				});
			},
		},
	};
}

const isDevcontainer = process.env.REMOTE_CONTAINERS === "true";
const isCodespaces = process.env.CODESPACES === "true";

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
	integrations: [mdx(), sitemap(), react(), markdoc(), pagefind()],
});
