/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

// getViteConfig wires Astro's Vite pipeline so unit tests can render `.astro`
// components via the Container API and resolve `astro:*` virtual modules.
export default getViteConfig({
	test: {
		// Unit tests only. Playwright E2E lives in tests/e2e and is run separately.
		include: ["tests/unit/**/*.{test,spec}.ts"],
	},
});
