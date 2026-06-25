---
version: alpha
name: "SystemK AI"
description: "A calm, paper-print academic-journal interface system for SystemK AI — Japanese-primary, restrained Morandi palette, one slate-blue voice, small type, generous whitespace, hairline rules, quiet motion."
colors:
  primary: "#4a6b8a"
  primary-hover: "#3f5c77"
  primary-active: "#344b61"
  primary-tint: "#eef2f6"
  on-primary: "#ffffff"
  paper: "#ffffff"
  paper-warm: "#faf8f4"
  ink-900: "#1f2422"
  ink-800: "#2b302e"
  ink-600: "#545a58"
  ink-500: "#6f7572"
  ink-300: "#bcc0bf"
  ink-200: "#d8dad9"
  ink-100: "#e8e9e8"
  link: "#3f5c77"
  success: "#4f6650"
  success-tint: "#e7ece4"
typography:
  display:
    fontFamily: IBM Plex Serif
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.015em
  h1:
    fontFamily: IBM Plex Serif
    fontSize: 2.1875rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
  h2:
    fontFamily: IBM Plex Serif
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.01em
  body:
    fontFamily: IBM Plex Sans
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: IBM Plex Serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.8
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: IBM Plex Sans
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 32px
  measure: 42rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 17px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-800}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 17px
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.md}"
    padding: 24px
  article-title:
    textColor: "{colors.ink-900}"
    typography: "{typography.h2}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-800}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 11px
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-600}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: 9px
  badge-research:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-active}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 8px
  badge-case:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.success}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 8px
  code-block:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.ink-800}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: 16px
  eyebrow:
    textColor: "{colors.ink-500}"
    typography: "{typography.label-caps}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body}"
  meta:
    textColor: "{colors.ink-500}"
    typography: "{typography.meta}"
---

## Overview

SystemK AI（システムケイ エーアイ）is the AI research division of SystemK Co., Ltd.
（株式会社システムケイ）, focused on visual AI（ビジュアルAI）and generative AI（生成AI）.
The interface reads like a long-running academic journal printed on warm paper: precise,
measured, and quiet. The reader is a competent professional — a peer — so the system never
shouts. There are no gradients, no glassmorphism, no decorative motion. Restraint is the
rule; colour, shadow, and movement each have to earn their place.

The emotional target is **quiet authority and calm trust**. Whitespace is structural.
Hairline rules and small, carefully set type do the work that loud colour blocks do
elsewhere.

### Voice & language

Content is **Japanese-primary**（本文は日本語）. English appears for technical terms, proper
nouns, citations, and code; mixed JP/EN runs are normal and must typeset cleanly. Write as a
research group publishing for peers: specific, evidence-led, no hype verbs（「革命的」「圧倒的」
は使わない）, no exclamation, no emoji. Institutional **we**（私たち / 当チーム）; address the
reader plainly. Buttons are verbs（実行 / 保存 / 結果を見る）. Numbers and Latin are half-width
in JP text; JP punctuation is full-width（、。「」）.

This complements the repository language policy (AGENTS.md §Conventions): code, comments, and
docs are English; reader-facing site copy is Japanese.

### Source of truth

The runtime tokens live in the Tailwind `@theme` block in `src/styles/global.css` (the
single stylesheet); this file is the human/agent spec built on them. No external CSS is
loaded — fonts use system stacks. Keep spec and `@theme` in sync via the `sync-design` skill.

## Colors

A single muted slate-blue is the only chromatic brand voice; everything else is a warm-
leaning ink/paper neutral. Colour carries meaning, never decoration — large flat colour
fills are avoided.

- **Primary — slate-blue (`#4a6b8a`):** primary actions, links, the occasional key rule or
  figure accent. Hover steps to `#3f5c77`, press to `#344b61`. White text on primary clears
  WCAG AA (≈5.6:1).
- **Paper (`#ffffff`) & warm paper (`#faf8f4`):** the page is true white; warm off-white
  marks sunken/editorial panels (code blocks, callouts) — the memory of printed stock.
- **Ink neutrals (warm greys):** text runs from `#1f2422` (strong, never pure black) and
  `#2b302e` (body) down through `#6f7572` (muted) to the hairline border greys `#d8dad9`
  /`#e8e9e8`. The full ramp is in `src/styles/tokens/colors.css`.
- **Semantic accents (Morandi, desaturated):** sage = success, ochre = warning, brick =
  danger, plum = rare highlight. Used only to carry meaning, in small doses (badges, icons,
  left borders), never as page fills.

## Typography

Two type universes, deliberately paired. **Latin = IBM Plex** (Serif / Sans / Mono);
**Japanese = Noto Serif JP（明朝）+ Noto Sans JP（ゴシック）**, sitting as fallbacks so mixed
JP/EN runs stay coherent.

- **Serif（明朝）— the journal voice:** headings, titles, and long-form 本文 (articles,
  citations, editorial prose). Set at `prose` (16px / 1.8 leading) for Japanese body — JP
  reads best loose.
