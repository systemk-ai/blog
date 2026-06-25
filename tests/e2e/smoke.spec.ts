import { expect, test } from "@playwright/test";

// baseURL is http://localhost:4321/blog/ (the deployed subpath). Use relative
// paths so the base is applied automatically.

test("home: hero, both streams, latest, drafts hidden", async ({ page }) => {
	await page.goto("./");
	await expect(page.getByRole("heading", { name: /研究ノート/ })).toBeVisible();
	await expect(page.getByRole("heading", { name: "研究・論文" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "導入事例" })).toBeVisible();
	await expect(page.getByText("最新の記事")).toBeVisible();
	await expect(page.getByText("画像補完の検討")).toHaveCount(0); // draft never listed
});

test("header has nav, search and RSS; footer has brand and copyright", async ({
	page,
}) => {
	await page.goto("./");
	const nav = page.getByRole("navigation").first();
	await expect(nav.getByRole("link", { name: "ホーム" })).toBeVisible();
	await expect(nav.getByRole("link", { name: "研究・論文" })).toBeVisible();
	await expect(nav.getByRole("link", { name: "導入事例" })).toBeVisible();
	await expect(page.getByPlaceholder("記事を検索")).toBeVisible();
	await expect(page.getByText("System K Corp")).toBeVisible();
});

test("article: title, math, co-located component, chart and copy control", async ({
	page,
}) => {
	await page.goto("./object-detection-pretraining/");
	await expect(
		page.getByRole("heading", { name: /物体検出モデルの事前学習/ }),
	).toBeVisible();
	await expect(page.locator(".katex").first()).toBeVisible(); // KaTeX
	await expect(page.getByText("+3.2")).toBeVisible(); // co-located KeyResult
	const figure = page.locator("figure").last();
	await figure.scrollIntoViewIfNeeded();
	await expect(figure.locator("svg")).toBeVisible({ timeout: 8000 }); // EChart island
	// Copy/source control: copy button + dropdown links.
	await expect(page.getByRole("button", { name: /コピー/ })).toBeVisible();
	await page.locator("[data-toggle]").click();
	await expect(
		page.getByRole("link", { name: /Markdownで開く/ }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: /GitHubソースを開く/ }),
	).toBeVisible();
});

test("per-page .md twin serves plain markdown, not a 404 page", async ({
	request,
}) => {
	// Raw HTTP request (no browser document decoding); decode bytes as UTF-8.
	const res = await request.get("./object-detection-pretraining.md");
	expect(res.status()).toBe(200);
	const body = (await res.body()).toString("utf8");
	expect(body).toContain("title: 物体検出モデルの事前学習と少数データ微調整");
	expect(body).toContain("物体検出モデルを ImageNet で事前学習");
	expect(body).not.toContain("<!doctype html>");
	// MDX import lines are stripped from the twin.
	expect(body).not.toContain("import EChart");
});

test("llms.txt and llms-full.txt serve", async ({ request }) => {
	const llms = await request.get("./llms.txt");
	expect(llms.status()).toBe(200);
	const index = (await llms.body()).toString("utf8");
	expect(index).toContain("# SystemK AI");
	expect(index).toContain("object-detection-pretraining.md");

	const full = await request.get("./llms-full.txt");
	expect(full.status()).toBe(200);
	expect((await full.body()).toString("utf8")).toContain(
		"物体検出モデルの事前学習と少数データ微調整",
	);
});

test("draft is hidden from lists but reachable by direct URL", async ({
	page,
}) => {
	const res = await page.goto("./draft-preview/");
	expect(res?.status()).toBe(200);
	await expect(
		page.getByRole("heading", { name: /画像補完の検討/ }),
	).toBeVisible();
});

test("tag page shows a description only when one is defined", async ({
	page,
}) => {
	await page.goto("./tags/物体検出/");
	await expect(page.getByRole("heading", { name: "#物体検出" })).toBeVisible();
	await expect(
		page.getByText("画像・映像から対象物の位置と種類を推定するタスク。"),
	).toBeVisible();
	await expect(page.locator('[class~="max-w-[560px]"]')).toHaveCount(1);

	// 事前学習 has no entry in tags.json → no description line.
	await page.goto("./tags/事前学習/");
	await expect(page.getByRole("heading", { name: "#事前学習" })).toBeVisible();
	await expect(page.locator('[class~="max-w-[560px]"]')).toHaveCount(0);
});

test("author page lists the author's articles", async ({ page }) => {
	await page.goto("./authors/hayashi/");
	await expect(page.getByRole("heading", { name: "林 玲奈" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: /物体検出モデルの事前学習/ }).first(),
	).toBeVisible();
});

test("search page loads the Pagefind UI", async ({ page }) => {
	await page.goto("./search/");
	await expect(page.locator("#search input").first()).toBeVisible({
		timeout: 8000,
	});
});

test("rss feed serves the articles", async ({ page }) => {
	const res = await page.goto("./rss.xml");
	expect(res?.status()).toBe(200);
	const body = (await res?.text()) ?? "";
	expect(body).toContain("<rss");
	expect(body).toContain("物体検出モデルの事前学習");
});
