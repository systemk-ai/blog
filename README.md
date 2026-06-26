<div align="center">

# 📰 Blog

**Astro + MDX で構築する、静的生成のテックブログ**

研究レポートと導入事例を、数式・コードハイライト・インタラクティブなチャート付きで配信します。<br/>
ビルド成果物は GitHub Pages のサブパス `/blog/` へ自動デプロイされます。

<sub>

`Astro 7` ・ `MDX` ・ `Tailwind v4` ・ `TypeScript` ・ `pnpm` ・ `Biome` ・ `Vitest` ・ `Playwright` ・ `Pagefind`

</sub>

</div>

---

## 📑 目次

- [はじめに（セットアップ）](#-はじめにセットアップ)
- [`just` コマンド一覧](#-just-コマンド一覧)
- [プロジェクト構成](#-プロジェクト構成)
- [✍️ 新しい記事の作り方](#️-新しい記事の作り方)
- [🧩 新しい機能・コンポーネントの作り方](#-新しい機能コンポーネントの作り方)
- [📂 配置のルール（最重要）](#-配置のルール最重要)
- [🚫 pre-commit は絶対にバイパスしない](#-pre-commit-は絶対にバイパスしない)
- [品質ゲートとコミット規約](#-品質ゲートとコミット規約)

---

## 🚀 はじめに（セットアップ）

### 必要なツール

| ツール | バージョン | 用途 |
| :--- | :--- | :--- |
| **Node.js** | `>= 22.12.0` | ランタイム |
| **pnpm** | `11.7.0`（`packageManager` で固定） | パッケージ管理 |
| **just** | 任意 | コマンドランナー（後述） |
| **pre-commit** | 任意 | コミット前フック（**必須運用**） |

> 💡 **Dev Container を使う場合は設定不要です。** `.devcontainer` が `just` と `pre-commit` を自動インストールし、`postCreateCommand` で `pre-commit install` まで実行します。手元の環境で初めて触る場合のみ、下記を手動で実行してください。

### 初回セットアップ

```sh
# 1. 依存関係をインストール
pnpm install

# 2. pre-commit フックを Git に登録（Dev Container では実行済み）
pre-commit install

# 3. 開発サーバーを起動 → http://localhost:4321/blog/
just dev
```

---

## 🛠 `just` コマンド一覧

`justfile` がこのプロジェクトの**コマンドの単一の正本（single source of truth）**です。`package.json` の scripts をミラーしており、コマンドを自前で組み立てず、必ず `just` を経由してください。引数なしで `just` を実行すると一覧が表示されます。

| コマンド | 実体 | 目的・使いどころ |
| :--- | :--- | :--- |
| `just` | `just --list` | レシピ一覧を表示する（既定）。 |
| `just dev` | `astro dev` | 開発サーバーを起動。`http://localhost:4321/blog/` でホットリロード。 |
| `just build` | `astro build` | 静的サイトを `dist/` に生成。**Pagefind の検索インデックス**も同時に作成。 |
| `just preview` | `astro preview` | `build` 済みの成果物をローカルで配信し、本番に近い形で確認。 |
| `just check` | `biome check` | Lint + フォーマットの**チェックのみ**（書き込みなし）。問題があれば失敗。CI のゲートと同じ基準。 |
| `just fix` | `biome check --write` | Lint + フォーマットの問題を**自動修正**。 |
| `just test` | `vitest run` | ユニットテスト（Vitest）を 1 回実行。 |
| `just test-watch` | `vitest` | ユニットテストをウォッチモードで実行。開発中の TDD 用。 |
| `just test-e2e` | `playwright test` | E2E テスト（Playwright）。内部でビルドし `/blog/` 配下をプレビューして検証。 |
| `just verify` | `check` → `test` → `build` | **ローカルの総合ゲート**。push する前に必ず実行する。 |
| `just clean` | `rm -rf dist .astro` | ビルド成果物とキャッシュを削除。 |

> [!IMPORTANT]
> **push する前に必ず `just verify` を実行してください。** これは CI が回す検証（lint・ユニットテスト・ビルド）と同じ内容をローカルで先取りするもので、CI の失敗を未然に防ぎます。

---

## 🗂 プロジェクト構成

```text
.
├── src/
│   ├── content/
│   │   ├── blog/<slug>/          # 記事 = フォルダ1つ。index.mdx が本体
│   │   │   ├── index.mdx         #   └ 記事本文（URL は /blog/<slug>/）
│   │   │   ├── KeyResult.astro   #   └ この記事だけで使うコンポーネント（同梱）
│   │   │   └── figure.png        #   └ この記事だけで使う画像・データ（同梱）
│   │   ├── authors/<id>/index.mdx# 著者プロフィール（記事から authors で参照）
│   │   ├── tags.json             # タグの共有説明（任意）
│   │   └── content.config.ts     # コンテンツのスキーマ定義
│   ├── components/               # ★複数記事で使い回す共有 UI のみ
│   ├── layouts/BaseLayout.astro  # ページの外枠（head + header + footer）
│   ├── pages/                    # ルーティング（一覧・記事・タグ・検索・RSS など）
│   └── styles/global.css         # 唯一のスタイルシート（Tailwind @theme トークン）
├── tests/{unit,e2e}/             # Vitest ユニット / Playwright E2E
├── .agents/                      # AI エージェント向けハーネス（knowledge / skills）
├── DESIGN.md                     # ビジュアル仕様の正本
├── justfile                      # コマンドの正本
└── astro.config.mjs              # 統合・Markdown パイプライン・検索ビルド
```

---

## ✍️ 新しい記事の作り方

記事は **1 記事 = 1 フォルダ**で、ローダーは `**/index.mdx` のみを拾います。本文は**日本語**で書きます。

### 1. フォルダと本体ファイルを作る

スラッグ（kebab-case）がそのまま URL になります（`/blog/<slug>/`）。

```sh
src/content/blog/my-new-post/index.mdx
```

### 2. フロントマターを書く

スキーマは [`src/content.config.ts`](src/content.config.ts) で強制されます。

```yaml
---
title: "記事タイトル"
description: "一覧・<meta>・フィードで使う一文。"
summary: "一覧カード用の少し長い説明（任意。省略時は description を使用）。"
type: research          # research（研究・論文）| case（導入事例）
tags: ["物体検出"]       # string[]。無ければ []
source: "CVPR 2026"     # 任意 — 発表媒体・学会名など
authors: ["hayashi"]    # src/content/authors/<id> を参照
pubDate: 2026-06-25     # YYYY-MM-DD
draft: false            # true = 一覧から隠す（直接 URL では閲覧可）
---
```

### 3. 本文を MDX で書く

標準で次の機能が使えます。

- **数式** — インライン `$...$`、ディスプレイ `$$...$$`（KaTeX）。
- **コード** — Expressive Code のフェンスドブロック。メタ文字列で機能を付与（例: `` ```py title="train.py" {2} `` でファイル名タブ・コピーボタン・行ハイライト）。
- **見出し** — `##` は自動でアンカー化され、記事の目次（TOC）を構成。

### 4. パスは必ず base-aware に

サイト内リンクや資産パスに `/blog/` を**ハードコードしないでください**。常に `` `${import.meta.env.BASE_URL}...` `` から組み立てます。

### 5. 著者とタグ

- `authors` の各 ID には `src/content/authors/<id>/index.mdx` が必要です。
- タグページに共有説明を付けたい場合のみ、`src/content/tags.json` に追加します（任意）。

### 6. 確認とコミット

```sh
just build   # ビルドが通り、一覧（home / research / cases）に記事が出ることを確認
```

> 記事は**検索（Pagefind）と RSS フィードに自動で取り込まれます**。追加の配線は不要です。

> [!NOTE]
> `src/content/**/*.mdx` の追加・編集は Conventional Commits で **`feat`（新規・拡充）または `fix`（修正）**とし、**`docs` は使いません**。記事内容は公開ページに直接レンダリングされるためです。

📖 詳しい手順は `.agents/skills/new-article/SKILL.md`、実例は [`object-detection-pretraining/index.mdx`](src/content/blog/object-detection-pretraining/index.mdx) を参照。

---

## 🧩 新しい機能・コンポーネントの作り方

### 1. まず「置き場所」を決める（最重要）

下の[配置のルール](#-配置のルール最重要)に従って、**共有か同梱か**を最初に判断します。迷ったら**同梱**にして、2 記事目で必要になった時に昇格させます。

### 2. 実装する

- **既定は `.astro`**（クライアント JS ゼロ）。クライアント側の対話性が必要な時だけ React アイランド（`.tsx`）を使い、できるだけ狭いハイドレーション指示子（`client:load` より `client:visible`）を選ぶ。
- コンポーネントも **base-aware** に（内部 URL は `import.meta.env.BASE_URL` から）。
- props は型付け（`.astro` は `interface Props`、`.tsx` は型付き props）。

```mdx
{/* 同梱コンポーネントの読み込み（その記事フォルダ内） */}
import KeyResult from "./KeyResult.astro";

{/* 共有コンポーネントの読み込み（src/components/） */}
import EChart from "../../../components/EChart.tsx";

<EChart client:visible option={chartOption} height={260} />
```

### 3. テストする

- **`src/components/` の共有コンポーネントはユニットテスト必須。** Vitest + Astro Container API で `tests/unit/<Name>.test.ts` を追加（参考: `tests/unit/PostMeta.test.ts`）。
- ブラウザでしか再現しない挙動（ハイドレーション・ナビゲーション・対話性）は `tests/e2e/` の Playwright で検証。
- **同梱の単発コンポーネント**は、実ロジックを持たない限りユニットテスト不要。

### 4. 確認とコミット

```sh
just test    # ユニットテスト green
just check   # lint / format クリーン
just build   # ビルド成功
```

Conventional Commits（スコープなし）で、新規は `feat`、バグ修正は `fix`、挙動を変えない再構成は `refactor`。

📖 詳しい手順は `.agents/skills/new-component/SKILL.md` を参照。

---

## 📂 配置のルール（最重要）

このプロジェクトの根幹となる方針です。**「みんなで使うものだけ共有、特定の記事専用のものはその記事に同梱」** を徹底します。

> [!IMPORTANT]
> **コンポーネントの置き場所**
>
> - 🌍 **共有 `src/components/`** に置いてよいのは、**複数の記事で繰り返し使い回す**、もしくは**スタイル上重要（サイト共通の見た目を担う）**コンポーネント**だけ**です。これらがユニットテストの対象になります。
> - 📦 **特定の 1 記事だけで使う**コンポーネントは、**その記事のルートフォルダ**（`src/content/blog/<slug>/`）に置き、MDX から相対パスで直接 import します（例: `import Note from "./Note.astro"`）。`src/components/` には**入れません**。
>
> **資産（画像・データ）の置き場所**
>
> - 📦 ある画像やデータが**1 つの記事でしか使われない**なら、**その記事のルートフォルダに直接置きます**。グローバルな置き場所に散らかさないでください。
> - 🌍 複数の記事・ページ横断で共有する資産だけを、共有の場所（`public/` 等）に置きます。

**判断基準はシンプルです。** 「この部品/資産は、この記事以外でも使うか？」

| | 使うのはこの記事だけ | 複数で使い回す／サイト共通 |
| :--- | :--- | :--- |
| **コンポーネント** | 📦 記事フォルダに同梱 | 🌍 `src/components/`（+ ユニットテスト） |
| **画像・データ** | 📦 記事フォルダに同梱 | 🌍 共有の場所（`public/` 等） |

> 迷ったら**同梱**を選んでください。後から 2 記事目が必要としたときに、共有へ昇格させるのは簡単です。早すぎる共有化は、`src/components/` を使われない部品で汚します。

---

## 🚫 pre-commit は絶対にバイパスしない

> [!CAUTION]
> **すべての貢献者は、いかなる場合でも pre-commit フックをバイパスしてはいけません。**
>
> pre-commit は、空白・改行・YAML の整合性チェックに加え、**gitleaks による機密情報（シークレット・トークン）スキャン**を行う最後の防衛線です。これを一度でも飛ばすと、秘密情報の漏洩や壊れたファイルがそのまま履歴に残ります。

**禁止される操作（例外なく禁止）:**

```sh
git commit --no-verify        # ❌ 禁止
git commit -n                 # ❌ 禁止（--no-verify の短縮形）
SKIP=gitleaks git commit ...  # ❌ 禁止（特定フックのスキップも不可）
PRE_COMMIT_ALLOW_NO_CONFIG=1  # ❌ 禁止
```

**フックが失敗したときの正しい対応:**

1. フックの出力を読み、**指摘された内容を実際に直す**（フックを無効化しない）。
2. 自動修正系（trailing-whitespace / end-of-file-fixer など）がファイルを書き換えた場合は、その変更を `git add` し直して**もう一度コミット**する。
3. gitleaks がシークレットを検知したら、**そのシークレットを履歴に入れない**こと。コードから除去し、環境変数や安全な保管先へ移す。
4. どうしても誤検知だと判断できる場合も、自己判断でバイパスせず、設定（`.pre-commit-config.yaml`）の修正としてレビューに諮る。

> フックが未登録の環境では `pre-commit install` を実行してください。「フックが入っていなかった」はバイパスの言い訳になりません。

---

## ✅ 品質ゲートとコミット規約

| 項目 | ルール |
| :--- | :--- |
| **push 前** | `just verify`（lint + ユニットテスト + ビルド）を必ず通す。 |
| **コミット前** | pre-commit フックを必ず通す（バイパス禁止）。 |
| **スタイル** | Tailwind-first。`src/styles/global.css` の `@theme` トークンに対応するユーティリティクラスで装飾。手書き CSS / scoped `<style>` は原則禁止。詳細は [`DESIGN.md`](DESIGN.md)。 |
| **コミット** | Conventional Commits、**スコープなし**。記事（`src/content/**/*.mdx`）は `feat` / `fix`、**`docs` は使わない**。 |
| **パス** | `/blog/` をハードコードしない。常に `import.meta.env.BASE_URL` から組み立てる。 |

---

<div align="center">
<sub>コマンドは <code>justfile</code>、ビジュアル仕様は <code>DESIGN.md</code>、エージェント向けの全体像は <code>AGENTS.md</code> を参照してください。</sub>
</div>
