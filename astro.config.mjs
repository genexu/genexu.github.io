import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
	site: "https://genexu.github.io",
	integrations: [
		tailwind(),
		react(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: {
					"zh-tw": "zh-TW",
					en: "en-US",
				},
			},
		}),
	],
	markdown: {
		// https://docs.astro.build/en/guides/markdown-content/#markdown-plugins
		// https://docs.astro.build/en/guides/markdown-content/#customizing-a-plugin
		remarkPlugins: [remarkGfm, remarkBreaks],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						// properties: {
						// 	className: ["icon", "icon-link"],
						// },
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: "dracula",
			// Add custom languages
			// Note: Shiki has countless langs built-in, including .astro!
			// https://github.com/shikijs/shiki/blob/main/docs/languages.md
			langs: [],
			// Enable word wrap to prevent horizontal scrolling
			wrap: false,
		},
	},
	i18n: {
		defaultLocale: "en",
		locales: ["en", "zh-tw"],
		fallback: {
			"zh-tw": "en",
		},
	},
	vite: {
		ssr: {
			noExternal: ["react-icons"],
		},
	},
});
