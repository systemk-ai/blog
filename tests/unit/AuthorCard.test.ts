import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import AuthorCard from "../../src/components/AuthorCard.astro";
import { fakeAuthor } from "./fixtures";

test("renders the author's names, role and a link to the author page", async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(AuthorCard, {
		props: { author: fakeAuthor },
	});
	expect(html).toContain("林 玲奈");
	expect(html).toContain("Reina Hayashi");
	expect(html).toContain("主任研究員 ・ ビジュアルAI");
	expect(html).toContain("authors/hayashi/");
});
