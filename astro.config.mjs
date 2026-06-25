// @ts-check

import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const isDevcontainer = process.env.REMOTE_CONTAINERS === "true";
const isCodespaces = process.env.CODESPACES === "true";

// https://astro.build/config
export default defineConfig({
	server: {
		host: isDevcontainer || isCodespaces ? true : undefined,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [mdx(), sitemap(), react(), markdoc()],
});
