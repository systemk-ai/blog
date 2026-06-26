import { defineEcConfig } from "astro-expressive-code";

// Code blocks follow DESIGN.md: a calm dark "journal terminal" in the SystemK AI
// slate/ink palette, hairline border, small IBM Plex Mono, quiet copy button, and
// slate-blue line/word highlights. Adapts astro-expressive-code (copy, frames,
// wrap, line/word highlighting) to the site's visual theme.

const systemkDark = {
	name: "systemk-dark",
	type: "dark",
	colors: {
		"editor.background": "#1f2422",
		"editor.foreground": "#d8dad9",
	},
	settings: [
		{ settings: { foreground: "#d8dad9", background: "#1f2422" } },
		{
			scope: ["comment", "punctuation.definition.comment"],
			settings: { foreground: "#6f7572", fontStyle: "italic" },
		},
		{
			scope: [
				"keyword",
				"keyword.control",
				"storage.type",
				"storage.modifier",
				"keyword.operator.expression",
			],
			settings: { foreground: "#7791ad" },
		},
		{
			scope: ["entity.name.function", "support.function", "meta.function-call"],
			settings: { foreground: "#9fb4c8" },
		},
		{
			scope: [
				"entity.name.type",
				"entity.name.class",
				"support.type",
				"support.class",
			],
			settings: { foreground: "#9fb4c8" },
		},
		{
			scope: [
				"constant.numeric",
				"constant.language",
				"constant.language.boolean",
			],
			settings: { foreground: "#b09150" },
		},
		{
			scope: [
				"string",
				"string.quoted",
				"string.template",
				"constant.other.symbol",
			],
			settings: { foreground: "#8aa6a0" },
		},
		{
			scope: ["punctuation", "meta.brace"],
			settings: { foreground: "#969b9a" },
		},
		{ scope: ["entity.name.tag"], settings: { foreground: "#7791ad" } },
		{
			scope: ["entity.other.attribute-name"],
			settings: { foreground: "#9fb4c8" },
		},
		{
			scope: ["variable", "variable.other.readwrite"],
			settings: { foreground: "#d8dad9" },
		},
	],
};

export default defineEcConfig({
	themes: [systemkDark],
	// Single theme — don't switch on the OS dark-mode preference.
	useDarkModeMediaQuery: false,
	// Long lines wrap rather than scroll (calm, readable — per the design).
	defaultProps: { wrap: true },
	styleOverrides: {
		borderRadius: "6px",
		borderColor: "#3e4442",
		borderWidth: "1px",
		codeFontFamily:
			'"IBM Plex Mono", "Noto Sans JP", ui-monospace, "SFMono-Regular", monospace',
		codeFontSize: "0.8125rem",
		codeLineHeight: "1.65",
		codePaddingInline: "1.1rem",
		codePaddingBlock: "0.9rem",
		uiFontFamily:
			'"IBM Plex Sans", "Noto Sans JP", "Hiragino Kaku Gothic ProN", system-ui, sans-serif',
		uiFontSize: "0.72rem",
		frames: {
			frameBoxShadowCssValue: "none",
			editorBackground: "#1f2422",
			editorActiveTabBackground: "#2b302e",
			editorActiveTabForeground: "#e8e9e8",
			editorActiveTabIndicatorTopColor: "transparent",
			editorActiveTabIndicatorBottomColor: "#4a6b8a",
			editorTabBarBackground: "#2b302e",
			editorTabBarBorderBottomColor: "#3e4442",
			terminalBackground: "#1f2422",
			terminalTitlebarBackground: "#2b302e",
			terminalTitlebarForeground: "#e8e9e8",
			terminalTitlebarBorderBottomColor: "#3e4442",
			inlineButtonForeground: "#bcc0bf",
			inlineButtonBackground: "#e8e9e8",
			inlineButtonBackgroundIdleOpacity: "0",
			inlineButtonBackgroundHoverOrFocusOpacity: "0.1",
			inlineButtonBackgroundActiveOpacity: "0.15",
			inlineButtonBorder: "transparent",
			tooltipSuccessBackground: "#4f6650",
			tooltipSuccessForeground: "#f4f4f3",
		},
		textMarkers: {
			markBackground: "rgba(74, 107, 138, 0.18)",
			markBorderColor: "rgba(74, 107, 138, 0.5)",
			insBackground: "rgba(79, 102, 80, 0.16)",
			insBorderColor: "rgba(79, 102, 80, 0.5)",
			insDiffIndicatorColor: "#6f8a6a",
			delBackground: "rgba(125, 69, 64, 0.16)",
			delBorderColor: "rgba(125, 69, 64, 0.5)",
			delDiffIndicatorColor: "#a85f57",
		},
	},
});
