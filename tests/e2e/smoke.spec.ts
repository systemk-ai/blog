import { expect, test } from "@playwright/test";

// baseURL is http://localhost:4321/blog/ (the deployed subpath). Use relative
// paths so the base is applied automatically.

test("home lists the published article and hides drafts", async ({ page }) => {
	await page.goto("./");
	await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Hello World" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Draft Preview" })).toHaveCount(
		0,
	);
});

test("article page renders title and math", async ({ page }) => {
	await page.goto("./article-1/");
	await expect(
		page.getByRole("heading", { name: "Hello World" }),
	).toBeVisible();
	// rehype-katex emits .katex spans for the inline/display math.
	await expect(page.locator(".katex").first()).toBeVisible();
});

test("draft is hidden from list but reachable by direct URL", async ({
	page,
}) => {
	const response = await page.goto("./draft-preview/");
	expect(response?.status()).toBe(200);
	await expect(
		page.getByRole("heading", { name: "Draft Preview" }),
	).toBeVisible();
});