- **Sans（ゴシック）— the UI voice:** navigation, labels, tables, dense data, captions, and
  annotations. Default UI body is 15px / 1.55.
- **Mono:** code, formulas, dates, and technical tokens.
- Sizes are deliberately **small** and print-derived; hierarchy comes from family, weight,
  and whitespace more than size. **Eyebrow labels** are uppercase, letter-spaced (`0.08em`)
  sans, in muted ink. Use at most a few weights per screen (400 / 500 / 600).
- **Fonts load via system stacks — no external webfont/CDN.** IBM Plex / Noto JP render when
  installed, otherwise they degrade to the platform serif/sans (e.g. Hiragino Mincho /
  Gothic). Self-host woff2 under `public/fonts` + `@font-face` if exact rendering is required.

## Layout

A **4px grid**; bias one step larger — whitespace is a brand value. Content sits in clear
columns with comfortable margins, never edge-to-edge density.

- **Measure:** long-form prose caps near **672px** (`spacing.measure`) for readability; the
  page shell is ~1080px wide with 32px gutters.
- **Rhythm:** sections are separated by generous vertical space and a single hairline rule or
  a heavier `1.5px` section underline. List rows are divided by `1px` faint rules, not boxes.
- **Header:** a 62px sticky bar, translucent white with a subtle blur and a hairline bottom
  border.

## Elevation & Depth

This is a **ruled, print-derived system** — hairline borders (`#d8dad9` / `#e8e9e8`) do most
structural work, and most surfaces sit flat on the page. Shadows are soft, low, cool-neutral,
and quiet; reserve `shadow-sm`/`shadow-md` for genuinely floating elements (dropdowns,
dialogs, the rare raised card). No glossy or coloured shadows, ever. Depth is more often
expressed as a tonal shift (warm-paper panel on a white page) than as a shadow.

## Shapes

Small radii throughout: **4px** default (buttons, inputs, small cards), **6–8px** for cards
and dialogs, **12px** for hero panels. Fully-round (`999px`) is reserved for avatars,
switches, and deliberate pills/tags. Borders are **1px** hairlines in the neutral ramp;
section dividers may step to `1.5px` in a stronger grey. Figures are framed like journal
plates: a hairline border with a numbered caption（図1 / Fig. 1）beneath in small sans.

## Components

Icons are **Lucide** line icons (1.5px stroke, `currentColor`) — never filled sets, never
emoji.

- **Buttons.** Primary: slate-blue fill, white text, 4px radius, ~40px tall, sans label
  (a verb). Hover darkens one step; press darkens again with a 1px optical settle. Secondary:
  white fill, hairline border, ink text. Focus shows a restrained 3px blue halo.
- **Inputs / search.** White field, hairline border, 4px radius; focus shifts the border to
  blue and adds the focus halo. The header search expands gently on focus.
- **Cards & list rows.** A card is defined by its hairline border, 6px radius, and padding —
  not a heavy shadow. List rows are borderless with a 1px top rule and a warm-paper hover.
- **Tags.** Pill outline (`999px`), hairline border, muted-ink sans label prefixed `#`.
- **Kind badges.** Tiny uppercase pills marking content type: **research（Paper）** in
  slate-blue-on-tint, **case（導入事例）** in sage-on-tint.
- **Code, formulas, figures, tables.** Code blocks sit on warm paper with a hairline border
  and mono type; inline code is a sunken chip. Math renders via KaTeX. Tables use sans, a
  `1.5px` header rule and `1px` row rules — no vertical lines, no zebra fills.
- **Author card.** Avatar (round), name in sans (JP + EN), role in muted meta, short bio.

**Implementation.** Build UI with **Tailwind utilities** mapped from these tokens via the
`@theme` block in `src/styles/global.css` — the single stylesheet (`bg-paper`,
`text-strong`, `text-2xl`, `font-serif`, `rounded-md`, `border-line-subtle`, …).
Hand-written CSS is reserved for the `@theme` tokens and the rendered-MDX prose
(`.sk-prose`). No external CSS is referenced. See AGENTS.md §Conventions.

## Do's and Don'ts

- Do keep slate-blue as the only brand colour; let neutrals and whitespace carry the page.
- Do set Japanese 本文 in the serif（明朝）voice at generous 1.8 leading; use sans for UI.
- Do separate content with hairline rules and space rather than boxes, shadows, or fills.
- Do keep motion quiet: 120–180ms, ≤4px, no bounce; honour `prefers-reduced-motion`.
- Do maintain ≥4.5:1 text contrast; pair white text only on `primary` or darker.
- Don't use gradients, glassmorphism, coloured/glossy shadows, or large flat colour blocks.
- Don't use emoji or filled/duotone icons — Lucide line icons only.
- Don't introduce new typefaces, hype copy（「革命的」）, or exclamation marks.
- Don't hardcode hex values or `/blog/` paths in components — use tokens and `BASE_URL`.
