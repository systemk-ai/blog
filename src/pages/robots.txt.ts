import type { APIRoute } from "astro";

// robots.txt — allow all crawlers and advertise the sitemap index. Served at
// /blog/robots.txt. The Sitemap directive is an absolute URL (required by the
// protocol), built from `site` + BASE_URL so nothing hardcodes the domain or /blog/.
// Note: on a GitHub Pages *project* subpath, crawlers only honour robots.txt at the
// host root (/robots.txt) — see SPEC.md §Open decisions.
export const GET: APIRoute = ({ site }) => {
	const base = import.meta.env.BASE_URL;
	const origin = site ?? new URL("https://systemk-ai.github.io");
	const sitemap = new URL(`${base}sitemap-index.xml`, origin).href;
	const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap}`].join(
		"\n",
	);
	return new Response(`${body}\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
