// Minimal fake collection entries for unit tests — only the fields the components
// actually read. Cast to `any` so they stand in for the real CollectionEntry types.

// biome-ignore lint/suspicious/noExplicitAny: test fixture stands in for CollectionEntry<"blog">
export const fakePost: any = {
	id: "demo-article",
	body: "本文のテキスト。",
	data: {
		title: "デモ記事タイトル",
		description: "メタ用の説明文。",
		summary: "一覧カード用の要約。",
		type: "research",
		tags: ["物体検出", "事前学習"],
		source: "出典 2026",
		authors: [],
		pubDate: new Date("2026-06-20T00:00:00Z"),
		draft: false,
	},
};

// biome-ignore lint/suspicious/noExplicitAny: test fixture stands in for CollectionEntry<"authors">
export const fakeAuthor: any = {
	id: "hayashi",
	data: {
		nameJa: "林 玲奈",
		nameEn: "Reina Hayashi",
		role: "主任研究員 ・ ビジュアルAI",
		affiliation: "株式会社システムケイ",
		links: [],
	},
};
